'use client';

import { IconChevronDown, IconWorld } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import type { ChangeEventHandler } from 'react';
import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLocale = event.target.value;

    if (newLocale === locale) {
      return;
    }

    const { search } = window.location;
    router.push(`${pathname}${search}`, { locale: newLocale, scroll: false });
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="pointer-events-none absolute left-2.5 flex items-center text-slate-500">
        <IconWorld className="size-3.5" stroke={1.75} />
      </div>
      <select
        defaultValue={locale}
        onChange={handleChange}
        className="cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50/80 py-1.5 pr-6 pl-7 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-white focus:border-emerald-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500/20"
        aria-label={t('change_language')}
      >
        {routing.locales.map((elt) => (
          <option key={elt} value={elt}>
            {elt.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 flex items-center text-slate-400">
        <IconChevronDown className="size-3" stroke={2} />
      </div>
    </div>
  );
};
