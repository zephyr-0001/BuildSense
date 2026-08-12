export default function FormattedPackageName({ name, index = 0, style = {} }) {
  if (!name) return null;
  const parts = name.split(' ');
  if (parts.length < 2) return <span style={style}>{name}</span>;

  // Consistent Black + Orange styling across all package names:
  // "Sense" (Black / Text Main) + "Essential / Prime / Elite / Signature" (Orange / Accent)
  const color1 = 'var(--color-text-main)';
  const color2 = 'var(--color-accent)';

  return (
    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, ...style }}>
      <span style={{ color: color1 }}>{parts[0]}</span>{' '}
      <span style={{ color: color2 }}>{parts.slice(1).join(' ')}</span>
    </span>
  );
}
