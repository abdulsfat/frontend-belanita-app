'use client'

import React from "react";

import UserMetaCard from "@/app/_components/Admin/user-profile/UserMetaCard";
import useAuthStore from "@/app/_stores/authStore";


export default function Profile() {
  const { user } = useAuthStore();
  if (!user) {
    return (
        <div className="text-center text-red-600 py-10">
          Anda harus login terlebih dahulu untuk melihat profil.
        </div>
    );
  }
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard
              name={user.name}
              address={user.address}
              image={user.image}
              role={user.role}
          />
          {/*<UserInfoCard />*/}
          {/*<UserAddressCard />*/}
        </div>
      </div>
    </div>
  );
}
