
import { Link } from "react-router-dom";
import { Recipe } from "@/services/recipeApi";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useFavorites from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

const RecipeCard = ({ recipe, index = 0 }: RecipeCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
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
      ref={ref}
      className={cn(
        "transition-all duration-500 opacity-0 translate-y-8",
        isVisible && "opacity-100 translate-y-0",
        "delay-[" + index * 50 + "ms]"
      )}
    >
      <Card className="h-full overflow-hidden group">
        <Link to={`/recipe/${recipe.idMeal}`}>
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <h3 className="text-lg font-medium line-clamp-1">{recipe.strMeal}</h3>
              <p className="text-sm opacity-90">{recipe.strCategory}</p>
            </div>
          </div>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {recipe.strTags?.split(",").map((tag, i) => (
                tag && (
                  <span 
                    key={i} 
                    className="inline-block text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1"
                  >
                    {tag.trim()}
                  </span>
                )
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {recipe.strArea && (
              <span>{recipe.strArea} cuisine</span>
            )}
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default RecipeCard;
