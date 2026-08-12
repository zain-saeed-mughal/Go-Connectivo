import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const goToService = (serviceId) => {
    startPageScroll();
    navigate(`/services/${serviceId}`);
    onNavigate?.();
  };

  return (
    <motion.div
      ref={panelRef}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={stopPageScroll}
      onMouseLeave={startPageScroll}
      className="gc-scrollbar max-h-[min(78vh,720px)] w-full overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      role="navigation"
      aria-label="Services"
    >
      <div className="grid gap-0 md:grid-cols-3">
        {serviceCategories.map((category, index) => {
          const categoryServices = getServicesForCategory(category.id);
          return (
            <div
              key={category.id}
              className={`p-5 ${index < serviceCategories.length - 1 ? 'md:border-r md:border-[rgba(47,76,115,0.1)]' : ''}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#4A6B94]/25 to-[#4A6B94]/15 text-[#6B8AB0]">
                  <ServiceIcon name={category.icon} size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-[#2F4C73]">{category.title}</p>
                  <p className="text-[11px] leading-snug text-[#6B7C8F]">{category.description}</p>
                </div>
              </div>

              <ul className="space-y-1">
                {categoryServices.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => goToService(service.id)}
                      className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-left transition-colors duration-200 hover:bg-[#E8ECF2]"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#4A6B94] text-[#FFFFFF] shadow-[0_6px_16px_rgba(74,107,148,0.35)] transition-transform duration-300 group-hover:scale-105">
                        <ServiceIcon name={service.icon} size={15} />
                      </span>
                      <span className="text-sm font-medium text-[#4A5D73] transition-colors group-hover:text-[#2F4C73]">
                        {service.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#6B7C8F]">Dialers · PBX · Inbound · Outbound</p>
        <Link
          to="/services#all-services"
          onClick={() => {
            startPageScroll();
            onNavigate?.();
          }}
          className="text-xs font-semibold text-[#6B8AB0] transition-colors hover:text-[#2F4C73]"
        >
          View all services →
        </Link>
      </div>
    </motion.div>
  );
}
