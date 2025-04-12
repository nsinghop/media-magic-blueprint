
import PostCreator from "@/components/posts/PostCreator";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/common/ContentCard";
import { useEffect, useState } from "react";
import { useDatabase, Post } from "@/contexts/DatabaseContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Posts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { posts, fetchPosts, isLoading } = useDatabase();
  const [activeTab, setActiveTab] = useState<'compose' | 'published' | 'scheduled' | 'drafts'>('compose');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Get activeTab from location state if available
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts().then(() => {
      setInitialLoadComplete(true);
    });
  }, [fetchPosts]);

  // Filter posts based on active tab
  useEffect(() => {
    if (posts.length > 0) {
      if (activeTab === 'published') {
        setFilteredPosts(posts.filter(post => post.status === 'published'));
      } else if (activeTab === 'scheduled') {
        setFilteredPosts(posts.filter(post => post.status === 'scheduled'));
      } else if (activeTab === 'drafts') {
        setFilteredPosts(posts.filter(post => post.status === 'draft'));
      } else {
        setFilteredPosts([]);
      }
    } else {
      setFilteredPosts([]);
    }
  }, [posts, activeTab]);

  const handleEditPost = (postId: string) => {
    navigate('/posts', { state: { activeTab: 'compose', editPostId: postId } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Posts</h2>
              {activeTab !== 'compose' && (
                <Button onClick={() => setActiveTab('compose')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              )}
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
            ) : isLoading && !initialLoadComplete ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <ContentCard 
                    key={post.id} 
                    {...post} 
                    onEdit={() => handleEditPost(post.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <PlusCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No {activeTab} posts yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {activeTab === 'published' 
                    ? "You haven't published any posts yet. Create and publish your first post."
                    : activeTab === 'scheduled'
                    ? "You don't have any scheduled posts. Schedule posts to be published later."
                    : "You don't have any draft posts. Save your work in progress as drafts."}
                </p>
                <Button onClick={() => setActiveTab('compose')}>
                  Create New Post
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Posts;
