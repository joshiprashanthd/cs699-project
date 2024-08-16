package com.bookhaven.api.repositories;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.BookReview;
import com.bookhaven.api.domain.UserBookDetails;
import com.bookhaven.api.exceptions.BhBadRequestException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepositoryImpl implements BookRepository{

    private static final String SQL_FIND_ALL = "SELECT BOOK_ID, TITLE, SUBTITLE, GENRE, AUTHORS, DESCRIPTION, PUBLISHED_YEAR, NUM_PAGES, IMAGE_URL, AVERAGE_RATING, RATINGS_COUNT" +
            " FROM BH_BOOKS";
    private static final String SQL_FIND_BY_ID = "SELECT BOOK_ID, TITLE, SUBTITLE, GENRE, AUTHORS, DESCRIPTION, PUBLISHED_YEAR, NUM_PAGES, IMAGE_URL, AVERAGE_RATING, RATINGS_COUNT" +
            " FROM BH_BOOKS WHERE BOOK_ID = ?";
    private static final String SQL_CREATE = "INSERT INTO BH_BOOKS (BOOK_ID, TITLE, SUBTITLE, AUTHORS, GENRE, DESCRIPTION, PUBLISHED_YEAR, NUM_PAGES, " +
            "IMAGE_URL, AVERAGE_RATING, RATINGS_COUNT) VALUES(NEXTVAL('BH_BOOKS_SEQ'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE = "UPDATE BH_BOOKS SET TITLE = ?, SUBTITLE = ?, AUTHORS = ?, GENRE = ?, DESCRIPTION = ?, PUBLISHED_YEAR = ?, NUM_PAGES = ?, AVERAGE_RATING = ?, RATINGS_COUNT = ?" +
            ", IMAGE_URL = ? WHERE BOOK_ID = ?";

    private static final String SQL_BOOK_LIBRARY_ADD = "INSERT INTO BH_USER_LIBRARIES (USER_LIBRARY_ID, USER_ID, BOOK_ID, HAS_READ, BOOKMARKED) " +
            "VALUES(NEXTVAL('BH_USER_LIBRARIES_SEQ'), ?, ?, ?, ?)";

    private static final String SQL_FIND_ALL_USER_LIBRARY_BOOKS = "SELECT BOOK_ID, HAS_READ, BOOKMARKED FROM BH_USER_LIBRARIES WHERE USER_ID = ?";

    private static final String SQL_USER_LIBRARY_BOOK_FIND_BY_ID = "SELECT BOOK_ID, HAS_READ, BOOKMARKED FROM BH_USER_LIBRARIES WHERE USER_ID = ? AND BOOK_ID = ?";

    private static final String SQL_UPDATE_USER_LIBRARY_BOOK_DETAIL = "UPDATE BH_USER_LIBRARIES SET HAS_READ = ?, BOOKMARKED = ? WHERE USER_ID = ? AND BOOK_ID = ?";

    private static final String SQL_DELETE_USER_LIBRARY_BOOK = "DELETE FROM BH_USER_LIBRARIES WHERE USER_ID = ? AND BOOK_ID = ?";

    private static final String SQL_FIND_ALL_BOOK_REVIEWS = "SELECT BOOK_REVIEW_ID, BOOK_ID, USER_ID, RATING, REVIEW_TEXT, REVIEW_DATETIME FROM BH_BOOK_REVIEWS WHERE BOOK_ID = ?";

    private static final String SQL_FIND_BY_ID_BOOK_REVIEW = "SELECT BOOK_REVIEW_ID, BOOK_ID, USER_ID, RATING, REVIEW_TEXT, REVIEW_DATETIME FROM BH_BOOK_REVIEWS WHERE BOOK_REVIEW_ID = ?";

    private static final String SQL_CREATE_BOOK_REVIEW = "INSERT INTO BH_BOOK_REVIEWS(BOOK_REVIEW_ID, BOOK_ID, USER_ID, RATING, REVIEW_TEXT, REVIEW_DATETIME)" +
            " VALUES(NEXTVAL('BH_BOOK_REVIEWS_SEQ'), ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE_BOOK_REVIEW = "UPDATE BH_BOOK_REVIEWS SET RATING = ?, REVIEW_TEXT = ? WHERE BOOK_REVIEW_ID = ?";

    private static final String SQL_DELETE_BOOK_REVIEW = "DELETE FROM BH_BOOK_REVIEWS WHERE BOOK_REVIEW_ID = ?";

    final
    JdbcTemplate jdbcTemplate;

    public BookRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Book> findAll(String title, Long startYear, Long endYear, String genre, Integer numRecords) throws BhResourceNotFoundException {
        List<String> conditions = new ArrayList<>();
        List<Object> params = new ArrayList<>();
        if(title != null){
            conditions.add("TITLE ILIKE ?");
            params.add("%" + title + "%");
        }
        if(genre != null) {
            conditions.add("GENRE ILIKE ?");
            params.add("%" + genre + "%");
        }
        if(startYear != null){
            conditions.add("PUBLISHED_YEAR >= ?");
            params.add(startYear);
        }
        if(endYear != null) {
            conditions.add("PUBLISHED_YEAR <= ?");
            params.add(endYear);
        }
        String modifiedSQL = SQL_FIND_ALL;
        if(!conditions.isEmpty()) {
            modifiedSQL = SQL_FIND_ALL + " WHERE " + String.join(" AND ", conditions);
        }

        modifiedSQL += " ORDER BY AVERAGE_RATING DESC LIMIT " + numRecords;
        return jdbcTemplate.query(modifiedSQL, bookRowMapper, params.toArray());
    }

    @Override
    public Book findById(Integer bookId) throws BhResourceNotFoundException {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ID, new Object[]{bookId}, bookRowMapper);
        }catch (Exception e){
            throw new BhResourceNotFoundException("Book not found");
        }
    }

    @Override
    public Integer create(String title, String subtitle, String authors, String genre, String description, Long publishedYear, Integer numPages, String imageUrl, Double averageRating, Long ratingsCount) throws BhBadRequestException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, title);
                ps.setString(2, subtitle);
                ps.setString(3, authors);
                ps.setString(4, genre);
                ps.setString(5, description);
                ps.setLong(6, publishedYear);
                ps.setInt(7, numPages);
                ps.setString(8, imageUrl);
                ps.setDouble(9, Math.round(averageRating));
                ps.setLong(10, ratingsCount);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("BOOK_ID");
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public void update(Integer bookId, Book book) throws BhBadRequestException {
        try{
            jdbcTemplate.update(SQL_UPDATE, new Object[]{book.getTitle(), book.getSubtitle(), book.getAuthors(), book.getGenre(), book.getDescription(), book.getPublishedYear(), book.getAverageRating(), book.getRatingsCount(), book.getImageUrl(), bookId});
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public List<UserBookDetails> findAllUserLibraryBooks(Integer userId) {
        return jdbcTemplate.query(SQL_FIND_ALL_USER_LIBRARY_BOOKS, new Object[]{userId}, userLibraryBookDetailsRowMapper);
    }

    @Override
    public UserBookDetails findUserLibraryBookById(Integer userId, Integer bookId) throws BhResourceNotFoundException {
        try{
            return jdbcTemplate.queryForObject(SQL_USER_LIBRARY_BOOK_FIND_BY_ID, new Object[]{userId, bookId}, userLibraryBookDetailsRowMapper);
        }catch (Exception e){
            throw new BhResourceNotFoundException("Book not found in Library");
        }
    }

    @Override
    public void addBookToUserLibrary(Integer userId, Integer bookId) throws BhBadRequestException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_BOOK_LIBRARY_ADD, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, userId);
                ps.setInt(2, bookId);
                ps.setBoolean(3, false);
                ps.setBoolean(4, false);
                return ps;
            }, keyHolder);
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public void updateBookDetailsInUserLibrary(Integer userId, Integer bookId, Boolean hasRead, Boolean bookmarked) throws BhBadRequestException {
        try{
            jdbcTemplate.update(SQL_UPDATE_USER_LIBRARY_BOOK_DETAIL, new Object[]{hasRead, bookmarked, userId, bookId});
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public void removeBookFromUserLibrary(Integer userId, Integer bookId) {
        jdbcTemplate.update(SQL_DELETE_USER_LIBRARY_BOOK, new Object[]{userId, bookId});
    }

    @Override
    public List<BookReview> findAllBookReviews(Integer bookId) {
        return jdbcTemplate.query(SQL_FIND_ALL_BOOK_REVIEWS, bookReviewRowMapper, new Object[]{bookId});
    }

    @Override
    public BookReview findReviewById(Long reviewId) throws BhResourceNotFoundException {
        return jdbcTemplate.queryForObject(SQL_FIND_BY_ID_BOOK_REVIEW, bookReviewRowMapper, new Object[]{reviewId});
    }

    @Override
    public Long createBookReview(Integer userId, Integer bookId, Double rating, String reviewText) throws BhBadRequestException{
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE_BOOK_REVIEW, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, bookId);
                ps.setInt(2, userId);
                ps.setDouble(3, Math.round(rating));
                ps.setString(4, reviewText);
                ps.setLong(5, Instant.now().toEpochMilli());
                return ps;
            }, keyHolder);
            return (Long) keyHolder.getKeys().get("BOOK_REVIEW_ID");
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public void updateBookReview(Long reviewId, Double rating, String reviewText) throws BhBadRequestException{
        try{
            jdbcTemplate.update(SQL_UPDATE_BOOK_REVIEW, new Object[]{rating, reviewText, reviewId});
        }catch (Exception e){
            throw new BhBadRequestException("Invalid request");
        }
    }

    @Override
    public void deleteBookReview(Long reviewId) throws BhBadRequestException{
        jdbcTemplate.update(SQL_DELETE_BOOK_REVIEW, new Object[]{reviewId});
    }

    private RowMapper<Book> bookRowMapper = ((rs, rowNum) -> {
        return new Book(
                rs.getInt("BOOK_ID"),
                rs.getString("TITLE"),
                rs.getString("SUBTITLE"),
                rs.getString("GENRE"),
                rs.getString("AUTHORS"),
                rs.getString("DESCRIPTION"),
                rs.getLong("PUBLISHED_YEAR"),
                rs.getInt("NUM_PAGES"),
                rs.getString("IMAGE_URL"),
                rs.getDouble("AVERAGE_RATING"),
                rs.getLong("RATINGS_COUNT")
        );
    });

    private RowMapper<UserBookDetails> userLibraryBookDetailsRowMapper = ((rs, rowNum) -> {
        return new UserBookDetails(
                findById(rs.getInt("BOOK_ID")),
                rs.getBoolean("HAS_READ"),
                rs.getBoolean("BOOKMARKED"));
    });

    private RowMapper<BookReview> bookReviewRowMapper = ((rs, rowNum) -> {
        return new BookReview(
                rs.getLong("BOOK_REVIEW_ID"),
                rs.getInt("BOOK_ID"),
                rs.getInt("USER_ID"),
                rs.getDouble("RATING"),
                rs.getString("REVIEW_TEXT"),
                rs.getLong("REVIEW_DATETIME")
        );
    });

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }
}
