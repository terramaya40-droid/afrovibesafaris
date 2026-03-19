import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, FileText, CheckCircle, Trash2, Edit } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './Admin.css';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine which API to fetch based on activeTab
    if (activeTab === 'quotes') {
      setLoading(true);
      fetch(`${API_BASE_URL}/quotes`)
        .then(res => res.json())
        .then(data => { setQuotes(data); setLoading(false); })
        .catch(err => { console.error(err); setLoading(false); });
    } else if (activeTab === 'reviews') {
      setLoading(true);
      fetch(`${API_BASE_URL}/testimonials/admin`)
        .then(res => res.json())
        .then(data => { setReviews(data); setLoading(false); })
        .catch(err => { console.error(err); setLoading(false); });
    }
  }, [activeTab]);

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <h2 className="admin-logo">AfriVibe <span>Admin</span></h2>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>
            <FileText size={20} /> Quote Requests
          </button>
          <button className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            <CheckCircle size={20} /> Review Moderation
          </button>
          <button className={`admin-nav-item ${activeTab === 'destinations' ? 'active' : ''}`} onClick={() => setActiveTab('destinations')}>
            <LayoutDashboard size={20} /> Packages & Dest.
          </button>
        </nav>
      </div>

      <div className="admin-content bg-gray-100">
        <div className="admin-header">
          <h2>Dashboard</h2>
          <div className="admin-user"><Users size={20} /> Admin User</div>
        </div>

        <div className="admin-main section">
          {activeTab === 'quotes' && (
            <div className="admin-panel animation-fade">
              <h3>Recent Quote Requests</h3>
              <p className="text-gray-500 mb-lg">Manage incoming inquiries and generate PDF quotes.</p>
              
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client Name</th>
                      <th>Destination(s)</th>
                      <th>Type</th>
                      <th>Travel Dates</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="text-center">Loading Data...</td></tr>
                    ) : quotes.length === 0 ? (
                      <tr><td colSpan={7} className="text-center">No quotes available.</td></tr>
                    ) : quotes.map((q: any) => (
                      <tr key={q._id}>
                        <td><strong>{q._id.substring(q._id.length - 6)}</strong></td>
                        <td>
                          {q.name}<br/>
                          <span className="text-sm text-gray-500">{q.email}</span>
                        </td>
                        <td>{q.destination}</td>
                        <td>{q.safariType}</td>
                        <td>{q.dates}</td>
                        <td>
                          <span className={`status-badge status-${q.status.replace(' ', '').toLowerCase()}`}>
                            {q.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button className="btn-sm btn-outline text-primary border-primary">Generate PDF</button>
                          <button className="btn-sm btn-outline"><Edit size={14}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="admin-panel animation-fade">
              <h3>Review Moderation</h3>
              <p className="text-gray-500 mb-lg">Approve or reject customer reviews before they appear publicly.</p>
              
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Package / Destination</th>
                      <th>Rating</th>
                      <th>Review Snippet</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={6} className="text-center">Loading Data...</td></tr>
                    ) : reviews.length === 0 ? (
                      <tr><td colSpan={6} className="text-center">No reviews available.</td></tr>
                    ) : reviews.map((r: any) => (
                      <tr key={r._id}>
                        <td><strong>{r.userName}</strong></td>
                        <td>{r.packageTitle || 'General Safari'}</td>
                        <td>{r.rating} Stars</td>
                        <td className="w-1/3">"{r.reviewText}"</td>
                        <td>
                          <span className={`status-badge ${r.status === 'Approved' ? 'status-booked' : 'status-pending'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {r.status === 'Pending Approval' && (
                            <button className="btn-sm btn-primary">Approve</button>
                          )}
                          <button className="btn-sm btn-outline text-red border-red"><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="admin-panel animation-fade text-center py-xl">
              <LayoutDashboard size={48} className="mx-auto mb-md text-gray-500" />
              <h3>Package Management</h3>
              <p className="text-gray-500 max-w-2xl mx-auto mb-lg">
                This section allows the operator to add new countries, update dynamic pricing across Resident, Citizen, and Non-Resident tiers, and manage the image gallery.
              </p>
              <button className="btn-primary">Add New Package</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
