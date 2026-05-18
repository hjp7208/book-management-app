# 풀스택 도서관리 앱 과제

## ⚠️ 버전 안내

| 구분 | 적용 버전       | 사유 |
|------|-------------|------|
| Spring Boot | **3.5.14**  | 3.5.14는 버전만 교체 가능 (build.gradle 1줄) |
| Next.js | **latest** |
| Java | **17**      | Spring Boot 3.x 필수 요구사항 |

### Spring Boot 버전 변경 방법
```groovy
// backend/build.gradle
id 'org.springframework.boot' version '3.5.14'  // 버전만 교체
```

---

## 🗂 프로젝트 구조

```
book-management-app/
book-management-api/ - Java 17
├── src/main/java/com/yourname/bookapi/
│ ├── BookApiApplication.java
│ ├── config/
│ │ └── CorsConfig ← WebMvcConfigurer에 addCorsMappings()으로 http://localhost:3000 허용
│ │ └── DummyDataLoader ← H2 인메모리방식 DB 생성 시 더미 데이터 생성
│ ├── controller/
│ │ └── BookController.java ← REST API 엔드포인트
│ ├── service/
│ │ └── BookService.java ← 확장성을 위한 별도의 인터페이스
│ │ └── BookServiceImpl.java ← 비즈니스 로직 구현체
│ ├── repository/
│ │ └── BookRepository.java ← JpaRepository 상속
│ └── entity/
│ └── Book.java ← JPA Entity
└── src/main/resources/
└── application.yml ← H2 설정, 포트: 8080
book-management-front/
├── src/app/
│ ├── layout.tsx ← 공통 헤더·푸터
│ ├── page.tsx ← 도서 목록 (메인)
│ ├── books/
│ │ └── [id]/
│ │   └── delete.tsx ← 도서 상세 내 삭제 버튼
│ │   └── page.tsx ← 도서 상세 (동적 경로)
│ │   └── edit/
│ │     └── EditBookForm.tsx ← 도서 수정 형식 및 메소드
│ │     └── page.tsx ← 도서 정보 수정 페이지
│ ├── register/
│ └── page.tsx ← 도서 등록 폼
├── components/
│ ├── BookCard.tsx ← 재사용 카드 컴포넌트
│ └── BookForm.tsx ← 등록 폼 (Client Component)
└── libs/
└── actions.ts ← Server Actions (선택)
```

---

## 🚀 로컬 실행 방법

### 2. 백엔드 실행 (Spring Boot)
```bash
cd backend

# 테스트 (MySQL 없이 H2로 실행)
./gradlew test
or
run IDE

### 3. 프론트엔드 실행 (Next.js)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

---

## 🔌 REST API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/books | 전체 조회 |
| GET | /api/books/{id} | 단건 조회 |
| POST | /api/books | 생성 |
| PUT | /api/books/{id} | 수정 |
| DELETE | /api/books/{id} | 삭제 |

---

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/books
```
