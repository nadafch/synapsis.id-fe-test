import React, { useEffect, useState } from "react";
import ArticlesList from "./ArticelList";
import SubscribeBanner from "@/components/SubscribeBanner";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/api";

export default function Main() {
  const dispatch = useDispatch();
  const [fetchUser, setFetchUser] = useState([]);
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setFetchUser(user);
  }, [user]);

  useEffect(() => {
    if (search == "") return setFetchUser(user);
    const filter = fetchUser.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFetchUser(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full h-screen col-span-2 border overflow-y-auto">
        <ArticlesList />
      </div>
      <div className="w-full h-screen col-span-1 border p-3 overflow-y-auto">
        <div className="mb-10">
          <SubscribeBanner />
        </div>
        <div className="mb-5">
          <SearchBar
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          {fetchUser &&
            fetchUser.map((index, label) => (
              <UserCard key={label} user={index.name} email={index.email} />
            ))}
        </div>
      </div>
    </div>
  );
}
