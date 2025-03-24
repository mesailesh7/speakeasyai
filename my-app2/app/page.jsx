import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <button className="btn btn-primary">Button</button>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/about/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
