type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Ascendra Network home">
      <img src="/logo.svg" alt="" width={40} height={40} className="brand-mark" />
      <span className="brand-text">
        <strong>Ascendra</strong>
        <em>Network</em>
      </span>
    </a>
  );
}
