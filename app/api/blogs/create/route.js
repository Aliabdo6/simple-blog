import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { auth } from "@clerk/nextjs/server"; // Change this line

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { title, content } =
      await request.json();
    const blog = new Blog({
      title,
      content,
      author: userId,
    });
    await blog.save();
    return NextResponse.json(blog, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "Error creating blog post:",
      error
    ); // Add this line for debugging
    return NextResponse.json(
      { error: "Error creating blog post" },
      { status: 500 }
    );
  }
}
