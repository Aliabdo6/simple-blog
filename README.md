# My Blog

A modern, feature-rich blog application built with Next.js, MongoDB, and Clerk for authentication.

## Features

- User authentication with Clerk
- Create, read, update, and delete blog posts
- Markdown support for blog content
- Responsive design with Tailwind CSS
- Server-side rendering for improved SEO
- Dynamic routing for blog posts

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing blog posts
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Clerk](https://clerk.dev/) - Authentication and user management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering for blog content

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB database (local or cloud-based)
- Clerk account for authentication

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Aliabdo6/simple-blog.git
    cd simple-blog
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Sign up or log in using Clerk authentication
- Create new blog posts using the "Create Post" page
- View all blog posts on the home page
- Click on a blog post to view its full content
- Edit or delete your own blog posts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, feel free to reach out to [aliabdo12121@outlook.sa](mailto:aliabdo12121@outlook.sa).
