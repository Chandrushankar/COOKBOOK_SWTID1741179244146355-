
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat, Clock, Heart, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageCarousel from "./ImageCarousel";
import { Recipe } from "@/services/recipeApi";
import useFavorites from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";

interface RecipeHeaderProps {
  recipe: Recipe;
  images: string[];
  headerRef: React.RefObject<HTMLDivElement>;
  headerVisible: boolean;
  onBack: () => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  recipe,
  images,
  headerRef,
  headerVisible,
  onBack,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const isAddedToFavorites = isFavorite(recipe.idMeal);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAddedToFavorites) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };
  return (
    <div 
      ref={headerRef}
      className={cn(
        "transition-all duration-500 opacity-0 translate-y-8 mb-8",
        headerVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-orange-400">{recipe.strMeal}</h1>
        {isAuthenticated && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
            onClick={handleToggleFavorite}
            aria-label={isAddedToFavorites ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={cn(
                "w-5 h-5 transition-colors",
                isAddedToFavorites && "fill-destructive text-destructive"
              )} 
            />
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
          <ChefHat className="w-4 h-4" /> {recipe.strCategory}
        </span>
        {recipe.strArea && (
          <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
            <Utensils className="w-4 h-4" /> {recipe.strArea} cuisine
          </span>
        )}
        <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
          <Clock className="w-4 h-4" /> ~30 mins
        </span>
      </div>
      
      <ImageCarousel images={images} alt={recipe.strMeal} />
    </div>
  );
};

export default RecipeHeader;
