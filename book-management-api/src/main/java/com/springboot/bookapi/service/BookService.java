package com.springboot.bookapi.service;

import com.springboot.bookapi.entity.Book;
import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book createBook(Book book);
    void deleteBook(Long id);
    Book updateBook(Long id, Book bookDetails);
    List<Book> getBooksByAuthor(String author);
    List<Book> searchBooksByKeyword(String keyword);
}