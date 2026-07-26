import { getMe } from "@/service/getMe";
import { ProfileForm } from "../../_components/ProfileForm";

const ProfilePage = async () => {
  const user = await getMe();

  if (!user.success || !user.data) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Failed to load profile.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile information.
        </p>
      </div>
      <ProfileForm user={user.data.profile} />
    </div>
  );
};

export default ProfilePage;
