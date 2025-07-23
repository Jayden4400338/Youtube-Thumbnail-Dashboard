import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Thumbnail {
  id: string;
  file: File;
  preview: string;
  duration: string;
}

const ThumbnailManager = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [autoRotation, setAutoRotation] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const thumbnail: Thumbnail = {
            id: Date.now().toString() + Math.random(),
            file,
            preview: e.target?.result as string,
            duration: "auto"
          };
          setThumbnails(prev => [...prev, thumbnail]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeThumbnail = (id: string) => {
    setThumbnails(thumbnails.filter(thumb => thumb.id !== id));
  };

  const updateDuration = (id: string, duration: string) => {
    setThumbnails(thumbnails.map(thumb => 
      thumb.id === id ? { ...thumb, duration } : thumb
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <span>Thumbnail Management</span>
        </CardTitle>
        <CardDescription>
          Upload and schedule multiple thumbnails for testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoRotation}
              onCheckedChange={setAutoRotation}
            />
            <Label className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Even spacing across test period</span>
            </Label>
          </div>
          <Button onClick={() => fileInputRef.current?.click()} size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Thumbnails
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        {thumbnails.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No thumbnails uploaded</h3>
            <p className="text-muted-foreground mb-4">
              Upload 3-6 thumbnail variations to start testing
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First Thumbnail
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thumbnails.map((thumbnail, index) => (
              <div key={thumbnail.id} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={thumbnail.preview}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    onClick={() => removeThumbnail(thumbnail.id)}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Thumbnail {index + 1}</span>
                    <span>{(thumbnail.file.size / 1024 / 1024).toFixed(1)}MB</span>
                  </div>
                  
                  {!autoRotation && (
                    <Select
                      value={thumbnail.duration}
                      onValueChange={(value) => updateDuration(thumbnail.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Duration</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="6h">6 hours</SelectItem>
                        <SelectItem value="12h">12 hours</SelectItem>
                        <SelectItem value="1d">1 day</SelectItem>
                        <SelectItem value="2d">2 days</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {thumbnails.length > 0 && thumbnails.length < 6 && (
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            variant="outline" 
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Add More Thumbnails ({thumbnails.length}/6)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ThumbnailManager;