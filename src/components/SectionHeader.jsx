import React from 'react';

function SectionHeader({ title, subtitle, centered = false, showDivider = true, stacked = false }) {
  if (centered) {
    return (
      <div className="mb-6 flex flex-col items-center text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">{title}</h2>
        {subtitle && (
          <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
        )}
      </div>
    );
  }

  if (stacked || !showDivider) {
    return (
      <div className="mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl font-body-md text-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 className="font-headline-lg text-headline-lg shrink-0 text-on-surface">{title}</h2>
      <div className="h-px min-w-[3rem] flex-grow bg-outline" />
      {subtitle && (
        <span className="hidden items-center gap-2 font-body-md text-sm text-on-surface-variant lg:flex lg:shrink-0">
          <span className="material-symbols-outlined text-[16px]">info</span>
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default SectionHeader;
