import React, { useEffect, useState } from "react";
import ArticlesList from "./ArticelList";
import SubscribeBanner from "@/components/SubscribeBanner";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import axios from "axios";

export default function Main() {
  const [fetchUser, setFetchUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      const getData = async () => {
        const res = await axios.get("https://gorest.co.in/public/v2/users");
        setFetchUser(res.data);
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (search == "") return getData();
    const filter = fetchUser.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFetchUser(filter);
  }, [search]);

  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full h-screen col-span-2 border overflow-y-auto">
        <ArticlesList />
      </div>
      <div className="col-span-1 border p-3">
        <div className="mb-5">
          <SubscribeBanner />
        </div>
        <SearchBar
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <div className="w-full h-[350px] mt-5 overflow-y-auto overflow-x-hidden">
          {fetchUser.map((index, label) => (
            <UserCard key={label} user={index.name} email={index.email} />
          ))}
        </div>
      </div>
    </div>
  );
}
