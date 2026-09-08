'use client';

import { useTranslations } from 'next-intl';

export const Testimonials = () => {
  const t = useTranslations('Index');

  const reviews = [
    {
      author: 'Ibu Ratna Wardani',
      location: 'Jakarta Selatan',
      scenario: 'Penebusan Resep Darurat Tengah Malam',
      comment:
        'Anak saya demam tinggi jam 11 malam dan butuh antibiotik khusus resep dokter. Begitu foto resep dikirim, apoteker langsung respon dan obat sampai dalam 40 menit dalam keadaan tersegel rapi. Sangat menolong!',
      rating: 5,
    },
    {
      author: 'Bpk. Ir. Budi Santoso',
      location: 'Tangerang',
      scenario: 'Langganan Obat Rutin Hipertensi & Diabetes',
      comment:
        'Sudah 6 bulan memakai layanan refill rutin Nyopharma untuk obat orang tua. Apoteker selalu mengingatkan seminggu sebelum obat habis dan memeriksa apakah ada keluhan dosis. Pelayanan profesional sekali.',
      rating: 5,
    },
    {
      author: 'drg. Melisa Putri',
      location: 'Bekasi',
      scenario: 'Konsultasi Interaksi Obat & Suplemen',
      comment:
        'Sebagai tenaga kesehatan, saya sangat menghargai ketelitian apoteker Nyopharma. Mereka mengonfirmasi ulang ketika ada potensi interaksi antara suplemen herbal yang saya konsumsi dengan obat resep.',
      rating: 5,
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
            {t('testimonials_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('testimonials_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('testimonials_subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.author}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition hover:border-teal-200 hover:shadow-md"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <svg key={String(i)} className="size-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700">5.0</span>
                </div>

                <span className="mt-3 inline-block rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-800">
                  {rev.scenario}
                </span>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <span className="text-[10px] text-slate-500">{rev.location}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Terverifikasi
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
