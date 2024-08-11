import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

const BlogCard = ({ blog }) => (
  <Link href={`/blog/${blog._id}`}>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-[400px] flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-2 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
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
          {blog.authorName || "Anonymous"}
        </p>
        <p className="text-gray-500 mb-4 text-sm">
          {new Date(
            blog.createdAt
          ).toLocaleDateString()}
        </p>
        <p className="text-gray-700 line-clamp-4">
          {blog.content.substring(0, 150)}...
        </p>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 mt-auto">
        <span className="text-white font-semibold">
          Read More
        </span>
      </div>
    </div>
  </Link>
);

export default async function Home() {
  await connectToDatabase();
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(10);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Welcome to{" "}
        <span className="text-blue-600">My</span>
        <span className="text-purple-600">
          Blog
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

// import Link from "next/link";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// const BlogCard = ({ blog }) => (
//   <Link href={`/blog/${blog._id}`}>
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-[400px] flex flex-col">
//       <div className="p-6 flex-grow">
//         <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">
//           {blog.title}
//         </h2>
//         <p className="text-gray-600 mb-4">
//           {new Date(
//             blog.createdAt
//           ).toLocaleDateString()}{" "}
//           • By {blog.authorName || "Anonymous"}
//         </p>
//         <p className="text-gray-700 line-clamp-4">
//           {blog.content.substring(0, 150)}...
//         </p>
//       </div>
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 mt-auto">
//         <span className="text-white font-semibold">
//           Read More
//         </span>
//       </div>
//     </div>
//   </Link>
// );

// export default async function Home() {
//   await connectToDatabase();
//   const blogs = await Blog.find()
//     .sort({ createdAt: -1 })
//     .limit(10);

//   return (
//     <div className="max-w-6xl mx-auto mt-12 px-4">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
//         Welcome to{" "}
//         <span className="text-blue-600">My</span>
//         <span className="text-purple-600">
//           Blog
//         </span>
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-8">
//         {blogs.map((blog) => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>
//     </div>
//   );
// }
// import Link from "next/link";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export default async function Home() {
//   await connectToDatabase();
//   const blogs = await Blog.find()
//     .sort({ createdAt: -1 })
//     .limit(10);

//   return (
//     <div className="max-w-4xl mx-auto mt-8 px-4">
//       <h1 className="text-4xl font-bold mb-8">
//         Latest Blog Posts
//       </h1>
//       <div className="space-y-8">
//         {blogs.map((blog) => (
//           <Link
//             href={`/blog/${blog._id}`}
//             key={blog._id}
//           >
//             <div className="border p-6 rounded-lg cursor-pointer hover:shadow-lg transition duration-300">
//               <h2 className="text-2xl font-semibold mb-2">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-600 mb-4">
//                 {new Date(
//                   blog.createdAt
//                 ).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700 line-clamp-3">
//                 {blog.content.substring(0, 200)}
//                 ...
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// import Link from "next/link";
// import { connectToDatabase } from "@/lib/mongodb";
// import Blog from "@/models/Blog";

// export default async function Home() {
//   await connectToDatabase();
//   const blogs = await Blog.find()
//     .sort({ createdAt: -1 })
//     .limit(10);

//   return (
//     <div className="max-w-4xl mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">
//         Latest Blog Posts
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {blogs.map((blog) => (
//           <Link
//             href={`/blog/${blog._id}`}
//             key={blog._id}
//           >
//             <div className="border p-4 rounded cursor-pointer hover:shadow-lg">
//               <h2 className="text-xl font-semibold">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-600">
//                 {new Date(
//                   blog.createdAt
//                 ).toLocaleDateString()}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
