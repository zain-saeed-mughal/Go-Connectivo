import { useMemo } from 'react';
import SeoHead from './SeoHead';
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
  staticPages,
} from '../../lib/seoConfig';

export function PageSeo({
  path,
  title,
  description,
  noindex = false,
  breadcrumbs,
  service,
  includeOrg = false,
}) {
  const meta = staticPages[path] || {};
  const finalTitle = title || meta.title;
  const finalDescription = description || meta.description;

  const jsonLd = useMemo(() => {
    const blocks = [];
    if (includeOrg || path === '/') {
      blocks.push(buildOrganizationSchema(), buildWebSiteSchema());
    }
    if (service) {
      blocks.push(
        buildServiceSchema({
          name: service.name,
          description: service.description,
          urlPath: path,
        }),
      );
    } else {
      blocks.push(
        buildWebPageSchema({
          name: finalTitle,
          description: finalDescription,
          urlPath: path,
        }),
      );
    }
    if (breadcrumbs?.length) {
      blocks.push(buildBreadcrumbSchema(breadcrumbs));
    }
    return blocks;
  }, [path, finalTitle, finalDescription, includeOrg, service, breadcrumbs]);

  return (
    <SeoHead
      path={path}
      title={finalTitle}
      description={finalDescription}
      noindex={noindex}
      jsonLd={jsonLd}
    />
  );
}
