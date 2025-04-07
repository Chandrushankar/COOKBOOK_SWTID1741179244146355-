
import { useState, useEffect } from "react";
import { Recipe } from "@/services/recipeApi";
import { useAuth } from "@/context/AuthContext";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const { isAuthenticated, user } = useAuth();

  // Load favorites from localStorage on initial render
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`favorites-${user.id}`);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error("Error parsing favorites:", error);
          setFavorites([]);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user && favorites.length > 0) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addFavorite = (recipe: Recipe) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.idMeal === recipe.idMeal)) {
        return prevFavorites;
      }
      return [...prevFavorites, recipe];
    });
  };

  const removeFavorite = (recipeId: string) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((recipe) => recipe.idMeal !== recipeId)
    );
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some((recipe) => recipe.idMeal === recipeId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};

export default useFavorites;
