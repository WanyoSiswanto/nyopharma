'use client';

import {
  IconArrowRight,
  IconFileText,
  IconHeartbeat,
  IconMessageDots,
  IconTruckDelivery,
} from '@tabler/icons-react';
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
      icon: <IconFileText className="size-6 text-teal-700" stroke={1.75} />,
      action: (
        <button
          type="button"
          onClick={props.onOpenPrescriptionModal}
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 active:scale-[0.98]"
        >
          <span>Unggah Resep Sekarang</span>
          <IconArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            stroke={2}
          />
        </button>
      ),
    },
    {
      title: t('service_consult_title'),
      desc: t('service_consult_desc'),
      badge: 'Gratis 24 Jam',
      icon: <IconMessageDots className="size-6 text-teal-700" stroke={1.75} />,
      action: (
        <a
          href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 active:scale-[0.98]"
        >
          <span>Mulai Tanya Apoteker</span>
          <IconArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            stroke={2}
          />
        </a>
      ),
    },
    {
      title: t('service_delivery_title'),
      desc: t('service_delivery_desc'),
      badge: 'Suhu Terjaga',
      icon: <IconTruckDelivery className="size-6 text-teal-700" stroke={1.75} />,
      action: (
        <a
          href="#keamanan"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 active:scale-[0.98]"
        >
          <span>Pelajari Standar Distribusi</span>
          <IconArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            stroke={2}
          />
        </a>
      ),
    },
    {
      title: t('service_chronic_title'),
      desc: t('service_chronic_desc'),
      badge: 'Bebas Khawatir',
      icon: <IconHeartbeat className="size-6 text-teal-700" stroke={1.75} />,
      action: (
        <a
          href="https://wa.me/6281234567890?text=Halo%20Apoteker,%20saya%20ingin%20jadwalkan%20refill%20obat%20rutin"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 active:scale-[0.98]"
        >
          <span>Daftar Refill Rutin</span>
          <IconArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            stroke={2}
          />
        </a>
      ),
    },
  ];

  return (
    <section id="layanan" className="border-y border-slate-200/60 bg-slate-50/70 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header without repetitive eyebrow */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('services_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('services_subtitle')}
          </p>
        </div>

        {/* 4 Cards Grid with Asymmetric Accent */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 transition group-hover:bg-teal-600 group-hover:text-white">
                    {svc.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
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
