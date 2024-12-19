import React, { createContext, useContext, useState } from "react";

interface FavoritePhoto {
  id: number;
  title: string;
  thumbnailUrl: string;
  userId: number;
}

interface FavoritesContextProps {
  favorites: FavoritePhoto[];
  addToFavorites: (photo: FavoritePhoto) => void;
  removeFromFavorites: (photoId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritePhoto[]>([]);

  const addToFavorites = (photo: FavoritePhoto) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === photo.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, photo];
    });
  };

  const removeFromFavorites = (photoId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((photo) => photo.id !== photoId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("Error using FavoritesContext");
  }
  return context;
};
