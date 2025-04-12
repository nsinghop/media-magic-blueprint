
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  BriefcaseIcon,
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Home, 
  LucideIcon, 
  MessageSquare, 
  PlusCircle, 
  Settings,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  expanded: boolean;
  badge?: number;
}

const SidebarLink = ({ to, icon: Icon, label, expanded, badge }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`sidebar-link flex items-center px-3 py-2 rounded-md ${
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/15" 
          : "hover:bg-muted"
      } transition-colors relative`}
    >
      <Icon className="h-5 w-5 min-w-5" />
      {expanded && <span className="ml-3 truncate">{label}</span>}
      
      {badge !== undefined && badge > 0 && (
        <span className={`
          ${expanded ? "ml-auto" : "absolute -top-1 -right-1"}
          flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs text-white px-1
        `}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  expanded: boolean;
  children: React.ReactNode;
}

const SidebarSection = ({ title, expanded, children }: SidebarSectionProps) => {
  return (
    <div className="mb-6">
      {expanded && (
        <h3 className="px-3 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
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
      
      <div className="flex-1 overflow-y-auto px-2">
        <SidebarSection title="Main" expanded={expanded}>
          <SidebarLink to="/" icon={Home} label="Dashboard" expanded={expanded} />
          <SidebarLink to="/calendar" icon={Calendar} label="Calendar" expanded={expanded} />
          <SidebarLink to="/posts" icon={MessageSquare} label="Posts" expanded={expanded} />
          <SidebarLink to="/analytics" icon={BarChart2} label="Analytics" expanded={expanded} />
          <SidebarLink to="/platforms" icon={Globe} label="Platforms" expanded={expanded} />
        </SidebarSection>
        
        <SidebarSection title="Freelancers" expanded={expanded}>
          <SidebarLink to="/freelancers/hire" icon={BriefcaseIcon} label="Hire Freelancers" expanded={expanded} badge={3} />
          <SidebarLink to="/freelancers/apply" icon={Users} label="Apply as Freelancer" expanded={expanded} />
        </SidebarSection>
      </div>
      
      {expanded && isAuthenticated && (
        <div className="mt-4 p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/platforms')}>
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
