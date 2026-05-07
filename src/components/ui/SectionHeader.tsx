'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionHeader({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeaderProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      className={cn('mb-12 md:mb-16', alignments[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="heading-lg">{title}</h2>
      {subtitle && (
        <p className="text-body mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
