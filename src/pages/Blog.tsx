import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search, ChevronRight, Calendar, User } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import PageHeader from '../components/Shared/PageHeader';
import './Blog.css';

const FALLBACK_ARTICLES = [
  {
    _id: 'b1',
    slug: 'mindful-safari-nature-healer',
    title: 'Inside the Mindful Safari: Why Nature is the Ultimate Healer',
    excerpt: 'Beyond the "Big Five," the true power of an African safari lies in its ability to ground us in the present moment and restore our mental clarity.',
    body: 'In today\'s hyper-connected world, the silence of the savannah is a rare luxury. At AfriVibe Safaris, we believe that nature is not just a backdrop for photos, but a profound catalyst for mental wellbeing. A mindful safari isn\'t just about checking animals off a list — it\'s about the rhythmic crunch of grass under a 4x4, the haunting call of a fish eagle at dawn, and the absolute clarity that comes when you disconnect from screens and reconnect with the earth.\n\nScientific studies have long shown that spending time in natural environments reduces cortisol levels and improves focus. We take this further by incorporating quiet reflective time and campfire storytelling into every journey. Nature challenged us, grounded us, and helped us reconnect with ourselves — and it can do the same for you.',
    author: 'Faith — Founder',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1600',
    createdAt: '2026-03-01T08:00:00Z',
    published: true
  },
  {
    _id: 'b2',
    slug: 'expert-safari-packing-guide',
    title: 'The Expert\'s Safari Packing Guide: Essentials for the Savvy Traveller',
    excerpt: 'Packing for the wild requires a balance of practicality, tradition, and respect for the environment. Here is what every safari expert recommends.',
    body: 'When preparing for your first African adventure, the temptation is to overpack. However, the true safari expert knows that less is more. Neutral tones like khaki, stone, and olive aren\'t just a fashion choice — they help you blend into the bush and avoid attracting biting insects like the Tsetse fly.\n\nLayers are critical; mornings can be biting cold while afternoons are scorching. Don\'t forget high-quality binoculars (8x42 is the gold standard), a wide-brimmed hat with a chin strap, and eco-friendly sunscreen that doesn\'t harm local water sources. Most importantly, bring a sense of wonder and a sturdy notebook to record your experiences.',
    author: 'AfriVibe Lead Guide',
    category: 'Packing Guide',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1600',
    createdAt: '2026-03-10T08:00:00Z',
    published: true
  },
  {
    _id: 'b3',
    slug: 'conservation-why-your-journey-matters',
    title: 'Conservation: Why Your Journey Matters More Than Ever',
    excerpt: 'Sustainable tourism is the backbone of wildlife protection in East Africa. Your choice to travel responsibly has a direct and lasting impact.',
    body: 'Every booking you make with AfriVibe Safaris contributes directly to the conservation of the landscapes we love. By choosing local, African-led platforms, you ensure that tourism revenue stays within the communities on the front lines of wildlife protection.\n\nWe partner with conservancies that prioritize anti-poaching initiatives and community education. In the Serengeti-Mara ecosystem, this "circular" tourism model has proven that wild spaces are most secure when local people derive tangible benefits from their preservation. Your visit helps pay for ranger salaries, wildlife monitoring programs, and the maintenance of essential corridors for migratory species.',
    author: 'AfriVibe Conservation Dept',
    category: 'Conservation',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1600',
    createdAt: '2026-03-15T08:00:00Z',
    published: true
  }
];

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openQuoteModal } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<any[]>(FALLBACK_ARTICLES);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      // First try API
      fetch(`${API_BASE_URL}/articles/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.message) {
            setCurrentPost(data);
          } else {
            // Try local fallback
            const fallback = FALLBACK_ARTICLES.find(a => a.slug === slug);
            setCurrentPost(fallback || null);
          }
          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch(() => {
          const fallback = FALLBACK_ARTICLES.find(a => a.slug === slug);
          setCurrentPost(fallback || null);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`${API_BASE_URL}/articles`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setAllPosts(data);
          }
          // else keep fallback
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  const filteredPosts = allPosts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  const getImg = (img: string, width?: number) => {
    if (!img) return FALLBACK_ARTICLES[0].image;
    return getImageUrl(img, width);
  };

  if (slug && currentPost) {
    return (
      <div className="blog-page">
        <PageHeader 
          title={currentPost.title}
          subtitle={`${currentPost.author} • ${new Date(currentPost.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
          backgroundImage={getImg(currentPost.image)}
        />

        <div className="container section">
          <div className="blog-detail-layout">
            <div className="blog-content card">
              <div className="post-body">
                {renderContent(currentPost.body)}
              </div>
              <div className="post-footer mt-xl pt-lg border-t">
                <Link to="/blog" className="btn-outline">
                  <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Blog
                </Link>
              </div>
            </div>
            
            <aside className="blog-sidebar">
              <div className="sidebar-widget cta-widget text-center">
                <h3>Want to visit {currentPost.country || 'Africa'}?</h3>
                <p className="mb-sm text-sm">Our safari experts can help you plan a trip to see these sights in person.</p>
                <button className="btn-primary w-full" onClick={() => openQuoteModal({ destination: currentPost.country || 'African Safari' })}>
                  Request a Quote
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <PageHeader 
        title="Stories from the Savannah"
        subtitle="Discover travel tips, wildlife insights, and stories from our guides and guests across Africa."
        backgroundImage="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="container section blog-layout">
        <div className="blog-main">
          {loading ? (
            <p className="text-center py-xl">Loading articles...</p>
          ) : filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <article key={post._id || post.id} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                    <img src={getImg(post.image, 600)} alt={post.title} className="blog-card-image" loading="lazy" />
                    <span className="blog-category-badge">{post.category}</span>
                  </Link>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span><User size={14} /> {post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="blog-card-title">{post.title}</h3>
                    </Link>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="read-more-link">
                      Read Article <ChevronRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-posts-found text-center py-xl">
              <h3>No articles found</h3>
              <p>Try searching for different keywords.</p>
              <button className="btn-outline mt-sm" onClick={() => setSearchTerm('')}>Clear Search</button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="sidebar-widget search-widget">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="search-icon" />
            </div>
          </div>

          <div className="sidebar-widget categories-widget">
            <h3>Categories</h3>
            <ul>
              <li><button onClick={() => setSearchTerm('Travel Tips')}>Travel Tips</button></li>
              <li><button onClick={() => setSearchTerm('Inclusive Travel')}>Inclusive Travel</button></li>
              <li><button onClick={() => setSearchTerm('Destination')}>Destination</button></li>
              <li><button onClick={() => setSearchTerm('Wildlife')}>Wildlife</button></li>
              <li><button onClick={() => setSearchTerm('Conservation')}>Conservation</button></li>
              <li><button onClick={() => setSearchTerm('Packing')}>Packing Guide</button></li>
            </ul>
          </div>

          <div className="sidebar-widget cta-widget text-center">
            <h3>Inspired to travel?</h3>
            <p className="mb-sm text-sm">Let our experts design your perfect African adventure.</p>
            <button className="btn-primary w-full" onClick={() => openQuoteModal()}>
              Request a Quote
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
