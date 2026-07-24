"use client";

import Link from "next/link";
import { User, Settings, LogOut, Menu } from "lucide-react";

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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Premium", href: "/premium" },
  { label: "News", href: "/news" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
];

const userMenu = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
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
type NavbarProps = {
  user: IUser;
};
const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const handleUserMenuAction = async (action: string) => {
    console.log(`User menu action: ${action}`);

    if (action === "logout" && user?.success) {
      await logout();
      setIsLogout(true);
    }
  };

  useEffect(() => {
    if (isLogout) {
      toast.success("User Logged Out Succesfully!");
      window.location.replace("/login");
    }
  }, [isLogout, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">
            Next<span className="text-primary">Press</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Right side: user dropdown + mobile menu */}
        <div className="flex items-center gap-2">
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
                  {user.data?.profile.name ?? "User"}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user.data?.profile.email ?? "User's email"}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userMenu.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
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
        </div>
      </div>
    </header>
  );
};
export default Navbar;
