'use client';

import {
  IconCertificate,
  IconClock,
  IconFileText,
  IconSearch,
  IconShieldCheck,
  IconTruckDelivery,
  IconUserCheck,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

type HeroSectionProps = {
  onOpenPrescriptionModal: () => void;
  onSearchQuery?: (query: string) => void;
};

export const HeroSection = (props: HeroSectionProps) => {
  const t = useTranslations('Index');
  const [searchTerm, setSearchTerm] = useState('');

  const quickSearches = [
    'Paracetamol 500mg',
    'Vitamin C 1000mg',
    'Antasida Doen',
    'Amoxicillin 500mg',
    'Minyak Telon',
  ];

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && props.onSearchQuery) {
      props.onSearchQuery(searchTerm);
      const element = document.querySelector('#katalog');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchTerm(tag);
    if (props.onSearchQuery) {
      props.onSearchQuery(tag);
      const element = document.querySelector('#katalog');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-slate-50/30 to-white pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Asymmetric Hero Copy */}
          <div className="lg:col-span-7">
            {/* Eyebrow (1 of allowed 3 on whole page) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs">
              <IconShieldCheck className="size-4 text-teal-700" stroke={1.75} />
              <span>{t('badge_trust')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              {t('hero_title')}
            </h1>

            {/* Subtext */}
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-slate-600 sm:text-base">
              {t('hero_subtitle')}
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="mt-7">
              <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <IconSearch className="size-5" stroke={1.75} />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    placeholder={t('hero_search_placeholder')}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-10 text-xs text-slate-900 shadow-xs transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-xs font-bold text-white shadow-sm shadow-teal-700/20 transition hover:bg-teal-700 active:scale-[0.98] sm:text-sm"
                >
                  {t('search_button')}
                </button>
              </div>

              {/* Quick suggestions pills */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium">Populer:</span>
                {quickSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      handleQuickTagClick(item);
                    }}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 active:scale-[0.98]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={props.onOpenPrescriptionModal}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 active:scale-[0.98] sm:text-sm"
              >
                <IconFileText className="size-4" stroke={1.75} />
                <span>{t('hero_cta_upload')}</span>
              </button>

              <a
                href="#katalog"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] sm:text-sm"
              >
                <IconSearch className="size-4 text-teal-700" stroke={1.75} />
                <span>{t('hero_cta_search')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Photographic Asset & Verification Pill */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-xl shadow-teal-950/5">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/assets/images/pharmacist-hero.jpg"
                  alt="Apoteker Penanggung Jawab Nyopharma"
                  width={600}
                  height={450}
                  priority
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                {/* Overlaid Badge on bottom of image */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between text-white">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                      <h2 className="text-xs font-bold">apt. Sarah Ramadhani, S.Farm</h2>
                    </div>
                    <p className="font-mono text-[10px] text-teal-200">
                      STRA: 19920815/STRA-KFN/2020
                    </p>
                  </div>
                  <span className="rounded-lg bg-white/20 px-2 py-1 text-[10px] font-bold backdrop-blur-md">
                    APJ Siaga 24 Jam
                  </span>
                </div>
              </div>

              {/* Bottom Credential Row */}
              <div className="grid grid-cols-2 divide-x divide-slate-100 bg-white p-3.5 text-xs">
                <div className="flex items-center gap-2 px-1">
                  <IconCertificate className="size-5 shrink-0 text-teal-600" stroke={1.75} />
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">100% Produk Asli</div>
                    <div className="text-[10px] text-slate-500">Izin Edar BPOM RI</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-3">
                  <IconTruckDelivery className="size-5 shrink-0 text-teal-600" stroke={1.75} />
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">Suhu Terjaga 22°C</div>
                    <div className="text-[10px] text-slate-500">Standar Mutu CDOB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Trust Pillars Row */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <IconShieldCheck className="size-5" stroke={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{t('stat_authenticity')}</h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                {t('stat_authenticity_desc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <IconUserCheck className="size-5" stroke={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{t('stat_pharmacists')}</h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                {t('stat_pharmacists_desc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <IconClock className="size-5" stroke={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{t('stat_delivery')}</h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                {t('stat_delivery_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
