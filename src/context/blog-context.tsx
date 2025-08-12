
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
    slug: "securing-your-down-payment-real-estate-fraud",
    featured: false,
    title: "Securing Your Down Payment: How to Avoid Real Estate Wire Fraud",
    excerpt: "Your dream home is within reach, but so are the scammers. Learn how to protect the biggest transaction of your life from sophisticated wire fraud schemes.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">Closing on a new home is one of life's most exciting moments, but it's also a prime target for sophisticated criminals. Real estate wire fraud is a growing problem where scammers impersonate title companies or real estate agents to trick you into wiring your down payment to a fraudulent account.</p><h3 class="text-2xl font-bold mt-8 mb-4">How the Scam Works</h3><p class="mb-6">Scammers use phishing emails to gain access to the accounts of real estate agents, lawyers, or title companies. They monitor email chains to understand the details of your upcoming transaction. Just before closing, they'll send you an email with wire instructions that look legitimate, but direct your funds to their own account. By the time anyone realizes the mistake, the money is often gone.</p><h3 class="text-2xl font-bold mt-8 mb-4">Prevention is Key</h3><p class="mb-6">Protecting your down payment requires vigilance.</p><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li><strong>Verify Instructions Verbally:</strong> Always call your title company or agent using a known, trusted phone number to confirm wire instructions before sending money. Do not use phone numbers from the email containing the instructions.</li><li><strong>Be Wary of Last-Minute Changes:</strong> Scammers thrive on urgency. Be extremely suspicious of any emails that change wiring instructions at the last minute.</li><li><strong>Secure Your Email:</strong> Use strong, unique passwords and enable two-factor authentication on your email account to prevent it from being compromised.</li></ul><p>If you suspect you've been targeted, act immediately. Contact your bank to recall the wire, report it to the FBI's Internet Crime Complaint Center (IC3), and call us for assistance.</p>`,
    author: initialAuthors.charlie,
    date: "2023-10-15T10:00:00Z",
    tags: ["Real Estate", "Wire Fraud"],
    image: { src: "https://images.unsplash.com/photo-1560518883-ce09059ee41f?w=600&h=400&q=80&fit=crop", hint: "house keys" },
    comments: [],
  },
  {
    slug: "emotional-toll-of-being-scammed",
    featured: false,
    title: "Beyond the Financials: The Emotional Toll of Being Scammed",
    excerpt: "Losing money is only part of the story. We explore the significant psychological impact of digital fraud and how to begin the healing process.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">When someone becomes a victim of a financial scam, the focus is often on the monetary loss. However, the emotional and psychological damage can be just as devastating, and often lasts much longer. It's a part of the recovery process that deserves more attention.</p><h3 class="text-2xl font-bold mt-8 mb-4">A Violation of Trust</h3><p class="mb-6">Many scams, particularly investment and romance scams, are built on creating a sense of trust and personal connection with the victim. When that trust is shattered, it can lead to feelings of shame, embarrassment, and isolation. Victims often blame themselves, asking "How could I have been so foolish?" This self-blame can prevent them from seeking help or even telling their loved ones what happened.</p><blockquote class="border-l-4 border-primary pl-4 italic my-8 text-muted-foreground">"The feeling of violation is profound. It's not just about the money; it's about someone exploiting your trust for their gain."</blockquote><h3 class="text-2xl font-bold mt-8 mb-4">Steps Toward Healing</h3><p class="mb-6">Recovering emotionally is just as important as recovering your funds. Acknowledging that you were the victim of a crime, not a personal failure, is the first step. Here are a few more:</p><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li><strong>Talk About It:</strong> Share your experience with trusted friends, family, or a professional counselor. Removing the secrecy reduces the power the shame holds over you.</li><li><strong>Take Control:</strong> Actively participating in the recovery process, by reporting the crime and working with experts, can help restore a sense of agency.</li><li><strong>Forgive Yourself:</strong> Understand that these scams are designed by professional criminals to be incredibly deceptive. Anyone can become a victim.</li></ul><p>At DemandHub, we recognize the human element in every case. Our team is trained to provide compassionate support alongside our technical expertise, helping you navigate both the financial and emotional paths to recovery.</p>`,
    author: initialAuthors.diana,
    date: "2023-10-12T10:00:00Z",
    tags: ["Mental Health", "Support"],
    image: { src: "https://images.unsplash.com/photo-1532383518231-50a735491915?w=600&h=400&q=80&fit=crop", hint: "person thinking" },
    comments: [],
  },
   {
    slug: "technical-breakdown-of-ransomware",
    featured: false,
    title: "A Technical Breakdown of a Ransomware Attack",
    excerpt: "Go behind the scenes of a typical ransomware attack, from initial infection to encryption, and learn how to build a stronger defense.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">Ransomware is a malicious software that encrypts a victim's files, making them inaccessible until a ransom is paid. Understanding the technical stages of an attack is crucial for effective prevention and response.</p><h3 class="text-2xl font-bold mt-8 mb-4">Stage 1: Initial Access</h3><p class="mb-6">Attackers gain a foothold in a network through various methods. The most common are:</p><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li><strong>Phishing Emails:</strong> Emails with malicious attachments or links that, when opened, download the initial malware payload.</li><li><strong>Exploiting Vulnerabilities:</strong> Unpatched software, open RDP (Remote Desktop Protocol) ports, or weak credentials provide an easy entry point.</li><li><strong>Compromised Credentials:</strong> Using stolen usernames and passwords purchased from the dark web.</li></ul><h3 class="text-2xl font-bold mt-8 mb-4">Stage 2: Network Propagation & Encryption</h3><p class="mb-6">Once inside, the malware doesn't strike immediately. It often moves laterally across the network, seeking high-value targets like file servers and backups. It disables security software and exfiltrates sensitive data for double extortion—threatening to leak the data if the ransom isn't paid. After establishing persistence and control, it begins the encryption process, locking down critical files.</p><h3 class="text-2xl font-bold mt-8 mb-4">Stage 3: The Ransom Note</h3><p>Finally, the ransom note appears, informing the victim of the attack and providing instructions for payment, almost always in cryptocurrency. At this point, the business is crippled.</p><h3 class="text-2xl font-bold mt-8 mb-4">Defense Strategies</h3><p>Preventing ransomware requires a multi-layered defense: regular employee training on phishing, a robust patch management policy, strong access controls (like multi-factor authentication), and, most importantly, having offline, immutable backups that cannot be encrypted by the attacker. These backups are often the only way to restore operations without paying the ransom.</p>`,
    author: initialAuthors.john,
    date: "2023-10-09T10:00:00Z",
    tags: ["Ransomware", "Cybersecurity", "Technical"],
    image: { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&q=80&fit=crop", hint: "binary code" },
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
  {
    slug: "anatomy-of-a-romance-scam",
    featured: false,
    title: "Anatomy of a Romance Scam: How to Protect Your Heart and Wallet",
    excerpt: "Romance scams are emotionally and financially devastating. Learn the common stages of these scams and how to spot a predator before it's too late.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">In the world of online fraud, romance scams are uniquely cruel. They exploit not just financial vulnerability, but the universal human need for connection. Understanding the predator's playbook is the first step toward protecting yourself.</p><h3 class="text-2xl font-bold mt-8 mb-4">Stage 1: The Love Bomb</h3><p class="mb-6">Scammers create a highly idealized online persona, often using stolen photos of attractive individuals. They will shower you with attention, compliments, and declarations of love very quickly. This 'love bombing' is designed to create a powerful emotional bond and short-circuit your rational judgment.</p><h3 class="text-2xl font-bold mt-8 mb-4">Stage 2: The Isolation</h3><p class="mb-6">Once a bond is formed, the scammer will work to isolate you from friends and family. They may insist on keeping the relationship a secret or create drama that drives a wedge between you and those who might question the legitimacy of the relationship. They will always have an excuse for why they cannot meet in person or do a video call.</p><h3 class="text-2xl font-bold mt-8 mb-4">Stage 3: The Crisis & The Ask</h3><p>This is the endgame. Suddenly, there is an emergency—a medical problem, a business deal gone wrong, a visa issue—and they need money. Urgently. They will leverage the emotional connection they've built to pressure you into sending funds, promising to pay you back as soon as their fabricated crisis is over. This cycle can repeat, draining a victim's savings.</p><h3 class="text-2xl font-bold mt-8 mb-4">Red Flags to Watch For</h3><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li>They move too fast, professing love within days or weeks.</li><li>Their profile seems too good to be true.</li><li>They consistently avoid video calls or meeting in person.</li><li>They ask you to move the conversation off the dating app to a private chat quickly.</li><li>Any request for money, gift cards, or cryptocurrency is a massive red flag.</li></ul>`,
    author: initialAuthors.diana,
    date: "2023-09-25T10:00:00Z",
    tags: ["Scam Alert", "Romance Scam", "Support"],
    image: { src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&q=80&fit=crop", hint: "heart hands" },
    comments: [],
  },
  {
    slug: "how-to-secure-your-digital-wallet",
    featured: false,
    title: "Fort Knox Your Crypto: Essential Tips for Securing Your Digital Wallet",
    excerpt: "Your crypto is only as safe as your wallet. Follow these crucial security practices to protect your digital assets from thieves.",
    content: `<p class="lead text-lg text-muted-foreground mb-6">In the decentralized world of cryptocurrency, you are your own bank. This freedom comes with immense responsibility. Securing your digital wallet is the single most important thing you can do to protect your investments. Let's cover the essentials.</p><h3 class="text-2xl font-bold mt-8 mb-4">1. Use a Hardware Wallet</h3><p class="mb-6">For any significant amount of crypto, a hardware wallet (or "cold wallet") is non-negotiable. These are physical devices that store your private keys offline, making them immune to online hacking attempts. Your keys never leave the device, so you must approve every transaction directly on it.</p><h3 class="text-2xl font-bold mt-8 mb-4">2. Safeguard Your Seed Phrase</h3><p class="mb-6">Your seed phrase (or recovery phrase) is the master key to all your crypto. Anyone with this phrase can control your funds.</p><ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground"><li><strong>Never store it digitally.</strong> Don't save it in a text file, in your notes app, in an email, or as a photo. These can all be hacked.</li><li><strong>Write it down.</strong> Use pen and paper. Better yet, stamp it into metal to protect it from fire or water damage.</li><li><strong>Store it securely.</strong> Keep your written-down phrase in multiple, secure, secret locations, like a safe deposit box or a fireproof safe at home.</li><li><strong>Never share it.</strong> No legitimate support agent, service, or giveaway will ever ask for your seed phrase.</li></ul><h3 class="text-2xl font-bold mt-8 mb-4">3. Beware of Phishing & Malicious Contracts</h3><p>Scammers will try to trick you into either giving them your keys or signing a malicious transaction that drains your wallet. Be skeptical of unsolicited emails, links, or airdrops. Before interacting with any decentralized application (dApp), verify it's the legitimate project. Use tools that can simulate transactions to see exactly what a smart contract will do before you approve it.</p>`,
    author: initialAuthors.bob,
    date: "2023-09-20T10:00:00Z",
    tags: ["Crypto", "Cybersecurity", "Technical"],
    image: { src: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&q=80&fit=crop", hint: "safe vault" },
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
