import ReactMarkdown from "react-markdown";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function BlogPost({
  params,
}) {
  await connectToDatabase();
  const blog = await Blog.findById(params.id);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>
      <p className="text-gray-600 mb-4">
        {new Date(
          blog.createdAt
        ).toLocaleDateString()}
      </p>
      <ReactMarkdown className="prose">
        {blog.content}
      </ReactMarkdown>
    </div>
  );
}
