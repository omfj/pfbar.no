import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="border-t border-black">
      <footer className="container mx-auto flex flex-wrap justify-center gap-10 divide-x divide-black">
        <div className="p-5">
          <Link
            className="underline hover:no-underline"
            href="https://github.com/omf/pfbar.no"
          >
            Laget med 🍹 av omfj
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
