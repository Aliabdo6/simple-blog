import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function Home() {
  await connectToDatabase();
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(10);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <Link
            href={`/blog/${blog._id}`}
            key={blog._id}
          >
            <div className="border p-4 rounded cursor-pointer hover:shadow-lg">
              <h2 className="text-xl font-semibold">
                {blog.title}
              </h2>
              <p className="text-gray-600">
                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
