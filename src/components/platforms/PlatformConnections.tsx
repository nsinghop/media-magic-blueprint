
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, RefreshCw, Settings, Twitter, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { SocialPlatform } from "@/components/common/ContentCard";
import { toast } from "@/hooks/use-toast";

const PlatformConnections = () => {
  const { connectedPlatforms, connectPlatform, disconnectPlatform, isLoading } = useAuth();
  const [connecting, setConnecting] = useState<SocialPlatform | null>(null);
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-sky-500" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      default:
        return null;
    }
  };

  const handleConnect = async (platform: SocialPlatform) => {
    setConnecting(platform);
    try {
      await connectPlatform(platform);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      await disconnectPlatform(platformId);
    } catch (error) {
      console.error("Error disconnecting platform:", error);
    }
  };
  
  const handleSyncPlatform = (platformName: string) => {
    toast({
      title: "Syncing platform",
      description: `Syncing your ${platformName} account...`
    });
    
    // Simulate sync
    setTimeout(() => {
      toast({
        title: "Sync complete",
        description: `Successfully synced your ${platformName} account.`
      });
    }, 2000);
  };

  const handlePlatformSettings = (platformName: string) => {
    toast({
      title: "Platform settings",
      description: `Opening settings for ${platformName}...`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Connected Platforms</h2>
        <Button>Connect New Platform</Button>
      </div>
      
      {connectedPlatforms.length === 0 ? (
        <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Platforms Connected</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Connect your social media accounts to start scheduling and publishing content across platforms.
          </p>
          <div className="flex justify-center">
            <Button>Connect Your First Platform</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {connectedPlatforms.map((connection) => (
            <div key={connection.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {getPlatformIcon(connection.platform)}
                </div>
                <div>
                  <h3 className="font-medium">{
                    connection.platform === 'facebook' ? 'Facebook Page' :
                    connection.platform === 'twitter' ? 'Twitter Account' :
                    connection.platform === 'instagram' ? 'Instagram Profile' :
                    'LinkedIn Page'
                  }</h3>
                  <p className="text-xs text-muted-foreground">{connection.username}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Type</p>
                    <p className="text-sm font-medium">{
                      connection.platform === 'facebook' ? 'Business Page' :
                      connection.platform === 'twitter' ? 'Business' :
                      connection.platform === 'instagram' ? 'Business' :
                      'Company Page'
                    }</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="text-sm font-medium">{
                      connection.platform === 'facebook' ? '12,543' :
                      connection.platform === 'twitter' ? '8,421' :
                      connection.platform === 'instagram' ? '15,872' :
                      '5,367'
                    }</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-medium text-green-600">
                      Connected
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Synced</p>
                    <p className="text-sm font-medium">
                      {connection.platform === 'facebook' ? '10 minutes ago' :
                       connection.platform === 'twitter' ? '25 minutes ago' :
                       connection.platform === 'instagram' ? '1 hour ago' :
                       '2 hours ago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handlePlatformSettings(connection.platform)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleSyncPlatform(connection.platform)}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Sync</span>
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDisconnect(connection.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Disconnect'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Additional Platforms</h3>
          <p className="text-muted-foreground mb-6">
            Expand your social media management by connecting additional platforms to your SocialBox account.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 flex-col gap-2"
              onClick={() => handleConnect('facebook')}
              disabled={connecting === 'facebook' || connectedPlatforms.some(p => p.platform === 'facebook')}
            >
              {connecting === 'facebook' ? (
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
              ) : (
                <Facebook className="h-6 w-6 text-blue-600" />
              )}
              <span>Facebook</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 flex-col gap-2"
              onClick={() => handleConnect('twitter')}
              disabled={connecting === 'twitter' || connectedPlatforms.some(p => p.platform === 'twitter')}
            >
              {connecting === 'twitter' ? (
                <Loader2 className="h-6 w-6 text-sky-500 animate-spin" />
              ) : (
                <Twitter className="h-6 w-6 text-sky-500" />
              )}
              <span>Twitter</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 flex-col gap-2"
              onClick={() => handleConnect('instagram')}
              disabled={connecting === 'instagram' || connectedPlatforms.some(p => p.platform === 'instagram')}
            >
              {connecting === 'instagram' ? (
                <Loader2 className="h-6 w-6 text-pink-600 animate-spin" />
              ) : (
                <Instagram className="h-6 w-6 text-pink-600" />
              )}
              <span>Instagram</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 flex-col gap-2"
              onClick={() => handleConnect('linkedin')}
              disabled={connecting === 'linkedin' || connectedPlatforms.some(p => p.platform === 'linkedin')}
            >
              {connecting === 'linkedin' ? (
                <Loader2 className="h-6 w-6 text-blue-700 animate-spin" />
              ) : (
                <Linkedin className="h-6 w-6 text-blue-700" />
              )}
              <span>LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformConnections;
