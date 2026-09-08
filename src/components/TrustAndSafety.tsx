'use client';

import { useTranslations } from 'next-intl';

export const TrustAndSafety = () => {
  const t = useTranslations('Index');

  const pillars = [
    {
      title: t('safety_card1_title'),
      desc: t('safety_card1_desc'),
      tag: 'Protokol Klinis',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      title: t('safety_card2_title'),
      desc: t('safety_card2_desc'),
      tag: 'Standar CDOB',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      ),
    },
    {
      title: t('safety_card3_title'),
      desc: t('safety_card3_desc'),
      tag: 'Distribusi Resmi',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: t('safety_card4_title'),
      desc: t('safety_card4_desc'),
      tag: 'Enkripsi & Privasi',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="keamanan" className="bg-slate-900 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-teal-500/30 bg-teal-500/20 px-3 py-1 text-xs font-bold tracking-wide text-teal-300 uppercase">
            {t('safety_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t('safety_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            {t('safety_subtitle')}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-xs transition hover:border-teal-500/50 hover:bg-slate-800"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-teal-800/60 bg-teal-950/80 text-teal-400">
                    {pillar.icon}
                  </div>
                  <span className="rounded-md border border-teal-800/40 bg-teal-950 px-2 py-0.5 text-[10px] font-bold text-teal-300">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
