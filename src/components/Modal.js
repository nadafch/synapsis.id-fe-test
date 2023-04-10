import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export default function Modal(props) {
  return (
    <Dialog
      as="div"
      open={props?.isOpen}
      onClose={props?.isClose}
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-slate-900 bg-opacity-25 backdrop-filter backdrop-blur" />
      <Dialog.Panel>
        <div className="fixed w-1/4 left-[39%] top-1/4 h-96 inset-0 p-5 bg-white z-30 rounded-2xl">
          <Dialog.Title className="font-bold mb-4">Add User</Dialog.Title>

          <form className="flex flex-col" onSubmit={props.onSubmit}>
            <>
              <label className="space-y-2 mb-2">
                <span className="text-sm">Name</span>
                <input
                  type="text"
                  className="form-input w-full rounded-lg border-gray-300 text-sm"
                  name="name"
                  onChange={handleChange}
                />
              </label>
              <label className="space-y-2 mb-2">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  className="form-input w-full rounded-lg border-gray-300 text-sm"
                  name="email"
                  onChange={handleChange}
                />
              </label>
            </>
            <>
              <label className="space-x-6 mb-2">
                <span className="text-sm">Status</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-select rounded-lg border-gray-300 text-sm"
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>
              <label className="space-x-4 mb-2">
                <span className="text-sm">Gender</span>
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="form-select rounded-lg border-gray-300 text-sm"
                >
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
              </label>
            </>
            <button type="submit" className="px-4 py-2 rounded-lg border">
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
