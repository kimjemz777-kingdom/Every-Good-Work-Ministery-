import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';
import { ChevronLeft, ChevronRight, CheckCircle, Plus, Trash2, Calendar as CalIcon, Clock, BookOpen } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteContext';

const MinistryCalendar: React.FC = () => {
  const { config } = useSiteConfig();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'appointment' | 'personal'>('personal');

  // Load events from local storage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('ministryCalendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('ministryCalendarEvents', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(dateKey);
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEventTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEventTitle,
      type: newEventType,
      completed: false
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
  };

  const toggleComplete = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, completed: !ev.completed } : ev));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Add a devotional entry for the selected date if it doesn't exist
  const markDevotional = () => {
    if (!selectedDate) return;
    const exists = events.find(e => e.date === selectedDate && e.type === 'devotional');
    if (exists) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      title: "Read Daily Devotional",
      type: 'devotional',
      completed: true
    };
    setEvents([...events, newEvent]);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#fdfbf7]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
           <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Ministry Calendar</h1>
           <p className="text-gray-600">Track your spiritual journey, devotionals, and church appointments.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Grid */}
          <div className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
             <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                <h2 className="text-2xl font-bold font-serif text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
             </div>

             <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-gray-400 text-sm uppercase">
               <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
             </div>

             <div className="grid grid-cols-7 gap-2">
               {Array.from({ length: firstDay }).map((_, i) => (
                 <div key={`empty-${i}`} className="h-24 bg-gray-50/50 rounded-lg"></div>
               ))}
               {Array.from({ length: days }).map((_, i) => {
                 const day = i + 1;
                 const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
                 const dayEvents = events.filter(e => e.date === dateKey);
                 const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                 const isSelected = selectedDate === dateKey;

                 return (
                   <div 
                     key={day} 
                     onClick={() => handleDateClick(day)}
                     className={`h-24 border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between
                       ${isSelected ? 'border-gold-500 ring-2 ring-gold-200 bg-gold-50' : 'border-gray-100 bg-white'}
                       ${isToday ? 'bg-primary-50' : ''}
                     `}
                   >
                     <div className="flex justify-between items-start">
                       <span className={`text-sm font-bold ${isToday ? 'text-primary-600' : 'text-gray-700'}`}>{day}</span>
                       {dayEvents.some(e => e.type === 'devotional' && e.completed) && (
                         <CheckCircle size={14} className="text-green-500" />
                       )}
                     </div>
                     <div className="flex gap-1 flex-wrap content-end">
                       {dayEvents.map(ev => (
                         <div key={ev.id} className={`w-2 h-2 rounded-full ${
                           ev.type === 'devotional' ? 'bg-green-400' : 
                           ev.type === 'service' ? 'bg-gold-500' : 
                           ev.type === 'appointment' ? 'bg-primary-500' : 'bg-gray-400'
                         }`} title={ev.title} />
                       ))}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Sidebar / Details */}
          <div className="lg:w-1/3 space-y-6">
             {selectedDate ? (
               <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary-500 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Daily Schedule</p>

                  <div className="space-y-3 mb-6">
                    {events.filter(e => e.date === selectedDate).length === 0 && (
                      <p className="text-gray-400 italic text-sm">No events scheduled.</p>
                    )}
                    {events.filter(e => e.date === selectedDate).map(ev => (
                      <div key={ev.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
                        <button onClick={() => toggleComplete(ev.id)} className={`${ev.completed ? 'text-green-500' : 'text-gray-300 hover:text-green-500'}`}>
                           <CheckCircle size={20} className={ev.completed ? 'fill-current' : ''} />
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${ev.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{ev.title}</p>
                          <span className="text-[10px] uppercase font-bold text-gray-400">{ev.type}</span>
                        </div>
                        <button onClick={() => deleteEvent(ev.id)} className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <button onClick={markDevotional} className="flex items-center justify-center gap-2 p-2 bg-green-50 text-green-700 text-xs font-bold rounded-lg hover:bg-green-100">
                       <BookOpen size={14} /> Read Devotional
                    </button>
                    {/* Placeholder for adding church service automatically based on day */}
                    <button 
                      onClick={() => {
                         const newEvent: CalendarEvent = { id: Date.now().toString(), date: selectedDate, title: "Church Service Online", type: 'service', completed: false };
                         setEvents([...events, newEvent]);
                      }}
                      className="flex items-center justify-center gap-2 p-2 bg-gold-50 text-gold-700 text-xs font-bold rounded-lg hover:bg-gold-100">
                       <CalIcon size={14} /> Add Service
                    </button>
                  </div>

                  {/* Add Event Form */}
                  <form onSubmit={addEvent} className="border-t pt-4">
                     <p className="text-xs font-bold text-gray-500 uppercase mb-2">Add Appointment / Note</p>
                     <div className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          placeholder="Meeting with Pastor..." 
                          className="flex-1 p-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary-500"
                        />
                        <button type="submit" className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          <Plus size={18} />
                        </button>
                     </div>
                     <div className="flex gap-2">
                       <label className="text-xs flex items-center gap-1 cursor-pointer">
                         <input type="radio" name="etype" checked={newEventType === 'appointment'} onChange={() => setNewEventType('appointment')} />
                         Appointment
                       </label>
                       <label className="text-xs flex items-center gap-1 cursor-pointer">
                         <input type="radio" name="etype" checked={newEventType === 'personal'} onChange={() => setNewEventType('personal')} />
                         Personal
                       </label>
                     </div>
                  </form>
               </div>
             ) : (
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center h-full flex flex-col justify-center items-center text-gray-400">
                  <CalIcon size={48} className="mb-4 text-gray-200" />
                  <p>Select a date to view or add events.</p>
               </div>
             )}

             {/* Upcoming Church Schedule */}
             <div className="bg-primary-900 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold font-serif mb-4 flex items-center gap-2"><Clock size={18} className="text-gold-500" /> Ministry Schedule</h3>
                <div className="space-y-3 text-sm">
                   {config.serviceTimes.map((st, i) => (
                     <div key={i} className="flex justify-between border-b border-white/10 pb-2 last:border-0">
                       <span className="text-primary-200">{st.day}</span>
                       <span className="font-bold">{st.time}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryCalendar;