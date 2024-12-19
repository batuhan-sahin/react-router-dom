import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route.tsx";
import { FavoritesProvider } from "./FavoritesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <FavoritesProvider>
    <RouterProvider router={router} />
  </FavoritesProvider>
);
