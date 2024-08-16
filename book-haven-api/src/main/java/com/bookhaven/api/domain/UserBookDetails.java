package com.bookhaven.api.domain;

public class UserBookDetails {
    private Book book;
    private Boolean hasRead;
    private Boolean bookmarked;

    public UserBookDetails(Book book, Boolean hasRead, Boolean bookmarked) {
        this.book = book;
        this.hasRead = hasRead;
        this.bookmarked = bookmarked;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Boolean getHasRead() {
        return hasRead;
    }

    public void setHasRead(Boolean hasRead) {
        this.hasRead = hasRead;
    }

    public Boolean getBookmarked() {
        return bookmarked;
    }

    public void setBookmarked(Boolean bookmarked) {
        this.bookmarked = bookmarked;
    }
}
