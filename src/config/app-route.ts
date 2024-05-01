export const AppRoute = {
  //  AUTHED
  home: "/",
  analyst: "/analyst",
  history: "/history",
  settings: "/settings",
  teams: "/teams",

  //  NEXT_AUTH
  signIn: "/api/auth/signin",
  signOut: "/api/auth/signout",
} as const;
