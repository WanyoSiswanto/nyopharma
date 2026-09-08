'use client';

import {
  IconCheck,
  IconClock,
  IconLock,
  IconSend,
  IconShieldCheck,
  IconUpload,
  IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

type PrescriptionUploadProps = {
  isModal?: boolean;
  onClose?: () => void;
};

export const PrescriptionUploadCard = (props: PrescriptionUploadProps) => {
  const t = useTranslations('Index');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setPatientName('');
    setPatientPhone('');
    setPatientNotes('');
    setSelectedFile(null);
    setIsSuccess(false);
    if (props.isModal && props.onClose) {
      props.onClose();
    }
  };

  const formContent = (
    <div className="relative rounded-2xl border border-teal-100 bg-white p-6 shadow-xl sm:p-8">
      {props.isModal && (
        <button
          type="button"
          onClick={props.onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-[0.98]"
          aria-label="Close modal"
        >
          <IconX className="size-5" stroke={1.75} />
        </button>
      )}

      {isSuccess ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <IconCheck className="size-8" stroke={2.5} />
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">{t('rx_success_title')}</h3>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
            {t('rx_success_desc')}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl bg-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 active:scale-[0.98]"
            >
              {t('rx_btn_close')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-extrabold text-slate-900">{t('rx_modal_title')}</h3>
            <p className="mt-1 text-xs text-slate-500">{t('rx_modal_subtitle')}</p>
          </div>

          {/* Patient Name */}
          <div>
            <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700">
              {t('rx_input_name')} <span className="text-rose-500">*</span>
            </label>
            <input
              id="patient-name"
              type="text"
              required
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
              }}
              placeholder="cth: Bpk. Hendra Gunawan"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden"
            />
          </div>

          {/* Patient Phone */}
          <div>
            <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700">
              {t('rx_input_phone')} <span className="text-rose-500">*</span>
            </label>
            <input
              id="patient-phone"
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => {
                setPatientPhone(e.target.value);
              }}
              placeholder="cth: 081234567890"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden"
            />
          </div>

          {/* Upload Dropzone */}
          <div>
            <span className="mb-1.5 block text-xs font-bold text-slate-700">
              Foto / Berkas Resep Dokter <span className="text-rose-500">*</span>
            </span>
            <label
              htmlFor="prescription-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/40 p-5 text-center transition hover:border-teal-400 hover:bg-teal-50 active:scale-[0.99]"
            >
              <IconUpload className="size-8 text-teal-600" stroke={1.5} />
              <span className="mt-2 text-xs font-semibold text-teal-900">
                {selectedFile ? `File: ${selectedFile.name}` : t('rx_upload_dropzone')}
              </span>
              <span className="mt-1 text-[10px] text-slate-400">
                Format: JPG, PNG, PDF (Maksimal 10 MB)
              </span>
              <input
                id="prescription-file"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="patient-notes" className="block text-xs font-bold text-slate-700">
              {t('rx_input_notes')}
            </label>
            <textarea
              id="patient-notes"
              rows={2}
              value={patientNotes}
              onChange={(e) => {
                setPatientNotes(e.target.value);
              }}
              placeholder="Alergi obat atau permintaan sediaan khusus (opsional)"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden"
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600">
            <IconLock className="size-4 shrink-0 text-teal-700" stroke={1.75} />
            <span>{t('rx_privacy_notice')}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Mengunggah Resep ke Apoteker...</span>
            ) : (
              <>
                <IconSend className="size-4" stroke={1.75} />
                <span>{t('rx_btn_submit')}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );

  if (props.isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-lg">{formContent}</div>
      </div>
    );
  }

  return (
    <section id="resep" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Asymmetric info with real lab photograph */}
          <div className="space-y-6 lg:col-span-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Cukup Foto Resep, Obat Sampai di Rumah Anda
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Tidak perlu antre di apotek saat lelah atau sedang pemulihan. Tim Apoteker Nyopharma
                segera melakukan verifikasi dosis, memeriksa interaksi obat, dan mengemas obat
                bersegel khusus.
              </p>
            </div>

            {/* Real Clinical Inspection Photography */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-md">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src="/assets/images/rx-dispensary.jpg"
                  alt="Inspeksi Farmasi Nyopharma"
                  width={600}
                  height={450}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <IconShieldCheck className="size-4 text-emerald-400" stroke={2} />
                    <span>Skrining Resep Ganda & Sterilitas Terjaga</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-teal-200">
                    <IconClock className="size-3.5" stroke={2} /> 5-10 Menit
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">{formContent}</div>
        </div>
      </div>
    </section>
  );
};
