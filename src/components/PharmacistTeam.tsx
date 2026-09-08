'use client';

import { useTranslations } from 'next-intl';

export const PharmacistTeam = () => {
  const t = useTranslations('Index');

  const pharmacists = [
    {
      name: 'apt. Sarah Ramadhani, S.Farm',
      role: 'Apoteker Penanggung Jawab (APJ)',
      stra: 'STRA: 19920815/STRA-KFN/2020',
      sipa: 'SIPA: 19920815/SIPA_32.73/2021/2004',
      focus: 'Farmakologi Klinis & Skrining Interaksi Obat Resep',
      experience: '9+ Tahun Pengalaman Klinis',
      avatarBg: 'bg-teal-100 text-teal-800',
    },
    {
      name: 'apt. Dimas Prasetyo, M.Clin.Pharm',
      role: 'Apoteker Spesialis Perawatan Kronis',
      stra: 'STRA: 19890314/STRA-KFN/2018',
      sipa: 'SIPA: 19890314/SIPA_32.73/2020/1009',
      focus: 'Manajemen Terapi Diabetes, Hipertensi & Kardiovaskular',
      experience: '11+ Tahun Pengalaman Rumah Sakit & Komunitas',
      avatarBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      name: 'apt. Nadia Fitriani, S.Farm',
      role: 'Apoteker Konsultan Pediatri & Herbal',
      stra: 'STRA: 19951120/STRA-KFN/2022',
      sipa: 'SIPA: 19951120/SIPA_32.73/2023/3012',
      focus: 'Dosis Pediatrik Anak, Ibu Hamil & Suplemen Herbal Terstandar',
      experience: '6+ Tahun Pengalaman Pelayanan Farmasi',
      avatarBg: 'bg-sky-100 text-sky-800',
    },
  ];

  return (
    <section id="apoteker" className="border-b border-slate-100 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacists.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs transition hover:border-teal-300 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${item.avatarBg} text-lg font-extrabold shadow-xs`}
                  >
                    {item.name.split(' ')[1]?.[0] ?? 'A'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs font-semibold text-teal-700">{item.role}</p>
                    <span className="text-[10px] font-medium text-slate-500">
                      {item.experience}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 border-t border-slate-200/60 pt-3">
                  <div className="font-mono text-[11px] text-slate-500">{item.stra}</div>
                  <div className="font-mono text-[11px] text-slate-500">{item.sipa}</div>
                  <p className="mt-2 text-xs leading-relaxed font-medium text-slate-600">
                    Fokus: {item.focus}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200/60 pt-4">
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(item.name)},%20saya%20ingin%20konsultasi%20mengenai%20obat`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-xs font-bold text-teal-800 transition hover:border-teal-600 hover:bg-teal-600 hover:text-white"
                >
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Konsultasi dengan {item.name.split(' ')[1]}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
