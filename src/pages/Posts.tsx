
import PostCreator from "@/components/posts/PostCreator";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/common/ContentCard";
import { useState } from "react";

const Posts = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'published' | 'scheduled' | 'drafts'>('compose');

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Posts</h2>
            </div>

            <div className="flex border-b">
              <Button
                variant={activeTab === 'compose' ? 'default' : 'ghost'}
                className="rounded-none border-b-2 border-transparent hover:border-primary py-2 px-4"
                onClick={() => setActiveTab('compose')}
              >
                Compose
              </Button>
              <Button
                variant={activeTab === 'published' ? 'default' : 'ghost'}
                className="rounded-none border-b-2 border-transparent hover:border-primary py-2 px-4"
                onClick={() => setActiveTab('published')}
              >
                Published
              </Button>
              <Button
                variant={activeTab === 'scheduled' ? 'default' : 'ghost'}
                className="rounded-none border-b-2 border-transparent hover:border-primary py-2 px-4"
                onClick={() => setActiveTab('scheduled')}
              >
                Scheduled
              </Button>
              <Button
                variant={activeTab === 'drafts' ? 'default' : 'ghost'}
                className="rounded-none border-b-2 border-transparent hover:border-primary py-2 px-4"
                onClick={() => setActiveTab('drafts')}
              >
                Drafts
              </Button>
            </div>

            {activeTab === 'compose' ? (
              <PostCreator />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {samplePosts
                  .filter(post => {
                    if (activeTab === 'published') return post.status === 'published';
                    if (activeTab === 'scheduled') return post.status === 'scheduled';
                    if (activeTab === 'drafts') return post.status === 'draft';
                    return true;
                  })
                  .map((post, index) => (
                    <ContentCard key={index} {...post} />
                  ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Posts;
