import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import VideoSelector from "@/components/dashboard/VideoSelector";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import TitleVariants from "@/components/dashboard/TitleVariants";
import ThumbnailManager from "@/components/dashboard/ThumbnailManager";
import TestingControls from "@/components/dashboard/TestingControls";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("setup");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">Test Setup</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <VideoSelector />
                <TimePeriodSelector />
                <TestingControls />
              </div>
              
              <div className="space-y-6">
                <TitleVariants />
                <ThumbnailManager />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
