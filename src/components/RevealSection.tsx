import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function RevealSection({ id, className = '', children }: RevealSectionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
