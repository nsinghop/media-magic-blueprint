
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Plus, Search, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background border-b px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M17 6.1H3M21 12.1H3M15.1 18H3" />
              </svg>
            </div>
            <span className="text-xl font-bold">SocialBox</span>
          </Link>
          
          <div className="hidden md:flex items-center ml-4 bg-muted rounded-md">
            <Search className="h-4 w-4 mx-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none py-2 px-1 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
