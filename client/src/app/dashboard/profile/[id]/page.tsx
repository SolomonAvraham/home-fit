import React from "react";
import ProfilePage from "@/components/pages/profile/profile";
import { fetchUserById } from "@/lib/user";
import { PropsParams } from "@/types/params";

export default async function UserProfilePage({ params }: PropsParams) {
  const data = await fetchUserById(params.id);

  return (
    <div>
      <ProfilePage {...data} />
    </div>
  );
}
