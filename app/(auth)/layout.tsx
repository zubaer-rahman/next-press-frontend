import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-7xl ">
        <> {children}</>
      </div>
    </>
  );
};
export default AuthLayout;
