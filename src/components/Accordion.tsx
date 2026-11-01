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
    <div className="border-t border-rule">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className="border-b border-rule">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-baseline justify-between gap-5 py-4 text-left lg:py-5"
              >
                <span className="font-display text-h2 text-pretty decoration-1 underline-offset-[0.14em] group-hover:underline">
                  {item.question}
                </span>
                <span aria-hidden="true" className="w-5 shrink-0 text-center text-2xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[46rem] pb-6 text-muted text-pretty">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
