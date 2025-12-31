
import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, description, align = 'left' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
      <span className="inline-block py-1 px-4 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
        {badge}
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};
