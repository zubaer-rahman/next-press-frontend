"use client";

import { Button } from "@/components/ui/button";
import { deletePost } from "../_actions/myPostsActions";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const result = await deletePost(postId);
    if (result.success) {
      toast.success("Post deleted successfully");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete post");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      className="text-destructive hover:text-destructive"
    >
      <Trash2Icon className="size-4" />
    </Button>
  );
}
