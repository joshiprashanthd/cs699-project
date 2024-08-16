package com.bookhaven.api.resources;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.UserBookDetails;
import com.bookhaven.api.services.BookService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/library")
public class LibraryResource {

    private final BookService bookService;

    public LibraryResource(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("")
    public ResponseEntity<List<UserBookDetails>> fetchUserLibrary(HttpServletRequest request){
        int userId = (Integer) request.getAttribute("userId");
        List<UserBookDetails> books = bookService.fetchUserLibrary(userId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserBookDetails>> fetchUserLibrary(@PathVariable Integer userId){
        List<UserBookDetails> books = bookService.fetchUserLibrary(userId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<UserBookDetails> addBookToUserLibrary(HttpServletRequest request,
                                                                @RequestBody Map<String, Object> bodyMap){
        int userId = (Integer) request.getAttribute("userId");
        int bookId = (Integer) bodyMap.get("bookId");
        UserBookDetails bookDetail =  bookService.addBookToUserLibrary(userId, bookId);
        return new ResponseEntity<>(bookDetail, HttpStatus.CREATED);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Map<String, Boolean>> updateBookDetailsInLibrary(HttpServletRequest request,
                                                                           @PathVariable("bookId") Integer bookId,
                                                                           @RequestBody Map<String, Object> bookDetailsMap) {
        int userId = (Integer) request.getAttribute("userId");
        boolean hasRead = (Boolean) bookDetailsMap.get("hasRead");
        boolean bookmarked = (Boolean) bookDetailsMap.get("bookmarked");
        bookService.updateBookDetailsInUserLibrary(userId, bookId, hasRead, bookmarked);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Map<String, Boolean>> removeBookFromLibrary(HttpServletRequest request,
                                                                      @PathVariable("bookId") Integer bookId){
        int userId = (Integer) request.getAttribute("userId");
        bookService.deleteBookFromUserLibrary(userId, bookId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
