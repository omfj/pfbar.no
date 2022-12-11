import React from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", to: "/" },
  { name: "Meny", to: "/menu" },
  { name: "Bruker", to: "/account" },
];

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const Header = () => {
  const [open, cycleOpen] = useCycle(false, true);

  return (
    <>
      <header className="justify-between items-center px-3 sm:px-5 py-5 bg-pink-200 mb-10 border-b border-black">
        <div className="hidden md:flex items-center">
          <h1 className="text-2xl font-bold">Pink Flamingo</h1>
          <div className="flex-grow" />
          <nav>
            <ul className="flex gap-4">
              {links.map(({ name, to }, i) => (
                <li className="hover:underline" key={i}>
                  <Link href={to}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex md:hidden justify-between ">
          <button onClick={cycleOpen}>
            <MdMenu className="text-3xl" />
          </button>
          <div>
            <h1 className="font-bold text-2xl">Pink Flamingo</h1>
          </div>
          <div></div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="flex flex-col bg-pink-200 border-r border-black h-screen fixed top-0 left-0 z-50"
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <motion.div
              className="relative flex flex-col p-4 gap-10 h-full"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.button variants={itemVariants} onClick={cycleOpen}>
                <MdClose className="text-4xl" />
              </motion.button>
              <div className="flex flex-col gap-5 text-center">
                {links.map(({ name, to }, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Link className="text-4xl" href={to} onClick={cycleOpen}>
                      {name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
