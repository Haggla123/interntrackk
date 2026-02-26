import React from 'react';

const AdminSettings = () => {
  return (
    <div className="content-card fade-in">
      <div className="settings-container">
        <div className="settings-section">
          <h4>🛰️ Geofence & Security</h4>
          <div className="setting-control">
            <div className="setting-info">
              <label>Geofence Radius (Meters)</label>
              <p>The maximum distance allowed from company coordinates.</p>
            </div>
            <input type="number" defaultValue="100" className="admin-input-small" />
          </div>
          <div className="setting-control">
            <div className="setting-info">
              <label>Strict Time Window</label>
              <p>Only allow check-ins between 07:00 and 10:00 GMT.</p>
            </div>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
        </div>

        <div className="settings-section">
          <h4>📅 Internship Parameters</h4>
          <div className="setting-control">
            <div className="setting-info">
              <label>Requirement Duration</label>
              <p>Number of weeks required to fulfill internship.</p>
            </div>
            <select className="admin-input-small">
              <option>6 Weeks</option>
              <option>8 Weeks</option>
              <option>12 Weeks</option>
            </select>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h4>⚠️ Danger Zone</h4>
          <p>Actions here are permanent and affect the entire database.</p>
          <div className="action-group">
            <button className="secondary-btn">Archive Current Year</button>
            <button className="logout-btn" style={{ margin: 0 }}>Wipe All Mock Data</button>
          </div>
        </div>
        
        <button className="primary-btn" style={{ marginTop: '20px', width: '200px' }}>
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;