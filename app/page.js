import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between">
      Landing page
      <Link href="/login">login</Link>
      <Link href="/register">register</Link>
    </main>
  );
}
