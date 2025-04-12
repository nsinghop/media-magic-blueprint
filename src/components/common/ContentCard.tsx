
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock, 
  Edit2, 
  Facebook, 
  Heart, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  MoreHorizontal, 
  Share2, 
  Twitter 
} from "lucide-react";
import { ReactNode } from "react";

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin';

interface ContentCardProps {
  content: string;
  image?: string;
  platforms: readonly SocialPlatform[] | SocialPlatform[]; // Updated to accept readonly arrays
  status: 'draft' | 'scheduled' | 'published';
  date?: string;
  time?: string;
  stats?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

const PlatformIcon = ({ platform }: { platform: SocialPlatform }) => {
  const icons: Record<SocialPlatform, ReactNode> = {
    facebook: <Facebook className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />
  };
  
  const classes: Record<SocialPlatform, string> = {
    facebook: "platform-facebook",
    twitter: "platform-twitter",
    instagram: "platform-instagram",
    linkedin: "platform-linkedin"
  };
  
  return (
    <div className={`platform-icon ${classes[platform]}`}>
      {icons[platform]}
    </div>
  );
};

const ContentCard = ({ content, image, platforms, status, date, time, stats }: ContentCardProps) => {
  return (
    <div className="social-content-card overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex -space-x-2">
            {platforms.map((platform) => (
              <div key={platform} className="relative">
                <PlatformIcon platform={platform} />
              </div>
            ))}
          </div>
          
          <div className="flex items-center">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              status === 'published' ? 'bg-green-100 text-green-800' :
              status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            
            <Button variant="ghost" size="icon" className="ml-1 h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm mb-3">{content}</p>
        
        {image && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img src={image} alt="Post content" className="w-full h-40 object-cover" />
          </div>
        )}
        
        {(date || time) && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            {date && (
              <div className="flex items-center mr-3">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{date}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{time}</span>
              </div>
            )}
          </div>
        )}
        
        {stats && (
          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            {stats.likes !== undefined && (
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                <span>{stats.likes}</span>
              </div>
            )}
            {stats.comments !== undefined && (
              <div className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                <span>{stats.comments}</span>
              </div>
            )}
            {stats.shares !== undefined && (
              <div className="flex items-center">
                <Share2 className="h-3 w-3 mr-1" />
                <span>{stats.shares}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" className="ml-auto h-6">
              <Edit2 className="h-3 w-3 mr-1" />
              <span>Edit</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
