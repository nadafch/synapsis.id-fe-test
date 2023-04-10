import React from "react";
import { FaUser } from "react-icons/fa";

export default function UserCard(props) {
  return (
    <>
      <div className="w-full flex justify-between items-center p-3 bg-white rounded-xl">
        <div className="w-full p-3 flex gap-2">
          <div className="w-fit h-fit rounded-full p-3 flex items-center justify-center bg-secondary text-white text-lg">
            <FaUser />
          </div>
          <div className="w-full">
            <div className="font-semibold">{props?.user}</div>
            <div className="w-[50%] text-xs font-light">{props?.email}</div>
          </div>
        </div>
        {!props?.disabled && (
          <div className="border border-secondary rounded-full text-sm p-2 px-3 font-medium shadow-lg">
            Follow
          </div>
        )}
      </div>
      {props?.comment && (
        <div className="w-[70%] text-sm p-5 -mt-10 ml-4 font-light">
          {props?.comment}
        </div>
      )}
    </>
  );
}
