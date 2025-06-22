import useAuthStore from "@/app/_stores/authStore";
import Image from "next/image";
import {useModal} from "@/app/_hooks/useModal";
import {CircleDollarSign, Pencil, Plus} from "lucide-react";

export default function UserAmountCard() {
  const { user } = useAuthStore();
  const {isOpen, openModal, closeModal} = useModal();


  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center  gap-6 xl:flex-row">
                  <div className="w-20 h-20 overflow-hidden rounded-full ">
                      <CircleDollarSign className="w-20 h-20"/>
                  </div>
                  <div className="order-3 xl:order-2">
                      <h4 className=" text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                          {`Rp ${Number(user?.balance || 0).toLocaleString("id-ID")}`}
                      </h4>
                  </div>
              </div>
              <button
                  onClick={() =>
                      openModal("TOP_UP", {
                          user,
                          fetchUsers: () => {
                          },
                      })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                    <Plus className="w-6 h-6 dark:text-white/90" />
                  <span className=""> Tambah Saldo</span>
              </button>
          </div>
      </div>
  );
}
