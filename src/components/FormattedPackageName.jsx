export default function FormattedPackageName({ name, index = 0, style = {} }) {
  if (!name) return null;
  const parts = name.split(' ');
  if (parts.length < 2) return <span style={style}>{name}</span>;

  // Alternating colors for word 1 ("Sense") and word 2 ("Essential", "Prime", "Elite", "Signature")
  // Even index (0, 2): Sense (Black/Main Text), Tier (Orange/Accent)
  // Odd index (1, 3): Sense (Orange/Accent), Tier (Black/Main Text)
  const color1 = index % 2 === 0 ? 'var(--color-text-main)' : 'var(--color-accent)';
  const color2 = index % 2 === 0 ? 'var(--color-accent)' : 'var(--color-text-main)';

  return (
    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, ...style }}>
      <span style={{ color: color1 }}>{parts[0]}</span>{' '}
      <span style={{ color: color2 }}>{parts.slice(1).join(' ')}</span>
    </span>
  );
}
