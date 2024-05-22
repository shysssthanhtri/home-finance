export const AppRoute = {
  //  AUTHED
  home: "/",
  analyst: "/analyst",
  history: "/history",
  teams: "/teams",
  settings: {
    personal: "/settings/personal",
    profiles: "/settings/profiles",
  },

  //  NEXT_AUTH
  signIn: "/api/auth/signin",
  signOut: "/api/auth/signout",
} as const;
