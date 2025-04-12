
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, RefreshCw, Settings, Twitter } from "lucide-react";

interface PlatformConnection {
  id: string;
  name: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  accountType: string;
  accountName: string;
  followers: number;
  status: 'connected' | 'disconnected' | 'pending';
  lastSynced?: string;
}

const PlatformConnections = () => {
  const connections: PlatformConnection[] = [
    {
      id: '1',
      name: 'Company Facebook Page',
      platform: 'facebook',
      accountType: 'Business Page',
      accountName: 'SocialBox Official',
      followers: 12543,
      status: 'connected',
      lastSynced: '10 minutes ago'
    },
    {
      id: '2',
      name: 'Company Twitter',
      platform: 'twitter',
      accountType: 'Business',
      accountName: '@SocialBoxHQ',
      followers: 8421,
      status: 'connected',
      lastSynced: '25 minutes ago'
    },
    {
      id: '3',
      name: 'Company Instagram',
      platform: 'instagram',
      accountType: 'Business',
      accountName: '@socialbox_official',
      followers: 15872,
      status: 'connected',
      lastSynced: '1 hour ago'
    },
    {
      id: '4',
      name: 'Company LinkedIn',
      platform: 'linkedin',
      accountType: 'Company Page',
      accountName: 'SocialBox',
      followers: 5367,
      status: 'disconnected',
    }
  ];
  
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Connected Platforms</h2>
        <Button>Connect New Platform</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {connections.map((connection) => (
          <div key={connection.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                {getPlatformIcon(connection.platform)}
              </div>
              <div>
                <h3 className="font-medium">{connection.name}</h3>
                <p className="text-xs text-muted-foreground">{connection.accountName}</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Account Type</p>
                  <p className="text-sm font-medium">{connection.accountType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Followers</p>
                  <p className="text-sm font-medium">{connection.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className={`text-sm font-medium ${
                    connection.status === 'connected' ? 'text-green-600' : 
                    connection.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Synced</p>
                  <p className="text-sm font-medium">{connection.lastSynced || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
                
                {connection.status === 'connected' ? (
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw className="h-4 w-4" />
                    <span>Sync</span>
                  </Button>
                ) : (
                  <Button size="sm">Connect</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Additional Platforms</h3>
          <p className="text-muted-foreground mb-6">
            Expand your social media management by connecting additional platforms to your SocialBox account.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
              <Facebook className="h-6 w-6 text-blue-600" />
              <span>Facebook</span>
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
              <Twitter className="h-6 w-6 text-sky-500" />
              <span>Twitter</span>
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
              <Instagram className="h-6 w-6 text-pink-600" />
              <span>Instagram</span>
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
              <Linkedin className="h-6 w-6 text-blue-700" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformConnections;
