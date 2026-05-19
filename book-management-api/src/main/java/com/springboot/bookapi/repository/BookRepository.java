package com.springboot.bookapi.repository;

import com.springboot.bookapi.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // 1. 책 작가 이름으로 검색 (ID 오름차순)
    List<Book> findByAuthorOrderByIdAsc(String author);

    // 2. 제목 키워드 포함 검색 (ID 오름차순)
    List<Book> findByTitleContainingOrderByIdAsc(String keyword);

    // BookRepository.java
    List<Book> findByDeletedFalse(); // 삭제되지 않은 책만 가져오기
}