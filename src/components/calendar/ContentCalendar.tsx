
import ContentCard from "@/components/common/ContentCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  content: string;
  platforms: ('facebook' | 'twitter' | 'instagram' | 'linkedin')[];
  status: 'draft' | 'scheduled' | 'published';
  date: string;
  time: string;
}

const ContentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Sample data for demo purposes
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      content: "Product launch announcement #NewProduct",
      platforms: ['facebook', 'twitter', 'instagram'],
      status: 'scheduled',
      date: '2025-04-12',
      time: '10:00 AM'
    },
    {
      id: '2',
      content: "Customer success story with video testimonial",
      platforms: ['linkedin', 'facebook'],
      status: 'scheduled',
      date: '2025-04-15',
      time: '2:00 PM'
    },
    {
      id: '3',
      content: "Weekly tips and tricks for our software users",
      platforms: ['twitter', 'linkedin'],
      status: 'scheduled',
      date: '2025-04-18',
      time: '11:30 AM'
    }
  ];
  
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  const getYear = (date: Date) => {
    return date.getFullYear();
  };
  
  const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Get day of week for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };
  
  const getEventsForDay = (day: number | null) => {
    if (day === null) return [];
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return sampleEvents.filter(event => event.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Calendar</h2>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Schedule Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold ml-2">
              {getMonthName(currentMonth)} {getYear(currentMonth)}
            </h3>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="sm">Month</Button>
            <Button variant="outline" size="sm">Week</Button>
            <Button variant="outline" size="sm">Day</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-0">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium border-b">
              {day}
            </div>
          ))}
          
          {getDaysInMonth(currentMonth).map((day, index) => {
            const events = getEventsForDay(day);
            return (
              <div 
                key={index} 
                className={`calendar-cell ${day === null ? 'bg-gray-50' : ''} ${
                  day === new Date().getDate() && 
                  currentMonth.getMonth() === new Date().getMonth() && 
                  currentMonth.getFullYear() === new Date().getFullYear() 
                    ? 'bg-blue-50 border-blue-200' 
                    : ''
                }`}
              >
                {day !== null && (
                  <>
                    <div className="font-medium text-sm">{day}</div>
                    {events.map(event => (
                      <div
                        key={event.id}
                        className="calendar-item bg-blue-100 text-blue-800"
                      >
                        {event.time} - {event.content.substring(0, 20)}...
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Scheduled Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleEvents.map(event => (
            <ContentCard
              key={event.id}
              content={event.content}
              platforms={event.platforms}
              status={event.status}
              date={event.date.replace(/^\d{4}-/, '')}
              time={event.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
