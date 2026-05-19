import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${resolvedParams.id}`, { cache: 'no-store' });

    if (!res.ok) return notFound();

    const book = await res.json();

    return (
        <div className="max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
            <div className="space-y-3 text-lg mb-8">
                <p><span className="text-gray-500 dark:text-gray-400">작가:</span> {book.author}</p>
                <p><span className="text-gray-500 dark:text-gray-400">가격:</span> {book.price ? `${book.price.toLocaleString()}원` : '미정'}</p>
                <p><span className="text-gray-500 dark:text-gray-400">상태:</span> {book.available ? '✅ 대출 가능' : '❌ 대출 중'}</p>
            </div>

            <div className="flex gap-4">
                <Link
                    href={`/books/${book.id}/edit`}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md cursor-pointer transition-colors"
                >
                    수정
                </Link>
                <DeleteButton id={book.id} />
            </div>
        </div>
    );
}
