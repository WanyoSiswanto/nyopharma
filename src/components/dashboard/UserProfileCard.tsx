'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function UserProfileCard(_props: { locale: string }) {
  const t = useTranslations('UserProfile');
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopySipa = () => {
    void navigator.clipboard.writeText('19920814/SIPA_31.71/2021/2048');
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-center gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-600 text-3xl font-black text-white shadow-xl shadow-emerald-900/20">
            SR
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {t('sipa_verified')}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              apt. Sarah Ramadhani, S.Farm.
            </h1>
            <p className="text-sm font-semibold text-emerald-700">
              Kepala Apoteker & Apoteker Penanggung Jawab (APJ)
            </p>
            <p className="text-xs text-slate-500">No. STRA: 19920814/STRA-ITB/2016/228149</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Data Perizinan & Regulasi
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Nomor SIPA:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800">
                    19920814/SIPA_31.71/2021/2048
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySipa}
                    className="text-[11px] font-semibold text-emerald-700 underline hover:text-emerald-800"
                  >
                    {copyStatus ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Masa Berlaku:</span>
                <span className="font-semibold text-slate-800">14 Agustus 2029</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Organisasi Profesi:</span>
                <span className="font-semibold text-slate-800">
                  Ikatan Apoteker Indonesia (IAI) Jakarta
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Kepatuhan CDOB:</span>
                <span className="font-bold text-emerald-700">Tersertifikasi Kelas A</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Jadwal Praktik & Penugasan
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Hari Praktik:</span>
                <span className="font-semibold text-slate-800">Senin - Jumat</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Jam Layanan:</span>
                <span className="font-semibold text-slate-800">08.00 - 16.00 WIB</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 py-1">
                <span className="text-slate-500">Lokasi Apotek:</span>
                <span className="font-semibold text-slate-800">
                  Nyopharma Cabang Pusat (Jl. Kesehatan No. 42)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status Dinas:</span>
                <span className="font-bold text-emerald-600">🟢 Aktif Bertugas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500">
          <p>{t('certifications')}</p>
          <div className="flex gap-2">
            <span className="rounded bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              CDOB Certified
            </span>
            <span className="rounded bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
              IAI Registered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
