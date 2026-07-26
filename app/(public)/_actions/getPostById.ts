"use server";

export const getPostById = async (postId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      next: {
        revalidate: 60,
        tags: [`post-${postId}`],
      },
    },
  );

  const result = await res.json();
  return result;
};
