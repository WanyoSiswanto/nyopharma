'use client';

import {
  IconChecklist,
  IconLockSquare,
  IconShieldCheck,
  IconTemperature,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const TrustAndSafety = () => {
  const t = useTranslations('Index');

  const pillars = [
    {
      title: t('safety_card1_title'),
      desc: t('safety_card1_desc'),
      tag: 'Protokol Klinis',
      icon: <IconChecklist className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      title: t('safety_card2_title'),
      desc: t('safety_card2_desc'),
      tag: 'Standar CDOB',
      icon: <IconTemperature className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      title: t('safety_card3_title'),
      desc: t('safety_card3_desc'),
      tag: 'Distribusi Resmi',
      icon: <IconShieldCheck className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      title: t('safety_card4_title'),
      desc: t('safety_card4_desc'),
      tag: 'Enkripsi & Privasi',
      icon: <IconLockSquare className="size-6 text-emerald-700" stroke={1.75} />,
    },
  ];

  return (
    <section id="keamanan" className="border-b border-slate-200/60 bg-slate-50/80 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('safety_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('safety_subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                    {pillar.icon}
                  </div>
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-slate-900 sm:text-base">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
