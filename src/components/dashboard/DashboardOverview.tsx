
import ContentCard from "@/components/common/ContentCard";
import MetricCard from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye, MessageSquare, ThumbsUp, TrendingUp, Users } from "lucide-react";

const DashboardOverview = () => {
  const samplePosts = [
    {
      content: "Check out our newest product line, just launched today! #NewProduct #Innovation",
      platforms: ['facebook', 'twitter', 'instagram'] as const,
      status: 'published' as const,
      date: "Apr 11, 2025",
      stats: {
        likes: 245,
        comments: 32,
        shares: 18
      }
    },
    {
      content: "Join our upcoming webinar on social media marketing strategies for 2025.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
      platforms: ['linkedin', 'facebook'] as const,
      status: 'scheduled' as const,
      date: "Apr 15, 2025",
      time: "2:00 PM"
    },
    {
      content: "Looking for feedback on our new website design. What do you think?",
      platforms: ['twitter', 'linkedin'] as const,
      status: 'draft' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 30 Days
          </Button>
          <Button size="sm">
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Followers"
          value="24,521"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Post Impressions"
          value="452K"
          icon={<Eye className="h-5 w-5 text-primary" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Engagement Rate"
          value="5.28%"
          icon={<ThumbsUp className="h-5 w-5 text-primary" />}
          trend={{ value: 1.5, isPositive: true }}
        />
        <MetricCard
          title="Link Clicks"
          value="3,852"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Performance Overview</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm h-72 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h4 className="text-lg font-medium">Engagement Metrics</h4>
              <p className="text-sm text-muted-foreground">
                Your engagement has increased by 15% this month
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm grid gap-2">
            <Button className="justify-start">Create New Post</Button>
            <Button variant="outline" className="justify-start">Schedule Content</Button>
            <Button variant="outline" className="justify-start">Analyze Performance</Button>
            <Button variant="outline" className="justify-start">Connect Platform</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Content</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {samplePosts.map((post, index) => (
            <ContentCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
