import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.svg";
import Image from "next/image";

export default function ArticlesList() {
  const [fetchData, setFetchData] = useState([]);
  const [fetchUser, setFetchUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      const getData = async () => {
        const res = await axios.get("https://gorest.co.in/public/v2/posts");
        setFetchData(res.data);
        setLoading(true);
      };
      getData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      getData();
    } else {
      const filtered = fetchData.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      });
      setFetchData(filtered);
    }
  }, [search]);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get("https://gorest.co.in/public/v2/users");
        setFetchUser(res.data);
        setLoading(true);
      };
      getData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

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
      {loading ? (
        <div className="w-full flex flex-col gap-5 p-8">
          {fetchData.map((index, label) => (
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
