'use client'
import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Download,
  ExternalLink,
  X,
  Plus,
  Bell,
  Star,
  BookOpen,
  Coffee,
  Heart,
  Sun,
  Moon
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  description: string;
  type: EventType;
  recurring: string;
  color: ColorType;
  attendees: number;
  organizer: string;
}

type EventType = 'prayer' | 'education' | 'social' | 'meeting' | 'workshop' | 'community';
type ColorType = 'gold' | 'lightGold' | 'white' | 'grey';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
}

interface ColorConfig {
  bg: string;
  light: string;
  text: string;
  border: string;
}

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Jummah Prayer',
    date: '2025-07-25',
    time: '12:30 PM',
    endTime: '1:15 PM',
    location: 'JDUC Pub',
    description: 'Join us for congregational Friday prayers at the John Deutsch University Centre Pub',
    type: 'prayer',
    recurring: 'weekly',
    color: 'gold',
    attendees: 45,
    organizer: 'QUMSA Executive'
  },
  {
    id: 2,
    title: 'Halaqa Study Circle',
    date: '2025-07-27',
    time: '7:00 PM',
    endTime: '8:30 PM',
    location: 'JDUC Room 201',
    description: 'Weekly Islamic study circle focusing on Quranic verses and Hadith discussions. All levels welcome!',
    type: 'education',
    recurring: 'weekly',
    color: 'lightGold',
    attendees: 25,
    organizer: 'Br. Ahmed Hassan'
  },
  {
    id: 3,
    title: 'Community Iftar',
    date: '2025-07-28',
    time: '6:30 PM',
    endTime: '8:00 PM',
    location: 'Community Center',
    description: 'Join us for a community iftar dinner with traditional foods and fellowship.',
    type: 'social',
    recurring: 'none',
    color: 'white',
    attendees: 80,
    organizer: 'Sister Fatima Ali'
  },
  {
    id: 4,
    title: 'Islamic Finance Workshop',
    date: '2025-07-30',
    time: '2:00 PM',
    endTime: '4:00 PM',
    location: 'Business Building Room 305',
    description: 'Learn about Islamic banking principles and halal investment strategies.',
    type: 'workshop',
    recurring: 'monthly',
    color: 'gold',
    attendees: 35,
    organizer: 'Dr. Muhammad Khan'
  },
  {
    id: 5,
    title: 'Community Service Day',
    date: '2025-08-02',
    time: '9:00 AM',
    endTime: '3:00 PM',
    location: 'Downtown Kingston',
    description: 'Join us for a day of community service helping local organizations.',
    type: 'community',
    recurring: 'monthly',
    color: 'lightGold',
    attendees: 50,
    organizer: 'QUMSA Volunteers'
  }
];

const eventTypeIcons: Record<EventType, React.ComponentType<any>> = {
  prayer: Star,
  education: BookOpen,
  social: Users,
  meeting: Calendar,
  workshop: Coffee,
  community: Heart
};

const eventColors: Record<ColorType, ColorConfig> = {
  gold: {
    bg: 'bg-amber-500',
    light: 'bg-amber-100/20',
    text: 'text-amber-300',
    border: 'border-amber-300/50'
  },
  lightGold: {
    bg: 'bg-yellow-500',
    light: 'bg-yellow-100/20',
    text: 'text-yellow-300',
    border: 'border-yellow-300/50'
  },
  white: {
    bg: 'bg-white',
    light: 'bg-white/10',
    text: 'text-white',
    border: 'border-white/50'
  },
  grey: {
    bg: 'bg-gray-400',
    light: 'bg-gray-100/20',
    text: 'text-gray-300',
    border: 'border-gray-300/50'
  }
};

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [events, setEvents] = useState<Event[]>(sampleEvents);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const goToPrevMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const goToNextMonth = (): void => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const goToToday = (): void => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: Date): Event[] => {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date)
      });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date)
      });
    }
    
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date)
      });
    }
    
    return days;
  };

  const generateAllEventsICS = (): string => {
    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const convertTo24Hour = (time12h: string): string => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') hours = '00';
      if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
      return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QUMSA//Event Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH`;

    events.forEach(event => {
      const startDate = new Date(`${event.date}T${convertTo24Hour(event.time)}`);
      const endDate = new Date(`${event.date}T${convertTo24Hour(event.endTime)}`);
      
      icsContent += `
BEGIN:VEVENT
UID:${event.id}@qumsa.ca
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\n\\nOrganizer: ${event.organizer}\\nExpected Attendees: ${event.attendees}\\nEvent Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
LOCATION:${event.location}
ORGANIZER:CN=${event.organizer}
CATEGORIES:${event.type.toUpperCase()}
STATUS:CONFIRMED
END:VEVENT`;
    });

    icsContent += `
END:VCALENDAR`;

    return icsContent;
  };

  const downloadAllEventsICS = (): void => {
    const icsContent = generateAllEventsICS();
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QUMSA_Events_Calendar.ics`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateSingleEventICS = (event: Event): string => {
    const convertTo24Hour = (time12h: string): string => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') hours = '00';
      if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
      return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const startDate = new Date(`${event.date}T${convertTo24Hour(event.time)}`);
    const endDate = new Date(`${event.date}T${convertTo24Hour(event.endTime)}`);
    
    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QUMSA//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@qumsa.ca
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
ORGANIZER:CN=${event.organizer}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadSingleEventICS = (event: Event): void => {
    const icsContent = generateSingleEventICS(event);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateCalendarUrls = (event: Event): { google: string; outlook: string } => {
    const convertTo24Hour = (time12h: string): string => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') hours = '00';
      if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
      return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const startDate = new Date(`${event.date}T${convertTo24Hour(event.time)}`);
    const endDate = new Date(`${event.date}T${convertTo24Hour(event.endTime)}`);
    
    const formatGoogleDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
    };
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto backdrop-blur-lg border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">QUMSA Events</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'month' ? 'list' : 'month')}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur border border-white/20"
          >
            {viewMode === 'month' ? 'List' : 'Calendar'}
          </button>
          <button
            onClick={downloadAllEventsICS}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 backdrop-blur border border-white/20"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Sync All</span>
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg text-sm font-medium transition-all shadow-lg"
          >
            Today
          </button>
        </div>
      </div>

      {viewMode === 'month' ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center">
                <span className="text-xs font-semibold text-gray-300">{day}</span>
              </div>
            ))}
            
            {calendarDays.map((dayObj, index) => (
              <div
                key={index}
                className={`min-h-[60px] sm:min-h-[70px] p-1 sm:p-2 border rounded-lg transition-all ${
                  !dayObj.isCurrentMonth 
                    ? 'bg-white/5 text-gray-500 border-white/10' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                } ${isToday(dayObj.date) ? 'ring-2 ring-amber-400 bg-amber-500/20' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs sm:text-sm font-medium ${
                    isToday(dayObj.date) 
                      ? 'text-amber-300' 
                      : 'text-white'
                  }`}>
                    {dayObj.day}
                  </span>
                </div>
                
                <div className="space-y-0.5">
                  {dayObj.events.slice(0, 2).map(event => {
                    const Icon = eventTypeIcons[event.type] || Calendar;
                    const colors = eventColors[event.color];
                    
                    return (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full text-left p-1 rounded text-xs ${colors.light} ${colors.text} hover:opacity-75 transition-opacity flex items-center space-x-1 border ${colors.border}`}
                      >
                        <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                        <span className="truncate text-[10px] sm:text-xs">{event.title}</span>
                      </button>
                    );
                  })}
                  {dayObj.events.length > 2 && (
                    <div className="text-[10px] text-gray-400">
                      +{dayObj.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {upcomingEvents.map(event => {
            const Icon = eventTypeIcons[event.type] || Calendar;
            const colors = eventColors[event.color];
            
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full text-left p-3 sm:p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all bg-white/5"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 sm:p-3 rounded-xl ${colors.bg} shadow-lg`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{event.title}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-300 mb-2 space-y-1 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-base sm:text-lg font-bold text-white">{events.length}</div>
            <div className="text-xs text-gray-400">Total Events</div>
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-amber-400">{upcomingEvents.length}</div>
            <div className="text-xs text-gray-400">Upcoming</div>
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-yellow-400">
              {events.filter(e => e.type === 'prayer').length}
            </div>
            <div className="text-xs text-gray-400">Prayer Events</div>
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-white">
              {events.filter(e => e.recurring === 'weekly').length}
            </div>
            <div className="text-xs text-gray-400">Weekly Events</div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 backdrop-blur-xl border border-white/20 rounded-2xl max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 sm:p-2.5 rounded-xl ${eventColors[selectedEvent.color].bg} shadow-lg`}>
                      {React.createElement(eventTypeIcons[selectedEvent.type] || Calendar, {
                        className: "w-4 h-4 sm:w-5 sm:h-5 text-white"
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2">{selectedEvent.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-300 truncate">{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 sm:p-2 hover:bg-white/10 rounded-xl transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-start space-x-3 text-white">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base">
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300">
                      {selectedEvent.time} - {selectedEvent.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <p className="text-sm sm:text-base min-w-0 flex-1">{selectedEvent.location}</p>
                </div>

                <div className="flex items-center space-x-3 text-white">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <p className="text-sm sm:text-base">{selectedEvent.attendees} expected attendees</p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/20">
                  <p className="text-white leading-relaxed text-sm sm:text-base">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="/events"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2.5 sm:py-3 rounded-xl font-medium text-center transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm sm:text-base">View Events Page</span>
                  </a>
                  <button
                    onClick={() => downloadSingleEventICS(selectedEvent)}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    <Download className="w-4 h-4 mx-auto" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={generateCalendarUrls(selectedEvent).google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Google</span>
                  </a>
                  <a
                    href={generateCalendarUrls(selectedEvent).outlook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-orange-800 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Outlook</span>
                  </a>
                </div>

                <div className="text-xs text-gray-400 text-center pt-2 px-2">
                  <strong>Yahoo Calendar:</strong> Download ICS file and import manually<br />
                  <strong>Apple Calendar:</strong> Download ICS and open with Calendar app
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}