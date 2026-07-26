"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../../_actions/createComment";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function CommentForm({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState(
    createComment.bind(null, postId),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Comment posted!");
    } else {
      toast.error(state.message || "Failed to post comment");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-3">
      <Textarea
        name="content"
        placeholder="Write a comment..."
        required
        className="min-h-24"
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}
