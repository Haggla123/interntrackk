import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages (Now safely inside the pages folder)
import Home from './pages/Home';
import Login from './Login';
import AdminDashboard from './pages/AdminDashboard';
import AcademicDashboard from './pages/AcademicDashboard';
import StudentDashboard from './pages/StudentDashboard';
import IndustrialDashboard from './pages/IndustrialDashboard';

// Components (In their specific sub-folders)
import LogbookHistory from './components/student/LogbookHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/academic" element={<AcademicDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/industrial" element={<IndustrialDashboard />} />
        <Route path="/student/history" element={<LogbookHistory />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;