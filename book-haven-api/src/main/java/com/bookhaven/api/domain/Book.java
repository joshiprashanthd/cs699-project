package com.bookhaven.api.domain;

import java.util.List;

public class Book {
    private Integer bookId;
    private String title;
    private String subtitle;
    private String genre;
    private String authors;
    private String description;
    private Long publishedYear;
    private Integer numPages;
    private String imageUrl;
    private Double averageRating;
    private Long ratingsCount;

    public Book(
            Integer bookId,
            String title,
            String subtitle,
            String genre,
            String authors,
            String description,
            Long publishedYear,
            Integer numPages,
            String imageUrl,
            Double averageRating,
            Long ratingsCount
    ) {
        this.bookId = bookId;
        this.title = title;
        this.subtitle = subtitle;
        this.genre = genre;
        this.authors = authors;
        this.description = description;
        this.publishedYear = publishedYear;
        this.numPages = numPages;
        this.imageUrl = imageUrl;
        this.averageRating = averageRating;
        this.ratingsCount = ratingsCount;
    }

    public Integer getNumPages() {
        return numPages;
    }

    public void setNumPages(Integer numPages) {
        this.numPages = numPages;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Long publishedYear) {
        this.publishedYear = publishedYear;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Long getRatingsCount() {
        return ratingsCount;
    }

    public void setRatingsCount(Long ratingsCount) {
        this.ratingsCount = ratingsCount;
    }
}
