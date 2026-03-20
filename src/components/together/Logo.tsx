export function Logo({ dark = false }: { dark?: boolean }) {
  const color = dark ? '#FFF9F5' : undefined;
  return (
    <div className="flex items-center gap-0" style={color ? { color } : undefined}>
      <span className={`font-sans font-black text-xl tracking-[-0.03em] ${dark ? '' : 'text-foreground'}`}>
        FUTRA
      </span>
      <span className="mx-2 opacity-30 font-light">|</span>
      <span className={`font-sans font-medium text-xl ${dark ? '' : 'text-foreground'}`}>
        together
      </span>
    </div>
  );
}
