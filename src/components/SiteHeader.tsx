'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import CartCounter from '@/components/CartCounter';
import SearchBar from '@/components/SearchBar';

type SiteHeaderProps = {
  isAdmin: boolean;
  isUser: boolean;
  showTopHeader: boolean;
  enableAutoHide: boolean;
};

export default function SiteHeader({ isAdmin, isUser, showTopHeader, enableAutoHide }: SiteHeaderProps) {
  const [hideTop, setHideTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [topHeight, setTopHeight] = useState(64);
  const lastScrollY = useRef(0);
  const headerTopEl = useRef<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  const headerTopRef = useCallback((node: HTMLDivElement | null) => {
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    headerTopEl.current = node;

    if (node) {
      setTopHeight(node.offsetHeight);
      roRef.current = new ResizeObserver(() => setTopHeight(node.offsetHeight));
      roRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    return () => roRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!showTopHeader || !enableAutoHide) {
      window.setTimeout(() => setHideTop(false), 0);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setHideTop(false);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setHideTop(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setHideTop(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTopHeader, enableAutoHide]);

  const stickyTop = showTopHeader && hideTop ? -topHeight : 0;

  return (
    <header
      className="site-header-sticky"
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: 1050,
        transition: 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {showTopHeader && (
        <div className="header-top" ref={headerTopRef}>
            <div className="container header-top-inner">
              <div className="logo">
                <Link href="/" aria-label="Yến Tinh Hoa">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo Yến Tinh Hoa"
                    width={48}
                    height={48}
                    className="site-logo-img"
                    priority
                  />
                  <span>Yến Tinh Hoa</span>
                </Link>
              </div>
              <div className="header-search">
                <SearchBar />
              </div>
              <div className="header-actions">
                {isAdmin ? (
                  <Link href="/manager" className="auth-link">Quản trị</Link>
                ) : isUser ? (
                  <Link href="/account" className="auth-link">Tài khoản</Link>
                ) : (
                  <Link href="/login" className="auth-link">Đăng nhập</Link>
                )}
                <CartCounter />
                <button
                  type="button"
                  className="site-menu-toggle"
                  aria-expanded={menuOpen}
                  aria-controls="site-main-nav"
                  aria-label="Mở menu"
                  onClick={() => setMenuOpen((value) => !value)}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
      )}

      <div className="header-bottom">
        <div className={`container header-bottom-inner ${menuOpen ? 'is-open' : ''}`}>
          <nav aria-label="Điều hướng chính">
            <ul className="nav-links" id="site-main-nav">
              <li><Link href="/">Trang chủ</Link></li>
              <li><Link href="/categories">Danh mục</Link></li>
              <li><Link href="/raw-bird-nest">Yến thô</Link></li>
              <li><Link href="/products">Sản phẩm</Link></li>
              <li><Link href="/about">Giới thiệu</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/certifications">Chứng nhận</Link></li>
              <li><Link href="/contact">Liên hệ</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
