import { Suspense } from "react";
import { getMe } from "@/service/getMe";
import { AdminStats } from "./AdminStats";
import { AdminStatsSkeleton } from "./AdminStatsSkeleton";

const AdminDashboardPage = async () => {
  const user = await getMe();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {user.data?.profile?.name ?? "Admin"}
        </p>
      </div>

      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;
