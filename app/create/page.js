"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
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
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold mb-8">
            Create a New Blog Post
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded text-lg"
            />
            <div className="flex mb-4">
              <button
                type="button"
                onClick={() =>
                  setPreview(!preview)
                }
                className="px-4 py-2 bg-gray-200 rounded mr-2"
              >
                {preview ? "Edit" : "Preview"}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Create Blog
              </button>
            </div>
            {preview ? (
              <div className="border rounded p-4">
                <ReactMarkdown className="prose lg:prose-xl">
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="Content (Markdown supported)"
                className="w-full p-2 mb-4 border rounded h-96 font-mono"
              />
            )}
          </form>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
