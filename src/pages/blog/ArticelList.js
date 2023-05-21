import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getArticle, getUser } from "../../../store/api";

export default function ArticlesList() {
  const [fetchData, setFetchData] = useState([]);
  const [fetchUser, setFetchUser] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getArticle());
  }, [dispatch]);

  useEffect(() => {
    setFetchData(data);
  }, [data]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setFetchUser(user);
  }, [user]);

  useEffect(() => {
    if (search === "") {
      setFetchData(data);
    } else {
      const filtered = fetchData.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      });
      setFetchData(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  return (
    <div className="w-full">
      <div className="p-4 border-b-2">
        <div className="w-full flex justify-between items-center">
          <div className=" max-w-[600px]">
            <SearchBar
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>Topics: </div>
            <div className="bg-primary drop-shadow-md p-2 rounded-full">
              Design
            </div>
            <div className="bg-primary drop-shadow-md p-2 rounded-full">
              Developement
            </div>
            <div className="bg-primary drop-shadow-md p-2 rounded-full">
              UI/UX
            </div>
            <div className="bg-primary drop-shadow-md p-2 rounded-full">
              Marketing
            </div>
          </div>
        </div>
        <div className="mt-5 text-lg font-semibold">ARTICLES</div>
      </div>
      {!isLoading ? (
        <div className="w-full flex flex-col gap-5 p-8">
          {fetchData &&
            fetchData.map((index, label) => (
              <div key={label}>
                <Link href={`/blog/${index.id}`}>
                  <ArticleCard
                    user_id={index.user_id}
                    title={index.title}
                    body={index.body}
                    users={fetchUser}
                  />
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Image src={loader} alt="" />
        </div>
      )}
    </div>
  );
}
