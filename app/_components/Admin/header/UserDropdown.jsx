"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import useAuthStore from "@/app/_stores/authStore";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import {logoutUser} from "@/app/_services/authService";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { user, setAuth, logout } = useAuthStore();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setAuth(JSON.parse(savedUser), savedToken);
    }
  }, [setAuth]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    const success = await logoutUser(token);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    router.push("/");

    if (!success) {
      console.warn("Logout gagal");
    }
  };


  if (!user) return null;

  return (
      <div className="relative" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
        >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image
              width={44}
              height={44}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image}`}
              alt="User"
              className="object-cover"
          />
        </span>

          <span className="block mr-1 font-medium text-theme-sm capitalize">{user.name}</span>

          <svg
              className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
              }`}
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
          >
            <path
                d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </button>

        <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
        >
          <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400 capitalize">
            {user.name}
          </span>
            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          </div>

          <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
            <li>
              <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Edit profile
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/account-settings"
                  className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Account settings
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href="/support"
                  className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Support
              </DropdownItem>
            </li>
          </ul>

          <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center gap-3 px-3 py-2 font-medium text-red-600 rounded-lg group text-theme-sm hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-red-400"
          >
            Sign out
          </button>
        </Dropdown>
      </div>
  );
}
