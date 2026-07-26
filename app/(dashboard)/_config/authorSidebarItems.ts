import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, User } from "lucide-react";

export const AUTHOR_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/author-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/author-dashboard/my-posts",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/dashboard/my-profile",
    icon: User,
  },
];
