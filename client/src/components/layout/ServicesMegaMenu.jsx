import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceIcon from '../ui/ServiceIcon';
import { getServicesForCategory, serviceCategories } from '../../data/content';
import { startPageScroll, stopPageScroll } from '../motion/SmoothScroll';

const panelVariants = {
  hidden: { opacity: 0, y: -14, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

/**
 * Desktop mega-menu. Wheel over this panel scrolls the menu only —
 * Lenis/page scroll stays paused until the pointer leaves.
 */
export default function ServicesMegaMenu({ onNavigate }) {
  const panelRef = useRef(null);

  useEffect(() => {
    stopPageScroll();
    const el = panelRef.current;
    if (!el) return () => startPageScroll();

    const onWheel = (event) => {
      stopPageScroll();
      event.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // At edges, block the event so the page behind still doesn't move.
      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
        event.preventDefault();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      startPageScroll();
    };
  }, []);

  return (
    <motion.div
      ref={panelRef}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={stopPageScroll}
      onMouseLeave={startPageScroll}
      className="gc-scrollbar max-h-[min(78vh,720px)] w-full overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-white/10 bg-[#0c0c0c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      role="menu"
      aria-label="Services"
    >
      <div className="grid gap-0 md:grid-cols-3">
        {serviceCategories.map((category, index) => {
          const categoryServices = getServicesForCategory(category.id);
          return (
            <div
              key={category.id}
              className={`p-5 ${index < serviceCategories.length - 1 ? 'md:border-r md:border-white/8' : ''}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#f58220]/25 to-[#ff6b00]/15 text-[#ffb86b]">
                  <ServiceIcon name={category.icon} size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{category.title}</p>
                  <p className="text-[11px] leading-snug text-[#8a8a9c]">{category.description}</p>
                </div>
              </div>

              <ul className="space-y-1">
                {categoryServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.id}`}
                      role="menuitem"
                      onClick={onNavigate}
                      className="group flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-white/[0.05]"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f58220] text-[#0a0a0a] shadow-[0_6px_16px_rgba(245,130,32,0.35)] transition-transform duration-300 group-hover:scale-105">
                        <ServiceIcon name={service.icon} size={15} />
                      </span>
                      <span className="text-sm font-medium text-[#c8c8d4] transition-colors group-hover:text-white">
                        {service.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-white/8 bg-white/[0.02] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#8a8a9c]">Dialers · PBX · Inbound · Outbound</p>
        <Link
          to="/services#all-services"
          onClick={onNavigate}
          className="text-xs font-semibold text-[#ffb86b] transition-colors hover:text-white"
        >
          View all services →
        </Link>
      </div>
    </motion.div>
  );
}
