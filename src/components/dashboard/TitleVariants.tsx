import { useState } from "react";
import { Plus, X, Type, Shuffle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TitleVariant {
  id: string;
  title: string;
  duration: string;
}

const TitleVariants = () => {
  const [titles, setTitles] = useState<TitleVariant[]>([
    { id: "1", title: "", duration: "auto" }
  ]);
  const [randomRotation, setRandomRotation] = useState(false);

  const addTitle = () => {
    const newTitle: TitleVariant = {
      id: Date.now().toString(),
      title: "",
      duration: "auto"
    };
    setTitles([...titles, newTitle]);
  };

  const removeTitle = (id: string) => {
    setTitles(titles.filter(title => title.id !== id));
  };

  const updateTitle = (id: string, field: keyof TitleVariant, value: string) => {
    setTitles(titles.map(title => 
      title.id === id ? { ...title, [field]: value } : title
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Type className="h-5 w-5 text-primary" />
          <span>Title Variants</span>
        </CardTitle>
        <CardDescription>
          Create multiple title variations to test alongside thumbnails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={randomRotation}
              onCheckedChange={setRandomRotation}
            />
            <Label htmlFor="random-rotation" className="flex items-center space-x-2">
              <Shuffle className="h-4 w-4" />
              <span>Random rotation</span>
            </Label>
          </div>
          <Button onClick={addTitle} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Title
          </Button>
        </div>

        <div className="space-y-3">
          {titles.map((titleVariant, index) => (
            <div key={titleVariant.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <Input
                  placeholder={`Title variant ${index + 1}`}
                  value={titleVariant.title}
                  onChange={(e) => updateTitle(titleVariant.id, "title", e.target.value)}
                />
              </div>

              {!randomRotation && (
                <div className="w-32">
                  <Select
                    value={titleVariant.duration}
                    onValueChange={(value) => updateTitle(titleVariant.id, "duration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="6h">6 hours</SelectItem>
                      <SelectItem value="12h">12 hours</SelectItem>
                      <SelectItem value="1d">1 day</SelectItem>
                      <SelectItem value="2d">2 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {titles.length > 1 && (
                <Button
                  onClick={() => removeTitle(titleVariant.id)}
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {titles.length < 5 && (
          <Button onClick={addTitle} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Title ({titles.length}/5)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TitleVariants;