import ModalAddUser from "@/components/ModalAddUser";
import ModalEditUser from "@/components/ModalEditUser";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../../store/api";

export default function ManageUser() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [fetchUser, setFetchUser] = useState([]);
  const [search, setSearch] = useState("");
  const [field, setField] = useState({
    email: "",
    name: "",
    gender: "female",
    status: "active",
  });
  const [editID, setEditID] = useState("");
  const [editField, setEditField] = useState({
    id: null,
    email: "",
    name: "",
    gender: "female",
    status: "active",
  });

  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setFetchUser(user);
  }, [user]);

  useEffect(() => {
    if (search === "") {
      setFetchUser(user);
    } else {
      const filtered = fetchUser.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      });
      setFetchUser(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(createUser(field));
      setIsOpen(false);
      setField({
        email: "",
        name: "",
        gender: "female",
        status: "active",
      });
    },
    [dispatch, field]
  );
  const handleEdit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser(editField));
      dispatch(getUser());
      setIsOpenEdit(false);
    },
    [dispatch, editField]
  );

  const handleDelete = useCallback((id) => {
    try {
      const deleteData = () => {
        dispatch(deleteUser(id));
        alert("data berhasil dihapus");
        dispatch(getUser());
      };
      deleteData();
    } catch (e) {
      alert(e.message);
    }
  }, []);

  console.log(fetchUser);
  const RenderMain = useMemo(() => {
    return (
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
          {!isLoading ? (
            fetchUser.map((index) => {
              return (
                <div
                  key={index.name}
                  className="w-[300px] p-3 mt-5 bg-white rounded-lg flex flex-col gap-5"
                >
                  <div className="w-full">
                    <UserCard disabled user={index.name} email={index.email} />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-3">
                      <div
                        role="button"
                        onClick={() => {
                          setEditField({
                            id: index.id,
                            name: index.name,
                            email: index.email,
                            gender: index.gender,
                            status: index.status,
                          });
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
              );
            })
          ) : (
            <div>Loading</div>
          )}
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
    );
  }, [
    editField,
    fetchUser,
    field,
    handleDelete,
    handleEdit,
    handleSubmit,
    isLoading,
    isOpen,
    isOpenEdit,
    search,
  ]);

  return RenderMain;
}
