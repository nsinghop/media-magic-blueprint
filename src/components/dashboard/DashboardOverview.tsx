
import ContentCard from "@/components/common/ContentCard";
import MetricCard from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Eye, 
  MessageSquare, 
  ThumbsUp, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { useDatabase } from "@/contexts/DatabaseContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const DashboardOverview = () => {
  const { posts, trends, fetchPosts, fetchTrends, isLoading } = useDatabase();
  const { isAuthenticated, connectedPlatforms } = useAuth();
  const [recentPosts, setRecentPosts] = useState<typeof posts>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchTrends();
  }, [fetchPosts, fetchTrends]);

  useEffect(() => {
    if (posts.length) {
      setRecentPosts(posts.slice(0, 3));
    }
  }, [posts]);

  const handleCreatePost = () => {
    navigate('/posts', { state: { activeTab: 'compose' } });
  };

  const handleAnalyzePerformance = () => {
    navigate('/analytics');
  };

  const handleScheduleContent = () => {
    navigate('/calendar');
  };

  const handleConnectPlatform = () => {
    navigate('/platforms');
  };

  const handleViewTrend = (trend: (typeof trends)[0]) => {
    toast({
      title: `Trend: ${trend.title}`,
      description: trend.description,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 30 Days
          </Button>
          <Button size="sm" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Followers"
          value={connectedPlatforms.length > 0 ? "24,521" : "0"}
          icon={<Users className="h-5 w-5 text-primary" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Post Impressions"
          value={connectedPlatforms.length > 0 ? "452K" : "0"}
          icon={<Eye className="h-5 w-5 text-primary" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Engagement Rate"
          value={connectedPlatforms.length > 0 ? "5.28%" : "0%"}
          icon={<ThumbsUp className="h-5 w-5 text-primary" />}
          trend={{ value: 1.5, isPositive: true }}
        />
        <MetricCard
          title="Link Clicks"
          value={connectedPlatforms.length > 0 ? "3,852" : "0"}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Performance Overview</h3>
            <Button variant="ghost" size="sm" onClick={handleAnalyzePerformance}>
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm h-72 flex items-center justify-center">
            {connectedPlatforms.length > 0 ? (
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h4 className="text-lg font-medium">Engagement Metrics</h4>
                <p className="text-sm text-muted-foreground">
                  Your engagement has increased by 15% this month
                </p>
              </div>
            ) : (
              <div className="text-center max-w-md mx-auto">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h4 className="text-lg font-medium">Connect Your Platforms</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your social media accounts to start tracking performance metrics.
                </p>
                <Button onClick={handleConnectPlatform}>
                  Connect Platforms
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm grid gap-2">
            <Button className="justify-start" onClick={handleCreatePost}>Create New Post</Button>
            <Button variant="outline" className="justify-start" onClick={handleScheduleContent}>Schedule Content</Button>
            <Button variant="outline" className="justify-start" onClick={handleAnalyzePerformance}>Analyze Performance</Button>
            <Button variant="outline" className="justify-start" onClick={handleConnectPlatform}>Connect Platform</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Trends on Social Media</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-white p-4 rounded-lg border shadow-sm h-48">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6 mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))
          ) : trends.length > 0 ? (
            trends.map((trend) => (
              <div 
                key={trend.id} 
                className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewTrend(trend)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-full ${
                    trend.platform === 'instagram' ? 'bg-pink-100 text-pink-600' :
                    trend.platform === 'twitter' ? 'bg-blue-100 text-blue-600' :
                    trend.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {trend.platform === 'instagram' && <span className="text-xs font-bold">IG</span>}
                    {trend.platform === 'twitter' && <span className="text-xs font-bold">𝕏</span>}
                    {trend.platform === 'linkedin' && <span className="text-xs font-bold">in</span>}
                    {trend.platform === 'facebook' && <span className="text-xs font-bold">f</span>}
                  </div>
                  <div className="flex items-center text-green-600 text-xs font-medium">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {trend.growth}%
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm mb-1">{trend.title}</h4>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{trend.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {trend.hashtags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                  {trend.hashtags.length > 2 && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">+{trend.hashtags.length - 2}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-4 text-center p-8 bg-white rounded-lg border">
              <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h4 className="text-lg font-medium">No trends available</h4>
              <p className="text-sm text-muted-foreground">
                Connect your social media accounts to see trending topics.
              </p>
            </div>
          )}
        </div>
      </div>

      {recentPosts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Content</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/posts')}>
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <ContentCard 
                key={post.id} 
                {...post} 
                onEdit={() => navigate('/posts', { state: { editPostId: post.id } })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
