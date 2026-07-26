"use server";

import { getAccessToken } from "@/service/getAccessToken";
import { revalidateTag } from "next/cache";

export const getMyProfile = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60,
      tags: ["my-profile"],
    },
  });

  const result = await res.json();
  return result;
};

export const updateMyProfile = async (
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in" };
  }

  const payload: Record<string, FormDataEntryValue | null> = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    profilePhoto: formData.get("profilePhoto"),
  };

  Object.keys(payload).forEach(
    (key) => payload[key] === "" && delete payload[key],
  );

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/my-profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", { expire: 0 });
  }

  return result;
};
