"use server";

import { getAccessToken } from "@/service/getAccessToken";

export const getPostStats = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/stats`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: {
        revalidate: 60,
        tags: ["post-stats"],
      },
    },
  );

  const result = await res.json();
  return result;
};
