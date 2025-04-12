
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  BriefcaseIcon,
  MessageSquare,
  Award,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const FreelancersApply = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: '',
    description: '',
    hourlyRate: '',
    portfolioUrl: '',
    yearsExperience: '',
    skills: [] as string[]
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableSkills = [
    "Content Strategy", "Instagram Marketing", "TikTok Marketing", "Social Media Analytics",
    "Facebook/Instagram Ads", "Content Creation", "SEO", "Email Marketing",
    "Copywriting", "Video Production", "Branding", "Graphic Design",
    "LinkedIn Marketing", "B2B Marketing", "Lead Generation",
    "Meta Ads", "Google Ads", "PPC", "Campaign Management"
  ];

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.expertise) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.description || !formData.hourlyRate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (formData.skills.length === 0) {
        toast({
          title: "No skills selected",
          description: "Please select at least one skill",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Application submitted",
        description: "Your freelancer application has been submitted successfully",
      });
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                id="fullName"
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address *</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium mb-1">Area of Expertise *</label>
              <select
                id="expertise"
                className="w-full p-2 border rounded-md"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                required
              >
                <option value="">Select your area of expertise</option>
                <option value="social-media-manager">Social Media Manager</option>
                <option value="content-creator">Content Creator</option>
                <option value="ads-specialist">Ads Specialist</option>
                <option value="copywriter">Copywriter</option>
                <option value="graphic-designer">Graphic Designer</option>
                <option value="video-editor">Video Editor</option>
                <option value="marketing-strategist">Marketing Strategist</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-medium mb-1">Years of Experience</label>
              <select
                id="yearsExperience"
                className="w-full p-2 border rounded-md"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
              >
                <option value="">Select years of experience</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Profile</h3>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Professional Description *
                <span className="text-xs text-muted-foreground ml-1">(Tell clients about your work experience)</span>
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded-md min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">Hourly Rate ($) *</label>
              <input
                id="hourlyRate"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="e.g. 50"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-medium mb-1">Portfolio URL</label>
              <input
                id="portfolioUrl"
                type="url"
                className="w-full p-2 border rounded-md"
                placeholder="https://"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Skills & Expertise</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select skills that best represent your expertise (at least one)
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {availableSkills.map(skill => (
                <Button
                  key={skill}
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Before you submit</p>
                  <p className="text-sm">
                    By submitting your application, you agree to our terms and conditions
                    for freelancers. Our team will review your application and contact you
                    for further steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review & Submit</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Personal Information</h4>
                <p className="text-sm mb-1"><span className="font-medium">Name:</span> {formData.fullName}</p>
                <p className="text-sm mb-1"><span className="font-medium">Email:</span> {formData.email}</p>
                <p className="text-sm mb-1"><span className="font-medium">Expertise:</span> {formData.expertise}</p>
                <p className="text-sm"><span className="font-medium">Experience:</span> {formData.yearsExperience || 'Not specified'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Professional Profile</h4>
                <p className="text-sm mb-1"><span className="font-medium">Hourly Rate:</span> ${formData.hourlyRate}</p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Portfolio:</span> {formData.portfolioUrl || 'Not provided'}
                </p>
                <p className="text-sm"><span className="font-medium">Skills:</span> {formData.skills.join(', ')}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm bg-gray-50 p-3 rounded-md">{formData.description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm p-8">
              <div className="text-center">
                <div className="mx-auto inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for applying to join our platform as a freelancer. Our team will review your application and get back to you within 2-3 business days.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Return to Dashboard
                  </Button>
                  <Button onClick={() => window.location.href = "/freelancers/hire"}>
                    Browse Freelancer Jobs
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Apply as a Freelancer</h2>
              <p className="text-muted-foreground">Join our platform and connect with clients looking for social media expertise</p>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="flex border-b">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div 
                    key={stepNumber}
                    className={`flex-1 p-3 text-center relative ${
                      stepNumber === step 
                        ? 'bg-primary/10 font-medium' 
                        : stepNumber < step 
                        ? 'bg-gray-50'
                        : ''
                    }`}
                  >
                    <span className={`text-sm ${stepNumber === step ? 'text-primary' : ''}`}>
                      Step {stepNumber}
                    </span>
                    
                    {stepNumber < step && (
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <div className="h-full w-4 bg-gray-50 transform skew-x-[20deg] translate-x-2"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                {renderStep()}
                
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {step < 4 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            
            <div className="mt-8 bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BriefcaseIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Why Join as a Freelancer?</h3>
                  <p className="text-sm text-muted-foreground">Connect with businesses needing your social media expertise</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-medium mb-1">Direct Client Contact</h4>
                  <p className="text-xs text-muted-foreground">Communicate directly with clients through our platform</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-medium mb-1">Build Your Reputation</h4>
                  <p className="text-xs text-muted-foreground">Earn reviews and build your professional portfolio</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <BriefcaseIcon className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-medium mb-1">Flexible Work</h4>
                  <p className="text-xs text-muted-foreground">Choose projects that match your skills and schedule</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancersApply;
