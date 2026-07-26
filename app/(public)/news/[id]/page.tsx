import { Suspense } from "react";
import { PostDetail } from "./PostDetail";
import { PostDetailSkeleton } from "./PostDetailSkeleton";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail postId={id} />
      </Suspense>
    </div>
  );
};

export default PostDetailPage;
