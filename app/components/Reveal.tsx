"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    observer.observe(node);
    const fallback = window.setTimeout(() => setVisible(true), 450);
    return () => { observer.disconnect(); window.clearTimeout(fallback); };
  }, []);
  return <div ref={ref} className={`${className} reveal ${visible ? "is-visible" : ""}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}
