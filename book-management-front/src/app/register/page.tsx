'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/libs/actions';
import { useToast } from '@/components/ToastProvider';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const clientAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await createBook(formData);
        showToast('새 도서 등록.');
        router.push('/');
      } catch (error) {
        showToast('등록 중 오류 발생.', 'error');
      }
    });
  };

  return (
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6">✍️ 신규 도서 등록</h2>

        <form action={clientAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">도서 제목</label>
            <input required name="title" type="text" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" placeholder="제목 입력" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">작가</label>
            <input required name="author" type="text" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" placeholder="작가명 입력" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">가격 (원)</label>
            <input name="price" type="number" className="w-full p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700" placeholder="예: 15000" />
          </div>

          <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 bg-lime-500 hover:bg-lime-400 text-black font-bold py-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? '등록 중...' : '도서 등록'}
          </button>
        </form>
      </div>
  );
}