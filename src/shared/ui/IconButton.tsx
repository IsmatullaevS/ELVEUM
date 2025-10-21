import React from "react";
import { Icon } from "@/shared/ui/Icon";

const useDpr = () => {
  const [dpr, setDpr] = React.useState<number>(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
  React.useEffect(() => {
    const onChange = () => setDpr(window.devicePixelRatio || 1);
    window.addEventListener("resize", onChange);
    return () => window.removeEventListener("resize", onChange);
  }, []);
  return dpr;
};

type Props = {
  name: string;
  label: string;
  onClick?: () => void;
  size?: number;
  className?: string;
};

export const IconButton: React.FC<Props> = ({ name, label, onClick, size = 24, className = "" }) => {
  const dpr = useDpr();
  const stroke = Math.max(1, Math.min(2.5, 2 / dpr)); // ~2 physical px on any DPR
  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-[var(--c-hover,#EEF1F4)] active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-primary)]"
        aria-label={label}
      >
        <span className="transition-transform duration-150 ease-out group-hover:scale-105">
          <Icon name={name} size={size} stroke={stroke} className="[&_path]:vector-effect-non-scaling-stroke [shape-rendering:geometricPrecision]" />
        </span>
      </button>
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[120%] z-50 px-3 py-1 rounded-lg bg-[rgba(0,0,0,0.92)] text-white text-[12px] font-normal shadow-xl opacity-0 translate-y-[-2px] group-hover:opacity-100 group-hover:translate-y-0 transition-all"
      >
        {label}
      </div>
    </div>
  );
};
