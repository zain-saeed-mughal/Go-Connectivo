/**
 * Marks a Home scroll chapter for story atmosphere + reveal sync.
 * Layout/copy unchanged — attributes + optional rail only.
 */
export default function ScrollChapter({ id, line = 'a', className = '', children }) {
  return (
    <div
      data-scroll-chapter={id}
      data-scroll-line={line}
      className={`gc-scroll-chapter relative ${className}`.trim()}
    >
      <span className="gc-chapter-rail" aria-hidden="true" />
      {children}
    </div>
  );
}
