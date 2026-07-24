"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  // const searchTerm = `${query?.searchTerm ? `?searchTerm=${query?.searchTerm}` : ""}`;

  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  console.log({ params });
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["premium-posts"],
      },
    },
  );

  const result = await res.json();
  return result;
};
