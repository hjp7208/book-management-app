'use server'

import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
const API_URL = `${BASE_URL}/books`;

export async function createBook(formData: FormData) {
    const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        price: formData.get('price') ? parseInt(formData.get('price') as string) : null,
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('도서 등록 실패');

    revalidatePath('/');
    // redirect 제거
}

export async function deleteBook(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
    });
    if (!res.ok) throw new Error('도서 삭제 실패');

    revalidatePath('/');
    // redirect 제거
}

export async function toggleBookAvailability(id: number, currentData: any) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentData, available: !currentData.available }),
    });

    if (!res.ok) throw new Error('상태 변경 실패');
    revalidatePath('/');
    revalidatePath(`/books/${id}`);
}

// 🆕 추가된 도서 수정 액션
export async function updateBook(id: number, data: any) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('도서 수정 실패');

    revalidatePath('/');
    revalidatePath(`/books/${id}`);
}