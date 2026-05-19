'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBook } from '@/libs/actions';

export default function DeleteButton({ id }: { id: string | number }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        // 실수로 누르는 것을 방지하기 위해 한 번 물어봅니다.
        if (confirm('정말로 이 도서를 삭제하시겠습니까?')) {
            startTransition(async () => {
                try {
                    // id를 숫자로 변환해서 넘겨줍니다 (백엔드 타입에 맞게)
                    await deleteBook(Number(id));
                    alert('삭제 성공.');
                    router.push('/'); // 삭제 후 메인 목록으로 튕겨냅니다.
                } catch (error) {
                    console.error(error);
                    alert('삭제 중 오류가 발생.');
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