import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./rootLayout";
import Users, { usersLoader } from "./pages/Users";
import Details, { userDetailsLoader } from "./pages/Details";
import AlbumDetails, { albumDetailsLoader } from "./pages/AlbumDetails";
import FavoritesPage from "./pages/FavoritesPage";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <Users />,
        loader: usersLoader,
      },

      {
        path: "users/:userId",
        element: <Details />,
        loader: userDetailsLoader,
      },
      {
        path: "users/:userId/albums/:albumId",
        element: <AlbumDetails />,
        loader: albumDetailsLoader,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
