
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Home, 
  LucideIcon, 
  MessageSquare, 
  PlusCircle, 
  Settings
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  expanded: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, expanded }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`sidebar-link ${isActive ? "sidebar-link-active" : "hover:bg-muted"}`}
    >
      <Icon className="h-5 w-5" />
      {expanded && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <aside className={`flex flex-col bg-sidebar h-[calc(100vh-4rem)] border-r transition-all duration-300 ${expanded ? 'w-56' : 'w-14'}`}>
      <div className="flex items-center justify-between p-4">
        {expanded && <h2 className="font-semibold">Navigation</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="space-y-1 px-2">
        <SidebarLink to="/" icon={Home} label="Dashboard" expanded={expanded} />
        <SidebarLink to="/calendar" icon={Calendar} label="Calendar" expanded={expanded} />
        <SidebarLink to="/posts" icon={MessageSquare} label="Posts" expanded={expanded} />
        <SidebarLink to="/analytics" icon={BarChart2} label="Analytics" expanded={expanded} />
        <SidebarLink to="/platforms" icon={Globe} label="Platforms" expanded={expanded} />
      </div>
      
      {expanded && (
        <div className="mt-4 px-4">
          <Button variant="outline" className="w-full justify-start">
            <PlusCircle className="h-4 w-4 mr-2" />
            Connect Platform
          </Button>
        </div>
      )}
      
      <div className="mt-auto">
        <div className="space-y-1 px-2 pb-4">
          <SidebarLink to="/settings" icon={Settings} label="Settings" expanded={expanded} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
