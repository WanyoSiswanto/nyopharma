'use client';

import { IconCertificate, IconMessageDots, IconStethoscope } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export const PharmacistTeam = () => {
  const t = useTranslations('Index');

  const leadPharmacist = {
    name: 'apt. Sarah Ramadhani, S.Farm',
    role: 'Apoteker Penanggung Jawab (APJ)',
    stra: 'STRA: 19920815/STRA-KFN/2020',
    sipa: 'SIPA: 19920815/SIPA_32.73/2021/2004',
    focus: 'Farmakologi Klinis, Skrining Dosis & Interaksi Obat Resep',
    experience: '9+ Tahun Praktik Klinis',
    bio: 'Memimpin penjaminan mutu dan pengawasan dispensing seluruh resep dokter di Nyopharma untuk memastikan keselamatan pasien tanpa kompromi.',
  };

  const specialists = [
    {
      name: 'apt. Dimas Prasetyo, M.Clin.Pharm',
      role: 'Apoteker Perawatan Kronis',
      stra: 'STRA: 19890314/STRA-KFN/2018',
      sipa: 'SIPA: 19890314/SIPA_32.73/2020/1009',
      focus: 'Manajemen Terapi Diabetes, Hipertensi & Kardiovaskular',
      experience: '11+ Tahun Pengalaman Rumah Sakit',
    },
    {
      name: 'apt. Nadia Fitriani, S.Farm',
      role: 'Apoteker Pediatri & Herbal',
      stra: 'STRA: 19951120/STRA-KFN/2022',
      sipa: 'SIPA: 19951120/SIPA_32.73/2023/3012',
      focus: 'Dosis Pediatrik Anak, Ibu Hamil & Suplemen Terstandar',
      experience: '6+ Tahun Pelayanan Komunitas',
    },
  ];

  return (
    <section id="apoteker" className="border-b border-slate-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Eyebrow (#3 of allowed 3) */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
            {t('team_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('team_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('team_subtitle')}
          </p>
        </div>

        {/* Asymmetric 1 Lead + 2 Specialists Grid */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Lead Pharmacist Card */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-teal-200 bg-teal-50/40 p-6 shadow-sm sm:p-8 lg:col-span-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-teal-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs">
                  Kepala Tim Farmasi
                </span>
                <span className="font-mono text-xs font-semibold text-teal-800">
                  {leadPharmacist.experience}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-xl font-extrabold text-white shadow-md shadow-teal-700/20">
                  <IconStethoscope className="size-8" stroke={1.75} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {leadPharmacist.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">{leadPharmacist.role}</p>
                </div>
              </div>

              <div className="mt-5 space-y-1 rounded-xl border border-teal-100 bg-white/80 p-3 font-mono text-xs text-slate-600">
                <div>{leadPharmacist.stra}</div>
                <div>{leadPharmacist.sipa}</div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {leadPharmacist.bio}
              </p>
            </div>

            <div className="mt-6 border-t border-teal-200/60 pt-4">
              <a
                href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(leadPharmacist.name)},%20saya%20ingin%20konsultasi%20obat`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98]"
              >
                <IconMessageDots className="size-4" stroke={1.75} />
                <span>Konsultasi Langsung dengan APJ</span>
              </a>
            </div>
          </div>

          {/* 2 Specialists Column */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            {specialists.map((spec) => (
              <div
                key={spec.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{spec.name}</h3>
                      <p className="text-xs font-semibold text-teal-700">{spec.role}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                      {spec.experience}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-slate-500">
                    <IconCertificate className="size-4 text-teal-600" stroke={1.75} />
                    <span>{spec.stra}</span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Bidang Fokus:{' '}
                    <strong className="font-medium text-slate-800">{spec.focus}</strong>
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(spec.name)},%20saya%20ingin%20konsultasi%20obat`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 active:scale-[0.98]"
                  >
                    <IconMessageDots className="size-3.5" stroke={1.75} />
                    <span>Chat {spec.name.split(' ')[1]}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
