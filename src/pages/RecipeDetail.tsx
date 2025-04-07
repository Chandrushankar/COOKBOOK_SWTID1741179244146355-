
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/services/recipeApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useFavorites from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeContent from "@/components/recipe/RecipeContent";
import RecipeSidebar from "@/components/recipe/RecipeSidebar";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("ingredients");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id || ""),
    enabled: !!id,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load recipe. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  useEffect(() => {
    if (error) {
      console.error("Recipe fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to load recipe. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error]);

  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (recipe) {
      console.log("Recipe loaded:", recipe);
      setImages([recipe.strMealThumb]);
    }
  }, [recipe]);

  const handleToggleFavorite = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
      toast({
        description: `${recipe.strMeal} removed from favorites`
      });
    } else {
      addFavorite(recipe);
      toast({
        description: `${recipe.strMeal} added to favorites`
      });
    }
  };

  const getYoutubeVideoId = (url: string | undefined) => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const isInFavorites = recipe ? isFavorite(recipe.idMeal) : false;

  const youtubeVideoId = recipe?.strYoutube ? getYoutubeVideoId(recipe.strYoutube) : null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Skeleton className="h-10 w-2/3 max-w-md" />
        </div>
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-8 w-full max-w-md" />
            <Tabs defaultValue="ingredients">
              <TabsList>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {[...Array(8)].map((_, i) => (
                        <li key={i} className="flex items-start">
                          <Skeleton className="h-4 w-full" />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructions">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The recipe you are looking for could not be found.
        </p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  const instructionSteps = recipe.strInstructions
    .split(".")
    .filter(step => step.trim().length > 0)
    .map(step => step.trim() + ".");

  return (
    <div className="container mx-auto px-4 py-8">
      <RecipeHeader 
        recipe={recipe}
        images={images}
        headerRef={headerRef}
        headerVisible={headerVisible}
        onBack={() => navigate(-1)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <RecipeContent
            recipe={recipe}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            instructionSteps={instructionSteps}
            youtubeVideoId={youtubeVideoId}
            contentRef={contentRef}
            contentVisible={contentVisible}
          />
        </div>
        
        <div className={cn(
          "transition-all duration-500 opacity-0 translate-y-8",
          contentVisible && "opacity-100 translate-y-0"
        )}>
          <RecipeSidebar
            recipe={recipe}
            isInFavorites={isInFavorites}
            onToggleFavorite={handleToggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
