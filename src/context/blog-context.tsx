
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { initialAuthors, initialPosts, type BlogPost, type PostComment, type PostAuthor } from '@/lib/initial-data';


interface BlogContextType {
    posts: BlogPost[];
    getPostBySlug: (slug: string) => BlogPost | undefined;
    addPost: (post: BlogPost) => void;
    updatePost: (slug: string, postData: Partial<BlogPost>) => void;
    deletePost: (slug: string) => void;
    addCommentToPost: (slug: string, comment: Omit<PostComment, 'id' | 'date'>) => void;
    deleteCommentFromPost: (slug: string, commentId: string) => void;
    updateCommentInPost: (slug: string, commentId: string, commentData: Partial<PostComment>) => void;
    fetchPosts: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
        if (typeof window === 'undefined') return initialPosts;
        const item = window.localStorage.getItem('blogPosts');
        return item ? JSON.parse(item) : initialPosts;
    } catch (error) {
        console.warn("Could not parse blog posts from localStorage", error);
        return initialPosts;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('blogPosts', JSON.stringify(posts));
    } catch (error) {
        console.error("Could not save blog posts to localStorage", error);
    }
  }, [posts]);
  
  const fetchPosts = useCallback(() => {
    try {
        if (typeof window === 'undefined') return;
        const item = window.localStorage.getItem('blogPosts');
        setPosts(item ? JSON.parse(item) : initialPosts);
    } catch (error) {
        console.warn("Could not parse blog posts from localStorage", error);
        setPosts(initialPosts);
    }
  }, []);

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  const addPost = (post: BlogPost) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const updatePost = (slug: string, postData: Partial<BlogPost>) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.slug === slug ? { ...p, ...postData } : p))
    );
  };

  const deletePost = (slug: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.slug !== slug));
  };
  
  const addCommentToPost = (slug: string, commentData: Omit<PostComment, 'id' | 'date'>) => {
    setPosts(prevPosts => 
        prevPosts.map(p => {
            if (p.slug === slug) {
                const newComment: PostComment = {
                    ...commentData,
                    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`, // Robust unique id
                    date: new Date().toISOString(),
                };
                const updatedComments = [...p.comments, newComment];
                return { ...p, comments: updatedComments };
            }
            return p;
        })
    );
  }

  const deleteCommentFromPost = (slug: string, commentId: string) => {
     setPosts(prevPosts =>
        prevPosts.map(p => {
            if (p.slug === slug) {
                const updatedComments = p.comments.filter(c => c.id !== commentId);
                return { ...p, comments: updatedComments };
            }
            return p;
        })
    );
  }

  const updateCommentInPost = (slug: string, commentId: string, commentData: Partial<PostComment>) => {
      setPosts(prevPosts =>
          prevPosts.map(p => {
              if (p.slug === slug) {
                  const updatedComments = p.comments.map(c => 
                      c.id === commentId ? { ...c, ...commentData } : c
                  );
                  return { ...p, comments: updatedComments };
              }
              return p;
          })
      );
  }

  const value = { posts, getPostBySlug, addPost, updatePost, deletePost, addCommentToPost, deleteCommentFromPost, updateCommentInPost, fetchPosts };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
