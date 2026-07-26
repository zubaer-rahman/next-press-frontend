import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsSkeleton } from "./_components/news/NewsSkeleton";
import { PublicNewsList } from "./_components/news/PublicNewsList";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to NextPress
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Your source for the latest news, premium articles, and in-depth
            analysis.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/news">Browse News</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/premium">Premium Content</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest News</h2>
          <Button asChild variant="ghost">
            <Link href="/news">View all</Link>
          </Button>
        </div>

        <Suspense fallback={<NewsSkeleton />}>
          <PublicNewsList searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
