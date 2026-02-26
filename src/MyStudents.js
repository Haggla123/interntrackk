import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyStudents.css';

const MyStudents = () => {
  const navigate = useNavigate();

  // Mock data of students assigned by the Admin
  const assignedStudents = [
    { id: 1, name: "Amponsah Peter", index: "UEB3211322", dept: "Network Admin", status: "On-Site", phone: "024-XXXX-XXX" },
    { id: 2, name: "Shaibu Karim Mustapha", index: "UEB3205122", dept: "Cyber Security", status: "Off-Site", phone: "055-XXXX-XXX" },
    { id: 3, name: "Anane Benedicta Ohenewaa", index: "UEB3204122", dept: "IT Support", status: "On-Site", phone: "020-XXXX-XXX" },
    { id: 4, name: "Kyeremaa Helina", index: "UEB3209322", dept: "IT Support", status: "On-Site", phone: "020-XXXX-XXX" },
    { id: 5, name: "Agyei Mensah Haggla", index: "UEB3214522", dept: "IT Support", status: "On-Site", phone: "020-XXXX-XXX" },
  ];

  return (
    <div className="supervisor-subpage">
      <div className="header-actions">
        <button className="back-link" onClick={() => navigate('/industrial')}>← Back to Dashboard</button>
        <h2>My Assigned Interns</h2>
      </div>

      <div className="student-list-container">
        <table className="student-list-table">
          <thead>
            <tr>
              <th>Index No.</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Live Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedStudents.map(student => (
              <tr key={student.id}>
                <td>{student.index}</td>
                <td><strong>{student.name}</strong></td>
                <td>{student.dept}</td>
                <td>
                  <span className={`status-dot ${student.status === 'On-Site' ? 'green' : 'red'}`}></span>
                  {student.status}
                </td>
                <td>{student.phone}</td>
                <td>
                  <button className="view-logs-btn">View Logbook</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyStudents;