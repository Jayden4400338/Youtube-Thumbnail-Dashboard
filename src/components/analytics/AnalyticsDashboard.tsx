import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Eye, MousePointer, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsDashboard = () => {
  // Mock data for demo
  const ctrData = [
    { name: "Thumbnail A", ctr: 4.2, impressions: 12500, clicks: 525 },
    { name: "Thumbnail B", ctr: 3.8, impressions: 11200, clicks: 426 },
    { name: "Thumbnail C", ctr: 5.1, impressions: 13800, clicks: 704 },
    { name: "Thumbnail D", ctr: 2.9, impressions: 9600, clicks: 278 },
  ];

  const timeSeriesData = [
    { time: "Day 1", thumbnailA: 4.1, thumbnailB: 3.9, thumbnailC: 5.0 },
    { time: "Day 2", thumbnailA: 4.3, thumbnailB: 3.7, thumbnailC: 5.2 },
    { time: "Day 3", thumbnailA: 4.2, thumbnailB: 3.8, thumbnailC: 5.1 },
    { time: "Day 4", thumbnailA: 4.4, thumbnailB: 3.6, thumbnailC: 5.3 },
  ];

  const bestPerforming = ctrData.reduce((prev, current) => 
    prev.ctr > current.ctr ? prev : current
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best CTR</CardTitle>
            <Trophy className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{bestPerforming.ctr}%</div>
            <p className="text-xs text-muted-foreground">
              {bestPerforming.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ctrData.reduce((sum, item) => sum + item.impressions, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all thumbnails
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ctrData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all thumbnails
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(ctrData.reduce((sum, item) => sum + item.ctr, 0) / ctrData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              All thumbnails combined
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CTR Comparison</CardTitle>
            <CardDescription>
              Click-through rate performance by thumbnail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ctrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === 'ctr' ? 'CTR' : name
                  ]}
                />
                <Bar dataKey="ctr" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CTR Over Time</CardTitle>
            <CardDescription>
              Performance trends during the testing period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="thumbnailA" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Thumbnail A"
                />
                <Line 
                  type="monotone" 
                  dataKey="thumbnailB" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Thumbnail B"
                />
                <Line 
                  type="monotone" 
                  dataKey="thumbnailC" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  name="Thumbnail C"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Results</CardTitle>
          <CardDescription>
            Complete performance breakdown for each thumbnail variant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Thumbnail</th>
                  <th className="text-right p-2">Impressions</th>
                  <th className="text-right p-2">Clicks</th>
                  <th className="text-right p-2">CTR</th>
                  <th className="text-right p-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {ctrData.map((item, index) => (
                  <tr key={item.name} className="border-b">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2 text-right">{item.impressions.toLocaleString()}</td>
                    <td className="p-2 text-right">{item.clicks.toLocaleString()}</td>
                    <td className="p-2 text-right font-medium">{item.ctr}%</td>
                    <td className="p-2 text-right">
                      {item.name === bestPerforming.name ? (
                        <span className="text-success font-medium">Best</span>
                      ) : item.ctr > 4.0 ? (
                        <span className="text-warning">Good</span>
                      ) : (
                        <span className="text-muted-foreground">Below avg</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;