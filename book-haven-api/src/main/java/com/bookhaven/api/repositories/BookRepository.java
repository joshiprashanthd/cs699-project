package com.bookhaven.api.repositories;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.BookReview;
import com.bookhaven.api.domain.UserBookDetails;
import com.bookhaven.api.exceptions.BhBadRequestException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;

import java.util.List;

public interface BookRepository {

    // region Books
    List<Book> findAll(String title, Long startYear, Long endYear, String genre, Integer numRecords) throws BhResourceNotFoundException;

    Book findById(Integer bookId) throws BhResourceNotFoundException;

    Integer create(String title, String subtitle, String authors, String genre,
                   String description, Long publishedYear, Integer numPages, String imageUrl,
                   Double averageRating, Long ratingsCount)
            throws BhBadRequestException;

    void update(Integer bookId, Book book) throws BhBadRequestException;
    // endregion Books

    // region User Library
    List<UserBookDetails> findAllUserLibraryBooks(Integer userId);
    UserBookDetails findUserLibraryBookById(Integer userId, Integer bookId) throws BhResourceNotFoundException;
    void addBookToUserLibrary(Integer userId, Integer bookId) throws BhBadRequestException;
    void updateBookDetailsInUserLibrary(Integer userId, Integer bookId, Boolean hasRead, Boolean bookmarked) throws BhBadRequestException;
    void removeBookFromUserLibrary(Integer userId, Integer bookId);
    // endregion User Library

    // region Book Reviews
    List<BookReview> findAllBookReviews(Integer bookId);
    BookReview findReviewById(Long reviewId) throws BhResourceNotFoundException;
    Long createBookReview(Integer userId, Integer bookId, Double rating, String reviewText) throws BhBadRequestException;
    void updateBookReview(Long reviewId, Double rating, String reviewText) throws BhBadRequestException;
    void deleteBookReview(Long reviewId) throws BhBadRequestException;
    // endregion Book Reviews
}
