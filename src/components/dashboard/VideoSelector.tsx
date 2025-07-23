import { useState } from "react";
import { Search, Video, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VideoSelector = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from YouTube API
  const mockVideos = [
    {
      id: "1",
      title: "How to Build a React App in 2024",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      views: "125K",
      publishedAt: "2024-01-15"
    },
    {
      id: "2", 
      title: "TypeScript Tutorial for Beginners",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      views: "89K",
      publishedAt: "2024-01-10"
    },
    {
      id: "3",
      title: "CSS Grid vs Flexbox Explained",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
      views: "67K",
      publishedAt: "2024-01-05"
    }
  ];

  const filteredVideos = mockVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Video className="h-5 w-5 text-primary" />
          <span>Select Video to Test</span>
        </CardTitle>
        <CardDescription>
          Choose a video from your YouTube channel to test thumbnails and titles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-3 max-h-64 overflow-y-auto">
          {filteredVideos.map((video) => (
            <div key={video.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-16 h-9 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{video.title}</h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.publishedAt}</span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Select
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSelector;