import React from "react";
import { FaUser } from "react-icons/fa";

export default function UserCard(props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center p-3 bg-white rounded-xl justify-around">
        <div className="w-full max-w-[80%] flex items-center gap-5">
          <div className="w-fit h-fit rounded-full p-3 flex items-center justify-center bg-secondary text-white text-lg">
            <FaUser />
          </div>
          <div className="w-2/3">
            <div className="font-semibold">{props?.user}</div>
            <div className="text-xs font-light break-words">{props?.email}</div>
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
    </div>
  );
}
