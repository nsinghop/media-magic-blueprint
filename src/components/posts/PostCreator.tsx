
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  Facebook,
  Image,
  Instagram,
  Linkedin,
  Link2,
  Smile,
  Twitter,
  Video,
  Sparkles,
  Hash,
  Loader2,
  Save,
  Send
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SocialPlatform } from "../common/ContentCard";
import { useAuth } from "@/contexts/AuthContext";
import { useAI } from "@/contexts/AIContext";
import { useDatabase } from "@/contexts/DatabaseContext";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PostCreator = () => {
  const { connectedPlatforms } = useAuth();
  const { isGenerating, generateSocialPost, improveContent, suggestHashtags } = useAI();
  const { createPost } = useDatabase();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiInput, setShowAiInput] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('12:00');
  const aiInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const platforms: { id: SocialPlatform; icon: JSX.Element; name: string; connected: boolean }[] = [
    { id: 'facebook', icon: <Facebook />, name: 'Facebook', connected: connectedPlatforms.some(p => p.platform === 'facebook') },
    { id: 'twitter', icon: <Twitter />, name: 'Twitter', connected: connectedPlatforms.some(p => p.platform === 'twitter') },
    { id: 'instagram', icon: <Instagram />, name: 'Instagram', connected: connectedPlatforms.some(p => p.platform === 'instagram') },
    { id: 'linkedin', icon: <Linkedin />, name: 'LinkedIn', connected: connectedPlatforms.some(p => p.platform === 'linkedin') }
  ];
  
  useEffect(() => {
    // Auto-select connected platforms
    if (connectedPlatforms.length > 0 && selectedPlatforms.length === 0) {
      setSelectedPlatforms(connectedPlatforms.map(p => p.platform));
    }
  }, [connectedPlatforms, selectedPlatforms.length]);

  useEffect(() => {
    if (showAiInput && aiInputRef.current) {
      aiInputRef.current.focus();
    }
  }, [showAiInput]);
  
  const togglePlatform = (platform: SocialPlatform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a topic or idea for the AI to generate content",
        variant: "destructive",
      });
      return;
    }

    try {
      const generatedContent = await generateSocialPost(aiPrompt);
      setContent(generatedContent);
      setShowAiInput(false);
      setAiPrompt('');
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const handleImproveContent = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to improve",
        description: "Please write some content first",
        variant: "destructive",
      });
      return;
    }

    try {
      const improvedContent = await improveContent(content);
      setContent(improvedContent);
    } catch (error) {
      console.error("Error improving content:", error);
    }
  };

  const handleAddHashtags = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please write some content first before adding hashtags",
        variant: "destructive",
      });
      return;
    }

    try {
      const hashtags = await suggestHashtags(content, 3);
      setContent(prev => `${prev} ${hashtags.join(' ')}`);
    } catch (error) {
      console.error("Error suggesting hashtags:", error);
    }
  };

  const handlePostNow = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty content",
        description: "Please add content to your post",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPost({
        content,
        image,
        platforms: selectedPlatforms,
        status: 'published',
        date: format(new Date(), 'MMM dd, yyyy')
      });
      
      // Reset form
      setContent('');
      setImage(undefined);
      navigate('/posts');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSaveDraft = async () => {
    if (!content.trim() && !image) {
      toast({
        title: "Empty draft",
        description: "Please add content or an image to save as draft",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPost({
        content,
        image,
        platforms: selectedPlatforms.length > 0 ? selectedPlatforms : ['facebook'],
        status: 'draft'
      });
      
      // Reset form
      setContent('');
      setImage(undefined);
      navigate('/posts', { state: { activeTab: 'drafts' } });
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleSchedulePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty content",
        description: "Please add content to your post",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "No date selected",
        description: "Please select a date for scheduling",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPost({
        content,
        image,
        platforms: selectedPlatforms,
        status: 'scheduled',
        date: format(date, 'MMM dd, yyyy'),
        time
      });
      
      // Reset form
      setContent('');
      setImage(undefined);
      setDate(undefined);
      setTime('12:00');
      setShowScheduler(false);
      navigate('/posts', { state: { activeTab: 'scheduled' } });
    } catch (error) {
      console.error("Error scheduling post:", error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="mb-4">
        {connectedPlatforms.length === 0 ? (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-4">
            <p className="font-medium">No platforms connected</p>
            <p className="text-sm">Connect social media platforms to publish your content.</p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-700" 
              onClick={() => navigate('/platforms')}
            >
              Connect platforms
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {platforms.map(platform => (
              <Button
                key={platform.id}
                variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                className={`gap-2 ${!platform.connected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => platform.connected && togglePlatform(platform.id)}
                disabled={!platform.connected}
              >
                {platform.icon}
                <span>{platform.name}</span>
              </Button>
            ))}
          </div>
        )}
        
        <div className="relative">
          {showAiInput && (
            <div className="flex items-center gap-2 mb-3">
              <input
                ref={aiInputRef}
                type="text"
                placeholder="Describe what content you want to create..."
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
              />
              <Button 
                onClick={handleAiGenerate} 
                disabled={isGenerating || !aiPrompt.trim()}
                className="gap-2"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Generate
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setShowAiInput(false);
                  setAiPrompt('');
                }}
              >
                <span className="sr-only">Close</span>
                ×
              </Button>
            </div>
          )}
          
          <textarea
            className="w-full border rounded-lg p-3 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What would you like to share?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="absolute right-2 top-2 flex gap-1">
            {!showAiInput && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full bg-white"
                onClick={() => setShowAiInput(true)}
                title="Generate with AI"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </Button>
            )}
          </div>
        </div>
        
        {image && (
          <div className="mt-3 relative">
            <div className="rounded-lg overflow-hidden border">
              <img src={image} alt="Uploaded content" className="max-h-[200px] w-full object-cover" />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="h-6 w-6 absolute top-2 right-2 rounded-full"
              onClick={() => setImage(undefined)}
            >
              <span className="sr-only">Remove image</span>
              ×
            </Button>
          </div>
        )}
      </div>
      
      <div className="border rounded-lg p-4 mb-4">
        <div className="text-sm font-medium mb-2">AI Tools</div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleImproveContent}
            disabled={isGenerating || !content}
          >
            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            Enhance Content
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleAddHashtags}
            disabled={isGenerating || !content}
          >
            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Hash className="h-3 w-3" />}
            Suggest Hashtags
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Link2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          {showScheduler ? (
            <div className="border rounded-lg p-3 shadow-sm bg-white">
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Schedule post for:</p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Time:</p>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowScheduler(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSchedulePost}
                  disabled={!date}
                >
                  Schedule
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowScheduler(true)}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Schedule</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleSaveDraft}
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </Button>
              <Button
                className="gap-2"
                disabled={content.length === 0 || selectedPlatforms.length === 0}
                onClick={handlePostNow}
              >
                <Send className="h-4 w-4" />
                <span>Post Now</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
