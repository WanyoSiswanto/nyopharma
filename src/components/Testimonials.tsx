'use client';

import { IconCheck, IconChevronLeft, IconChevronRight, IconStarFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type TestimonialItem = {
  id: string;
  author: string;
  initials: string;
  avatarBg: string;
  location: string;
  scenario: string;
  scenarioBadgeClass: string;
  comment: string;
  rating: number;
  date: string;
};

const REVIEWS: TestimonialItem[] = [
  {
    id: 'rev-01',
    author: 'Ibu Ratna Wardani',
    initials: 'RW',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    location: 'Jakarta Selatan',
    scenario: 'Penebusan Resep Darurat',
    scenarioBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    comment:
      'Anak saya demam tinggi malam hari dan butuh resep antibiotik segera. Resep diverifikasi cepat oleh apoteker dan obat tiba dalam 35 menit dalam kemasan segel CDOB aman.',
    rating: 5,
    date: 'Kemarin',
  },
  {
    id: 'rev-02',
    author: 'Bpk. Ir. Budi Santoso',
    initials: 'BS',
    avatarBg: 'bg-sky-100 text-sky-800',
    location: 'Tangerang',
    scenario: 'Refill Obat Hipertensi',
    scenarioBadgeClass: 'bg-sky-50 text-sky-800 border-sky-200/80',
    comment:
      'Layanan refill obat rutin tensi sangat tertib. Apoteker selalu mengingatkan seminggu sebelum amlodipine habis dan memantau keluhan dosis tanpa repot bolak-balik.',
    rating: 5,
    date: '3 hari lalu',
  },
  {
    id: 'rev-03',
    author: 'drg. Melisa Putri',
    initials: 'MP',
    avatarBg: 'bg-purple-100 text-purple-800',
    location: 'Bekasi',
    scenario: 'Konsultasi Interaksi Obat',
    scenarioBadgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
    comment:
      'Apoteker Nyopharma sangat teliti dalam menelaah potensi interaksi zat aktif antara suplemen harian saya dengan resep dokter. Penjelasannya sangat saintifik.',
    rating: 5,
    date: '5 hari lalu',
  },
  {
    id: 'rev-04',
    author: 'Bpk. Hendra Wijaya',
    initials: 'HW',
    avatarBg: 'bg-cyan-100 text-cyan-800',
    location: 'Bandung',
    scenario: 'Rantai Dingin 2-8°C (Insulin)',
    scenarioBadgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    comment:
      'Pesan Lantus insulin pen untuk ayah. Pengiriman khusus rantai dingin dilengkapi ice gel tebal dan indikator suhu tetap terjaga 4°C saat serah terima. Terpercaya!',
    rating: 5,
    date: '1 minggu lalu',
  },
  {
    id: 'rev-05',
    author: 'Ibu Cindy Claudia',
    initials: 'CC',
    avatarBg: 'bg-amber-100 text-amber-800',
    location: 'Surabaya',
    scenario: 'Vitamin & Imunitas Anak',
    scenarioBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    comment:
      'Beli multivitamin zinc dan madu herbal anak. Seluruh barcode BPOM terverifikasi 100% resmi, kemasan tersegel rapi, dan tanggal kedaluwarsa masih panjang 2 tahun.',
    rating: 5,
    date: '1 minggu lalu',
  },
  {
    id: 'rev-06',
    author: 'dr. Ahmad Faisal, Sp.PD',
    initials: 'AF',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    location: 'Depok',
    scenario: 'Integrasi Resep & Diabetes',
    scenarioBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    comment:
      'Sistem e-prescribing Nyopharma sangat memudahkan pasien diabetes tipe 2 saya dalam menebus metformin berkala tanpa kendala administrasi berbelit.',
    rating: 5,
    date: '2 minggu lalu',
  },
  {
    id: 'rev-07',
    author: 'Ibu Nurul Hidayah',
    initials: 'NH',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    location: 'Semarang',
    scenario: 'Alat Medis Digital Omron',
    scenarioBadgeClass: 'bg-slate-100 text-slate-800 border-slate-200/80',
    comment:
      'Beli tensimeter digital Omron garansi resmi. Apoteker memberikan panduan lewat video singkat cara memasang manset dan membaca deteksi denyut nadi aritmia.',
    rating: 5,
    date: '2 minggu lalu',
  },
  {
    id: 'rev-08',
    author: 'Bpk. Denny Pratama',
    initials: 'DP',
    avatarBg: 'bg-rose-100 text-rose-800',
    location: 'Jakarta Barat',
    scenario: 'Resep Pasca Rawat Inap',
    scenarioBadgeClass: 'bg-rose-50 text-rose-800 border-rose-200/80',
    comment:
      'Pasca rawat inap di RS, langsung foto resep obat pulang ke Nyopharma. Tidak sampai 40 menit paket obat komplit sudah sampai ke kamar istirahat saya.',
    rating: 5,
    date: '3 minggu lalu',
  },
];

/**
 * Dynamic auto-sliding Testimonials Carousel shifting left every 3 seconds.
 *
 * @returns JSX element for the moving patient testimonials carousel.
 */
export const Testimonials = () => {
  const t = useTranslations('Index');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-slide to the left every 3 seconds (3000ms), pauses when hovered
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (!isPaused) {
      timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % REVIEWS.length);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % REVIEWS.length);
  };

  // Extend reviews array so trailing spots are filled continuously
  const extendedReviews = [...REVIEWS, ...REVIEWS.slice(0, 3)];

  return (
    <section className="border-b border-slate-100 bg-[#f8faf9] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Live 3s Auto-Slide Indicator & Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t('testimonials_title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t('testimonials_subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto slide indicator badge */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs">
              <span className="flex size-2 animate-pulse rounded-full bg-emerald-500" />
              <span>{t('testimonials_auto_slide')}</span>
            </div>

            {/* Manual Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={t('testimonials_prev')}
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950 active:scale-95"
              >
                <IconChevronLeft className="size-4" stroke={2.5} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={t('testimonials_next')}
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950 active:scale-95"
              >
                <IconChevronRight className="size-4" stroke={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container (pauses on hover) */}
        <div
          className="mt-10 overflow-hidden"
          onMouseEnter={() => {
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
          }}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${(activeSlide * 100) / cardsPerView}%)`,
            }}
          >
            {extendedReviews.map((rev, index) => (
              <div key={`${rev.id}-${index}`} className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100/70 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl sm:p-7">
                  <div>
                    {/* Top Row: 5 Stars Rating & Scenario Pill Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IconStarFilled key={String(i)} className="size-3.5 sm:size-4" />
                        ))}
                        <span className="ml-1 text-xs font-bold text-slate-900">{rev.rating}</span>
                      </div>
                      <span
                        className={`truncate rounded-lg border px-2.5 py-0.5 text-[10px] font-bold sm:text-[11px] ${rev.scenarioBadgeClass}`}
                      >
                        {rev.scenario}
                      </span>
                    </div>

                    {/* Patient Review Quote */}
                    <blockquote className="mt-4 text-xs leading-relaxed font-medium text-slate-700 italic sm:text-sm">
                      &ldquo;{rev.comment}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom Row: Author details & Verified Badge */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold shadow-2xs ${rev.avatarBg}`}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                          {rev.author}
                        </h3>
                        <p className="text-[10px] text-slate-400 sm:text-xs">
                          {rev.location} • {rev.date}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-700 sm:text-xs">
                      <IconCheck className="size-3.5" stroke={2.5} />
                      <span>{t('testimonials_verified')}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((rev, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={rev.id}
                type="button"
                onClick={() => {
                  setActiveSlide(idx);
                }}
                aria-label={`Ulasan ${idx + 1}: ${rev.author}`}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-emerald-700 shadow-2xs'
                    : 'w-2.5 bg-slate-200 hover:bg-emerald-300'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
