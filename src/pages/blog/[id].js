import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.svg";
import axios from "axios";
import UserCard from "@/components/UserCard";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [detailBlog, setDetailBlog] = useState();
  const [user, setUser] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          `https://gorest.co.in/public/v2/posts/${id}`
        );
        setDetailBlog(res.data);
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    if (detailBlog) {
      try {
        const getData = async () => {
          const res = await axios.get(
            `https://gorest.co.in/public/v2/comments/`
          );
          const result = res.data;
          const filtered = result.filter((filter) => filter.post_id == id);
          setComment(filtered);
        };
        getData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [detailBlog, id]);

  return detailBlog ? (
    <div className="w-full min-h-screen bg-slate-100 p-5 flex justify-center">
      <div className="w-full h-fit max-w-[80%] bg-white p-5 rounded-lg">
        <h1 className="text-2xl font-Libre font-semibold mb-2">
          {detailBlog.title}
        </h1>
        <div className="font-light text-justify">{detailBlog.body}</div>
        {comment && (
          <div>
            <div className="text-end">{`Comments : ${comment.length}`}</div>
            {comment.map((index, label) => (
              <div
                key={label}
                className="flex flex-col gap-2 border mt-3 rounded-lg"
              >
                <UserCard
                  comment={index.body}
                  email={index.email}
                  user={index.name}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Image src={loader} alt="" />
    </div>
  );
}
