'use client';

import { useTranslations } from 'next-intl';

type CtaBannerProps = {
  onOpenPrescriptionModal: () => void;
};

export const CtaBanner = (props: CtaBannerProps) => {
  const t = useTranslations('Index');

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-teal-500/30 bg-teal-600/60 px-3 py-1 text-xs font-bold tracking-wider text-teal-200 uppercase">
            Layanan Apoteker 24 Jam Siaga
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t('cta_banner_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-teal-100 sm:text-base">
            {t('cta_banner_subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={props.onOpenPrescriptionModal}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-extrabold text-teal-900 shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-50 sm:text-sm"
            >
              <svg
                className="size-4 text-teal-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>{t('hero_cta_upload')}</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20darurat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-300/40 bg-teal-900/40 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-teal-900/70 sm:text-sm"
            >
              <svg
                className="size-4 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{t('cta_banner_btn_wa')}</span>
            </a>

            <a
              href="tel:08001696742"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-300/40 bg-teal-900/40 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-teal-900/70 sm:text-sm"
            >
              <svg
                className="size-4 text-sky-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t('cta_banner_btn_call')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
