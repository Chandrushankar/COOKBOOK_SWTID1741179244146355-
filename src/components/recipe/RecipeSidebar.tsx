
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Youtube } from "lucide-react";
import { Recipe } from "@/services/recipeApi";

interface RecipeSidebarProps {
  recipe: Recipe;
  isInFavorites: boolean;
  onToggleFavorite: () => void;
  isAuthenticated: boolean;
}

const RecipeSidebar: React.FC<RecipeSidebarProps> = ({
  recipe,
  isInFavorites,
  onToggleFavorite,
  isAuthenticated,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-4">Recipe Information</h3>
        
        <div className="space-y-6">
          {recipe.strTags && (
            <div>
              <h4 className="text-sm font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {recipe.strTags.split(",").map((tag, i) => (
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
            </div>
          )}
          
          {isAuthenticated && (
            <Button
              className="w-full gap-2"
              variant={isInFavorites ? "outline" : "default"}
              onClick={onToggleFavorite}
            >
              <Heart className={isInFavorites ? "fill-destructive text-destructive" : ""} size={16} />
              {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          )}
          
          {recipe.strSource && (
            <div>
              <h4 className="text-sm font-medium mb-2">Source</h4>
              <a 
                href={recipe.strSource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Original Recipe
              </a>
            </div>
          )}
          
          {recipe.strYoutube && (
            <div>
              <h4 className="text-sm font-medium mb-2">Watch on YouTube</h4>
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Youtube size={16} />
                <span>YouTube Video</span>
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeSidebar;
