import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}
