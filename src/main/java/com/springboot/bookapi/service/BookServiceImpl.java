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

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
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
    @Transactional
    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }

    @Override
    @Transactional
    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);

        // 더티 체킹(Dirty Checking)을 통한 변경 감지 수정
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setAvailable(bookDetails.getAvailable());

        return book;
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
