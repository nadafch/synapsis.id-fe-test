import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar(props) {
  const searchBar = useMemo(
    () => (
      <div className="w-full border-2 py-2 px-5 rounded-full relative items-center bg-white">
        <input
          type="text"
          className="w-full outline-none "
          placeholder="Search...."
          value={props?.value}
          onChange={props?.onChange}
        />
        <div className="absolute right-0 top-3 mr-3">
          <BiSearch />
        </div>
      </div>
    ),
    [props?.onChange, props?.value]
  );
  return searchBar;
}
