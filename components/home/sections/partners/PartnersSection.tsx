"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { dt } from "@/components/design-test/design-test-theme";
import { TrustedByClientsMarquee } from "@/components/home/sections/partners/TrustedByClientsMarquee";

import "./technology-partners.css";

const categories = [
  { id: "security", label: "Cybersecurity Partners", target: 110, suffix: "+", accent: true },
  { id: "software", label: "Software Partners", target: 200, suffix: "+", accent: false },
  { id: "hardware", label: "Hardware Partners", target: 140, suffix: "+", accent: false },
  { id: "cloud", label: "Cloud Partners", target: 100, suffix: "+", accent: false },
] as const;

import { partnerLogoVisualClass, partnerLogos } from "@/lib/design-test/partner-logos";

const ease = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const fadeUpTight = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function AnimatedCount({
  target,
  suffix,
  active,
  delayMs,
  className,
}: {
  target: number;
  suffix: string;
  active: boolean;
  delayMs: number;
  className: string;
}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasAnimated.current = true;
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const duration = target >= 100 ? 2000 : 1400;

    const timeout = window.setTimeout(() => {
      const tick = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setValue(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          hasAnimated.current = true;
        }
      };

      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, delayMs, target]);

  return (
    <p className={className} aria-label={`${target}${suffix}`}>
      {value}
      {suffix}
    </p>
  );
}

/** Technology partners — category stats, major logos, and trusted-by marquee. */
export function HomeTechnologyPartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLUListElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const trustedRef = useRef<HTMLDivElement>(null);

  const [glow, setGlow] = useState({ x: 50, y: 30, visible: false });
  const [mounted, setMounted] = useState(false);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-40px" });
  const showcaseInView = useInView(showcaseRef, { once: true, margin: "-40px" });
  const trustedInView = useInView(trustedRef, { once: true, margin: "-30px" });

  const headerVisible = mounted && sectionInView;
  const categoriesActive = mounted && categoriesInView;
  const showcaseActive = mounted && showcaseInView;
  const trustedActive = mounted && trustedInView;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className={`tp relative z-10 scroll-mt-24 py-14 sm:py-16 lg:py-20 ${dt.sectionBorder}`}
      aria-labelledby="tech-partners-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setGlow((g) => ({ ...g, visible: false }))}
    >
      <div className="tp__grid-bg" aria-hidden />
      <motion.div
        className="tp__glow"
        aria-hidden
        animate={{ opacity: glow.visible ? 0.75 : 0.25 }}
        transition={{ duration: 0.4 }}
        style={{ left: `${glow.x}%`, top: `${glow.y}%` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className={dt.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, ease }}
        >
          <p className={dt.badge}>Technology Partners</p>
          <h2 id="tech-partners-heading" className={dt.sectionHeadlineTp}>
            World-class partners.{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              One trusted platform.
            </span>
          </h2>
          <p className={`${dt.sectionDesc} ${dt.headingSub}`}>
            400+ technology partners across cybersecurity, software, hardware, cloud sourced
            and supported through vCloud Tech.
          </p>
        </motion.header>

        <motion.ul
          ref={categoriesRef}
          className="tp__categories"
          aria-label="Partner categories"
          variants={staggerContainer}
          initial="hidden"
          animate={categoriesActive ? "show" : "hidden"}
        >
          {categories.map((category, index) => (
            <motion.li key={category.id} variants={fadeUp} className="tp__category">
              <span className="tp__category-accent" aria-hidden />
              <AnimatedCount
                target={category.target}
                suffix={category.suffix}
                active={categoriesActive}
                delayMs={index * 100 + 200}
                className={`tp__category-value ${category.accent ? "tp__category-value--accent" : ""}`}
              />
              <p className="tp__category-label">{category.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        ref={showcaseRef}
        className="tp__partners-showcase-wrap relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={showcaseActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
      >
        <div className="tp__subsection-inner tp__subsection-inner--major">
          <h3 className="tp__trusted-heading">Major Partners</h3>
          <motion.ul
            className="tp__partner-grid tp__partner-grid--all"
            data-nav-surface="light"
            variants={staggerContainer}
            initial="hidden"
            animate={showcaseActive ? "show" : "hidden"}
          >
            {partnerLogos.map((partner) => (
              <motion.li key={partner.name} variants={fadeUpTight}>
                <div className="tp__partner-cell group">
                  <div className="tp__partner-logo-slot">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      className={`tp__partner-logo ${partnerLogoVisualClass(partner.name)}`.trim()}
                      sizes="(max-width: 640px) 124px, 152px"
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <div className="tp__major-partners-footer">
            <Link href="/solutions" className="tp__cta">
              View All Partners
              <span className="tp__cta-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={trustedRef}
        className="tp__trusted-wrap tp__trusted-wrap--strip relative z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={trustedActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
      >
        <TrustedByClientsMarquee />
      </motion.div>
    </section>
  );
}
