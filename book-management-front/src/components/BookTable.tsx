'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toggleBookAvailability } from '@/libs/actions';
import { useToast } from './ToastProvider';

export default function BookTable({ books }: { books: any[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();
    const [isPending, startTransition] = useTransition();

    const [searchType, setSearchType] = useState(searchParams.get('type') || 'title');
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/?type=${searchType}&keyword=${keyword}`);
        } else {
            router.push('/');
        }
    };

    const handleToggle = (book: any) => {
        startTransition(async () => {
            try {
                await toggleBookAvailability(book.id, book);
                showToast('대출 상태가 변경되었습니다.');
            } catch (e) {
                showToast('상태 변경에 실패했습니다.', 'error');
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* 검색 영역 */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                >
                    <option value="title">제목</option>
                    <option value="author">작가</option>
                </select>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="flex-1 p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                />
                {/* Hover 강도 3단계 약하게(bg-blue-600 -> hover:bg-blue-500) */}
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md cursor-pointer transition-colors">
                    검색
                </button>
            </form>

            {/* 테이블 영역 */}
            <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700 border-b dark:border-slate-600">
                        <th className="p-4">ID</th>
                        <th className="p-4">제목</th>
                        <th className="p-4">작가</th>
                        <th className="p-4">대출 가능</th>
                        <th className="p-4">상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center text-gray-500">데이터가 없습니다.</td></tr>
                    ) : (
                        books.map((book) => (
                            <tr key={book.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-4">{book.id}</td>
                                <td className="p-4 font-semibold">{book.title}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{book.author}</td>
                                <td className="p-4">
                                    {/* 토글 스위치 */}
                                    <button
                                        onClick={() => handleToggle(book)}
                                        disabled={isPending}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${book.available ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${book.available ? 'translate-x-6' : ''}`} />
                                    </button>
                                </td>
                                <td className="p-4">
                                    <Link href={`/books/${book.id}`} className="text-blue-500 hover:text-blue-400 underline cursor-pointer">
                                        보기
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}