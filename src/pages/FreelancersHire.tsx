
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  Star,
  DollarSign,
  MessageSquare,
  ThumbsUp,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDatabase } from "@/contexts/DatabaseContext";
import { Slider } from "@/components/ui/slider";

const FreelancersHire = () => {
  const { freelancers, fetchFreelancers, isLoading } = useDatabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = [
    "Content Strategy", "Instagram", "TikTok", "Analytics",
    "FB/IG Ads", "Content Creation", "SEO", "Email Marketing",
    "Copywriting", "Video Production", "Branding", "Photoshop",
    "LinkedIn Strategy", "B2B Marketing", "Lead Generation",
    "Meta Ads", "Google Ads", "PPC", "Campaign Management"
  ];

  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);

  useEffect(() => {
    let filtered = [...freelancers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             f.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      f => f.hourlyRate >= priceRange[0] && f.hourlyRate <= priceRange[1]
    );
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(
        f => selectedSkills.some(skill => f.skills.includes(skill))
      );
    }
    
    setFilteredFreelancers(filtered);
  }, [freelancers, searchTerm, priceRange, selectedSkills]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hire Freelancers</h2>
              <Button>Post a Job</Button>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, skill, or expertise..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="md:w-auto gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Price Range ($/hour)</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 100]}
                          max={200}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mb-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map(skill => (
                          <Button
                            key={skill}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-8">Loading freelancers...</div>
            ) : filteredFreelancers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">No freelancers found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters or search terms to find freelancers that match your requirements.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFreelancers.map(freelancer => (
                  <div key={freelancer.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={freelancer.avatar} 
                          alt={freelancer.name} 
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{freelancer.name}</h3>
                          <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                          <div className="flex items-center mt-1">
                            {renderStars(freelancer.rating)}
                            <span className="text-sm ml-1">{freelancer.rating}</span>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                          <div className="flex items-center text-primary font-bold">
                            <DollarSign className="h-4 w-4" />
                            <span>{freelancer.hourlyRate}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">per hour</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {freelancer.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {freelancer.skills.length > 3 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              +{freelancer.skills.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>98% Job Success</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{freelancer.completedJobs} Jobs</span>
                          </div>
                          {freelancer.available ? (
                            <div className="flex items-center text-green-600">
                              <Award className="h-3 w-3 mr-1" />
                              <span>Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-600">
                              <Award className="h-3 w-3 mr-1" />
                              <span>Busy</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">View Profile</Button>
                          <Button className="flex-1">Contact</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancersHire;
