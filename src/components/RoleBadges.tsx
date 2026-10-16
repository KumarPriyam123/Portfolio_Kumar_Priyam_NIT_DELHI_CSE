import { PROJECT_ROLES, ROLE, type RoleId } from '@/data/roles';

/** The crafts a project shows, primary first, each in its own colour. */
export default function RoleBadges({ slug, size = 'sm' }: { slug: string; size?: 'sm' | 'md' }) {
  const ids: RoleId[] = PROJECT_ROLES[slug] ?? [];
  if (!ids.length) return null;
  return (
    <span className="kp-roles" data-size={size}>
      <span className="sr-only">Shows: </span>
      {ids.map((id) => (
        <span key={id} className="kp-role" data-for={id}>
          <i aria-hidden="true" />
          {ROLE[id].tab}
        </span>
      ))}
    </span>
  );
}
