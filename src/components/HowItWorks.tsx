'use client';

import { IconChecklist, IconCreditCard, IconPackage, IconUpload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const HowItWorks = () => {
  const t = useTranslations('Index');

  const steps = [
    {
      num: '01',
      title: t('step1_title'),
      desc: t('step1_desc'),
      icon: <IconUpload className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      num: '02',
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: <IconChecklist className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      num: '03',
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: <IconCreditCard className="size-6 text-emerald-700" stroke={1.75} />,
    },
    {
      num: '04',
      title: t('step4_title'),
      desc: t('step4_desc'),
      icon: <IconPackage className="size-6 text-emerald-700" stroke={1.75} />,
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('how_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('how_subtitle')}
          </p>
        </div>

        <div className="relative mt-12">
          {/* Connecting line on desktop */}
          <div
            className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 lg:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
                {/* Step indicator circle */}
                <div className="relative flex size-14 items-center justify-center rounded-2xl border-2 border-emerald-200 bg-white text-emerald-700 shadow-xs transition duration-200 hover:scale-105 hover:border-emerald-400">
                  {step.icon}
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white shadow-xs">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-900 sm:text-base">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-xs leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
