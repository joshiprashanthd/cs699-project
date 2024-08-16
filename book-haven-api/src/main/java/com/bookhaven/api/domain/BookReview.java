package com.bookhaven.api.domain;

public class BookReview {
    private Long bookReviewId;
    private Integer bookId;
    private Integer userId;
    private Double rating;
    private String reviewText;
    private Long reviewDatetime;

    public BookReview(Long bookReviewId, Integer bookId, Integer userId, Double rating, String reviewText, Long reviewDatetime) {
        this.bookReviewId = bookReviewId;
        this.bookId = bookId;
        this.userId = userId;
        this.rating = rating;
        this.reviewText = reviewText;
        this.reviewDatetime = reviewDatetime;
    }

    public Long getBookReviewId() {
        return bookReviewId;
    }

    public void setBookReviewId(Long bookReviewId) {
        this.bookReviewId = bookReviewId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Long getReviewDatetime() {
        return reviewDatetime;
    }

    public void setReviewDatetime(Long reviewDatetime) {
        this.reviewDatetime = reviewDatetime;
    }
}
