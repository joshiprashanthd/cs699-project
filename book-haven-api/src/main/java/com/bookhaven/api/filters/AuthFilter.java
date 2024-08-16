package com.bookhaven.api.filters;

import com.bookhaven.api.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AuthFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String requestUri = httpRequest.getRequestURI();
        String requestMethod = httpRequest.getMethod();
        String authHeader = httpRequest.getHeader("Authorization");

        // ignoring some GET urls from auth
        List<String> ignoreAuthUrls = new ArrayList<>();
        ignoreAuthUrls.add("/api/books");
        ignoreAuthUrls.add("/api/library/user");

        boolean contains = false;
        for(String url : ignoreAuthUrls){
            if (requestUri.startsWith(url)) {
                contains = true;
                break;
            }
        }

        if(contains && requestMethod.equals("GET")){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        // check if bearer token is present and then add a claim if present and pass it to the next middleware.
        if(authHeader != null){
            String[] authHeaderArr = authHeader.split("Bearer");
            if(authHeaderArr.length > 1 && authHeaderArr[1] != null){
                String token = authHeaderArr[1];
                try{
                    Claims claims = Jwts.parser().setSigningKey(Constants.API_SECRET_KEY)
                            .parseClaimsJws(token).getBody();
                    httpRequest.setAttribute("userId", Integer.parseInt(claims.get("userId").toString()));
                    boolean isAdmin = Boolean.parseBoolean(claims.get("isAdmin").toString());
                    if(requestUri.equals("/api/books") && !requestMethod.equals("GET") && isAdmin != Boolean.TRUE){
                        httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "unauthorized access");
                        return;
                    }
                }catch (Exception e){
                    httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "invalid/expired token");
                    return;
                }
            }
            // else send forbidden error.
            else {
                httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Authorization token must be Bearer [token]");
                return;
            }
        }
        else {
            httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Authorization token must be provided");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
