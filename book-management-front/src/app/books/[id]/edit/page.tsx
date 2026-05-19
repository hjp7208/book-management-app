import { notFound } from 'next/navigation';
import EditBookForm from './EditBookForm';

interface Book {
    id: number;
    title: string;
    author: string;
    price: number | null;
    available: boolean;
}

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    // 1. 서버 컴포넌트(RSC) 영역에서 백엔드 데이터 가져옴.
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${resolvedParams.id}`, { cache: 'no-store' });

    if (!res.ok) return notFound();

    const book: Book = await res.json();

    return (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-6">✏️ 도서 정보 수정</h2>
            {/* 2. 가져온 데이터를 하위 클라이언트 폼 컴포넌트에 넘겨줍니다 */}
            <EditBookForm book={book} />
        </div>
    );
}