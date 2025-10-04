import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-10 md:gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-4 transition-colors hover:text-accent-400"
            >
              <img
                alt={session?.user?.name}
                aria-label="profile image"
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
                src={session?.user?.image}
              />
              <span className="hidden md:block">Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              <span>Guest</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
