'use client';

import { useTranslations } from 'next-intl';

type TopServicesProps = {
  locale: string;
  onServiceSelect: (serviceKey: string) => void;
};

/**
 * Renders the 4 pastel-tinted healthcare service cards inspired by the reference design.
 *
 * @param props Component properties containing service select callback.
 * @returns JSX element for top services section.
 */
export function TopServices(props: TopServicesProps) {
  const t = useTranslations('Index');

  const services = [
    {
      id: 'telepharmacy',
      title: t('service_tele_title'),
      desc: t('service_tele_desc'),
      icon: '🩺',
      colorClasses: 'bg-emerald-50/70 border-emerald-100/80 hover:border-emerald-300',
      iconBoxClasses: 'bg-emerald-100/90 text-emerald-800',
      arrowBgClasses: 'bg-slate-900 group-hover:bg-emerald-700 text-white',
    },
    {
      id: 'doctor_network',
      title: t('service_doctor_title'),
      desc: t('service_doctor_desc'),
      icon: '👨‍⚕️',
      colorClasses: 'bg-[#f4f9ed] border-emerald-100/70 hover:border-emerald-300',
      iconBoxClasses: 'bg-emerald-100/80 text-emerald-900',
      arrowBgClasses: 'bg-slate-900 group-hover:bg-emerald-700 text-white',
    },
    {
      id: 'delivery_247',
      title: t('service_delivery_247_title'),
      desc: t('service_delivery_247_desc'),
      icon: '💊',
      colorClasses: 'bg-[#f0f8f4] border-emerald-100/80 hover:border-emerald-300',
      iconBoxClasses: 'bg-emerald-100/90 text-emerald-900',
      arrowBgClasses: 'bg-slate-900 group-hover:bg-emerald-700 text-white',
    },
    {
      id: 'lab_screening',
      title: t('service_lab_title'),
      desc: t('service_lab_desc'),
      icon: '🔬',
      colorClasses: 'bg-sky-50/60 border-sky-100/70 hover:border-sky-300',
      iconBoxClasses: 'bg-sky-100/80 text-sky-900',
      arrowBgClasses: 'bg-slate-900 group-hover:bg-emerald-700 text-white',
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Heading with Green Indicator Line */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {t('services_section_title')}
          </h2>
          <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-emerald-600" />
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">
            {t('services_section_subtitle')}
          </p>
        </div>

        {/* 4 Pastel Service Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <button
              key={svc.id}
              type="button"
              aria-label={svc.title}
              onClick={() => {
                props.onServiceSelect(svc.id);
              }}
              className={`group flex cursor-pointer flex-col justify-between rounded-3xl border p-6 text-left shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] ${svc.colorClasses}`}
            >
              <div className="space-y-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-xs transition-transform group-hover:scale-105 ${svc.iconBoxClasses}`}
                >
                  {svc.icon}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-950">
                    {svc.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{svc.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${svc.arrowBgClasses}`}
                >
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
