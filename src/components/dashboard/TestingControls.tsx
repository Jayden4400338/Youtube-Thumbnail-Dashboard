import { Play, Pause, Square, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TestingControls = () => {
  const isTestRunning = false;
  const testProgress = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Test Controls</span>
          </div>
          <Badge variant={isTestRunning ? "default" : "secondary"}>
            {isTestRunning ? "Running" : "Ready"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Start, pause, or stop your thumbnail and title testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isTestRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Test Progress</span>
              <span>{testProgress}%</span>
            </div>
            <Progress value={testProgress} className="w-full" />
          </div>
        )}

        <div className="flex space-x-2">
          {!isTestRunning ? (
            <Button className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Start Test
            </Button>
          ) : (
            <>
              <Button variant="outline" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="destructive" className="flex-1">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>

        <div className="p-4 bg-accent rounded-lg space-y-2">
          <h4 className="font-medium text-sm">Test Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Video:</span>
              <div className="font-medium">No video selected</div>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <div className="font-medium">Not set</div>
            </div>
            <div>
              <span className="text-muted-foreground">Thumbnails:</span>
              <div className="font-medium">0 uploaded</div>
            </div>
            <div>
              <span className="text-muted-foreground">Titles:</span>
              <div className="font-medium">1 variant</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingControls;