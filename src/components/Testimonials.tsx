'use client';

import { IconCheck, IconStarFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const Testimonials = () => {
  const t = useTranslations('Index');

  const featured = {
    author: 'Ibu Ratna Wardani',
    location: 'Jakarta Selatan',
    scenario: 'Penebusan Resep Darurat Tengah Malam',
    comment:
      'Anak saya demam tinggi malam hari dan butuh resep antibiotik. Resep dikonfirmasi cepat oleh apoteker dan obat sampai dalam 40 menit dalam kemasan segel aman.',
    rating: 5,
  };

  const reviews = [
    {
      author: 'Bpk. Ir. Budi Santoso',
      location: 'Tangerang',
      scenario: 'Refill Obat Rutin Hipertensi',
      comment:
        'Layanan refill rutin sangat tertib. Apoteker selalu mengingatkan seminggu sebelum obat habis dan memastikan tidak ada keluhan dosis.',
      rating: 5,
    },
    {
      author: 'drg. Melisa Putri',
      location: 'Bekasi',
      scenario: 'Konsultasi Interaksi Obat',
      comment:
        'Apoteker Nyopharma sangat teliti dalam menelaah potensi interaksi antara suplemen harian saya dengan resep dokter.',
      rating: 5,
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-slate-50/60 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('testimonials_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('testimonials_subtitle')}
          </p>
        </div>

        {/* Asymmetric Reviews Layout */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Featured Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-teal-200 bg-white p-7 shadow-xs lg:col-span-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled key={String(i)} className="size-4" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-900">5.0</span>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-800">
                  {featured.scenario}
                </span>
              </div>

              <blockquote className="mt-5 text-sm leading-relaxed font-medium text-slate-800 italic sm:text-base">
                &ldquo;{featured.comment}&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{featured.author}</h3>
                <span className="text-[10px] text-slate-500">{featured.location}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <IconCheck className="size-3.5" stroke={2.5} />
                Pasien Terverifikasi
              </span>
            </div>
          </div>

          {/* 2 Side Reviews */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            {reviews.map((rev) => (
              <div
                key={rev.author}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconStarFilled key={String(i)} className="size-3.5" />
                      ))}
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                      {rev.scenario}
                    </span>
                  </div>

                  <blockquote className="mt-3 text-xs leading-relaxed text-slate-700 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                    <span className="text-[10px] text-slate-500">{rev.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                    <IconCheck className="size-3.5" stroke={2.5} /> Terverifikasi
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
