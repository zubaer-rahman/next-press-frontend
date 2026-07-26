import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, User, BarChart3 } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/admin-dashboard/my-posts",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/dashboard/my-profile",
    icon: User,
  },
  {
    label: "Stats",
    href: "/admin-dashboard/stats",
    icon: BarChart3,
  },
];
