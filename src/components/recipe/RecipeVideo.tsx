
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface RecipeVideoProps {
  videoId: string;
  title: string;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({ videoId, title }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${title} video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeVideo;
