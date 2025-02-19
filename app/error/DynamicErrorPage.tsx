'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('An unexpected error occurred.');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setErrorMessage(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1B1C28] text-gray-100 px-6">
      <h1 className="text-4xl font-extrabold text-red-500">Oops! Something went wrong.</h1>
      <p className="mt-4 text-lg text-gray-300">{errorMessage}</p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-[#4B5C99] hover:bg-[#5C6DAA] text-white px-6 py-3 rounded-lg shadow-md font-semibold transition duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
}
