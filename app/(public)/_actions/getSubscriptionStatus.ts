"use server";

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/status`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  return result;
};
