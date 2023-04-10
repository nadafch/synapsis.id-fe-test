import React from "react";
import { GrNotification } from "react-icons/gr";
import { HiOutlineViewList } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full py-3 px-5 border bg-primary flex justify-between items-center text-secondary sticky top-0 z-10 shadow-sm">
      <div className="text-xl">
        <HiOutlineViewList />
      </div>
      <div className="text-xl font-bold">READER</div>
      <div className="flex items-center gap-3 text-lg">
        <GrNotification />
        <div className="w-8 h-8 bg-slate-600 rounded-full p-2 text-white flex justify-center items-center">
          <FaUser />
        </div>
        <Link href="/user/ManageUser">
          <div className="border-2 border-secondary py-2 px-3 rounded-xl bg-white flex gap-2 items-center">
            <FiEdit />
            <span className="text-sm font-medium">User</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
