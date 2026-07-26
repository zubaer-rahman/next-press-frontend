"use client";

import Link from "next/link";
import { User, Settings, LogOut, Menu, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { getMe } from "@/service/getMe";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Premium", href: "/premium" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const userMenu = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogout, setIsLogout] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, [pathname]);
  const handleUserMenuAction = async (action: string) => {
    console.log(`User menu action: ${action}`);
    if (action === "dashboard") {
      if (user?.data?.profile.role === "USER") router.push("/dashboard");
      if (user?.data?.profile.role === "AUTHOR")
        router.push("/author-dashboard");
      if (user?.data?.profile.role === "ADMIN") router.push("/admin-dashboard");
      return;
    }
    if (action === "profile") {
      router.push("/dashboard/my-profile");
      return;
    }
    if (action === "logout" && user?.success) {
      await logout();
      setIsLogout(true);
    }
    return;
  };

  useEffect(() => {
    if (isLogout) {
      toast.success("User Logged Out Succesfully!");
      window.location.replace("/login");
    }
  }, [isLogout, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background text-foreground">
      <div
        className={cn(
          `mx-auto ${!pathname.startsWith("/dashboard") && "max-w-7xl"} flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 transition-[max-width] duration-300`,
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">
            Next<span className="text-primary">Press</span>
          </span>
        </Link>

        {/* Desktop nav */}
        {pathname !== "/login" && pathname !== "/register" && (
          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  pathname === item.href && "text-primary font-semibold",
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {pathname === "/login" ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Don&apos;t have an account?
              </span>
              <Button asChild variant="default" size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : pathname === "/register" ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Already have an account?
              </span>
              <Button asChild variant="default" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full cursor-pointer"
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/images/diverse-avatars.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>NP</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user?.data?.profile.name ?? "User"}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user?.data?.profile.email ?? "User's email"}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenu.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={async () =>
                        await handleUserMenuAction(item.action)
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => await handleUserMenuAction("logout")}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 md:hidden">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
