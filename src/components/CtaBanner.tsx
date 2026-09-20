'use client';

import { IconFileText, IconMessageDots, IconPhoneCall } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type CtaBannerProps = {
  onOpenPrescriptionModal: () => void;
};

export const CtaBanner = (props: CtaBannerProps) => {
  const t = useTranslations('Index');

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t('cta_banner_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100 sm:text-base">
            {t('cta_banner_subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={props.onOpenPrescriptionModal}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-emerald-950 shadow-md shadow-emerald-950/30 transition hover:bg-emerald-50 active:scale-[0.98] sm:text-sm"
            >
              <IconFileText className="size-4 text-emerald-800" stroke={2} />
              <span>{t('hero_cta_upload')}</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20darurat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-950/40 px-5 py-3 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-emerald-950/70 active:scale-[0.98] sm:text-sm"
            >
              <IconMessageDots className="size-4 text-emerald-300" stroke={2} />
              <span>{t('cta_banner_btn_wa')}</span>
            </a>

            <a
              href="tel:08001696742"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-950/40 px-5 py-3 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-emerald-950/70 active:scale-[0.98] sm:text-sm"
            >
              <IconPhoneCall className="size-4 text-sky-300" stroke={2} />
              <span>{t('cta_banner_btn_call')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
