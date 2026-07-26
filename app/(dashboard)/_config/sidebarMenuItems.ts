import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, User } from "lucide-react";
import { AUTHOR_SIDEBAR_ITEMS } from "./authorSidebarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";

const USER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/my-posts",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/dashboard/my-profile",
    icon: User,
  },
];

export const sidebarMenuItems = {
  USER: USER_SIDEBAR_ITEMS,
  AUTHOR: AUTHOR_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
