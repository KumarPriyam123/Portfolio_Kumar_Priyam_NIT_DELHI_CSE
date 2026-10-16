import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ['', '/projects', '/research', '/research/marl-maps', '/profile', '/connect'];
  return [
    ...fixed.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${SITE.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
