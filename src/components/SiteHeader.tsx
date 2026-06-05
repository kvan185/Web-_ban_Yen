'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CartCounter from '@/components/CartCounter';
import SearchBar from '@/components/SearchBar';
import { getCategoryHref } from '@/lib/category-links';
import type { SiteCategory } from '@/lib/categories';

type SiteHeaderProps = {
  isAdmin: boolean;
  isUser: boolean;
  categories: SiteCategory[];
  showTopHeader: boolean;
  enableAutoHide: boolean;
};

export default function SiteHeader({
  isAdmin,
  isUser,
  categories,
  showTopHeader,
  enableAutoHide,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [hideTop, setHideTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [topHeight, setTopHeight] = useState(64);
  const lastScrollY = useRef(0);
  const headerTopEl = useRef<HTMLDivElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
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
        setMobileCategoryOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileCategoryOpen(false);
  }, [pathname]);

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
  const featuredCategories = categories.slice(0, 7);
  const handleNavClick = (event?: MouseEvent<HTMLElement>) => {
    event?.currentTarget.blur();
    setMenuOpen(false);
    setMobileCategoryOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => {
      setMenuOpen(false);
      setMobileCategoryOpen(false);
    };

    const handleScrollClose = () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (window.innerWidth > 768) return;

      const target = event.target as Node | null;

      if (!target) return;

      const isInsidePanel = menuPanelRef.current?.contains(target);
      const isToggle = menuToggleRef.current?.contains(target);

      if (!isInsidePanel && !isToggle) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScrollClose, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('scroll', handleScrollClose);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  const primaryLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/products', label: 'Sản phẩm' },
    { href: '/categories', label: 'Danh mục' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/certifications', label: 'Chứng nhận' },
    { href: '/contact', label: 'Liên hệ' },
  ];

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
                ref={menuToggleRef}
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
        <div
          className={`container header-bottom-inner ${menuOpen ? 'is-open' : ''}`}
          ref={menuPanelRef}
        >
          <nav aria-label="Điều hướng chính">
            <ul className="nav-links nav-links-main" id="site-main-nav">
              {primaryLinks.map((item) => {
                const isCategoryMenu = item.href === '/categories';

                if (!isCategoryMenu) {
                  return (
                    <li key={item.href}>
                      <Link href={item.href} onClick={(event) => handleNavClick(event)}>
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    className={`nav-item-with-submenu ${mobileCategoryOpen ? 'is-expanded' : ''}`}
                  >
                    <div className="nav-parent-link-row">
                      <Link href={item.href} onClick={(event) => handleNavClick(event)}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="nav-submenu-toggle"
                        aria-expanded={mobileCategoryOpen}
                        aria-controls="site-category-submenu"
                        aria-label={mobileCategoryOpen ? 'Thu gọn danh mục' : 'Mở rộng danh mục'}
                        onClick={() => setMobileCategoryOpen((value) => !value)}
                      >
                        <span aria-hidden="true">{mobileCategoryOpen ? '−' : '+'}</span>
                      </button>
                    </div>
                    <ul className="nav-submenu" id="site-category-submenu">
                      {featuredCategories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={getCategoryHref(category.name)}
                            onClick={(event) => handleNavClick(event)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
