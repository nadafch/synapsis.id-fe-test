import ModalAddUser from "@/components/ModalAddUser";
import ModalEditUser from "@/components/ModalEditUser";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function ManageUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [fetchUser, setFetchUser] = useState([]);
  const [field, setField] = useState({
    email: "",
    name: "",
    gender: "female",
    status: "active",
  });
  const [editID, setEditID] = useState("");
  const [editField, setEditField] = useState({
    email: "",
    name: "",
    gender: "female",
    status: "active",
  });
  const [search, setSearch] = useState("");

  const api = axios.create({
    baseURL: "https://gorest.co.in/public/v2",
    headers: {
      Authorization: `Bearer 22f82cecb8faa17d1060d4f16d5dbbaaa1e13d21076fbea9c7cf32b65db70db2`,
    },
  });

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = () => {
    try {
      const getData = async () => {
        const res = await api.get("/users");
        const result = res.data;
        setFetchUser(result);
      };
      getData();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        const getData = async () => {
          const res = await api.post("/users", field);
          if (res.status === 201) {
            alert("Data berhasil ditambahkan");
          }
          getUser();
        };
        getData();
        setIsOpen(false);
        setField({
          email: "",
          name: "",
          gender: "female",
          status: "active",
        });
      } catch (e) {
        alert(e.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field]
  );

  const handleEdit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        console.log(editField.id);
        const getData = async () => {
          const res = await api.patch(`/users/${editID}`, editField);
          if (res.status === 200) {
            alert("Data berhasil diubah");
          }
          getUser();
        };
        getData();
        setIsOpenEdit(false);
      } catch (e) {
        alert(e.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editField, editID]
  );

  const handleDelete = useCallback((id) => {
    try {
      const getData = async () => {
        await api.delete(`/users/${id}`);
        alert(`data ${id} berhasil dihapus`);
        getUser();
      };
      getData();
      setIsOpen(false);
    } catch (e) {
      alert(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (search === "") {
      getUser();
    } else {
      const filtered = fetchUser.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      });
      setFetchUser(filtered);
    }
  }, [search]);

  const RenderMain = useMemo(
    () => (
      <div className="w-full min-h-screen bg-slate-200 p-3 flex flex-col items-center">
        <div className="w-full max-w-[500px] mt-5 mb-4">
          <SearchBar
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add User
        </button>
        <div className="w-[80%] p-5 flex flex-wrap justify-center gap-5">
          {fetchUser.map((index, label) => (
            <div key={label} className="w-[300px] p-3 mt-5 bg-white rounded-lg">
              <div className="w-full">
                <UserCard disabled user={index.name} email={index.email} />
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-3">
                  <div
                    role="button"
                    onClick={() => {
                      setEditField({
                        name: index.name,
                        email: index.email,
                        gender: index.gender,
                        status: index.status,
                      });
                      setEditID(index.id);
                      setIsOpenEdit(!isOpenEdit);
                    }}
                  >
                    <FaEdit />
                  </div>

                  <div role="button" onClick={() => handleDelete(index.id)}>
                    <FaTrash />
                  </div>
                </div>
                <div
                  className={`py-1 px-3  text-xs font-bold rounded-full ${
                    index.status === "inactive"
                      ? "bg-red-500 text-white"
                      : "bg-sky-300 text-sky-800"
                  }`}
                >
                  {index.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ModalAddUser
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          name={field?.name}
          nameOnChange={(e) => {
            e.preventDefault();
            setField({ ...field, name: e.target.value });
          }}
          email={field?.email}
          emailOnChange={(e) => {
            e.preventDefault();
            setField({ ...field, email: e.target.value });
          }}
          gender={field?.gender}
          genderOnChange={(e) => {
            setField({ ...field, gender: e.target.value });
          }}
          status={field?.status}
          statusOnChange={(e) => {
            setField({ ...field, status: e.target.value });
          }}
          handleSubmit={handleSubmit}
        />
        <ModalEditUser
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
          name={editField?.name}
          nameOnChange={(e) => {
            e.preventDefault();
            setEditField({ ...editField, name: e.target.value });
          }}
          email={editField?.email}
          emailOnChange={(e) => {
            e.preventDefault();
            setEditField({ ...editField, email: e.target.value });
          }}
          gender={editField?.gender}
          genderOnChange={(e) => {
            e.preventDefault();
            setEditField({ ...editField, gender: e.target.value });
          }}
          status={editField?.status}
          statusOnChange={(e) => {
            e.preventDefault();
            setEditField({ ...editField, status: e.target.value });
          }}
          handleEdit={handleEdit}
        />
      </div>
    ),
    [
      editField,
      fetchUser,
      field,
      handleDelete,
      handleEdit,
      handleSubmit,
      isOpen,
      isOpenEdit,
      search,
    ]
  );

  return RenderMain;
}
