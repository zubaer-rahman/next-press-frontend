import { getPostById } from "../../_actions/getPostById";
import { CommentForm } from "./CommentForm";
import { IComment } from "@/lib/types";

export async function CommentSection({ postId }: { postId: string }) {
  const result = await getPostById(postId);

  const comments: IComment[] = result.data?.comments ?? [];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        Comments ({comments.length})
      </h2>

      <CommentForm postId={postId} />

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
        {comments.map((comment: IComment) => (
          <div
            key={comment.id}
            className="rounded-lg border p-4"
          >
            <p className="whitespace-pre-line text-sm">{comment.content}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
