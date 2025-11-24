# English Homestay Vietnam

![English Vietnam Homestay](/opengraph.png)

A comprehensive platform for managing and reviewing homestays, bridging English and Vietnamese speakers. This application provides a seamless experience for users to find, review, and manage homestay bookings, featuring a robust admin dashboard for platform management.

## 🚀 Features

- **Authentication**: Secure user authentication and session management using Better Auth.
- **Review System**: Detailed review submission with ratings, text, and nationality indicators.
- **Admin Dashboard**: Powerful admin interface built with Refine for managing reviews, users, and content.
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS and Radix UI primitives.
- **Internationalization Support**: Designed to support English and Vietnamese contexts.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Admin Framework**: [Refine](https://refine.dev/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v20+ recommended).
- **PostgreSQL**: You need a running PostgreSQL instance.

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd english-vietnam-homestay
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory based on `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Update the `DATABASE_URL` and other necessary variables in `.env`.

4.  **Database Setup**
    Generate the Prisma client and push the schema to your database.
    ```bash
    npx prisma generate
    npx prisma db push
    ```
    *(Optional) Seed the database:*
    ```bash
    npx prisma db seed
    ```

5.  **Run the Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npx prisma studio`: Opens a visual interface for your database.

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable React components.
- `prisma/`: Database schema and migrations.
- `public/`: Static assets.
- `lib/`: Utility functions and shared logic.
