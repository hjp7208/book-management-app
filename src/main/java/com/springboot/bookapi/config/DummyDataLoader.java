package com.springboot.bookapi.config;

import com.springboot.bookapi.entity.Book;
import com.springboot.bookapi.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DummyDataLoader {

    @Bean
    public CommandLineRunner loadData(BookRepository bookRepository) {
        return args -> {
            // DB가 비어있을 때만 더미 데이터 삽입 (혹시 모를 중복 방지)
            if (bookRepository.count() == 0) {
                List<Book> dummyBooks = Arrays.asList(
                        Book.builder()
                                .title("스프링 부트 3 백엔드 개발자 되기")
                                .author("신선영")
                                .price(28000)
                                .available(true)
                                .build(),
                        Book.builder()
                                .title("자바 ORM 표준 JPA 프로그래밍")
                                .author("김영한")
                                .price(43000)
                                .available(false) // 대출 중 상태 테스트용
                                .build(),
                        Book.builder()
                                .title("클린 코드 (Clean Code)")
                                .author("로버트 C. 마틴")
                                .price(33000)
                                .available(true)
                                .build(),
                        Book.builder()
                                .title("모던 자바 인 액션")
                                .author("라울-가브리엘 우르마")
                                .price(35000)
                                .available(true)
                                .build(),
                        Book.builder()
                                .title("리팩터링 2판")
                                .author("마틴 파울러")
                                .price(35000)
                                .available(false) // 대출 중 상태 테스트용
                                .build()
                );

                bookRepository.saveAll(dummyBooks);
                System.out.println("✅ [System] 더미 도서 데이터 5건이 성공적으로 삽입되었습니다!");
            }
        };
    }
}