import { Dialog } from "@headlessui/react";
import React, { useMemo } from "react";

export default function ModalEditUser(props) {
  const ModalEdit = useMemo(
    () => (
      <Dialog
        as="div"
        open={props?.isOpen}
        onClose={props?.onClose}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-slate-900 bg-opacity-25 backdrop-filter backdrop-blur" />
        <Dialog.Panel>
          <div className="fixed w-1/2 h-fit inset-0 p-5 bg-white z-30 mx-auto my-auto rounded-2xl">
            <Dialog.Title className="font-bold mb-4">Edit User</Dialog.Title>

            <form
              className="w-full flex justify-center flex-col gap-3"
              onSubmit={props?.handleEdit}
            >
              <>
                <label className="space-y-2 mb-2">
                  <span className="text-sm">Name</span>
                  <input
                    type="text"
                    className="w-full rounded-lg ring-2 ring-stone-300 text-sm p-3"
                    value={props?.name}
                    onChange={props?.nameOnChange}
                  />
                </label>
                <label className="space-y-2 mb-2">
                  <span className="text-sm">Email</span>
                  <input
                    type="email"
                    className="w-full rounded-lg ring-2 ring-stone-300 text-sm p-3"
                    value={props?.email}
                    onChange={props?.emailOnChange}
                  />
                </label>
              </>
              <>
                <label className="space-x-6 mb-2">
                  <span className="text-sm">Status</span>
                  <select
                    value={props?.status}
                    onChange={props?.statusOnChange}
                    className="p-2 rounded-lg ring-2 ring-secondary text-sm"
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </label>
                <label className="space-x-4 mb-2">
                  <span className="text-sm">Gender</span>
                  <select
                    value={props?.gender}
                    onChange={props?.genderOnChange}
                    className="p-2 rounded-lg ring-2 ring-secondary text-sm"
                  >
                    <option value="female">female</option>
                    <option value="male">male</option>
                  </select>
                </label>
              </>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border bg-emerald-500 font-semibold"
              >
                Edit
              </button>
            </form>
          </div>
        </Dialog.Panel>
      </Dialog>
    ),
    [
      props?.email,
      props?.emailOnChange,
      props?.gender,
      props?.genderOnChange,
      props?.handleEdit,
      props?.isOpen,
      props?.name,
      props?.nameOnChange,
      props?.onClose,
      props?.status,
      props?.statusOnChange,
    ]
  );
  return ModalEdit;
}
