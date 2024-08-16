package com.bookhaven.api.repositories;

import com.bookhaven.api.domain.User;
import com.bookhaven.api.exceptions.BhAuthException;
import com.bookhaven.api.exceptions.BhBadRequestException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;

@Repository
public class UserRepositoryImpl implements UserRepository{
    private static final String SQL_CREATE = "INSERT INTO BH_USERS(USER_ID, FIRST_NAME, LAST_NAME, EMAIL, IS_ADMIN, DATE_JOINED," +
            "PASSWORD) VALUES(NEXTVAL('BH_USERS_SEQ'), ?, ?, ?, ?, ?, ?)";
    private static final String SQL_COUNT_BY_EMAIL = "SELECT COUNT(*) FROM BH_USERS WHERE EMAIL = ?";
    private static final String SQL_FIND_BY_ID = "SELECT USER_ID, FIRST_NAME, LAST_NAME, EMAIL, IS_ADMIN, DATE_JOINED, PASSWORD, ABOUT_ME " +
            "FROM BH_USERS WHERE USER_ID = ?";
    private static final String SQL_FIND_BY_EMAIl = "SELECT USER_ID, FIRST_NAME, LAST_NAME, EMAIL, IS_ADMIN, DATE_JOINED, PASSWORD, ABOUT_ME " +
            "FROM BH_USERS WHERE EMAIl = ?";

    private static final String SQL_UPDATE = "UPDATE BH_USERS SET FIRST_NAME = ?, LAST_NAME = ?, ABOUT_ME = ? WHERE USER_ID = ?";

    final
    JdbcTemplate jdbcTemplate;

    public UserRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Integer create(String firstName, String lastName, String email, String password) throws BhAuthException {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        try{
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, firstName);
                ps.setString(2, lastName);
                ps.setString(3, email);
                ps.setBoolean(4, false);
                ps.setLong(5, Instant.now().toEpochMilli());
                ps.setString(6, hashedPassword);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("USER_ID");
        }catch (Exception e){
            throw new BhAuthException("Invalid details. Failed to create account");
        }
    }

    @Override
    public User findByEmailAndPassword(String email, String password) throws BhAuthException {
        try{
            User user = jdbcTemplate.queryForObject(SQL_FIND_BY_EMAIl, new Object[]{email}, userRowMapper);
            if(!BCrypt.checkpw(password, user.getPassword())){
                throw new BhAuthException("Invalid email/password");
            }
            return user;
        }catch (EmptyResultDataAccessException e){
            throw new BhAuthException("Invalid email/password");
        }
    }

    @Override
    public Integer getCountByEmail(String email) {
        return jdbcTemplate.queryForObject(SQL_COUNT_BY_EMAIL, new Object[]{email}, Integer.class);
    }

    @Override
    public User findById(Integer userId) {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{userId}, userRowMapper);
    }

    @Override
    public User updateUserDetails(Integer userId, String firstName, String lastName, String aboutMe) {
        try{
            jdbcTemplate.update(SQL_UPDATE, new Object[]{firstName, lastName, aboutMe, userId});
            return findById(userId);
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    private RowMapper<User> userRowMapper = ((rs, rowNum) -> {
        return new User(rs.getInt("USER_ID"),
                rs.getString("FIRST_NAME"),
                rs.getString("LAST_NAME"),
                rs.getString("EMAIL"),
                rs.getString("PASSWORD"),
                rs.getBoolean("IS_ADMIN"),
                rs.getLong("DATE_JOINED"),
                rs.getString("ABOUT_ME"));
    });
}
