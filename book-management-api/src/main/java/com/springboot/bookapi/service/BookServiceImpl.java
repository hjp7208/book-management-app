package com.springboot.bookapi.service;

import com.springboot.bookapi.entity.Book;
import com.springboot.bookapi.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    // BookServiceImpl.java 수정
    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAllActive();
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다. ID: " + id));
    }

    @Override
    @Transactional
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    @Transactional // 수정이 없어도 안전을 위해 추가
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없음"));
        book.setDeleted(true);
        bookRepository.save(book); // 명시적으로 저장
    }

    @Override
    @Transactional
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없음"));

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setAvailable(bookDetails.getAvailable());

        return bookRepository.save(book); // 명시적으로 저장
    }

    @Override
    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthorOrderByIdAsc(author);
    }

    @Override
    public List<Book> searchBooksByKeyword(String keyword) {
        return bookRepository.findByTitleContainingOrderByIdAsc(keyword);
    }
}
