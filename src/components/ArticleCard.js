import React from "react";
import { FaUserAlt } from "react-icons/fa";

export default function ArticleCard(props) {
  const { users } = props;

  return (
    <div className="w-full bg-primary p-4 rounded-xl drop-shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
      {users
        ?.filter((user) => user.id === props?.user_id)
        .map((newUser, index) => (
          <div key={index}>
            <div className="mb-5 flex items-center gap-3">
              <div className="w-8 h-8 p-2 bg-secondary rounded-full flex justify-center items-center text-white text-sm">
                <FaUserAlt />
              </div>
              <div>
                <div className="text-sm">
                  By <span className="font-semibold">{newUser.name}</span>
                </div>
                <div className="text-xs font-light">{newUser.email}</div>
              </div>
            </div>
          </div>
        ))}
      <div className="mb-2 text-3xl font-semibold font-Libre">
        {props?.title}
      </div>
      <div className="text-sm text-justify font">{props?.body}</div>
    </div>
  );
}
