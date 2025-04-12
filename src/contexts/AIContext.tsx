
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface AIContextType {
  generateSocialPost: (prompt: string) => Promise<string>;
  improveContent: (content: string) => Promise<string>;
  analyzePostPerformance: (stats: any) => Promise<string>;
  generateContentIdeas: (topic: string, count?: number) => Promise<string[]>;
  suggestHashtags: (content: string, count?: number) => Promise<string[]>;
  isGenerating: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const mockAIDelay = async () => {
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, delay));
  };

  const generateSocialPost = async (prompt: string) => {
    setIsGenerating(true);
    try {
      await mockAIDelay();
      
      // Mock AI response with a generated post
      const responses = [
        "Excited to announce our newest feature update! 🚀 Check out how our platform is making social media management easier than ever. #ProductUpdate #SocialMedia",
        "Just dropped: Our comprehensive guide to social media marketing in 2025! Learn the strategies that top brands are using to connect with their audience. #MarketingTips #SocialStrategy",
        "We're thrilled to be featured in @TechCrunch today! Read how our innovative approach is changing the social media landscape. #StartupLife #Innovation",
        "Working remotely? Our latest blog post covers 5 essential tools to boost your productivity while managing social media from anywhere. #RemoteWork #Productivity",
        "Join us for our upcoming webinar on social media analytics! Learn how to turn data into actionable insights. Register now (link in bio) #Analytics #Webinar"
      ];
      
      const result = responses[Math.floor(Math.random() * responses.length)];
      
      return result;
    } catch (error) {
      console.error("Error generating social post:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate social post content",
        variant: "destructive",
      });
      return "Failed to generate content. Please try again.";
    } finally {
      setIsGenerating(false);
    }
  };

  const improveContent = async (content: string) => {
    setIsGenerating(true);
    try {
      await mockAIDelay();
      
      // Mock AI content improvement
      const improved = content.length > 10 ? 
        `${content} [AI Enhanced] 🚀 Don't forget to engage with your audience by asking a question! What do you think about this? #trending` :
        "We need more content to improve. Try adding more details to your post!";
      
      return improved;
    } catch (error) {
      console.error("Error improving content:", error);
      toast({
        title: "Improvement failed",
        description: "Failed to improve content",
        variant: "destructive",
      });
      return content;
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzePostPerformance = async (stats: any) => {
    setIsGenerating(true);
    try {
      await mockAIDelay();
      
      // Mock AI analysis
      const analyses = [
        "This post performed well with high engagement. The visual content and question format likely contributed to its success.",
        "Performance is below average compared to your other content. Consider posting at a different time or using more engaging visuals.",
        "Great engagement rate! The hashtags used seem to be increasing your reach effectively.",
        "This content had good initial engagement but tapered off quickly. Consider follow-up content to maintain momentum.",
        "The engagement pattern suggests your audience found this highly valuable. Create more content on this topic."
      ];
      
      return analyses[Math.floor(Math.random() * analyses.length)];
    } catch (error) {
      console.error("Error analyzing performance:", error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze post performance",
        variant: "destructive",
      });
      return "Unable to analyze performance at this time.";
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContentIdeas = async (topic: string, count = 3) => {
    setIsGenerating(true);
    try {
      await mockAIDelay();
      
      // Mock AI content ideas based on topic
      const ideaGroups = {
        marketing: [
          "5 Social Media Trends to Watch in 2025",
          "How to Craft the Perfect Social Media Calendar",
          "Case Study: How Brand X Increased Engagement by 200%",
          "The Psychology Behind Viral Content",
          "Social Media Metrics That Actually Matter",
          "Building Community Through Social Media Engagement",
          "Content Repurposing: Get More from Your Social Media Efforts"
        ],
        product: [
          "Introducing Our New Feature: What You Need to Know",
          "Behind the Scenes: How We Built Our Latest Update",
          "Customer Spotlight: Creative Ways People Use Our Product",
          "Quick Tips to Maximize Your Experience With Our Platform",
          "Product FAQ: Answering Your Most Common Questions",
          "Comparison: How Our Solution Stands Out in the Market"
        ],
        default: [
          "10 Tips to Boost Your Social Media Engagement",
          "How to Create Content That Converts",
          "The Ultimate Guide to Social Media for Beginners",
          "Industry Insights: What's Changing in Social Media",
          "Success Story: From Zero to 10K Followers",
          "Behind the Scenes: A Day in Our Company",
          "Ask Me Anything: Your Questions Answered"
        ]
      };
      
      let ideas;
      if (topic.toLowerCase().includes('market')) {
        ideas = ideaGroups.marketing;
      } else if (topic.toLowerCase().includes('product')) {
        ideas = ideaGroups.product;
      } else {
        ideas = ideaGroups.default;
      }
      
      // Shuffle and take requested count
      return ideas
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      
    } catch (error) {
      console.error("Error generating content ideas:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate content ideas",
        variant: "destructive",
      });
      return ["Unable to generate ideas at this time."];
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestHashtags = async (content: string, count = 5) => {
    setIsGenerating(true);
    try {
      await mockAIDelay();
      
      const commonHashtags = [
        "#SocialMedia", "#Marketing", "#DigitalMarketing", "#ContentCreation",
        "#SocialMediaTips", "#MarketingStrategy", "#SMM", "#BusinessTips",
        "#ContentMarketing", "#MarketingTips", "#SocialMediaMarketing",
        "#OnlineMarketing", "#Branding", "#Business", "#Entrepreneur",
        "#Instagram", "#Facebook", "#Twitter", "#LinkedIn", "#Growth",
        "#Engagement", "#Strategy", "#Success", "#Productivity", "#Innovation"
      ];
      
      // Take random unique hashtags
      const selected = new Set<string>();
      while (selected.size < count) {
        const randomIndex = Math.floor(Math.random() * commonHashtags.length);
        selected.add(commonHashtags[randomIndex]);
      }
      
      return Array.from(selected);
    } catch (error) {
      console.error("Error suggesting hashtags:", error);
      toast({
        title: "Suggestion failed",
        description: "Failed to suggest hashtags",
        variant: "destructive",
      });
      return ["#SocialMedia", "#Content", "#Marketing"];
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AIContext.Provider value={{
      generateSocialPost,
      improveContent,
      analyzePostPerformance,
      generateContentIdeas,
      suggestHashtags,
      isGenerating
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
