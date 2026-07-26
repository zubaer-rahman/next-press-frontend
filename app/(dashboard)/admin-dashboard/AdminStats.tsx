import { getPostStats } from "../_actions/adminActions";

export async function AdminStats() {
  const result = await getPostStats();

  if (!result.success || !result.data) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Failed to load stats.
      </p>
    );
  }

  const stats = result.data;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalPosts}</p>
          <p className="text-sm text-muted-foreground">Total Posts</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalPublishedPosts}</p>
          <p className="text-sm text-muted-foreground">Published</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalDraftPosts}</p>
          <p className="text-sm text-muted-foreground">Drafts</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalArchivedPosts}</p>
          <p className="text-sm text-muted-foreground">Archived</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalComments}</p>
          <p className="text-sm text-muted-foreground">Total Comments</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalApprovedComments}</p>
          <p className="text-sm text-muted-foreground">Approved</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{stats.totalRejectedComments}</p>
          <p className="text-sm text-muted-foreground">Rejected</p>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-3xl font-bold">{stats.totalPostViews ?? 0}</p>
        <p className="text-sm text-muted-foreground">Total Post Views</p>
      </div>
    </div>
  );
}
