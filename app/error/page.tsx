'use client';

import { Suspense } from 'react';
import DynamicErrorPage from './DynamicErrorPage';

export default function ErrorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicErrorPage />
    </Suspense>
  );
}
