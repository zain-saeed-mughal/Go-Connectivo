import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceIcon from '../ui/ServiceIcon';
import { getServicesForCategory, serviceCategories } from '../../data/content';

/**
 * Desktop mega-menu.
 * Wheel events are contained here so the page does not scroll behind the panel.
 */
export default function ServicesMegaMenu({ onNavigate }) {
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;

    const onWheel = (event) => {
      event.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
        event.preventDefault();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const goToService = (serviceId) => {
    navigate(`/services/${serviceId}`);
    onNavigate?.();
  };

  return (
    <div
      ref={panelRef}
      className="gc-scrollbar max-h-[min(78vh,740px)] w-full overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_24px_80px_rgba(47,76,115,0.16)]"
      role="navigation"
      aria-label="Services"
    >
      <div className="grid gap-0 divide-y divide-[rgba(47,76,115,0.08)] sm:grid-cols-2 sm:divide-x xl:grid-cols-5">
        {serviceCategories.map((category) => {
          const categoryServices = getServicesForCategory(category.id);
          return (
            <div key={category.id} className="border-[rgba(47,76,115,0.08)] p-4 sm:p-5">
              <div className="mb-3.5 flex items-start gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#4A6B94]/25 to-[#4A6B94]/15 text-[#6B8AB0]">
                  <ServiceIcon name={category.icon} size={16} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="font-display text-[13px] font-semibold leading-snug text-[#2F4C73]">
                    {category.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#6B7C8F]">
                    {category.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-0.5">
                {categoryServices.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => goToService(service.id)}
                      className="group flex min-h-9 w-full items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors duration-150 hover:bg-[#E8ECF2]"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#4A6B94] text-[#FFFFFF]">
                        <ServiceIcon name={service.icon} size={12} />
                      </span>
                      <span className="min-w-0 text-[12px] font-medium leading-snug text-[#4A5D73] transition-colors group-hover:text-[#2F4C73]">
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

      <div className="flex flex-col gap-2 border-t border-[rgba(47,76,115,0.1)] bg-[#F4F6F9] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#6B7C8F]">
          Business Communications · Contact Center · Numbers · Carrier Voice · APIs
        </p>
        <Link
          to="/services"
          onClick={() => onNavigate?.()}
          className="text-xs font-semibold text-[#6B8AB0] transition-colors hover:text-[#2F4C73]"
        >
          View all services →
        </Link>
      </div>
    </div>
  );
}
