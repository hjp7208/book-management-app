import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata = {
  title: '도서 관리 시스템',
  description: 'SpringBoot & Next.js 과제',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ko" className="dark">
      {/* 배경색 다크모드 대응 */}
      <body className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-200">
      <ToastProvider>
        <aside className="w-64 bg-black fixed h-full flex flex-col shadow-xl">
          <div className="p-6 border-b border-gray-800">
            <Link href="/">
              <h1 className="text-2xl font-bold text-lime-400 hover:text-lime-300 transition-colors cursor-pointer">
                도서 관리 시스템
              </h1>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              📚 도서 목록
            </Link>
            <Link href="/register" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              ✍️ 도서 등록
            </Link>
          </nav>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </ToastProvider>
      </body>
      </html>
  );
}