"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useParams(); // Extract URL parameters

  useEffect(() => {
    if (!params) return;

    const { code, error } = params as { code?: string; error?: string };
    console.log("Auth Code:", code);
    console.log("Auth Error:", error);

    const redirectBase =
      process.env.NEXT_PUBLIC_SITE_URL || "https://acs-next-js.vercel.app";

    if (error) {
      router.replace(`${redirectBase}/login?error=${encodeURIComponent(error)}`);
    } else if (code) {
      router.replace(`${redirectBase}/loading`);
    } else {
      router.replace(`${redirectBase}/error?error=unknown_error`);
    }
  }, [params, router]);

  return <p>Redirecting...</p>;
}
