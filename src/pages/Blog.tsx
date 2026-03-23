import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search, ChevronRight, Calendar, User } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import './Blog.css';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openQuoteModal } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch(`${API_BASE_URL}/articles/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.message) {
            setCurrentPost(data);
          } else {
            setCurrentPost(null);
          }
          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(true);
      fetch(`${API_BASE_URL}/articles`)
        .then(res => res.json())
        .then(data => {
          setAllPosts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  const filteredPosts = allPosts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple Markdown-style renderer
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

  if (slug && currentPost) {
    return (
      <div className="blog-page">
        <div className="blog-detail-header py-xl" style={{ backgroundImage: `url(${getImageUrl(currentPost.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="header-overlay"></div>
          <div className="container relative z-10 text-white text-center">
            <span className="blog-category-badge mb-md inline-block">{currentPost.category}</span>
            <h1 className="text-white mb-md">{currentPost.title}</h1>
            <div className="blog-meta text-white justify-center">
              <span><Calendar size={14} /> {new Date(currentPost.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span><User size={14} /> {currentPost.author}</span>
            </div>
          </div>
        </div>

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
      <div className="blog-header py-xl text-center bg-gray-100">
        <div className="container">
          <h1 className="mb-sm text-dark">Stories from the Savannah</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Discover travel tips, wildlife insights, and stories from our guides and guests across Africa.</p>
        </div>
      </div>

      <div className="container section blog-layout">
        <div className="blog-main">
          {loading ? (
            <p className="text-center py-xl">Loading articles...</p>
          ) : filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <article key={post._id || post.id} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                    <img src={getImageUrl(post.image)} alt={post.title} className="blog-card-image" />
                    <span className="blog-category-badge">{post.category}</span>
                  </Link>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span><Calendar size={14} /> {post.date || new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
              <li><button onClick={() => setSearchTerm('Destination Spotlight')}>Destinations</button></li>
              <li><button onClick={() => setSearchTerm('Wildlife & Conservation')}>Wildlife</button></li>
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
