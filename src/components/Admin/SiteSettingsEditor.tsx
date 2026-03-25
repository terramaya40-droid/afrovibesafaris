import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { Plus, Trash2, Save } from 'lucide-react';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('afrivibe_token')}`
});

interface SiteSettingsEditorProps {
  view?: 'all' | 'virtualSafari';
}

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ view = 'all' }) => {
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

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...(settings.home.services || [])];
    newServices[index] = { ...newServices[index], [field]: value };
    setSettings((prev: any) => ({
      ...prev,
      home: { ...prev.home, services: newServices }
    }));
  };

  const addService = () => {
    setSettings((prev: any) => ({
      ...prev,
      home: {
        ...prev.home,
        services: [...(prev.home.services || []), { title: 'New Service', description: '', image: '', link: '' }]
      }
    }));
  };

  const removeService = (index: number) => {
    const newServices = [...settings.home.services];
    newServices.splice(index, 1);
    setSettings((prev: any) => ({
      ...prev,
      home: { ...prev.home, services: newServices }
    }));
  };

  const updateVirtualExperience = (index: number, field: string, value: any) => {
    const newExp = [...(settings.virtualSafari.experiences || [])];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newExp[index] = { ...newExp[index], [parent]: { ...newExp[index][parent], [child]: value } };
    } else {
      newExp[index] = { ...newExp[index], [field]: value };
    }
    setSettings((prev: any) => ({
      ...prev,
      virtualSafari: { ...prev.virtualSafari, experiences: newExp }
    }));
  };

  const addVirtualExperience = () => {
    setSettings((prev: any) => ({
      ...prev,
      virtualSafari: {
        ...prev.virtualSafari,
        experiences: [...(prev.virtualSafari.experiences || []), { title: 'New Experience', location: '', duration: '', image: '', pricing: { nonRes: '', res: '', cit: '' } }]
      }
    }));
  };

  const removeVirtualExperience = (index: number) => {
    const newExp = [...settings.virtualSafari.experiences];
    newExp.splice(index, 1);
    setSettings((prev: any) => ({
      ...prev,
      virtualSafari: { ...prev.virtualSafari, experiences: newExp }
    }));
  };

  const updateVirtualHow = (index: number, field: string, value: string) => {
    const newHow = [...(settings.virtualSafari.howItWorks || [])];
    newHow[index] = { ...newHow[index], [field]: value };
    setSettings((prev: any) => ({
      ...prev,
      virtualSafari: { ...prev.virtualSafari, howItWorks: newHow }
    }));
  };

  const ImageInput = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{label}</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Image URL or upload file"
            style={{ flex: 1, padding: '8px', fontSize: '13px' }}
          />
          <label className="btn-outline btn-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '35px' }}>
            <span>Upload</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    );
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
        {view === 'all' && (
          <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Homepage</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px' }}>Hero Slides</h4>
            {(settings.home?.heroSlides || []).map((slide: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid #eee' }}>
                <img src={slide.image || '/placeholder.jpg'} alt="Slide" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <ImageInput label="Slide Image" value={slide.image} onChange={(val) => updateSlide(i, 'image', val)} />
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
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>CTA Title (Home/Community)</label>
              <input type="text" value={settings.home?.ctaTitle || ''} onChange={(e) => updateField('home', 'ctaTitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px' }} />
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>CTA Subtitle</label>
              <input type="text" value={settings.home?.ctaSubtitle || ''} onChange={(e) => updateField('home', 'ctaSubtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h4 style={{ marginBottom: '12px', borderTop: '1px solid #eee', paddingTop: '24px' }}>Services Cards (with Images)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Services Section Title</label>
                <input type="text" value={settings.home?.servicesTitle || ''} onChange={(e) => updateField('home', 'servicesTitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Services Section Subtitle</label>
                <input type="text" value={settings.home?.servicesSubtitle || ''} onChange={(e) => updateField('home', 'servicesSubtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginTop: '16px' }}>
              {(settings.home?.services || []).map((service: any, i: number) => (
                <div key={i} style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h5 style={{ margin: 0 }}>Service #{i + 1}</h5>
                    <button className="text-red" onClick={() => removeService(i)} style={{ padding: '4px' }}><Trash2 size={14} /></button>
                  </div>
                  <ImageInput label="Background Image" value={service.image} onChange={(val) => updateService(i, 'image', val)} />
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Title</label>
                  <input type="text" value={service.title} onChange={(e) => updateService(i, 'title', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Description</label>
                  <textarea rows={2} value={service.description} onChange={(e) => updateService(i, 'description', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Link Path (e.g. /destinations)</label>
                  <input type="text" value={service.link} onChange={(e) => updateService(i, 'link', e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '13px' }} />
                </div>
              ))}
              <div 
                onClick={addService}
                style={{ 
                  border: '2px dashed #ddd', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  minHeight: '200px',
                  color: '#999'
                }}
              >
                <Plus size={24} />
                <span>Add Service Card</span>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* --- ABOUT PAGE SETTINGS --- */}
        {view === 'all' && (
        <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>About Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <ImageInput label="Banner Image" value={settings.about?.bannerImage || ''} onChange={(val) => updateField('about', 'bannerImage', val)} />
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
        )}

        {/* --- WELLNESS & TRAVEL SERVICES --- */}
        {view === 'all' && (
        <section className="settings-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Wellness Page</h3>
            <ImageInput label="Banner Image" value={settings.wellness?.bannerImage || ''} onChange={(val) => updateField('wellness', 'bannerImage', val)} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Title</label>
            <input type="text" value={settings.wellness?.title || ''} onChange={(e) => updateField('wellness', 'title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Subtitle</label>
            <textarea rows={2} value={settings.wellness?.subtitle || ''} onChange={(e) => updateField('wellness', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Content Body</label>
            <textarea rows={4} value={settings.wellness?.body || ''} onChange={(e) => updateField('wellness', 'body', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Travel Services Page</h3>
            <ImageInput label="Banner Image" value={settings.travelServices?.bannerImage || ''} onChange={(val) => updateField('travelServices', 'bannerImage', val)} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Title</label>
            <input type="text" value={settings.travelServices?.title || ''} onChange={(e) => updateField('travelServices', 'title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Subtitle</label>
            <textarea rows={2} value={settings.travelServices?.subtitle || ''} onChange={(e) => updateField('travelServices', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Content Body</label>
            <textarea rows={4} value={settings.travelServices?.body || ''} onChange={(e) => updateField('travelServices', 'body', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>
        </section>
        )}

        {/* --- VIRTUAL SAFARI SETTINGS --- */}
        {(view === 'all' || view === 'virtualSafari') && (
        <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Virtual Safaris</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <ImageInput label="Hero Banner Image" value={settings.virtualSafari?.bannerImage || ''} onChange={(val) => updateField('virtualSafari', 'bannerImage', val)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Hero Title</label>
              <input type="text" value={settings.virtualSafari?.title || ''} onChange={(e) => updateField('virtualSafari', 'title', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Hero Subtitle</label>
              <input type="text" value={settings.virtualSafari?.subtitle || ''} onChange={(e) => updateField('virtualSafari', 'subtitle', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>

          <h4 style={{ marginBottom: '12px', borderTop: '1px solid #eee', paddingTop: '24px' }}>Virtual Experiences</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
            {(settings.virtualSafari?.experiences || []).map((exp: any, i: number) => (
              <div key={i} style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h5 style={{ margin: 0 }}>Experience #{i + 1}</h5>
                  <button className="text-red" onClick={() => removeVirtualExperience(i)} style={{ padding: '4px' }}><Trash2 size={14} /></button>
                </div>
                <ImageInput label="Experience Image" value={exp.image} onChange={(val) => updateVirtualExperience(i, 'image', val)} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Title</label>
                    <input type="text" value={exp.title} onChange={(e) => updateVirtualExperience(i, 'title', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Location</label>
                    <input type="text" value={exp.location} onChange={(e) => updateVirtualExperience(i, 'location', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Duration</label>
                    <input type="text" value={exp.duration} onChange={(e) => updateVirtualExperience(i, 'duration', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                  </div>
                  <div style={{ borderTop: '1px solid #eee', gridColumn: '1 / -1', paddingTop: '8px', marginTop: '4px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Pricing</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <input type="text" placeholder="Non-Res" value={exp.pricing?.nonRes} onChange={(e) => updateVirtualExperience(i, 'pricing.nonRes', e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '12px' }} />
                      <input type="text" placeholder="Res" value={exp.pricing?.res} onChange={(e) => updateVirtualExperience(i, 'pricing.res', e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '12px' }} />
                      <input type="text" placeholder="Cit" value={exp.pricing?.cit} onChange={(e) => updateVirtualExperience(i, 'pricing.cit', e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '12px' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div 
              onClick={addVirtualExperience}
              style={{ border: '2px dashed #ddd', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '150px', color: '#999' }}
            >
              <Plus size={24} />
              <span>Add Virtual Experience</span>
            </div>
          </div>

          <h4 style={{ marginBottom: '12px', marginTop: '32px', borderTop: '1px solid #eee', paddingTop: '24px' }}>How it Works</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {(settings.virtualSafari?.howItWorks || []).map((step: any, i: number) => (
              <div key={i} style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '1px solid #eee' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Icon Name (Lucide)</label>
                <input type="text" value={step.icon} onChange={(e) => updateVirtualHow(i, 'icon', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Title</label>
                <input type="text" value={step.title} onChange={(e) => updateVirtualHow(i, 'title', e.target.value)} style={{ width: '100%', marginBottom: '8px', padding: '6px', fontSize: '13px' }} />
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Description</label>
                <textarea rows={2} value={step.description} onChange={(e) => updateVirtualHow(i, 'description', e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '13px' }} />
              </div>
            ))}
          </div>
        </section>
        )}

        {/* --- FOOTER & CONTACT SETTINGS --- */}
        {view === 'all' && (
        <section className="settings-section" style={{ background: '#f9f9fa', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>Footer & Social Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '15px' }}>Contact Info</h4>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Email</label>
              <input type="text" value={settings.contact?.email || ''} onChange={(e) => updateField('contact', 'email', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Phone</label>
              <input type="text" value={settings.contact?.phone || ''} onChange={(e) => updateField('contact', 'phone', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Address</label>
              <input type="text" value={settings.contact?.address || ''} onChange={(e) => updateField('contact', 'address', e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '15px' }}>Social Links</h4>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Instagram</label>
              <input type="text" value={settings.contact?.socialLinks?.instagram || ''} onChange={(e) => {
                const newSocial = { ...settings.contact.socialLinks, instagram: e.target.value };
                updateField('contact', 'socialLinks', newSocial);
              }} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Facebook</label>
              <input type="text" value={settings.contact?.socialLinks?.facebook || ''} onChange={(e) => {
                const newSocial = { ...settings.contact.socialLinks, facebook: e.target.value };
                updateField('contact', 'socialLinks', newSocial);
              }} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>YouTube</label>
              <input type="text" value={settings.contact?.socialLinks?.youtube || ''} onChange={(e) => {
                const newSocial = { ...settings.contact.socialLinks, youtube: e.target.value };
                updateField('contact', 'socialLinks', newSocial);
              }} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '15px' }}>WhatsApp Integration</h4>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>WhatsApp Number (Digits only)</label>
              <input type="text" value={settings.contact?.whatsapp?.phone || ''} onChange={(e) => {
                const newWS = { ...settings.contact.whatsapp, phone: e.target.value };
                updateField('contact', 'whatsapp', newWS);
              }} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Default Message</label>
              <input type="text" value={settings.contact?.whatsapp?.message || ''} onChange={(e) => {
                const newWS = { ...settings.contact.whatsapp, message: e.target.value };
                updateField('contact', 'whatsapp', newWS);
              }} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>
        </section>
        )}

      </div>
    </div>
  );
};

export default SiteSettingsEditor;
