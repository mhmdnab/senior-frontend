"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AddProductClient() {
  const [mounted, setMounted] = useState(false);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const router = useRouter();

  // only run cookie / router logic on the client, after mount
  useEffect(() => {
    setMounted(true);
    const token = Cookies.get("token");
    if (!token) return router.push("/login");
    // decode token, setOwnerId, fetch anything else…
    // setOwnerId(decoded.id);
  }, [router]);

  // while we’re still hydrating, render nothing (or a loading state)
  if (!mounted) return null;

  // once hydrated, show your form
  return <form>{/* …your form fields, file inputs, submit button… */}</form>;
}
