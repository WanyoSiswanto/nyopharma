'use client';

import { useTranslations } from 'next-intl';
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
    // Simulate real upload & pharmacist queue verification
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

  const content = (
    <div className="relative rounded-2xl border border-teal-100 bg-white p-6 shadow-xl sm:p-8">
      {props.isModal && (
        <button
          type="button"
          onClick={props.onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close modal"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {isSuccess ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              className="size-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">{t('rx_success_title')}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{t('rx_success_desc')}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl bg-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-700"
            >
              {t('rx_btn_close')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700">
              Layanan Resep Dokter
            </span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-900">{t('rx_modal_title')}</h3>
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

          {/* Patient WhatsApp/Phone */}
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

          {/* File Upload Dropzone */}
          <div>
            <span className="mb-1.5 block text-xs font-bold text-slate-700">
              Foto / Berkas Resep <span className="text-rose-500">*</span>
            </span>
            <label
              htmlFor="prescription-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/40 p-5 text-center transition hover:border-teal-400 hover:bg-teal-50"
            >
              <svg
                className="size-8 text-teal-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="mt-2 text-xs font-semibold text-teal-800">
                {selectedFile ? `File dipilih: ${selectedFile.name}` : t('rx_upload_dropzone')}
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

          {/* Special Notes / Allergy */}
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
              placeholder="Contoh: Alergi antibiotik golongan penisilin, mohon sediaan sirup..."
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-hidden"
            />
          </div>

          {/* Privacy Reassurance */}
          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-500">
            <svg
              className="size-4 shrink-0 text-teal-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t('rx_privacy_notice')}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="size-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Mengirim Resep ke Apoteker...</span>
              </>
            ) : (
              <>
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2 11 13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-lg">{content}</div>
      </div>
    );
  }

  return (
    <section id="resep" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
              Tebus Resep Dokter Instan
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Cukup Foto Resep, Obat Sampai di Rumah Anda
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Tidak perlu antre di apotek fisik saat sakit atau lelah. Unggah foto resep dokter
              Anda, tim Apoteker Nyopharma segera melakukan verifikasi dosis, pengecekan riwayat
              alergi, dan menyiapkan obat berkualitas dalam kemasan segel khusus.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                  1
                </div>
                <span className="text-xs font-medium text-slate-700 sm:text-sm">
                  Unggah foto resep yang jelas dan terbaca.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                  2
                </div>
                <span className="text-xs font-medium text-slate-700 sm:text-sm">
                  Apoteker memverifikasi dan memberikan rincian harga resmi via WhatsApp.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                  3
                </div>
                <span className="text-xs font-medium text-slate-700 sm:text-sm">
                  Obat dikirim dengan kurir higienis bersegel pengaman.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">{content}</div>
        </div>
      </div>
    </section>
  );
};
