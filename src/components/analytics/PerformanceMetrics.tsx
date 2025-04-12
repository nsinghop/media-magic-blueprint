
import MetricCard from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight, BarChart3, Clock, Gauge, Heart, Share2, Users, Volume2 } from "lucide-react";
import { useState } from "react";

const PerformanceMetrics = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <div className="flex gap-1">
          <Button 
            variant={timeframe === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('7d')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeframe === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('30d')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeframe === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Audience Growth</h3>
            <Button variant="ghost" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
              +12.5%
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Analytics chart will appear here
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Engagement Rate</h3>
            <Button variant="ghost" size="sm">
              <ArrowDownRight className="h-4 w-4 mr-1 text-red-600" />
              -2.1%
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Analytics chart will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Followers"
            value="24,521"
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Reach"
            value="452K"
            icon={<Volume2 className="h-5 w-5 text-primary" />}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="Engagement"
            value="5.28%"
            icon={<Heart className="h-5 w-5 text-primary" />}
            trend={{ value: 1.5, isPositive: false }}
          />
          <MetricCard
            title="Average Response Time"
            value="1.2h"
            icon={<Clock className="h-5 w-5 text-primary" />}
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h3 className="font-semibold mb-3">Top Performing Content</h3>
          <div className="space-y-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-medium">
                  {item}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Post Title {item}: Engaging content that performed well
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Heart className="h-3 w-3 mr-1" />
                    <span className="mr-2">{1250 - (item * 300)}</span>
                    <Share2 className="h-3 w-3 mr-1" />
                    <span>{125 - (item * 30)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h3 className="font-semibold mb-3">Platform Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Gauge className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart breakdown will appear here
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h3 className="font-semibold mb-3">Audience Demographics</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Demographics chart will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
