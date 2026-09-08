'use client';

import { useTranslations } from 'next-intl';

type QuickServicesProps = {
  onOpenPrescriptionModal: () => void;
};

export const QuickServices = (props: QuickServicesProps) => {
  const t = useTranslations('Index');

  const services = [
    {
      title: t('service_rx_title'),
      desc: t('service_rx_desc'),
      badge: 'Layanan Utama',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      action: (
        <button
          type="button"
          onClick={props.onOpenPrescriptionModal}
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          <span>Unggah Resep Sekarang</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      ),
    },
    {
      title: t('service_consult_title'),
      desc: t('service_consult_desc'),
      badge: 'Gratis & 24 Jam',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      ),
      action: (
        <a
          href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          <span>Mulai Tanya Apoteker</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      ),
    },
    {
      title: t('service_delivery_title'),
      desc: t('service_delivery_desc'),
      badge: 'Suhu Terjaga',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      action: (
        <a
          href="#keamanan"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          <span>Pelajari Standar Distribusi</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      ),
    },
    {
      title: t('service_chronic_title'),
      desc: t('service_chronic_desc'),
      badge: 'Bebas Khawatir',
      icon: (
        <svg
          className="size-6 text-teal-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <polyline points="12 6 12 12 14 14" />
        </svg>
      ),
      action: (
        <a
          href="https://wa.me/6281234567890?text=Halo%20Apoteker,%20saya%20ingin%20jadwalkan%20refill%20obat%20rutin"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          <span>Daftar Langganan Refill</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      ),
    },
  ];

  return (
    <section id="layanan" className="border-y border-slate-200/60 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
            {t('services_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('services_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('services_subtitle')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-teal-50 transition group-hover:bg-teal-600 group-hover:text-white">
                    {svc.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                    {svc.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{svc.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{svc.desc}</p>
              </div>
              <div>{svc.action}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
