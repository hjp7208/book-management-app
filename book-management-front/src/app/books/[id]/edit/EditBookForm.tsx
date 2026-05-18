'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateBook } from '@/libs/actions';
import { useToast } from '@/components/ToastProvider';

interface Book {
    id: number;
    title: string;
    author: string;
    price: number | null;
    available: boolean;
}

export default function EditBookForm({ book }: { book: Book }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedData = {
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            price: formData.get('price') ? parseInt(formData.get('price') as string) : null,
            available: book.available // 기존 대출 여부 유지
        };

        startTransition(async () => {
            try {
                await updateBook(book.id, updatedData);
                showToast('도서 정보 수정.');
                router.push(`/books/${book.id}`); // 수정 완료 후 상세 페이지로 복귀
            } catch (error) {
                showToast('수정 중 오류 발생.', 'error');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">도서 제목</label>
                <input required name="title" defaultValue={book.title} type="text" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">작가</label>
                <input required name="author" defaultValue={book.author} type="text" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">가격 (원)</label>
                <input name="price" defaultValue={book.price ?? ''} type="number" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" />
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md cursor-pointer disabled:opacity-50 transition-colors"
                >
                    {isPending ? '수정 중...' : '수정 완료'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isPending}
                    className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-3 rounded-md cursor-pointer transition-colors"
                >
                    취소
                </button>
            </div>
        </form>
    );
}