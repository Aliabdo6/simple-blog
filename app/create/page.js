"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "/api/blogs/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );
    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <SignedIn>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-8"
        >
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Title"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Content (Markdown supported)"
            className="w-full p-2 mb-4 border rounded h-64"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Create Blog
          </button>
        </form>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
