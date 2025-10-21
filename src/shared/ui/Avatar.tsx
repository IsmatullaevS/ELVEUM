import React from "react";
import { getInitials } from "@/shared/lib/getInitials";

type AvatarProps = {
  fullName?: string;
  size?: number; // px
  className?: string;
  title?: string;
  parallax?: boolean; // enable subtle parallax on hover (defaults true)
};

export const Avatar: React.FC<AvatarProps> = ({ fullName, size = 36, className = "", title, parallax = true }) => {
  const initials = getInitials(fullName);
  const dim = `${size}px`;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!parallax || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // clamp to [-1,1] then scale to a subtle 2.5px
    const clamp = (v:number) => Math.max(-1, Math.min(1, v));
    const strength = Math.min(2.5, size * 0.07); // scale with size, max ~2.5px
    setOffset({ x: clamp(dx) * strength, y: clamp(dy) * strength });
  };
  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex select-none items-center justify-center rounded-full bg-[var(--c-avatar-bg,#E6ECF3)] hover:bg-[var(--c-avatar-bg-hover,#D7DEE8)] text-[var(--c-primary,#111827)] font-semibold uppercase shadow-sm transition-colors ${className}`}
      style={{ width: dim, height: dim, fontSize: Math.max(12, Math.floor(size * 0.42)) }}
      aria-hidden="true"
      title={title || fullName}
    >
      <span style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, transition: "transform 60ms linear" }}>
        {initials}
      </span>
    </div>
  );
};