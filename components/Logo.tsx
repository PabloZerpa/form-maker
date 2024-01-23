
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text hover:cursor-pointer"
    >
      Form Maker
    </Link>
  );
}

export default Logo;