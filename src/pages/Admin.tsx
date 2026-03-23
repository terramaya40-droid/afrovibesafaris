import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, CheckCircle,
  Trash2, Edit, Plus, X, LogOut, BookOpen, Map, Settings
} from 'lucide-react';
import SiteSettingsEditor from '../components/Admin/SiteSettingsEditor';
import { API_BASE_URL } from '../config';
import './Admin.css';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('afrivibe_token')}`
});

// ——— EMPTY FORM TEMPLATES ——————————————————————————————————————
const emptyPackage = {
  title: '', country: '', description: '', image: '', packageType: 'Classical',
  category: 'Safari', duration: '5 Nights',
  pricing: { nonRes: '', res: '', cit: '' },
  rating: 5.0, reviewCount: 0
};
const emptyArticle = {
  title: '', slug: '', excerpt: '', body: '', author: '',
  category: 'Travel Tips', country: '', image: '', published: false
};

const emptyDestination = {
  id: '', name: '', subtitle: '', description: '', image: ''
};

const emptyGalleryItem = {
  image: '', title: '', location: ''
};

// ——— PACKAGE FORM MODAL ——————————————————————————————————————————
const PackageModal: React.FC<{ pkg: any; onClose: () => void; onSave: () => void }> = ({ pkg, onClose, onSave }) => {
  const [form, setForm] = useState(pkg);
  const [saving, setSaving] = useState(false);
  const isEdit = !!pkg._id;

  const set = (field: string, val: any) => setForm((p: any) => ({ ...p, [field]: val }));
  const setPricing = (key: string, val: string) => setForm((p: any) => ({ ...p, pricing: { ...p.pricing, [key]: val } }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set('image', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.title || !form.country || !form.pricing?.nonRes) {
      alert("Please fill in at least Title, Country, and Non-Res Pricing.");
      return;
    }
    setSaving(true);
    const url = isEdit ? `${API_BASE_URL}/packages/${pkg._id}` : `${API_BASE_URL}/packages`;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving package: ${errorData.message}`);
        setSaving(false);
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cms-modal" onClick={e => e.stopPropagation()}>
        <div className="cms-modal-header">
          <h3>{isEdit ? 'Edit Package' : 'Add New Package'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cms-modal-body">
          <div className="form-group"><label>Title</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
          <div className="form-group-row">
            <div className="form-group"><label>Country</label>
              <select value={form.country} onChange={e => set('country', e.target.value)}>
                <option value="">Select Country</option>
                {['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Botswana'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Duration</label><input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 5 Nights" /></div>
          </div>
          <div className="form-group-row">
            <div className="form-group"><label>Safari Type</label>
              <select value={form.packageType} onChange={e => set('packageType', e.target.value)}>
                {['Classical', 'Family', 'Couple', 'Inclusive', 'Adventure', 'Luxury'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {['Safari', 'Beach', 'Hiking', 'Nature', 'Adventure'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} /></div>
          <div className="form-group">
            <label>Package Image</label>
            <div className="image-upload-wrapper">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
              <div className="or-divider"><span>OR</span></div>
              <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="Paste URL instead..." className="url-input" />
            </div>
          </div>
          {form.image && <img src={form.image} alt="preview" className="img-preview" />}
          <p className="form-section-label">Pricing Tiers</p>
          <div className="form-group-row">
            <div className="form-group"><label>Non-Resident (USD)</label><input value={form.pricing.nonRes} onChange={e => setPricing('nonRes', e.target.value)} placeholder="$2,500" /></div>
            <div className="form-group"><label>Resident</label><input value={form.pricing.res} onChange={e => setPricing('res', e.target.value)} placeholder="KES 90,000" /></div>
            <div className="form-group"><label>Citizen</label><input value={form.pricing.cit} onChange={e => setPricing('cit', e.target.value)} placeholder="KES 60,000" /></div>
          </div>
        </div>
        <div className="cms-modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Package'}</button>
        </div>
      </div>
    </div>
  );
};

// ——— ARTICLE FORM MODAL ——————————————————————————————————————————
const ArticleModal: React.FC<{ article: any; onClose: () => void; onSave: () => void }> = ({ article, onClose, onSave }) => {
  const [form, setForm] = useState(article);
  const [saving, setSaving] = useState(false);
  const isEdit = !!article._id;

  const set = (field: string, val: any) => setForm((p: any) => ({ ...p, [field]: val }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set('image', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    const url = isEdit ? `${API_BASE_URL}/articles/${article._id}` : `${API_BASE_URL}/articles`;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving article: ${errorData.message}`);
        setSaving(false);
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cms-modal" onClick={e => e.stopPropagation()}>
        <div className="cms-modal-header">
          <h3>{isEdit ? 'Edit Article' : 'Add New Article'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cms-modal-body">
          <div className="form-group"><label>Title</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
          <div className="form-group-row">
            <div className="form-group"><label>Slug (URL)</label><input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="my-article-slug" /></div>
            <div className="form-group"><label>Author</label><input value={form.author} onChange={e => set('author', e.target.value)} /></div>
          </div>
          <div className="form-group-row">
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {['Travel Tips', 'Destination Spotlight', 'Wildlife & Conservation', 'Inclusive Travel', 'Safari Guide'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Country (optional)</label>
              <select value={form.country} onChange={e => set('country', e.target.value)}>
                <option value="">All Countries</option>
                {['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Botswana'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group"><label>Excerpt (short description)</label><textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} /></div>
          <div className="form-group">
            <label>Cover Image</label>
            <div className="image-upload-wrapper">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
              <div className="or-divider"><span>OR</span></div>
              <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="Paste URL instead..." className="url-input" />
            </div>
          </div>
          {form.image && <img src={form.image} alt="preview" className="img-preview" />}
          <div className="form-group"><label>Body (Markdown supported)</label><textarea rows={10} value={form.body} onChange={e => set('body', e.target.value)} className="markdown-editor" /></div>
          <div className="form-group checkbox-group">
            <label><input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} /> Published (visible on public site)</label>
          </div>
        </div>
        <div className="cms-modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Article'}</button>
        </div>
      </div>
    </div>
  );
};

const DestinationModal: React.FC<{ dest: any; onClose: () => void; onSave: () => void }> = ({ dest, onClose, onSave }) => {
  const [form, setForm] = useState(dest);
  const [saving, setSaving] = useState(false);
  const isEdit = !!dest._id;
  const set = (field: string, val: any) => setForm((p: any) => ({ ...p, [field]: val }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set('image', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    const url = isEdit ? `${API_BASE_URL}/destinations/${dest._id}` : `${API_BASE_URL}/destinations`;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving destination: ${errorData.message}`);
        setSaving(false);
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cms-modal" onClick={e => e.stopPropagation()}>
        <div className="cms-modal-header"><h3>{isEdit ? 'Edit Destination' : 'Add Destination'}</h3><button onClick={onClose}><X size={20} /></button></div>
        <div className="cms-modal-body">
          <div className="form-group"><label>ID (slug)</label><input value={form.id} onChange={e => set('id', e.target.value)} placeholder="kenya" disabled={isEdit} /></div>
          <div className="form-group"><label>Name</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Kenya" /></div>
          <div className="form-group"><label>Subtitle</label><input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="The Pride of Africa" /></div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} /></div>
          <div className="form-group">
            <label>Banner Image</label>
            <div className="image-upload-wrapper">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
              <div className="or-divider"><span>OR</span></div>
              <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="URL..." className="url-input" />
            </div>
          </div>
          {form.image && <img src={form.image} alt="preview" className="img-preview" />}
        </div>
        <div className="cms-modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

const GalleryModal: React.FC<{ item: any; onClose: () => void; onSave: () => void }> = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState(item);
  const [saving, setSaving] = useState(false);
  const isEdit = !!item._id;
  const set = (field: string, val: any) => setForm((p: any) => ({ ...p, [field]: val }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set('image', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`, { method: 'POST', headers: getAuthHeader(), body: JSON.stringify(form) });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving photo: ${errorData.message}`);
        setSaving(false);
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cms-modal" onClick={e => e.stopPropagation()}>
        <div className="cms-modal-header"><h3>{isEdit ? 'Edit Gallery Item' : 'Add Photo'}</h3><button onClick={onClose}><X size={20} /></button></div>
        <div className="cms-modal-body">
          <div className="form-group"><label>Title</label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
          <div className="form-group"><label>Location</label><input value={form.location} onChange={e => set('location', e.target.value)} /></div>
          <div className="form-group">
            <label>Photo</label>
            <div className="image-upload-wrapper">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
              <div className="or-divider"><span>OR</span></div>
              <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="URL..." className="url-input" />
            </div>
          </div>
          {form.image && <img src={form.image} alt="preview" className="img-preview" />}
        </div>
        <div className="cms-modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

const ReviewModal: React.FC<{ review: any; onClose: () => void; onSave: () => void }> = ({ review, onClose, onSave }) => {
  const [form, setForm] = useState(review);
  const [saving, setSaving] = useState(false);
  const set = (field: string, val: any) => setForm((p: any) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/${review._id}`, { method: 'PUT', headers: getAuthHeader(), body: JSON.stringify(form) });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving review: ${errorData.message}`);
        setSaving(false);
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cms-modal" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
        <div className="cms-modal-header"><h3>Edit Review</h3><button onClick={onClose}><X size={20} /></button></div>
        <div className="cms-modal-body">
          <div className="form-group"><label>User Name</label><input value={form.userName} onChange={e => set('userName', e.target.value)} /></div>
          <div className="form-group"><label>Package Title (optional)</label><input value={form.packageTitle || ''} onChange={e => set('packageTitle', e.target.value)} /></div>
          <div className="form-group"><label>Rating (1-5)</label><input type="number" min="1" max="5" value={form.rating} onChange={e => set('rating', Number(e.target.value))} /></div>
          <div className="form-group"><label>Review Text</label><textarea rows={4} value={form.reviewText} onChange={e => set('reviewText', e.target.value)} /></div>
        </div>
        <div className="cms-modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

// ——— MAIN ADMIN PAGE ——————————————————————————————————————————————
const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'quotes' | 'reviews' | 'packages' | 'articles' | 'destinations' | 'gallery' | 'settings'>('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modals
  const [pkgModal, setPkgModal] = useState<any>(null);
  const [artModal, setArtModal] = useState<any>(null);
  const [destModal, setDestModal] = useState<any>(null);
  const [galleryModal, setGalleryModal] = useState<any>(null);
  const [reviewModal, setReviewModal] = useState<any>(null);

  const fetchTab = useCallback(async (tab: string) => {
    setLoading(true);
    try {
      if (tab === 'quotes') {
        const r = await fetch(`${API_BASE_URL}/quotes`, { headers: getAuthHeader() });
        setQuotes(await r.json());
      } else if (tab === 'reviews') {
        const r = await fetch(`${API_BASE_URL}/testimonials/admin`, { headers: getAuthHeader() });
        setReviews(await r.json());
      } else if (tab === 'packages') {
        const r = await fetch(`${API_BASE_URL}/packages`);
        setPackages(await r.json());
      } else if (tab === 'articles') {
        const r = await fetch(`${API_BASE_URL}/articles/admin/all`, { headers: getAuthHeader() });
        setArticles(await r.json());
      } else if (tab === 'destinations') {
        const r = await fetch(`${API_BASE_URL}/destinations`);
        setDestinations(await r.json());
      } else if (tab === 'gallery') {
        const r = await fetch(`${API_BASE_URL}/gallery`);
        setGallery(await r.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTab(activeTab); }, [activeTab, fetchTab]);

  const handleLogout = () => {
    localStorage.removeItem('afrivibe_token');
    navigate('/001/admin/login');
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/quotes/${id}/status`, { method: 'PATCH', headers: getAuthHeader(), body: JSON.stringify({ status }) });
    fetchTab('quotes');
  };

  const updateReviewStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/testimonials/${id}/status`, { method: 'PATCH', headers: getAuthHeader(), body: JSON.stringify({ status }) });
    fetchTab('reviews');
  };

  const deletePackage = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    await fetch(`${API_BASE_URL}/packages/${id}`, { method: 'DELETE', headers: getAuthHeader() });
    fetchTab('packages');
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await fetch(`${API_BASE_URL}/articles/${id}`, { method: 'DELETE', headers: getAuthHeader() });
    fetchTab('articles');
  };

  return (
    <div className="admin-page">
      {/* Modals */}
      {pkgModal && <PackageModal pkg={pkgModal} onClose={() => setPkgModal(null)} onSave={() => fetchTab('packages')} />}
      {artModal && <ArticleModal article={artModal} onClose={() => setArtModal(null)} onSave={() => fetchTab('articles')} />}
      {destModal && <DestinationModal dest={destModal} onClose={() => setDestModal(null)} onSave={() => fetchTab('destinations')} />}
      {galleryModal && <GalleryModal item={galleryModal} onClose={() => setGalleryModal(null)} onSave={() => fetchTab('gallery')} />}
      {reviewModal && <ReviewModal review={reviewModal} onClose={() => setReviewModal(null)} onSave={() => fetchTab('reviews')} />}

      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/logo.jpg" alt="Logo" className="admin-sidebar-logo" />
          <h2 className="admin-logo">AfriVibe <span>Safaris Admin</span></h2>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>
            <FileText size={20} /> Quote Requests
          </button>
          <button className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            <CheckCircle size={20} /> Reviews
          </button>
          <button className={`admin-nav-item ${activeTab === 'packages' ? 'active' : ''}`} onClick={() => setActiveTab('packages')}>
            <LayoutDashboard size={20} /> Packages
          </button>
          <button className={`admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>
            <BookOpen size={20} /> Blog Articles
          </button>
          <button className={`admin-nav-item ${activeTab === 'destinations' ? 'active' : ''}`} onClick={() => setActiveTab('destinations')}>
            <Map size={20} /> Destinations
          </button>
          <button className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            <Users size={20} /> Gallery
          </button>
          <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Site Content
          </button>
        </nav>
        <button className="admin-nav-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h2>
            {activeTab === 'quotes' ? 'Quote Requests' 
             : activeTab === 'reviews' ? 'Review Moderation' 
             : activeTab === 'packages' ? 'Package Manager' 
             : activeTab === 'articles' ? 'Blog Articles' 
             : activeTab === 'destinations' ? 'Destination Manager' 
             : activeTab === 'settings' ? 'Site Content Database' 
             : 'Gallery Manager'}
          </h2>
          <div className="admin-user"><Users size={20} /> Admin</div>
        </div>

        <div className="admin-main section">

          {/* ——— QUOTES ——— */}
          {activeTab === 'quotes' && (
            <div className="admin-panel animation-fade">
              <p className="text-gray-500 mb-lg">Manage incoming inquiries. Update their status as you process each quote.</p>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>ID</th><th>Client</th><th>Destination</th><th>Type</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={7} className="text-center">Loading...</td></tr>
                      : quotes.length === 0 ? <tr><td colSpan={7} className="text-center">No quotes yet.</td></tr>
                      : quotes.map(q => (
                        <tr key={q._id}>
                          <td><strong>…{q._id.slice(-6)}</strong></td>
                          <td>{q.name}<br /><span className="text-sm text-gray-500">{q.email}</span></td>
                          <td>{q.destination}</td>
                          <td>{q.safariType}</td>
                          <td>{q.dates}</td>
                          <td><span className={`status-badge status-${q.status.replace(/\s/g, '').toLowerCase()}`}>{q.status}</span></td>
                          <td className="actions-cell">
                            <select value={q.status} onChange={e => updateQuoteStatus(q._id, e.target.value)} className="status-select">
                              {['Pending', 'Quote Sent', 'Booked', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— REVIEWS ——— */}
          {activeTab === 'reviews' && (
            <div className="admin-panel animation-fade">
              <p className="text-gray-500 mb-lg">Approve or reject customer reviews before they appear publicly.</p>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>User</th><th>Package</th><th>Rating</th><th>Review</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={6} className="text-center">Loading...</td></tr>
                      : reviews.length === 0 ? <tr><td colSpan={6} className="text-center">No reviews yet.</td></tr>
                      : reviews.map(r => (
                        <tr key={r._id}>
                          <td><strong>{r.userName}</strong></td>
                          <td>{r.packageTitle || 'General'}</td>
                          <td>{'★'.repeat(r.rating)}</td>
                          <td className="review-cell">"{r.reviewText}"</td>
                          <td><span className={`status-badge ${r.status === 'Approved' ? 'status-booked' : 'status-pending'}`}>{r.status}</span></td>
                          <td className="actions-cell">
                            <button className="btn-sm btn-outline" onClick={() => setReviewModal(r)}><Edit size={14} /></button>
                            {r.status !== 'Approved' && <button className="btn-sm btn-primary" onClick={() => updateReviewStatus(r._id, 'Approved')}>Approve</button>}
                            {r.status === 'Approved' && <button className="btn-sm btn-outline" onClick={() => updateReviewStatus(r._id, 'Pending Approval')}>Unpublish</button>}
                            <button className="btn-sm btn-outline text-red" onClick={() => updateReviewStatus(r._id, 'Rejected')}><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— PACKAGES ——— */}
          {activeTab === 'packages' && (
            <div className="admin-panel animation-fade">
              <div className="panel-toolbar">
                <p className="text-gray-500">Create, edit, or remove safari packages. Changes appear instantly on the public site.</p>
                <button className="btn-primary btn-sm" onClick={() => setPkgModal({ ...emptyPackage })}>
                  <Plus size={16} /> Add Package
                </button>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Image</th><th>Title</th><th>Country</th><th>Type</th><th>Non-Res Price</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={6} className="text-center">Loading...</td></tr>
                      : packages.length === 0 ? <tr><td colSpan={6} className="text-center">No packages yet.</td></tr>
                      : packages.map(p => (
                        <tr key={p._id}>
                          <td><img src={p.image} alt={p.title} className="table-thumb" /></td>
                          <td><strong>{p.title}</strong><br /><span className="text-sm text-gray-500">{p.duration}</span></td>
                          <td>{p.country}</td>
                          <td>{p.packageType}</td>
                          <td>{p.pricing?.nonRes}</td>
                          <td className="actions-cell">
                            <button className="btn-sm btn-outline" onClick={() => setPkgModal(p)}><Edit size={14} /></button>
                            <button className="btn-sm btn-outline text-red" onClick={() => deletePackage(p._id)}><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— ARTICLES ——— */}
          {activeTab === 'articles' && (
            <div className="admin-panel animation-fade">
              <div className="panel-toolbar">
                <p className="text-gray-500">Write and manage blog articles. Published articles appear on the public Blog page.</p>
                <button className="btn-primary btn-sm" onClick={() => setArtModal({ ...emptyArticle })}>
                  <Plus size={16} /> New Article
                </button>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Author</th><th>Published</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={6} className="text-center">Loading...</td></tr>
                      : articles.length === 0 ? <tr><td colSpan={6} className="text-center">No articles yet.</td></tr>
                      : articles.map(a => (
                        <tr key={a._id}>
                          <td><img src={a.image} alt={a.title} className="table-thumb" /></td>
                          <td><strong>{a.title}</strong><br /><span className="text-sm text-gray-500">/{a.slug}</span></td>
                          <td>{a.category}</td>
                          <td>{a.author}</td>
                          <td><span className={`status-badge ${a.published ? 'status-booked' : 'status-pending'}`}>{a.published ? 'Live' : 'Draft'}</span></td>
                          <td className="actions-cell">
                            <button className="btn-sm btn-outline" onClick={() => setArtModal(a)}><Edit size={14} /></button>
                            <button className="btn-sm btn-outline text-red" onClick={() => deleteArticle(a._id)}><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— DESTINATIONS ——— */}
          {activeTab === 'destinations' && (
            <div className="admin-panel animation-fade">
              <div className="panel-toolbar">
                <p className="text-gray-500">Manage destination header content and banner images.</p>
                <button className="btn-primary btn-sm" onClick={() => setDestModal({ ...emptyDestination })}>
                  <Plus size={16} /> Add Destination
                </button>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Image</th><th>Name</th><th>Subtitle</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={4} className="text-center">Loading...</td></tr>
                      : destinations.length === 0 ? <tr><td colSpan={4} className="text-center">No destinations yet.</td></tr>
                      : destinations.map(d => (
                        <tr key={d._id}>
                          <td><img src={d.image} alt={d.name} className="table-thumb" /></td>
                          <td><strong>{d.name}</strong><br /><span className="text-sm text-gray-500">/{d.id}</span></td>
                          <td>{d.subtitle}</td>
                          <td className="actions-cell">
                            <button className="btn-sm btn-outline" onClick={() => setDestModal(d)}><Edit size={14} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— GALLERY ——— */}
          {activeTab === 'gallery' && (
            <div className="admin-panel animation-fade">
              <div className="panel-toolbar">
                <p className="text-gray-500">Manage the public gallery photos.</p>
                <button className="btn-primary btn-sm" onClick={() => setGalleryModal({ ...emptyGalleryItem })}>
                  <Plus size={16} /> Add Photo
                </button>
              </div>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Photo</th><th>Title</th><th>Location</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={4} className="text-center">Loading...</td></tr>
                      : gallery.length === 0 ? <tr><td colSpan={4} className="text-center">No photos yet.</td></tr>
                      : gallery.map(g => (
                        <tr key={g._id}>
                          <td><img src={g.image} alt={g.title} className="table-thumb" /></td>
                          <td><strong>{g.title}</strong></td>
                          <td>{g.location}</td>
                          <td className="actions-cell">
                            <button className="btn-sm btn-outline" onClick={() => setGalleryModal(g)}><Edit size={14} /></button>
                            <button className="btn-sm btn-outline text-red" onClick={async () => {
                              if (!confirm('Delete this photo?')) return;
                              await fetch(`${API_BASE_URL}/gallery/${g._id}`, { method: 'DELETE', headers: getAuthHeader() });
                              fetchTab('gallery');
                            }}><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ——— SITE SETTINGS ——— */}
          {activeTab === 'settings' && <SiteSettingsEditor />}

        </div>
      </div>
    </div>
  );
};

export default Admin;
