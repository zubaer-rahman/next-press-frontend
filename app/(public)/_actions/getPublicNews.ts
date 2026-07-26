"use server";

export const getPublicNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();
  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  if (query?.page) {
    params.set("page", query.page as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts?${params.toString()}`,
    {
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["public-posts"],
      },
    },
  );

  const result = await res.json();
  return result;
};
