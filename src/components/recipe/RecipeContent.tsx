
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import RecipeVideo from "./RecipeVideo";
import { Recipe } from "@/services/recipeApi";
import { cn } from "@/lib/utils";

interface RecipeContentProps {
  recipe: Recipe;
  activeTab: string;
  setActiveTab: (value: string) => void;
  instructionSteps: string[];
  youtubeVideoId: string | null;
  contentRef: React.RefObject<HTMLDivElement>;
  contentVisible: boolean;
}

const RecipeContent: React.FC<RecipeContentProps> = ({
  recipe,
  activeTab,
  setActiveTab,
  instructionSteps,
  youtubeVideoId,
  contentRef,
  contentVisible,
}) => {
  return (
    <div 
      ref={contentRef}
      className={cn(
        "transition-all duration-500 opacity-0 translate-y-8",
        contentVisible && "opacity-100 translate-y-0"
      )}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="ingredients" className="flex-1 md:flex-initial">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions" className="flex-1 md:flex-initial">Instructions</TabsTrigger>
          {youtubeVideoId && (
            <TabsTrigger value="video" className="flex-1 md:flex-initial">Video</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="ingredients" className="animate-fade-in">
          <RecipeIngredients recipe={recipe} />
        </TabsContent>
        <TabsContent value="instructions" className="animate-fade-in">
          <RecipeInstructions instructions={instructionSteps} />
        </TabsContent>
        {youtubeVideoId && (
          <TabsContent value="video" className="animate-fade-in">
            <RecipeVideo videoId={youtubeVideoId} title={recipe.strMeal} />
          </TabsContent>
        )}
      </Tabs>
      
      {/* Video section outside tabs for better visibility */}
      {youtubeVideoId && (
        <div className="mt-8">
          <h3 className="font-medium text-lg mb-4">Watch Recipe Video</h3>
          <RecipeVideo videoId={youtubeVideoId} title={recipe.strMeal} />
        </div>
      )}
    </div>
  );
};

export default RecipeContent;
