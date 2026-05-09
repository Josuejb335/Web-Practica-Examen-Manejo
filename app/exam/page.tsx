'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExamScreen } from '@/components/exam/ExamScreen';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

function ExamContent() {
  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get('amount') || '20');

  return <ExamScreen amount={amount} />;
}

export default function ExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <LoadingSpinner />
        </div>
      }
    >
      <ExamContent />
    </Suspense>
  );
}
