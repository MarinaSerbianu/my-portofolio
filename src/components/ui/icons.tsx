type IconProps = { className?: string; size?: number };

export function ArrowRight({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function Plus({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}
