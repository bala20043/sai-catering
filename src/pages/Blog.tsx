import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageTransition from '../components/layout/PageTransition';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const activePost = slug ? posts.find(p => p.slug === slug) : null;

  if (activePost) {
    return (
      <PageTransition>
        <section className="pt-28 pb-20 bg-surface min-h-screen">
          <div className="max-w-3xl mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors mb-6">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
            {activePost.cover_image && (
              <img src={activePost.cover_image} alt={activePost.title} className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-xl" />
            )}
            <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
              <Calendar size={14} />
              {new Date(activePost.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-4xl font-accent font-bold text-text-dark mb-6">{activePost.title}</h1>
            <div className="prose max-w-none text-text-muted leading-relaxed whitespace-pre-line">{activePost.content}</div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-accent text-sm tracking-widest uppercase mb-2">Stories & Tips</p>
          <h1 className="text-5xl md:text-6xl font-accent font-bold text-cream">Our Blog</h1>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm mt-4">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link><span>/</span><span className="text-accent">Blog</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20"><div className="loader-kolam" /></div>
          ) : posts.length === 0 ? (
            <p className="text-center text-text-muted py-20">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group">
                    <div className="bg-cream rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all">
                      {post.cover_image && (
                        <div className="h-52 overflow-hidden">
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
                          <Calendar size={12} />
                          {new Date(post.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-heading font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-text-muted text-sm line-clamp-3">{post.excerpt}</p>
                        <p className="text-primary text-sm font-semibold mt-3">Read More →</p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Blog;
