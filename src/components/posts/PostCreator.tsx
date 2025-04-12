
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
  Video
} from "lucide-react";
import { useState } from "react";

type Platform = 'facebook' | 'twitter' | 'instagram' | 'linkedin';

const PostCreator = () => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  
  const platforms: { id: Platform; icon: JSX.Element; name: string }[] = [
    { id: 'facebook', icon: <Facebook />, name: 'Facebook' },
    { id: 'twitter', icon: <Twitter />, name: 'Twitter' },
    { id: 'instagram', icon: <Instagram />, name: 'Instagram' },
    { id: 'linkedin', icon: <Linkedin />, name: 'LinkedIn' }
  ];
  
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map(platform => (
            <Button
              key={platform.id}
              variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
              className="gap-2"
              onClick={() => togglePlatform(platform.id)}
            >
              {platform.icon}
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
        
        <textarea
          className="w-full border rounded-lg p-3 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="What would you like to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      
      <div className="border rounded-lg p-4 mb-4">
        <div className="text-sm font-medium mb-2">Preview</div>
        <div className="bg-gray-50 rounded-lg p-3 min-h-[100px]">
          {content ? content : <span className="text-muted-foreground">Your post preview will appear here</span>}
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
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
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            <span>Save Draft</span>
          </Button>
          <Button className="gap-2" disabled={content.length === 0 || selectedPlatforms.length === 0}>
            Post Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
