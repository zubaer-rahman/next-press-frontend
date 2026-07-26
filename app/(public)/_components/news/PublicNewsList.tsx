import { getPublicNews } from "../../_actions/getPublicNews";
import { IPost } from "@/lib/types";
import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareIcon, SparklesIcon } from "lucide-react";

export async function PublicNewsList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getPublicNews({ query });

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No news articles found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {result.data.map((post: IPost) => (
        <Link key={post.id} href={`/news/${post.id}`}>
          <Card className="h-full transition-shadow hover:shadow-md">
            {post.thumbnail && (
              <SafeImage
                src={post.thumbnail}
                alt={post.title}
                width={450}
                height={260}
                className="h-48 w-full object-cover"
              />
            )}
            <CardHeader>
              <div className="flex flex-wrap items-center gap-1.5">
                {post.isPremium && (
                  <Badge>
                    <SparklesIcon data-icon="inline-start" />
                    Premium
                  </Badge>
                )}
                {post.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-3 whitespace-pre-line text-muted-foreground">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  By {post.author?.name ?? "Unknown"} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="size-3.5" />
                  {post._count?.comments ?? 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
