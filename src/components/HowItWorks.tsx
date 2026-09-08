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
      icon: <IconUpload className="size-6 text-teal-700" stroke={1.75} />,
    },
    {
      num: '02',
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: <IconChecklist className="size-6 text-teal-700" stroke={1.75} />,
    },
    {
      num: '03',
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: <IconCreditCard className="size-6 text-teal-700" stroke={1.75} />,
    },
    {
      num: '04',
      title: t('step4_title'),
      desc: t('step4_desc'),
      icon: <IconPackage className="size-6 text-teal-700" stroke={1.75} />,
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

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {/* Step indicator circle */}
              <div className="relative flex size-14 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 text-teal-700 shadow-xs transition hover:scale-105">
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-teal-700 text-[10px] font-bold text-white">
                  {idx + 1}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900 sm:text-base">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
