'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import CartCounter from '@/components/CartCounter';

type SiteHeaderProps = {
  isAdmin: boolean;
  isUser: boolean;
  showTopHeader: boolean;
  enableAutoHide: boolean;
};

export default function SiteHeader({ isAdmin, isUser, showTopHeader, enableAutoHide }: SiteHeaderProps) {
  const [hideTop, setHideTop] = useState(false);
  const [topHeight, setTopHeight] = useState(64); // sensible default
  const lastScrollY = useRef(0);
  const headerTopEl = useRef<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  // Callback ref: fires as soon as the DOM node is attached
  const headerTopRef = useCallback((node: HTMLDivElement | null) => {
    // Clean up old observer
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    headerTopEl.current = node;

    if (node) {
      // Measure immediately
      setTopHeight(node.offsetHeight);

      // Watch for resize
      roRef.current = new ResizeObserver(() => {
        setTopHeight(node.offsetHeight);
      });
      roRef.current.observe(node);
    }
  }, []);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (roRef.current) {
        roRef.current.disconnect();
      }
    };
  }, []);

  // Scroll handler for auto-hide
  useEffect(() => {
    if (!showTopHeader || !enableAutoHide) {
      setHideTop(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setHideTop(false);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling down (with 5px threshold to avoid micro-jitter)
        setHideTop(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up
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
              <a href="/">Yến Tinh Hoa</a>
            </div>
            <div className="header-search">
              <SearchBar />
            </div>
            <div className="header-actions">
              {isAdmin ? (
                <a href="/manager" className="auth-link">Quản trị</a>
              ) : isUser ? (
                <a href="/account" className="auth-link">Tài khoản</a>
              ) : (
                <a href="/login" className="auth-link">Đăng nhập</a>
              )}
              <CartCounter />
            </div>
          </div>
        </div>
      )}

      <div className="header-bottom">
        <div className="container header-bottom-inner">
          <nav>
            <ul className="nav-links">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/danh-muc">Danh mục</a></li>
              <li><a href="/san-pham">Sản phẩm</a></li>
              <li><a href="/gioi-thieu">Giới thiệu</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/chung-nhan">Chứng nhận</a></li>
              <li><a href="/lien-he">Liên hệ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
