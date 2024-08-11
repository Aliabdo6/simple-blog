"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { useUser } from "@clerk/nextjs";

const BlogPost = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] =
    useState(false);
  const [editedTitle, setEditedTitle] =
    useState("");
  const [editedContent, setEditedContent] =
    useState("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(
        `/api/blogs/${params.id}`
      );
      const data = await response.json();
      setBlog(data);
      setEditedTitle(data.title);
      setEditedContent(data.content);
    };
    fetchBlog();
  }, [params.id]);

  const handleEdit = async () => {
    const response = await fetch(
      `/api/blogs/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      }
    );
    if (response.ok) {
      setIsEditing(false);
      setBlog({
        ...blog,
        title: editedTitle,
        content: editedContent,
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) =>
                setEditedTitle(e.target.value)
              }
              className="text-4xl font-bold mb-4 w-full p-2 border rounded"
            />
          ) : (
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {blog.title}
            </h1>
          )}
          <div className="flex items-center justify-between text-gray-600 mb-8">
            <div>
              <p className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">
                  {blog.authorName || "Anonymous"}
                </span>
              </p>
              <p className="text-sm">
                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
            {user &&
              user.id === blog.authorId && (
                <button
                  onClick={() =>
                    setIsEditing(!isEditing)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              )}
          </div>
          {isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) =>
                  setEditedContent(e.target.value)
                }
                className="w-full p-2 border rounded mb-4 h-64"
              />
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
            </>
          ) : (
            <ReactMarkdown
              className="prose lg:prose-xl max-w-none"
              rehypePlugins={[rehypeRaw]}
              components={{
                code({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }) {
                  const match =
                    /language-(\w+)/.exec(
                      className || ""
                    );
                  return !inline && match ? (
                    <div className="relative">
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md"
                        {...props}
                      >
                        {String(children).replace(
                          /\n$/,
                          ""
                        )}
                      </SyntaxHighlighter>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            String(children)
                          )
                        }
                        className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded text-sm hover:bg-gray-200 transition duration-300"
                      >
                        Copy
                      </button>
                    </div>
                  ) : (
                    <code
                      className={className}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.content}
            </ReactMarkdown>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import { useUser } from "@clerk/nextjs";

// const BlogPost = ({ params }) => {
//   const [blog, setBlog] = useState(null);
//   const [isEditing, setIsEditing] =
//     useState(false);
//   const [editedTitle, setEditedTitle] =
//     useState("");
//   const [editedContent, setEditedContent] =
//     useState("");
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const response = await fetch(
//         `/api/blogs/${params.id}`
//       );
//       const data = await response.json();
//       setBlog(data);
//       setEditedTitle(data.title);
//       setEditedContent(data.content);
//     };
//     fetchBlog();
//   }, [params.id]);

//   const handleEdit = async () => {
//     const response = await fetch(
//       `/api/blogs/${params.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: editedTitle,
//           content: editedContent,
//         }),
//       }
//     );
//     if (response.ok) {
//       setIsEditing(false);
//       setBlog({
//         ...blog,
//         title: editedTitle,
//         content: editedContent,
//       });
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Code copied to clipboard!");
//   };

//   if (!blog) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-12 px-4">
//       <article className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8">
//           {isEditing ? (
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) =>
//                 setEditedTitle(e.target.value)
//               }
//               className="text-4xl font-bold mb-4 w-full p-2 border rounded"
//             />
//           ) : (
//             <h1 className="text-4xl font-bold mb-4 text-gray-800">
//               {blog.title}
//             </h1>
//           )}
//           <div className="flex items-center justify-between text-gray-600 mb-8">
//             <span>
//               {new Date(
//                 blog.createdAt
//               ).toLocaleDateString()}{" "}
//               • By{" "}
//               {blog.authorName || "Anonymous"}
//             </span>
//             {user &&
//               user.id === blog.authorId && (
//                 <button
//                   onClick={() =>
//                     setIsEditing(!isEditing)
//                   }
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//                 >
//                   {isEditing ? "Cancel" : "Edit"}
//                 </button>
//               )}
//           </div>
//           {isEditing ? (
//             <>
//               <textarea
//                 value={editedContent}
//                 onChange={(e) =>
//                   setEditedContent(e.target.value)
//                 }
//                 className="w-full p-2 border rounded mb-4 h-64"
//               />
//               <button
//                 onClick={handleEdit}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
//               >
//                 Save Changes
//               </button>
//             </>
//           ) : (
//             <ReactMarkdown
//               className="prose lg:prose-xl max-w-none"
//               rehypePlugins={[rehypeRaw]}
//               components={{
//                 code({
//                   node,
//                   inline,
//                   className,
//                   children,
//                   ...props
//                 }) {
//                   const match =
//                     /language-(\w+)/.exec(
//                       className || ""
//                     );
//                   return !inline && match ? (
//                     <div className="relative">
//                       <SyntaxHighlighter
//                         style={atomDark}
//                         language={match[1]}
//                         PreTag="div"
//                         className="rounded-md"
//                         {...props}
//                       >
//                         {String(children).replace(
//                           /\n$/,
//                           ""
//                         )}
//                       </SyntaxHighlighter>
//                       <button
//                         onClick={() =>
//                           copyToClipboard(
//                             String(children)
//                           )
//                         }
//                         className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded text-sm hover:bg-gray-200 transition duration-300"
//                       >
//                         Copy
//                       </button>
//                     </div>
//                   ) : (
//                     <code
//                       className={className}
//                       {...props}
//                     >
//                       {children}
//                     </code>
//                   );
//                 },
//               }}
//             >
//               {blog.content}
//             </ReactMarkdown>
//           )}
//         </div>
//       </article>
//     </div>
//   );
// };

// export default BlogPost;

// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export default async function BlogPost({
//   params,
// }) {
//   await connectToDatabase();
//   const blog = await Blog.findById(params.id);

//   return (
//     <div className="max-w-4xl mx-auto mt-12 px-4 py-6 ">
//       <article className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8">
//           <h1 className="text-4xl font-bold mb-4 text-gray-800">
//             {blog.title}
//           </h1>
//           <div className="flex items-center text-gray-600 mb-8">
//             <span className="mr-4">
//               {new Date(
//                 blog.createdAt
//               ).toLocaleDateString()}
//             </span>
//             <span>
//               By {blog.authorName || "Anonymous"}
//             </span>
//           </div>
//           <ReactMarkdown
//             className="prose lg:prose-xl max-w-none"
//             rehypePlugins={[rehypeRaw]}
//             components={{
//               code({
//                 node,
//                 inline,
//                 className,
//                 children,
//                 ...props
//               }) {
//                 const match =
//                   /language-(\w+)/.exec(
//                     className || ""
//                   );
//                 return !inline && match ? (
//                   <SyntaxHighlighter
//                     style={atomDark}
//                     language={match[1]}
//                     PreTag="div"
//                     className="rounded-md"
//                     {...props}
//                   >
//                     {String(children).replace(
//                       /\n$/,
//                       ""
//                     )}
//                   </SyntaxHighlighter>
//                 ) : (
//                   <code
//                     className={className}
//                     {...props}
//                   >
//                     {children}
//                   </code>
//                 );
//               },
//             }}
//           >
//             {blog.content}
//           </ReactMarkdown>
//         </div>
//       </article>
//     </div>
//   );
// }

// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export default async function BlogPost({
//   params,
// }) {
//   await connectToDatabase();
//   const blog = await Blog.findById(params.id);

//   return (
//     <div className="max-w-3xl mx-auto mt-8 px-4">
//       <h1 className="text-4xl font-bold mb-4">
//         {blog.title}
//       </h1>
//       <p className="text-gray-600 mb-8">
//         {new Date(
//           blog.createdAt
//         ).toLocaleDateString()}
//       </p>
//       <ReactMarkdown
//         className="prose lg:prose-xl"
//         rehypePlugins={[rehypeRaw]}
//         components={{
//           code({
//             node,
//             inline,
//             className,
//             children,
//             ...props
//           }) {
//             const match = /language-(\w+)/.exec(
//               className || ""
//             );
//             return !inline && match ? (
//               <SyntaxHighlighter
//                 style={atomDark}
//                 language={match[1]}
//                 PreTag="div"
//                 {...props}
//               >
//                 {String(children).replace(
//                   /\n$/,
//                   ""
//                 )}
//               </SyntaxHighlighter>
//             ) : (
//               <code
//                 className={className}
//                 {...props}
//               >
//                 {children}
//               </code>
//             );
//           },
//         }}
//       >
//         {blog.content}
//       </ReactMarkdown>
//     </div>
//   );
// }

// import ReactMarkdown from "react-markdown";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export default async function BlogPost({
//   params,
// }) {
//   await connectToDatabase();
//   const blog = await Blog.findById(params.id);

//   return (
//     <div className="max-w-2xl mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">
//         {blog.title}
//       </h1>
//       <p className="text-gray-600 mb-4">
//         {new Date(
//           blog.createdAt
//         ).toLocaleDateString()}
//       </p>
//       <ReactMarkdown className="prose">
//         {blog.content}
//       </ReactMarkdown>
//     </div>
//   );
// }
