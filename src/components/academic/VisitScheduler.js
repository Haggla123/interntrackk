import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, AlertCircle, Search, Check, ChevronRight } from 'lucide-react';
import './VisitScheduler.css';

const SiteVisitScheduler = ({ students = [], onScheduleVisit }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // 1. Logic for search results (Filters the dropdown list)
  const filteredOptions = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Logic for Urgent Visits (Students with 0 visits)
  const priorityStudents = students.filter(s => s.lastVisit === "None" || !s.lastVisit);

  const handleSelect = (student) => {
    setSelectedStudent(student);
    setSearchTerm(student.name); // Put name in the search box
    setShowDropdown(false); // Close the list
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!selectedStudent) return alert("Please select a student from the list.");

    const visitData = {
      id: Date.now(),
      student: selectedStudent.name,
      company: selectedStudent.company,
      location: selectedStudent.location,
      date: visitDate,
      time: visitTime,
    };

    onScheduleVisit(visitData);
    alert(`📅 Visit Broadcasted for ${selectedStudent.name}!`);
    
    // Reset form
    setSelectedStudent(null);
    setSearchTerm("");
    setVisitDate("");
    setVisitTime("");
  };

  return (
    <div className="scheduler-container fade-in">
      <div className="scheduler-grid">
        
        {/* LEFT: SCHEDULING FORM */}
        <div className="schedule-form-card bento-item">
          <div className="card-header-flex">
             <h3><Plus size={20} /> Schedule New Visit</h3>
          </div>
          
          <form onSubmit={handleSchedule}>
            <div className="form-group custom-select-container">
              <label><User size={14} /> Search Intern</label>
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon-inner" />
                <input 
                  type="text"
                  className="bento-input search-field"
                  placeholder="Type name or company..."
                  value={searchTerm}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                />
              </div>

              {/* FLOATING SEARCH RESULTS */}
              {showDropdown && (
                <div className="search-results-dropdown">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map(s => (
                      <div 
                        key={s.id} 
                        className="search-result-item"
                        onClick={() => handleSelect(s)}
                      >
                        <div className="res-info">
                          <strong>{s.name}</strong>
                          <span>{s.company} • {s.location}</span>
                        </div>
                        {selectedStudent?.id === s.id && <Check size={14} className="check-icon" />}
                      </div>
                    ))
                  ) : (
                    <div className="no-res">No interns found for "{searchTerm}"</div>
                  )}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><Calendar size={14} /> Date</label>
                <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label><Clock size={14} /> Time</label>
                <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="confirm-btn univ-btn">Confirm Visit</button>
          </form>
        </div>

        {/* RIGHT: URGENT VISITS CARD (STAYS VISIBLE) */}
        <div className="bento-item priority-card">
          <div className="card-header-flex">
            <h3>Urgent Visits</h3>
            <AlertCircle size={18} color="#dc2626" />
          </div>
          <p className="sub-text">Recommended for immediate visit:</p>
          <div className="priority-list">
            {priorityStudents.length > 0 ? (
              priorityStudents.map(s => (
                <div key={s.id} className="priority-item" onClick={() => handleSelect(s)}>
                  <div className="priority-info">
                    <strong>{s.name}</strong>
                    <span className="location-badge"><MapPin size={10} /> {s.location}</span>
                  </div>
                  <button type="button" className="quick-select">Select <ChevronRight size={14}/></button>
                </div>
              ))
            ) : (
              <div className="empty-priority">
                <Check size={20} />
                <p>All students have been visited.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SiteVisitScheduler;