'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation'; // 추가
import { deleteBook } from '@/libs/actions';
import { useToast } from '@/components/ToastProvider';

export default function DeleteButton({ id }: { id: number }) {
    const router = useRouter(); // 추가
    const [isPending, startTransition] = useTransition();
    const { showToast } = useToast();

    const handleDelete = () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            startTransition(async () => {
                try {
                    await deleteBook(id);
                    showToast('도서 삭제.');
                    router.push('/'); // 삭제 후 메인으로 이동
                } catch (e) {
                    showToast('삭제 실패.', 'error');
                }
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {isPending ? '삭제 중...' : '삭제'}
        </button>
    );
}