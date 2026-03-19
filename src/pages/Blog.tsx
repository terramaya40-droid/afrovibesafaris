import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Search, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import './Blog.css';

const MOCK_POSTS = [
  {
    id: 1,
    title: 'The Great Migration: When and Where to Go',
    excerpt: 'Everything you need to know to witness the spectacular movement of millions of wildebeest across the Serengeti and Maasai Mara.',
    author: 'David L.',
    date: 'Oct 15, 2025',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'great-migration-guide'
  },
  {
    id: 2,
    title: 'Accessible Safaris: How We Make Africa Inclusive',
    excerpt: 'A deep dive into our specially equipped vehicles and trained guides that ensure everyone can experience the magic of the bush.',
    author: 'Sarah Jenkins',
    date: 'Sep 28, 2025',
    category: 'Inclusive Travel',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'accessible-safaris-inclusive-africa'
  },
  {
    id: 3,
    title: '5 Reasons Uganda Should Be Your Next Destination',
    excerpt: 'Beyond gorillas, discover the stunning landscapes, vibrant culture, and diverse wildlife of the Pearl of Africa.',
    author: 'Michael K.',
    date: 'Sep 10, 2025',
    category: 'Destination Spotlight',
    image: 'https://images.unsplash.com/photo-1574709756113-58134eb92404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: '5-reasons-to-visit-uganda'
  },
  {
    id: 4,
    title: 'Wildlife Spotlight: The African Elephant',
    excerpt: 'Learn about the complex social structures, immense intelligence, and conservation status of these gentle giants.',
    author: 'Jane G.',
    date: 'Aug 22, 2025',
    category: 'Wildlife & Conservation',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'wildlife-spotlight-african-elephant'
  }
];

const Blog: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = MOCK_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        
        {/* Main Content */}
        <div className="blog-main">
          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-image-link">
                    <img src={post.image} alt={post.title} className="blog-card-image" />
                    <span className="blog-category-badge">{post.category}</span>
                  </Link>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span><Calendar size={14} /> {post.date}</span>
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
