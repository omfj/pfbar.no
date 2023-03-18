export type HeaderRoute = {
  name: string;
  path: string;
  session?: boolean;
  admin?: boolean;
};

export const headerRoutes: Array<HeaderRoute> = [
  {
    name: "Hjem",
    path: "/",
  },
  {
    name: "Produkter",
    path: "/produkter",
  },
  {
    name: "Profil",
    path: "/profil",
    session: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    admin: true,
  },
];

export const dashboardRoutes = [
  {
    name: "Se alle brukere",
    path: "/dashboard/brukere",
  },
  {
    name: "Se alle bestillinger",
    path: "/dashboard/bestillinger",
  },
  {
    name: "Se alle produkter",
    path: "/dashboard/produkter",
  },
];
