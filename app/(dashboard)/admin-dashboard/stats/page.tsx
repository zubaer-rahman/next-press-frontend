import { Suspense } from "react";
import { AdminStats } from "../AdminStats";
import { AdminStatsSkeleton } from "../AdminStatsSkeleton";

const StatsPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Site Statistics</h1>
        <p className="text-sm text-muted-foreground">
          Overview of all posts, comments, and views.
        </p>
      </div>

      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>
    </div>
  );
};

export default StatsPage;
