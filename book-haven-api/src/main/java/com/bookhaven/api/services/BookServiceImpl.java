package com.bookhaven.api.services;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.BookReview;
import com.bookhaven.api.domain.UserBookDetails;
import com.bookhaven.api.exceptions.BhBadRequestException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;
import com.bookhaven.api.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> fetchAllBooks(String title, Long startYear, Long endYear, String genre, Integer numRecords) {
        return bookRepository.findAll(title, startYear, endYear, genre, numRecords);
    }

    @Override
    public Book fetchBookById(Integer bookId) throws BhResourceNotFoundException {
        return bookRepository.findById(bookId);
    }

    @Override
    public Book addBook(String title, String subtitle, String authors, String genre, String description, Long publishedYear, Integer numPages, String imageUrl, Double averageRating, Long ratingsCount) throws BhBadRequestException {
        int bookId = bookRepository.create(title, subtitle, authors, genre, description, publishedYear, numPages, imageUrl, averageRating, ratingsCount);
        return bookRepository.findById(bookId);
    }

    @Override
    public void updateBook(Integer bookId, Book book) throws BhBadRequestException {
        bookRepository.update(bookId, book);
    }

    @Override
    public List<UserBookDetails> fetchUserLibrary(Integer userId) {
        return bookRepository.findAllUserLibraryBooks(userId);
    }

    @Override
    public UserBookDetails addBookToUserLibrary(Integer userId, Integer bookId) throws BhBadRequestException {
        bookRepository.addBookToUserLibrary(userId, bookId);
        return bookRepository.findUserLibraryBookById(userId, bookId);
    }

    @Override
    public void updateBookDetailsInUserLibrary(Integer userId, Integer bookId, Boolean hasRead, Boolean bookmarked) throws BhBadRequestException {
        bookRepository.updateBookDetailsInUserLibrary(userId, bookId, hasRead, bookmarked);
    }

    @Override
    public void deleteBookFromUserLibrary(Integer userId, Integer bookId) {
        bookRepository.removeBookFromUserLibrary(userId, bookId);
    }

    @Override
    public List<BookReview> fetchBookReviews(Integer bookId) {
        return bookRepository.findAllBookReviews(bookId);
    }

    @Override
    public BookReview fetchBookReviewById(Long reviewId) throws BhResourceNotFoundException {
        return bookRepository.findReviewById(reviewId);
    }

    @Override
    public BookReview createBookReview(Integer userId, Integer bookId, Double rating, String reviewText) throws BhBadRequestException {
        Long reviewId = bookRepository.createBookReview(userId, bookId, rating, reviewText);
        return bookRepository.findReviewById(reviewId);
    }

    @Override
    public void updateBookReview(Integer userId, Integer bookId, Long reviewId, Double rating, String reviewText) throws BhBadRequestException {
        BookReview bookReview = bookRepository.findReviewById(reviewId);
        if(!Objects.equals(bookReview.getUserId(), userId) || !Objects.equals(bookReview.getBookId(), bookId)){
            throw new BhBadRequestException("User doesn't have permission to update book review");
        }
        bookRepository.updateBookReview(reviewId, rating, reviewText);
    }

    @Override
    public void deleteBookReview(Integer userId, Integer bookId, Long reviewId) throws BhBadRequestException {
        BookReview bookReview = bookRepository.findReviewById(reviewId);
        if(!Objects.equals(bookReview.getUserId(), userId) || !Objects.equals(bookReview.getBookId(), bookId)){
            throw new BhBadRequestException("User doesn't have permission to delete book review");
        }
        bookRepository.deleteBookReview(reviewId);
    }
}
