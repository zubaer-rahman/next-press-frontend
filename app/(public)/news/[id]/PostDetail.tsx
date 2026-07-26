import { getPostById } from "../../_actions/getPostById";
import SafeImage from "@/components/shared/SafeImage";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, EyeIcon, MessageSquareIcon } from "lucide-react";
import { CommentSection } from "./CommentSection";

export async function PostDetail({ postId }: { postId: string }) {
  const result = await getPostById(postId);

  if (!result.success || !result.data) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Post not found.
      </p>
    );
  }

  const post = result.data;

  return (
    <article className="space-y-8">
      {post.thumbnail && (
        <SafeImage
          src={post.thumbnail}
          alt={post.title}
          width={900}
          height={450}
          className="w-full rounded-lg object-cover"
        />
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {post.isPremium && (
            <Badge>
              <SparklesIcon data-icon="inline-start" />
              Premium
            </Badge>
          )}
          <Badge variant="outline">{post.status}</Badge>
          {post.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-bold">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>By {post.author?.name ?? "Unknown"}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            {post.views ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="size-4" />
            {result.data._count?.comments ?? 0}
          </span>
        </div>
      </div>

      <div className="whitespace-pre-line text-lg leading-relaxed">
        {post.content}
      </div>

      <hr className="border-border" />

      <CommentSection postId={postId} />
    </article>
  );
}
