package com.bookhaven.api.resources;

import com.bookhaven.api.domain.Book;
import com.bookhaven.api.domain.BookReview;
import com.bookhaven.api.services.BookService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookResource {

    private final BookService bookService;

    public BookResource(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("")
    public ResponseEntity<List<Book>> getAllBooks(@RequestParam(value = "title", required = false) String bookTitle,
                                                  @RequestParam(value = "startYear", required = false) Long yearStart,
                                                  @RequestParam(value = "endYear", required = false) Long yearEnd,
                                                  @RequestParam(value = "genre", required = false) String genre,
                                                  @RequestParam(value = "num_records", required = false, defaultValue = "20") Integer numRecords){
        List<Book> books = bookService.fetchAllBooks(bookTitle, yearStart, yearEnd, genre, numRecords);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable("bookId") Integer bookId){
        Book book = bookService.fetchBookById(bookId);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Book> addBook(@RequestBody Map<String, Object> bookMap){
        String title = (String) bookMap.get("title");
        String subtitle = null;
        if (bookMap.containsKey("subtitle")){
            subtitle = (String) bookMap.get("subtitle");
        }
        String authors = (String) bookMap.get("authors");
        String genre = (String) bookMap.get("genre");
        String description = (String) bookMap.get("description");
        Integer publishedYear = (Integer) bookMap.get("publishedYear");
        Integer numPages = (Integer) bookMap.get("numPages");
        String imageUrl = (String) bookMap.get("imageUrl");
        Double averageRating = (Double) bookMap.get("averageRating");
        Integer ratingsCount = (Integer) bookMap.get("ratingsCount");
        Book book = bookService.addBook(title, subtitle, authors, genre, description, Long.valueOf(publishedYear), numPages, imageUrl, averageRating, Long.valueOf(ratingsCount));
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Map<String, Boolean>> updateBook(@PathVariable("bookId") Integer bookId,
                                                           @RequestBody Book book) {
        bookService.updateBook(bookId, book);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/{bookId}/reviews")
    public ResponseEntity<List<BookReview>> getAllBookReviews(@PathVariable("bookId") Integer bookId){
        List<BookReview> bookReviews = bookService.fetchBookReviews(bookId);
        return new ResponseEntity<>(bookReviews, HttpStatus.OK);
    }

    @GetMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<BookReview> getBookReviewById(@PathVariable("reviewId") Long reviewId){
        BookReview bookReview = bookService.fetchBookReviewById(reviewId);
        return new ResponseEntity<>(bookReview, HttpStatus.OK);
    }

    @PostMapping("/{bookId}/reviews")
    public ResponseEntity<BookReview> addBookReview(HttpServletRequest request,
                                                    @PathVariable("bookId") Integer bookId,
                                                    @RequestBody Map<String, Object> reviewMap){
        int userId = (Integer) request.getAttribute("userId");
        Integer rating = (Integer) reviewMap.get("rating");
        String reviewText = (String) reviewMap.get("reviewText");
        BookReview createdReview = bookService.createBookReview(userId, bookId, Double.valueOf(rating), reviewText);

        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    @PutMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<Map<String, Boolean>> updateBookReview(HttpServletRequest request,
                                                                 @PathVariable("bookId") Integer bookId,
                                                                 @PathVariable("reviewId") Long reviewId,
                                                                 @RequestBody Map<String, Object> reviewMap){
        int userId = (Integer) request.getAttribute("userId");
        Double rating = (Double) reviewMap.get("rating");
        String reviewText = (String) reviewMap.get("reviewText");

        bookService.updateBookReview(userId, bookId, reviewId, rating, reviewText);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/{bookId}/reviews/{reviewId}")
    public ResponseEntity<Map<String, Boolean>> deleteBookReview(HttpServletRequest request,
                                                                 @PathVariable("bookId") Integer bookId,
                                                                 @PathVariable("reviewId") Long reviewId){
        int userId = (Integer) request.getAttribute("userId");
        bookService.deleteBookReview(userId, bookId, reviewId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
