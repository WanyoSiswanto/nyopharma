'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const FaqSection = () => {
  const t = useTranslations('Index');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara menebus resep dokter di Nyopharma?',
      a: 'Anda cukup mengambil foto resep dokter yang jelas melalui tombol "Tebus Resep" di situs ini atau kirimkan via WhatsApp resmi kami. Apoteker jaga kami akan memeriksa keabsahan resep, kesesuaian dosis, dan segera memberikan konfirmasi rincian harga obat resmi dalam 5-10 menit.',
    },
    {
      q: 'Apakah semua obat yang dijual dijamin 100% asli dan berizin BPOM?',
      a: 'Ya, seluruh produk obat keras, obat bebas terbatas, suplemen, dan alat kesehatan di Nyopharma bersumber langsung dari Pedagang Besar Farmasi (PBF) resmi terdaftar. Setiap kemasan memiliki nomor izin edar BPOM/Kemenkes yang dapat diverifikasi keasliannya.',
    },
    {
      q: 'Berapa lama estimasi pengiriman obat sampai ke alamat saya?',
      a: 'Untuk area jangkauan pengiriman instan/ekspres, obat dapat sampai dalam 45-60 menit setelah verifikasi resep dan pembayaran selesai. Untuk pengiriman reguler, obat dikirim pada hari yang sama dengan kurir khusus farmasi bersegel pengaman.',
    },
    {
      q: 'Bagaimana standar pengemasan obat untuk menjaga stabilitas zat aktif?',
      a: 'Kami menerapkan standar Cara Distribusi Obat yang Baik (CDOB). Obat-obatan sensitif suhu (seperti insulin atau suppositoria) dikemas dengan insulated box dan ice gel khusus. Seluruh paket obat disegel rapat dan rapi tanpa menampilkan daftar obat di luar demi menjaga kerahasiaan privasi medis Anda.',
    },
    {
      q: 'Apakah saya bisa berkonsultasi mengenai aturan pakai dan efek samping obat?',
      a: 'Tentu. Tim Apoteker ber-STRA kami siap memberikan edukasi farmakoterapi gratis 24 jam mengenai dosis, jadwal minum obat, interaksi antar obat, serta penanganan efek samping ringan.',
    },
    {
      q: 'Metode pembayaran apa saja yang diterima?',
      a: 'Kami menerima pembayaran melalui QRIS, Transfer Bank Virtual Account (BCA, Mandiri, BNI, BRI, Permata), Kartu Debit/Kredit, serta dompet digital (GoPay, OVO, ShopeePay).',
    },
  ];

  return (
    <section id="faq" className="border-b border-slate-100 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
            {t('faq_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('faq_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="mt-12 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/40 transition"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenIdx(isOpen ? null : idx);
                  }}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50"
                >
                  <span className="pr-4 text-sm font-bold text-slate-900 sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-100/70 text-teal-800 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pt-1 pb-5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
