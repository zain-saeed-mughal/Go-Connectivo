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
      className="gc-scrollbar max-h-[min(78vh,740px)] w-full overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-[color:var(--border-soft)] bg-[var(--surface)] shadow-[var(--shadow)]"
      role="navigation"
      aria-label="Services"
    >
      <div className="grid gap-0 divide-y divide-[color:var(--border-soft)] sm:grid-cols-2 sm:divide-x xl:grid-cols-5">
        {serviceCategories.map((category) => {
          const categoryServices = getServicesForCategory(category.id);
          return (
            <div key={category.id} className="border-transparent p-4 sm:p-5">
              <div className="mb-3.5 flex items-start gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent-soft)]/25 to-[var(--accent-soft)]/15 text-[var(--text-secondary)]">
                  <ServiceIcon name={category.icon} size={16} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="font-display text-[13px] font-semibold leading-snug text-[var(--text-primary)]">
                    {category.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-secondary)]">
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
                      className="group flex min-h-9 w-full items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors duration-150 hover:bg-[var(--bg-secondary)]"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)]">
                        <ServiceIcon name={service.icon} size={12} />
                      </span>
                      <span className="min-w-0 text-[12px] font-medium leading-snug text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
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

      <div className="flex flex-col gap-2 border-t border-[color:var(--border-soft)] bg-[var(--bg-primary)] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--text-secondary)]">
          Business Communications · Contact Center · Numbers · Carrier Voice · APIs
        </p>
        <Link
          to="/services"
          onClick={() => onNavigate?.()}
          className="text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          View all services →
        </Link>
      </div>
    </div>
  );
}
