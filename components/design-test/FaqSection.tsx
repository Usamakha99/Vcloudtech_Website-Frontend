"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { DtScrollReveal } from "@/components/design-test/DtScrollReveal";
import { dt } from "@/components/design-test/design-test-theme";
import { designTestFaqItems } from "@/lib/design-test/faq-content";

import "./design-test-closing-sections.css";

function FaqChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`dt-faq__chevron ${open ? "dt-faq__chevron--open" : ""}`}
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <DtScrollReveal delay={index * 0.06} className="dt-faq__item-wrap">
      <article
        className={`dt-faq__item ${isOpen ? "dt-faq__item--open" : ""}`}
        data-open={isOpen || undefined}
      >
        <h3 className="dt-faq__question">
          <button
            id={triggerId}
            type="button"
            className="dt-faq__trigger"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
          >
            <span className="dt-faq__question-text">{question}</span>
            <span className={`dt-faq__icon ${isOpen ? "dt-faq__icon--open" : ""}`} aria-hidden>
              <FaqChevron open={isOpen} />
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="dt-faq__panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dt-faq__answer-wrap">
                <p className="dt-faq__answer">{answer}</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </article>
    </DtScrollReveal>
  );
}

/** Enterprise FAQ accordion — design-test lab. */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return (
    <section
      id="faq"
      className={`dt-faq scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="faq-heading"
    >
      <div className="dt-faq__inner">
        <DtScrollReveal className="dt-faq__header mx-auto max-w-3xl text-center">
          <p className={dt.badge}>FAQ</p>
          <h2 id="faq-heading" className={`${dt.sectionHeadline} mt-5 text-white`}>
            Frequently Asked Questions
          </h2>
          <p className="dt-faq__lede mt-4 text-[#A1A1AA]">
            Straightforward answers on procurement, managed services, and how we support
            your team.
          </p>
        </DtScrollReveal>

        <div className="dt-faq__shell">
          <div className="dt-faq__list">
          {designTestFaqItems.map((item, index) => (
            <div key={item.question} className="dt-faq__list-item">
              <FaqItem
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
