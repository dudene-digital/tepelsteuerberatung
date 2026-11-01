"use client";

import { useId, useState } from "react";

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "bg-surface-container border-primary/20 shadow-[0_4px_24px_rgba(165,231,255,0.08)]"
                : "bg-surface-container/50 border-outline-variant/10 hover:bg-surface-container/80 hover:border-outline-variant/20"
            }`}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-start gap-4 p-5 md:p-6 text-left cursor-pointer group"
              >
                <span
                  className={`material-symbols-outlined text-lg mt-0.5 shrink-0 transition-all duration-300 ${
                    isOpen ? "text-primary rotate-0" : "text-on-surface-variant -rotate-90"
                  }`}
                  aria-hidden="true"
                  data-icon="expand_more"
                >
                  expand_more
                </span>
                <span
                  className={`font-headline text-sm md:text-base font-bold transition-colors duration-200 ${
                    isOpen ? "text-primary" : "text-on-surface group-hover:text-primary/80"
                  }`}
                >
                  {item.question}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 invisible"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 md:px-6 pb-5 md:pb-6 pl-[3.25rem] md:pl-[3.5rem] text-sm md:text-[0.95rem] text-on-surface-variant leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
