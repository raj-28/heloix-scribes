import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Github } from 'lucide-react';
import { footerLinks } from '../data/mock';

const TopBanner = ({ onClose, visible }) => {
  if (!visible) return null;
  return (
    <div className="relative w-full py-2.5 px-4 text-center bg-[hsl(30,60%,32%)]">
      <span className="text-sm font-medium text-white">
        Scan your cloud infrastructure in minutes with{' '}
        <a href="#" className="font-semibold underline hover:no-underline text-white/90">
          Heloix Cloud
        </a>
      </span>
      <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors" aria-label="Close">
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-lg tracking-wider font-black italic text-foreground font-display">HELOIX</span>
          <span className="text-lg tracking-widest font-light text-muted-foreground">HUB</span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/hub-api" className="text-[11px] tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors">HELOIX HUB API</Link>
          <Link to="/docs" className="text-[11px] tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors">HELOIX DOCS</Link>
          <Link to="/studio" className="text-[11px] tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors">HELOIX STUDIO</Link>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="w-full py-10 px-6 border-t border-border bg-secondary/50">
    <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-6">
      <span className="text-sm font-medium tracking-wider text-muted-foreground">&copy; HELOIX, 2026</span>
      <div className="flex flex-wrap items-center gap-5">
        {footerLinks.map(link => (
          <a key={link.label} href={link.href} className="text-[11px] tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors">
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[hsl(30,60%,32%)] text-[hsl(30,60%,32%)] bg-[hsl(30,60%,32%)]/5">H</div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary border border-border">
          <span className="text-[7px] font-bold text-muted-foreground">SOC2</span>
        </div>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBanner visible={bannerVisible} onClose={() => setBannerVisible(false)} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
