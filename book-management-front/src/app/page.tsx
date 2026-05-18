import { Suspense } from 'react';
import BookTable from '@/components/BookTable';


export default async function HomePage({ searchParams }: { searchParams: Promise<{ type?: string; keyword?: string }> }) {
    const resolvedParams = await searchParams;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">📚 도서 목록</h2>
            {/* 로딩 처리를 위한 Suspense와 Skeleton UI 적용 */}
            <Suspense fallback={<TableSkeleton />}>
                <BookDataFetcher searchParams={resolvedParams} />
            </Suspense>
        </div>
    );
}

// 서버 컴포넌트에서 순수 fetch 진행
async function BookDataFetcher({ searchParams }: { searchParams: { type?: string; keyword?: string } }) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}`;

    if (searchParams.keyword) {
        if (searchParams.type === 'author') url += `?author=${searchParams.keyword}`;
        else url += `?keyword=${searchParams.keyword}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch books');
    const books = await res.json();

    return <BookTable books={books} />;
}

// 스켈레톤 UI (animate-pulse)
function TableSkeleton() {
    return (
        <div className="w-full h-64 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
    );
}
