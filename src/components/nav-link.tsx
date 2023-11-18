import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <li>
      <Link
        className="text-lg font-medium hover:underline underline-offset-4 decoration-2"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
