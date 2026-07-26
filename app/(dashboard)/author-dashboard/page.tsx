import { getMe } from "@/service/getMe";
import { getMyPosts } from "../_actions/myPostsActions";

const AuthorDashboardPage = async () => {
  const user = await getMe();
  const posts = await getMyPosts();

  const publishedCount = posts.data?.filter(
    (p: { status: string }) => p.status === "PUBLISHED",
  ).length ?? 0;
  const draftCount = posts.data?.filter(
    (p: { status: string }) => p.status === "DRAFT",
  ).length ?? 0;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Author Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {user.data?.profile?.name ?? "Author"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{posts.data?.length ?? 0}</p>
          <p className="text-sm text-muted-foreground">Total Posts</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{publishedCount}</p>
          <p className="text-sm text-muted-foreground">Published</p>
        </div>
        <div className="rounded-lg border p-6">
          <p className="text-3xl font-bold">{draftCount}</p>
          <p className="text-sm text-muted-foreground">Drafts</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboardPage;
