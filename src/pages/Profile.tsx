
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import useFavorites from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("favorites");
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 animate-fade-in">
        <h1 className="text-4xl font-serif font-medium mb-4">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your recipes and account settings
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Username</h3>
                  <p>{user.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Member Since</h3>
                  <p>April 2023</p>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full mt-4" 
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto mb-6">
              <TabsTrigger value="favorites" className="flex-1 md:flex-initial">
                Favorite Recipes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="favorites">
              {favorites.length > 0 ? (
                <RecipeGrid recipes={favorites} />
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't saved any recipes to your favorites yet.
                      </p>
                      <Button asChild>
                        <a href="/">Discover Recipes</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
