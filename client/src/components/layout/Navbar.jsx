import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Logo from '../ui/Logo';
import MagneticButton from '../ui/MagneticButton';
import ThemeToggle from '../ui/ThemeToggle';
import ServiceIcon from '../ui/ServiceIcon';
import ServicesMegaMenu from './ServicesMegaMenu';
import LegalMegaMenu from './LegalMegaMenu';
import { useTheme } from '../../context/ThemeContext';
import { getServicesForCategory, legalNavItems, navLinks, serviceCategories } from '../../data/content';

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

function DesktopNavLink({ to, end, children, active, onMouseEnter, isLight }) {
  return (
    <NavLink
      to={to}
      end={end}
      onMouseEnter={onMouseEnter}
      className={() =>
        `relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 xl:px-3.5 xl:text-sm ${
          isLight
            ? active
              ? 'text-[#FFFFFF]'
              : 'text-[#D7E2E8] hover:text-[#FFFFFF]'
            : active
              ? 'text-[var(--nav-text-active)]'
              : 'text-[var(--nav-text)] hover:text-[var(--nav-text-active)]'
        }`
      }
    >
      {active && (
        <motion.span
          layoutId="activeNavPill"
          className={`absolute inset-0 -z-10 rounded-full backdrop-blur-md ${
            isLight
              ? 'bg-[#FFFFFF]/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]'
              : 'bg-gradient-to-r from-[var(--accent-primary)]/35 to-[var(--accent-secondary)]/25 shadow-[inset_0_0_0_1px_var(--nav-border)]'
          }`}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      {children}
    </NavLink>
  );
}

function isInside(node, container) {
  return Boolean(container && node instanceof Node && container.contains(node));
}

export default function Navbar() {
  const { isLight } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null);
  const closeTimer = useRef(null);
  const desktopClusterRef = useRef(null);
  const location = useLocation();

  const servicesOpen = openMenu === 'services';
  const legalOpen = openMenu === 'legal';
  const anyMenuOpen = Boolean(openMenu);
  const servicesActive = location.pathname.startsWith('/services');
  const legalActive = location.pathname.startsWith('/compliance');
  const mobileServicesOpen = mobileOpenMenu === 'services';
  const mobileLegalOpen = mobileOpenMenu === 'legal';

  useEffect(() => {
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        setScrolled(window.scrollY > 16);
        // Drop mega-menu on scroll so it never overlays after reverse scroll.
        setOpenMenu((wasOpen) => (wasOpen ? null : wasOpen));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileOpenMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setOpenMenu(null);
        setMobileOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Pointer outside the desktop cluster always closes, reliable after long scrolls.
  useEffect(() => {
    if (!anyMenuOpen) return undefined;
    const onPointerDown = (event) => {
      const root = desktopClusterRef.current;
      if (!root) return;
      if (event.target instanceof Node && root.contains(event.target)) return;
      setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [anyMenuOpen]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDesktopMenu = (menu) => {
    clearCloseTimer();
    setOpenMenu(menu);
  };

  const closeMenusNow = () => {
    clearCloseTimer();
    setOpenMenu(null);
  };

  const scheduleCloseMenus = () => {
    clearCloseTimer();
    // Short bridge so nav → mega gap does not flicker; still clears fast.
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimer.current = null;
    }, 80);
  };

  const onDesktopClusterLeave = (event) => {
    const next = event.relatedTarget;
    if (isInside(next, desktopClusterRef.current)) return;
    scheduleCloseMenus();
  };

  useEffect(
    () => () => {
      clearCloseTimer();
    },
    [],
  );

  return (
    /*
      pointer-events-none on the fixed header shell so empty chrome never steals
      clicks/hovers from page content when the mouse moves back under the bar.
      Only the nav island + open menus re-enable pointer events.
    */
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-4">
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-40 bg-[var(--bg-primary)]/75 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      {/*
        Hit-testing rules (fixes header/page fight on mouse-back):
        - Header shell: pointer-events none (page stays clickable under chrome)
        - Nav pill: always pointer-events auto
        - Wrapper: pointer-events auto ONLY while mega-menu is open (nav↔menu bridge)
        - Mega-menu: mounted only while open (no ghost overlay when closed)
      */}
      <div
        ref={desktopClusterRef}
        className={`relative z-50 mx-auto w-full max-w-6xl ${
          anyMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onMouseLeave={onDesktopClusterLeave}
      >
        <nav
          className={`gc-nav-pill pointer-events-auto flex items-center justify-between px-4 py-2.5 transition-[border-color,background-color,box-shadow] duration-300 sm:px-6 sm:py-3 ${
            isLight
              ? scrolled || open
                ? 'border-[#6B8AB0]/35 bg-[#2F4C73]/97 shadow-[0_12px_40px_rgba(28,49,79,0.22)] backdrop-blur-xl'
                : 'border-[#6B8AB0]/25 bg-[#2F4C73]/92 shadow-[0_10px_35px_rgba(28,49,79,0.16)] backdrop-blur-lg'
              : scrolled || open
                ? 'border-[color:var(--nav-border)] bg-[var(--nav-bg-scrolled)] shadow-[var(--shadow)] backdrop-blur-xl'
                : 'border-[color:var(--nav-border)] bg-[var(--nav-bg)]/95 shadow-[var(--shadow-soft)] backdrop-blur-lg'
          }`}
        >
          <Logo compact />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if (link.path === '/services') {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={() => openDesktopMenu('services')}
                    onFocus={() => openDesktopMenu('services')}
                  >
                    <DesktopNavLink
                      to="/services"
                      active={servicesActive}
                      isLight={isLight}
                      onMouseEnter={() => openDesktopMenu('services')}
                    >
                      <span>Services</span>
                      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center">
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </DesktopNavLink>
                  </div>
                );
              }

              if (link.path === '/compliance') {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => openDesktopMenu('legal')}
                    onFocus={() => openDesktopMenu('legal')}
                  >
                    <DesktopNavLink
                      to="/compliance"
                      active={legalActive}
                      isLight={isLight}
                      onMouseEnter={() => openDesktopMenu('legal')}
                    >
                      <span>Legal Compliance</span>
                      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center">
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${legalOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </DesktopNavLink>
                    {legalOpen ? (
                      <div
                        className="pointer-events-auto absolute top-full left-0 z-50 hidden w-[22rem] max-w-[min(22rem,calc(100vw-1.5rem))] pt-2 lg:block"
                        onMouseEnter={() => openDesktopMenu('legal')}
                      >
                        <LegalMegaMenu onNavigate={closeMenusNow} />
                      </div>
                    ) : null}
                  </div>
                );
              }

              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <DesktopNavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  active={isActive}
                  isLight={isLight}
                  onMouseEnter={closeMenusNow}
                >
                  {link.label}
                </DesktopNavLink>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex" onMouseEnter={closeMenusNow}>
            <ThemeToggle onNav />
            <MagneticButton
              to="/contact"
              variant={isLight ? 'secondary' : 'primary'}
              magnetic={false}
              motionFx={false}
              className={
                isLight
                  ? '!border-white/50 !bg-white !px-5 !py-2.5 !text-[#2F4C73] hover:!border-white hover:!bg-[#F4F6F9] hover:!text-[#1C314F]'
                  : '!px-5 !py-2.5'
              }
            >
              Contact Us
            </MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle onNav />
            <button
              type="button"
              className={`gc-tap grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-200 ${
                isLight
                  ? 'border-[#6B8AB0]/35 bg-[#FFFFFF]/15 text-[#FFFFFF] hover:bg-[#FFFFFF]/25'
                  : 'border-[var(--accent-soft)]/35 bg-[var(--surface)]/15 text-[var(--text-primary)] hover:bg-[var(--surface)]/25'
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {servicesOpen ? (
          <div
            className="pointer-events-auto absolute inset-x-0 top-full z-50 hidden pt-2 lg:block"
            onMouseEnter={() => openDesktopMenu('services')}
          >
            <ServicesMegaMenu onNavigate={closeMenusNow} />
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`pointer-events-auto relative z-50 mx-auto mt-2 max-h-[min(85dvh,720px)] max-w-6xl overflow-y-auto overscroll-contain rounded-2xl p-3 sm:p-4 lg:hidden ${
              isLight
                ? 'border border-[#6B8AB0]/25 bg-[#FFFFFF] shadow-[0_16px_40px_rgba(47,76,115,0.2)]'
                : 'border border-[var(--accent-soft)]/25 bg-[var(--surface)] shadow-[0_16px_40px_rgba(0,0,0,0.28)]'
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.path === '/services') {
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenMenu((value) => (value === 'services' ? null : 'services'))
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                          servicesActive
                            ? 'bg-[var(--accent-soft)]/16 text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                        aria-expanded={mobileServicesOpen}
                      >
                        Services
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 px-2 pt-2 pb-3">
                              {serviceCategories.map((category) => (
                                <div key={category.id}>
                                  <p className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
                                    <ServiceIcon name={category.icon} size={14} />
                                    {category.title}
                                  </p>
                                  <ul className="space-y-1">
                                    {getServicesForCategory(category.id).map((service) => (
                                      <li key={service.id}>
                                        <Link
                                          to={`/services/${service.id}`}
                                          className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)]/80 hover:text-[var(--text-primary)]"
                                        >
                                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)]">
                                            <ServiceIcon name={service.icon} size={13} />
                                          </span>
                                          <span className="min-w-0 leading-snug">{service.title}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <Link
                                to="/services"
                                className="block min-h-11 px-2 py-2.5 text-sm font-semibold text-[var(--text-secondary)]"
                              >
                                View all services →
                              </Link>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                if (link.path === '/compliance') {
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenMenu((value) => (value === 'legal' ? null : 'legal'))
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                          legalActive
                            ? 'bg-[var(--accent-soft)]/16 text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                        aria-expanded={mobileLegalOpen}
                      >
                        Legal Compliance
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileLegalOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileLegalOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 px-2 pt-2 pb-3">
                              {legalNavItems.map((item) => (
                                <Link
                                  key={item.id}
                                  to={item.path}
                                  className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)]/80 hover:text-[var(--text-primary)]"
                                >
                                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)]">
                                    <ServiceIcon name={item.icon} size={13} />
                                  </span>
                                  <span className="min-w-0 leading-snug">{item.title}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={link.path} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-[var(--accent-soft)]/16 text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="mt-2">
                <MagneticButton to="/contact" magnetic={false} motionFx={false} className="w-full">
                  Contact Us
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
