
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export interface PostAuthor {
    name: string;
    avatar: string;
    hint: string;
    bio: string;
}

export interface PostComment {
    id: string; // Unique ID for each comment
    author: { name: string; avatar: string; hint: string };
    date: string; // ISO string
    text: string;
}

export interface BlogPost {
    slug: string;
    featured: boolean;
    title: string;
    excerpt: string;
    content: string; // HTML content
    author: PostAuthor;
    date: string; // ISO string
    tags: string[];
    image: { src: string; hint: string };
    comments: PostComment[];
}

interface BlogContextType {
    posts: BlogPost[];
    getPostBySlug: (slug: string) => BlogPost | undefined;
    addPost: (post: BlogPost) => void;
    updatePost: (slug: string, postData: Partial<BlogPost>) => void;
    deletePost: (slug: string) => void;
    addCommentToPost: (slug: string, comment: Omit<PostComment, 'id' | 'date'>) => void;
    deleteCommentFromPost: (slug: string, commentId: string) => void;
    updateCommentInPost: (slug: string, commentId: string, commentData: Partial<PostComment>) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Initial Static Data
const initialAuthors = {
  alice: { name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80&fit=crop", hint: "woman portrait", bio: "Alice is the Founder & CEO of DemandHub, with over 15 years of experience in cybersecurity and digital forensics." },
  bob: { name: "Bob Williams", avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&q=80&fit=crop", hint: "man portrait", bio: "Bob is the Head of Forensics, specializing in on-chain analysis and crypto-tracking."},
  charlie: { name: "Charlie Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80&fit=crop", hint: "person portrait", bio: "Charlie is a lead investigator and a specialist in wire fraud and phishing schemes."},
  diana: { name: "Diana Prince", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80&fit=crop", hint: "woman portrait", bio: "Diana heads our client relations and support team, ensuring victims have a voice."},
  jane: { name: "Jane Doe", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80&fit=crop", hint: "woman writing", bio: "Jane is a cybersecurity analyst and writer, focusing on practical safety tips for everyday users."},
  john: { name: "John Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&fit=crop", hint: "man professional", bio: "John is a guest writer and a certified ethical hacker who loves to explore the technical side of security."},
};

const initialPosts: BlogPost[] = [
  {
    slug: "rise-of-ai-in-fraud-detection",
    featured: true,
    title: "The Rise of AI in Fraud Detection and Recovery",
    excerpt: "Discover how artificial intelligence is becoming a game-changer in the fight against sophisticated financial scams.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">In an era where digital transactions are the norm, the methods employed by fraudsters have become increasingly sophisticated. Traditional security measures are often a step behind. Enter Artificial Intelligence (AI), a transformative technology that is revolutionizing how we identify, prevent, and recover from financial fraud.</p><h3 class="text-2xl font-bold mt-8 mb-4">Proactive Threat Identification</h3><p class="mb-6">AI algorithms can analyze vast datasets of transactions in real-time, identifying patterns and anomalies that would be invisible to human analysts. By learning what constitutes 'normal' behavior for a user or system, AI can flag suspicious activities with incredible accuracy, stopping fraud before it even happens.</p><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li><strong>Behavioral Analytics:</strong> AI models create a unique profile for each user, detecting deviations in transaction times, amounts, locations, and more.</li><li><strong>Network Analysis:</strong> It can map out complex networks of accounts and transactions to uncover sophisticated fraud rings that would otherwise remain hidden.</li><li><strong>Predictive Modeling:</strong> By analyzing historical fraud data, AI can predict which accounts or transactions are most likely to be fraudulent in the future.</li></ul><h3 class="text-2xl font-bold mt-8 mb-4">Accelerating the Recovery Process</h3><p class="mb-6">When fraud does occur, time is of the essence. AI plays a crucial role in the recovery process by automating and accelerating on-chain forensics. It can trace the movement of stolen funds across multiple blockchains and jurisdictions in a fraction of the time it would take a human team. This rapid analysis is critical for coordinating with exchanges and law enforcement to freeze assets before they disappear completely.</p><blockquote class="border-l-4 border-primary pl-4 italic my-8 text-muted-foreground">"AI is our most powerful ally in the fight against digital fraud. It gives us the speed and scale needed to protect our clients in a rapidly evolving threat landscape."</blockquote><p>The integration of AI into our recovery toolkit at DemandHub has significantly increased our success rate. It allows our human experts to focus on the strategic aspects of a case—liaising with financial institutions, navigating legal complexities, and providing support to our clients—while the AI handles the heavy lifting of data analysis. The future of asset recovery is not just about human expertise; it's about augmenting that expertise with the power of intelligent machines.</p>`,
    author: initialAuthors.alice,
    date: "2023-10-30T10:00:00Z",
    tags: ["AI", "Cybersecurity", "Forensics"],
    image: { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&q=80&fit=crop", hint: "cyber security" },
    comments: [
        { id: "comment-1-1", author: { name: "Bob Williams", avatar: initialAuthors.bob.avatar, hint: initialAuthors.bob.hint }, date: "2023-10-31T11:00:00Z", text: "This is a fantastic overview. The point about behavioral analytics is key. We've seen it work wonders in preventing account takeovers." },
        { id: "comment-1-2", author: { name: "Charlie Brown", avatar: initialAuthors.charlie.avatar, hint: initialAuthors.charlie.hint }, date: "2023-11-01T12:00:00Z", text: "I'd be interested to learn more about the challenges of AI, like dealing with adversarial attacks or model bias. Do you plan a follow-up article?" }
    ]
  },
  {
    slug: "5-signs-of-crypto-scam",
    featured: true,
    title: "5 Telltale Signs of a Cryptocurrency Scam",
    excerpt: "Learn to spot the red flags before you invest. We break down the most common tactics used by crypto fraudsters.",
    content: "<p>Content for 5 signs of crypto scam...</p>",
    author: initialAuthors.bob,
    date: "2023-11-05T10:00:00Z",
    tags: ["Crypto", "Scam Alert"],
    image: { src: "https://images.unsplash.com/photo-1621452773357-011f76285314?w=600&h=400&q=80&fit=crop", hint: "crypto wallet" },
    comments: [],
  },
  {
    slug: "protecting-small-business-from-wire-fraud",
    featured: true,
    title: "Protecting Your Small Business from Wire Fraud",
    excerpt: "Small businesses are prime targets. Implement these essential security measures to safeguard your company's finances.",
    content: "<p>Content for protecting small business...</p>",
    author: initialAuthors.charlie,
    date: "2023-11-10T10:00:00Z",
    tags: ["Wire Fraud", "Business"],
    image: { src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&q=80&fit=crop", hint: "person on laptop" },
    comments: [],
  },
  {
    slug: "what-to-do-after-phishing-attack",
    featured: false,
    title: "What to Do Immediately After a Phishing Attack",
    excerpt: "Time is critical. Follow these steps to mitigate damage and begin the recovery process after your data has been compromised.",
    content: "<p>Content for phishing attack aftermath...</p>",
    author: initialAuthors.jane,
    date: "2023-10-26T10:00:00Z",
    tags: ["Phishing", "Recovery"],
    image: { src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&q=80&fit=crop", hint: "padlock" },
    comments: [],
  },
  {
    slug: "understanding-on-chain-forensics",
    featured: false,
    title: "Understanding On-Chain Forensics",
    excerpt: "A deep dive into the technology we use to trace stolen digital assets across the blockchain.",
    content: "<p>Content for on-chain forensics...</p>",
    author: initialAuthors.john,
    date: "2023-10-22T10:00:00Z",
    tags: ["Blockchain", "Forensics"],
    image: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&q=80&fit=crop", hint: "data privacy" },
    comments: [],
  },
  {
    slug: "how-to-talk-about-online-safety",
    featured: false,
    title: "How to Talk to Your Family About Online Safety",
    excerpt: "Protect your loved ones from common scams with these simple conversation starters and tips.",
    content: "<p>Content for online safety talk...</p>",
    author: initialAuthors.alice,
    date: "2023-10-18T10:00:00Z",
    tags: ["Online Safety", "Family"],
    image: { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&q=80&fit=crop", hint: "family using computer" },
    comments: [],
  },
];


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

  const value = { posts, getPostBySlug, addPost, updatePost, deletePost, addCommentToPost, deleteCommentFromPost, updateCommentInPost };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
