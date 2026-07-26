"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const createComment = async (
  postId: string,
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in" };
  }

  const content = formData.get("content");

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ content, postId, status: "APPROVED" }),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag(`post-${postId}`, { expire: 0 });
    revalidateTag("public-posts", { expire: 0 });
  }

  return result;
};
