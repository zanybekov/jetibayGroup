import React from 'react';
import Blog from '../components/Blog';
import '../styles/pages.css';

const BlogPage = () => {
  return (
    <main className="page-main blog-page">
      <section className="page-section section-spacing blog-section">
        <div className="section-wrapper">
          <Blog />
        </div>
      </section>
    </main>
  );
};

export default BlogPage;