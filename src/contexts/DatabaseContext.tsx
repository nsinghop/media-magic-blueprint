import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { SocialPlatform } from '@/components/common/ContentCard';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  content: string;
  image?: string;
  platforms: SocialPlatform[];
  status: 'draft' | 'scheduled' | 'published';
  date?: string;
  time?: string;
  createdAt: string;
  updatedAt: string;
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

export interface SocialTrend {
  id: string;
  platform: SocialPlatform;
  title: string;
  description: string;
  impressions: number;
  growth: number;
  hashtags: string[];
}

export interface FreelancerProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
  completedJobs: number;
  avatar: string;
  available: boolean;
}

interface DatabaseContextType {
  posts: Post[];
  trends: SocialTrend[];
  freelancers: FreelancerProfile[];
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Post>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchTrends: () => Promise<void>;
  fetchFreelancers: () => Promise<void>;
  isLoading: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [trends, setTrends] = useState<SocialTrend[]>([]);
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use stored posts or initial mock data if none exist
      const storedPosts = localStorage.getItem('socialbox_posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        const mockPosts: Post[] = [
          {
            id: '1',
            content: "Check out our newest product line, just launched today! #NewProduct #Innovation",
            platforms: ['facebook', 'twitter', 'instagram'],
            status: 'published',
            date: "Apr 11, 2025",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            stats: {
              likes: 245,
              comments: 32,
              shares: 18
            }
          },
          {
            id: '2',
            content: "Join our upcoming webinar on social media marketing strategies for 2025.",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
            platforms: ['linkedin', 'facebook'],
            status: 'scheduled',
            date: "Apr 15, 2025",
            time: "2:00 PM",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            content: "Looking for feedback on our new website design. What do you think?",
            platforms: ['twitter', 'linkedin'],
            status: 'draft',
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          }
        ];
        setPosts(mockPosts);
        localStorage.setItem('socialbox_posts', JSON.stringify(mockPosts));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Failed to load posts",
        description: "Could not retrieve your posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTrends = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrends: SocialTrend[] = [
        {
          id: '1',
          platform: 'instagram',
          title: "Reels with Text Overlays",
          description: "Short video content with impactful text overlays is gaining massive traction on Instagram",
          impressions: 5400000,
          growth: 24.5,
          hashtags: ["#reels", "#contentcreator", "#videocontent"]
        },
        {
          id: '2',
          platform: 'twitter',
          title: "AI Ethics Discussions",
          description: "Conversations around ethical AI use and regulations are trending strongly on Twitter",
          impressions: 3200000,
          growth: 18.2,
          hashtags: ["#AIethics", "#technology", "#futureofAI"]
        },
        {
          id: '3',
          platform: 'linkedin',
          title: "Remote Work Culture",
          description: "Content about building effective remote team culture continues to grow on LinkedIn",
          impressions: 2100000,
          growth: 12.8,
          hashtags: ["#remotework", "#futureofwork", "#teamculture"]
        },
        {
          id: '4',
          platform: 'facebook',
          title: "Sustainable Business Practices",
          description: "Posts highlighting sustainable and eco-friendly business initiatives are gaining engagement",
          impressions: 4300000,
          growth: 15.6,
          hashtags: ["#sustainability", "#ecofriendly", "#greeninitiative"]
        }
      ];
      
      setTrends(mockTrends);
    } catch (error) {
      console.error("Error fetching trends:", error);
      toast({
        title: "Failed to load trends",
        description: "Could not retrieve trending topics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFreelancers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockFreelancers: FreelancerProfile[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          title: 'Social Media Strategist',
          skills: ['Content Strategy', 'Instagram', 'TikTok', 'Analytics'],
          rating: 4.9,
          hourlyRate: 65,
          completedJobs: 187,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          available: true
        },
        {
          id: '2',
          name: 'Michael Chen',
          title: 'Digital Marketing Specialist',
          skills: ['FB/IG Ads', 'Content Creation', 'SEO', 'Email Marketing'],
          rating: 4.8,
          hourlyRate: 75,
          completedJobs: 124,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
          available: true
        },
        {
          id: '3',
          name: 'Emma Rodriguez',
          title: 'Content Creator & Copywriter',
          skills: ['Copywriting', 'Video Production', 'Branding', 'Photoshop'],
          rating: 4.7,
          hourlyRate: 60,
          completedJobs: 93,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
          available: false
        },
        {
          id: '4',
          name: 'David Kim',
          title: 'LinkedIn & B2B Specialist',
          skills: ['LinkedIn Strategy', 'B2B Marketing', 'Lead Generation', 'Analytics'],
          rating: 4.9,
          hourlyRate: 85,
          completedJobs: 156,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
          available: true
        },
        {
          id: '5',
          name: 'Priya Patel',
          title: 'Social Media Ads Expert',
          skills: ['Meta Ads', 'Google Ads', 'PPC', 'Campaign Management'],
          rating: 4.8,
          hourlyRate: 70,
          completedJobs: 142,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
          available: true
        }
      ];
      
      setFreelancers(mockFreelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      toast({
        title: "Failed to load freelancers",
        description: "Could not retrieve freelancer profiles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchTrends();
    fetchFreelancers();
  }, [fetchPosts, fetchTrends, fetchFreelancers]);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('socialbox_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      const newPost: Post = {
        ...postData,
        id: `post-${Date.now()}`,
        createdAt: now,
        updatedAt: now
      };
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      toast({
        title: "Post created",
        description: postData.status === 'published' 
          ? "Your post has been published successfully" 
          : postData.status === 'scheduled'
          ? "Your post has been scheduled"
          : "Your draft has been saved",
      });
      
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Failed to create post",
        description: "There was an error creating your post. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find the post to update
      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      
      // Update the post
      const updatedPost: Post = {
        ...posts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      const newPosts = [...posts];
      newPosts[postIndex] = updatedPost;
      setPosts(newPosts);
      
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully",
      });
      
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Failed to update post",
        description: "There was an error updating your post. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Failed to delete post",
        description: "There was an error deleting your post. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DatabaseContext.Provider value={{
      posts,
      trends,
      freelancers,
      createPost,
      updatePost,
      deletePost,
      fetchPosts,
      fetchTrends,
      fetchFreelancers,
      isLoading
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
