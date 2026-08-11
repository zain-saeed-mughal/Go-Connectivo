import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo';
import MagneticButton from '../ui/MagneticButton';
import ServiceIcon from '../ui/ServiceIcon';
import ServicesMegaMenu from './ServicesMegaMenu';
import { getServicesForCategory, navLinks, serviceCategories } from '../../data/content';
import { startPageScroll } from '../motion/SmoothScroll';

const menuVariants = {
  hidden: { opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -12, clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  const servicesActive = location.pathname.startsWith('/services');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    startPageScroll();
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
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openServices = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => {
      setServicesOpen(false);
      startPageScroll();
    }, 160);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-0.5">
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-[#2F4C73] via-[#4A6B94] to-[#6B8AB0] transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#2F4C73]/40 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-50 mx-auto max-w-6xl">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
            scrolled || open || servicesOpen
              ? 'border-[#6B8AB0]/30 bg-[#2F4C73]/96 shadow-[0_10px_35px_rgba(0,0,0,0.14)] backdrop-blur-xl'
              : 'border-[#6B8AB0]/20 bg-[#2F4C73]/90 shadow-[0_10px_35px_rgba(0,0,0,0.14)] backdrop-blur-lg'
          }`}
        >
          <Logo compact />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if (link.path === '/services') {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <NavLink
                      to="/services"
                      className={() =>
                        `group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                          servicesActive ? 'text-[#FFFFFF]' : 'text-[#D7E2E8] hover:text-[#FFFFFF]'
                        }`
                      }
                      onFocus={openServices}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                    >
                      {servicesActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 -z-10 rounded-full bg-[#FFFFFF]/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                        />
                      )}
                      <span className="relative">
                        Services
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#FFFFFF] to-[#6B8AB0] transition-transform duration-400 group-hover:scale-x-100" />
                      </span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </NavLink>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'font-semibold text-[#FFFFFF]' : 'text-[#D7E2E8] hover:text-[#FFFFFF]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 -z-10 rounded-full bg-[#FFFFFF]/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                        />
                      )}
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#FFFFFF] to-[#6B8AB0] transition-transform duration-400 group-hover:scale-x-100" />
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <MagneticButton to="/contact" variant="primary" className="!px-5 !py-2.5">
              Get Started
            </MagneticButton>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#6B8AB0]/35 bg-[#FFFFFF]/15 text-[#FFFFFF] transition-colors duration-300 hover:bg-[#FFFFFF]/25 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </button>
        </motion.nav>

        <AnimatePresence>
          {servicesOpen ? (
            <motion.div
              key="services-mega"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 hidden pt-3 lg:block"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <ServicesMegaMenu onNavigate={() => setServicesOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-50 mx-auto mt-2 max-h-[min(78dvh,640px)] max-w-6xl overflow-y-auto rounded-2xl border border-[#6B8AB0]/25 bg-[#FFFFFF] p-3 shadow-[0_16px_40px_rgba(47,76,115,0.2)] sm:p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.path === '/services') {
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((value) => !value)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                          servicesActive ? 'bg-[#4A6B94]/12 text-[#2F4C73]' : 'text-[#4A5D73] hover:bg-[#E8ECF2]'
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
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="gc-scrollbar max-h-[45vh] space-y-4 overflow-y-auto px-2 pt-2 pb-3">
                              {serviceCategories.map((category) => (
                                <div key={category.id}>
                                  <p className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold tracking-wide text-[#4A6B94] uppercase">
                                    <ServiceIcon name={category.icon} size={14} />
                                    {category.title}
                                  </p>
                                  <ul className="space-y-1">
                                    {getServicesForCategory(category.id).map((service) => (
                                      <li key={service.id}>
                                        <Link
                                          to={`/services/${service.id}`}
                                          className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[#4A5D73] hover:bg-[#FFFFFF]/80 hover:text-[#2F4C73]"
                                        >
                                          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#4A6B94] text-[#FFFFFF]">
                                            <ServiceIcon name={service.icon} size={13} />
                                          </span>
                                          {service.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <Link
                                to="/services#all-services"
                                className="block px-2 text-sm font-semibold text-[#6B8AB0]"
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

                return (
                  <motion.div key={link.path} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'bg-[#4A6B94]/12 text-[#2F4C73]' : 'text-[#4A5D73] hover:bg-[#E8ECF2]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="mt-2">
                <MagneticButton to="/contact" className="w-full">
                  Get Started
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
