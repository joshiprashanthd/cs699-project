package com.bookhaven.api.services;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.BookReview;
import com.bookhaven.api.domain.UserBookDetails;
import com.bookhaven.api.exceptions.BhBadRequestException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;

import java.util.List;

public interface BookService {

    // region Books
    List<Book> fetchAllBooks(String title, Long startYear, Long endYear, String genre, Integer numRecords);
    Book fetchBookById(Integer bookId) throws BhResourceNotFoundException;
    Book addBook(String title, String subtitle, String authors, String genre, String description, Long publishedYear, Integer numPages, String imageUrl, Double averageRating, Long ratingsCount) throws BhBadRequestException;
    void updateBook(Integer bookId, Book book) throws BhBadRequestException;
    // endregion Books

    // region User Library
    List<UserBookDetails> fetchUserLibrary(Integer userId);
    UserBookDetails addBookToUserLibrary(Integer userId, Integer bookId) throws BhBadRequestException;
    void updateBookDetailsInUserLibrary(Integer userId, Integer bookId, Boolean hasRead, Boolean bookmarked) throws BhBadRequestException;
    void deleteBookFromUserLibrary(Integer userId, Integer bookId);
    // endregion User Library

    List<BookReview> fetchBookReviews(Integer bookId);
    BookReview fetchBookReviewById(Long reviewId) throws BhResourceNotFoundException;
    BookReview createBookReview(Integer userId, Integer bookId, Double rating, String reviewText) throws BhBadRequestException;
    void updateBookReview(Integer userId, Integer bookId, Long reviewId, Double rating, String reviewText) throws BhBadRequestException;
    void deleteBookReview(Integer userId, Integer bookId, Long reviewId) throws BhBadRequestException;
}
