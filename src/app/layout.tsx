
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/auth-context';
import Script from 'next/script';
import { WhatsAppButton } from '@/components/shared/whatsapp-button';
import { ThemeProvider } from '@/context/theme-provider';
import { BlogProvider } from '@/context/blog-context';

export const metadata: Metadata = {
  title: 'DemandHub - Digital Asset Recovery',
  description: 'Rapid, reliable fund recovery for individuals & enterprises.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <BlogProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
              <WhatsAppButton />
            </BlogProvider>
          </AuthProvider>
        </ThemeProvider>
        <Script id="tawk-to-script" strategy="lazyOnload">
        {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/689a785c0de589192ac53b22/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
        `}
        </Script>
      </body>
    </html>
  );
}
