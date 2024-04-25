import { LineChart, Settings, Users2 } from "lucide-react";

import { AppRoute } from "@/config/app-route";

export const menuItems = [
  {
    title: "Dashboard",
    href: AppRoute.home,
    icon: LineChart,
  },
  {
    title: "Profiles",
    href: AppRoute.profiles,
    icon: Users2,
  },
  {
    title: "Settings",
    href: AppRoute.settings,
    icon: Settings,
  },
] as const;
