import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { Plus, Trash2, Save } from 'lucide-react';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('afrivibe_token')}`
});

const SiteSettingsEditor: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading site content...</div>;
  if (!settings) return <div>Error loading settings.</div>;

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...settings.home.heroSlides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSettings((prev: any) => ({
      ...prev,
      home: { ...prev.home, heroSlides: newSlides }
    }));
  };

  const addSlide = () => {
    setSettings((prev: any) => ({
      ...prev,
      home: {
        ...prev.home,
        heroSlides: [...(prev.home.heroSlides || []), { image: '', title: 'New Slide' }]
      }
    }));
  };

  const removeSlide = (index: number) => {
    const newSlides = [...settings.home.heroSlides];
    newSlides.splice(index, 1);
    setSettings((prev: any) => ({
      ...prev,
      home: { ...prev.home, heroSlides: newSlides }
    }));
  };

  return (
    <div className="admin-panel animation-fade">
      <div className="panel-toolbar">
        <p className="text-gray-500">Modify the text and images across the public facing pages.</p>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} style={{ marginRight: '8px' }} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="settings-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* --- HOMEPAGE SETTINGS --- */}
        <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Homepage</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px' }}>Hero Slides</h4>
            {(settings.home?.heroSlides || []).map((slide: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid #eee' }}>
                <img src={slide.image || '/placeholder.jpg'} alt="Slide" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Image URL" value={slide.image} onChange={(e) => updateSlide(i, 'image', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '8px' }} />
                  <input type="text" placeholder="Slide Title" value={slide.title} onChange={(e) => updateSlide(i, 'title', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                </div>
                <button className="btn-outline text-red" onClick={() => removeSlide(i)}><Trash2 size={16} /></button>
              </div>
            ))}
            <button className="btn-outline btn-sm" onClick={addSlide}><Plus size={14} /> Add Slide</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Hero Subtitle</label>
              <textarea rows={3} value={settings.home?.heroSubtitle || ''} onChange={(e) => updateField('home', 'heroSubtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Services Title</label>
              <input type="text" value={settings.home?.servicesTitle || ''} onChange={(e) => updateField('home', 'servicesTitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px' }} />
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Services Subtitle</label>
              <input type="text" value={settings.home?.servicesSubtitle || ''} onChange={(e) => updateField('home', 'servicesSubtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>CTA Title (Footer)</label>
              <input type="text" value={settings.home?.ctaTitle || ''} onChange={(e) => updateField('home', 'ctaTitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>CTA Subtitle</label>
              <input type="text" value={settings.home?.ctaSubtitle || ''} onChange={(e) => updateField('home', 'ctaSubtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>
        </section>

        {/* --- ABOUT PAGE SETTINGS --- */}
        <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>About Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Banner Image URL</label>
              <input type="text" value={settings.about?.bannerImage || ''} onChange={(e) => updateField('about', 'bannerImage', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Section Title</label>
              <input type="text" value={settings.about?.title || ''} onChange={(e) => updateField('about', 'title', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Hero Subtitle</label>
              <input type="text" value={settings.about?.subtitle || ''} onChange={(e) => updateField('about', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Main Body Text (Who We Are)</label>
              <textarea rows={6} value={settings.about?.body || ''} onChange={(e) => updateField('about', 'body', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>
        </section>

        {/* --- WELLNESS & TRAVEL SERVICES --- */}
        <section className="settings-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Wellness Page</h3>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Banner Image URL</label>
            <input type="text" value={settings.wellness?.bannerImage || ''} onChange={(e) => updateField('wellness', 'bannerImage', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Title</label>
            <input type="text" value={settings.wellness?.title || ''} onChange={(e) => updateField('wellness', 'title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Subtitle</label>
            <textarea rows={2} value={settings.wellness?.subtitle || ''} onChange={(e) => updateField('wellness', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Content Body</label>
            <textarea rows={4} value={settings.wellness?.body || ''} onChange={(e) => updateField('wellness', 'body', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Travel Services Page</h3>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Banner Image URL</label>
            <input type="text" value={settings.travelServices?.bannerImage || ''} onChange={(e) => updateField('travelServices', 'bannerImage', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Title</label>
            <input type="text" value={settings.travelServices?.title || ''} onChange={(e) => updateField('travelServices', 'title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Subtitle</label>
            <textarea rows={2} value={settings.travelServices?.subtitle || ''} onChange={(e) => updateField('travelServices', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Content Body</label>
            <textarea rows={4} value={settings.travelServices?.body || ''} onChange={(e) => updateField('travelServices', 'body', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>
        </section>

      </div>
    </div>
  );
};

export default SiteSettingsEditor;
