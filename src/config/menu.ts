import { BarChart3, History, LineChart, Settings, Users2 } from "lucide-react";

import { AppRoute } from "@/config/app-route";

export const menuItems = [
  {
    title: "Dashboard",
    href: AppRoute.home,
    icon: LineChart,
  },
  {
    title: "Analyst",
    href: AppRoute.analyst,
    icon: BarChart3,
  },
  {
    title: "History",
    href: AppRoute.history,
    icon: History,
  },
  {
    title: "Teams",
    href: AppRoute.teams,
    icon: Users2,
  },
  {
    title: "Settings",
    href: AppRoute.settings.personal,
    icon: Settings,
  },
] as const;
