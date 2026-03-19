import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './Blog.css';

const Blog: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles`)
      .then(res => res.json())
      .then(data => {
        setAllPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = allPosts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <img src={post.image} alt={post.title} className="blog-card-image" />
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

          {/* Wildlife Spotlight Teaser */}
          <div className="sidebar-widget spotlight-widget">
            <h3>Wildlife Spotlight</h3>
            <img src="https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Elephant" className="spotlight-img mb-sm rounded" />
            <h4 className="mb-xs">The African Elephant</h4>
            <p className="text-sm mb-sm text-gray-500">Discover safaris focused on elephant conservation in Amboseli.</p>
            <button className="text-primary flex items-center gap-xs font-semibold text-sm" onClick={() => openQuoteModal({ destination: 'Amboseli Elephant Safari' })}>
              See Elephant Safaris <ArrowRight size={14} />
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Blog;
