import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error(
      "Error fetching blog post:",
      error
    );
    return NextResponse.json(
      { error: "Error fetching blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    if (blog.authorId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, content } =
      await request.json();
    blog.title = title;
    blog.content = content;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error(
      "Error updating blog post:",
      error
    );
    return NextResponse.json(
      { error: "Error updating blog post" },
      { status: 500 }
    );
  }
}
