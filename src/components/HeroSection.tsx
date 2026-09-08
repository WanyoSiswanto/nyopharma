'use client';

import { useTranslations } from 'next-intl';
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
    'Amoxicillin 500mg (Rx)',
    'Minyak Telon Bayi',
    'Masker Medis 3-Ply',
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
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-slate-50/40 to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background subtle geometric medical cross pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Copy & Search */}
          <div className="lg:col-span-7">
            {/* Trust Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
              <svg
                className="size-4 text-teal-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>{t('badge_trust')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              {t('hero_title')}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('hero_subtitle')}
            </p>

            {/* Interactive Medicine Search Box */}
            <form onSubmit={handleSearchSubmit} className="mt-8">
              <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    placeholder={t('hero_search_placeholder')}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-4 pl-11 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
                >
                  {t('search_button')}
                </button>
              </div>

              {/* Quick suggestions pills */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium">Pencarian Populer:</span>
                {quickSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      handleQuickTagClick(item);
                    }}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={props.onOpenPrescriptionModal}
                className="inline-flex items-center gap-2.5 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/25 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                {t('hero_cta_upload')}
              </button>

              <a
                href="#katalog"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  className="size-5 text-teal-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                {t('hero_cta_search')}
              </a>
            </div>
          </div>

          {/* Right Column: Visual Trust & Live Status Cards */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md space-y-4">
              {/* Primary Visual Showcase Card */}
              <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-12 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-700">
                      <svg
                        className="size-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-white bg-emerald-500" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Apoteker Jaga Siaga</h2>
                      <p className="text-xs text-slate-500">apt. Sarah Ramadhani, S.Farm</p>
                      <span className="font-mono text-[10px] text-teal-700">
                        STRA: 19920815/STRA-KFN/2020
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Online 24/7
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs">
                    <span className="text-slate-600">Verifikasi Resep Rata-rata</span>
                    <strong className="font-semibold text-teal-700">⚡ 4.8 Menit</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-teal-50/60 p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <svg
                        className="size-4 text-teal-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span className="text-slate-700">Estimasi Harga Resep</span>
                    </div>
                    <strong className="text-slate-900">Transparan & Resmi</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs">
                    <span className="text-slate-600">Standar Pengemasan</span>
                    <span className="font-semibold text-emerald-700">
                      Segel Kedap & Double-Check
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">Butuh konsultasi dosis?</span>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Apoteker,%20saya%20ingin%20konsultasi%20obat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-teal-700 underline underline-offset-2 hover:text-teal-900"
                  >
                    Mulai Chat WhatsApp →
                  </a>
                </div>
              </div>

              {/* Floating Badge 1: Cold Chain Delivery Tracker */}
              <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-white/95 p-3.5 shadow-lg shadow-sky-900/5 backdrop-blur-xs">
                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="17" cy="18" r="2" />
                    <path d="M15 13H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Cold-Chain Delivery</span>
                    <span className="rounded-sm bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">
                      22°C Aman
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Termometer & segel khusus menjaga kualitas formula obat
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: 100% BPOM Verified */}
              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white/95 p-3.5 shadow-lg shadow-emerald-900/5 backdrop-blur-xs">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Garansi 100% Produk Original
                    </span>
                    <span className="rounded-sm bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      BPOM RI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Disuplai langsung dari Pedagang Besar Farmasi resmi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Three Stats Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-teal-200">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t('stat_authenticity')}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {t('stat_authenticity_desc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-teal-200">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t('stat_pharmacists')}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {t('stat_pharmacists_desc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-teal-200">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t('stat_delivery')}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {t('stat_delivery_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
