'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const FaqSection = () => {
  const t = useTranslations('Index');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara menebus resep dokter di Nyopharma?',
      a: 'Cukup foto resep dokter yang jelas melalui tombol "Tebus Resep" atau kirimkan via WhatsApp resmi kami. Apoteker jaga akan memeriksa keabsahan resep, dosis, dan memberikan konfirmasi rincian harga resmi dalam 5-10 menit.',
    },
    {
      q: 'Apakah semua obat yang dijual dijamin 100% asli dan berizin BPOM?',
      a: 'Seluruh produk obat keras, obat bebas terbatas, suplemen, dan alat kesehatan di Nyopharma bersumber langsung dari Pedagang Besar Farmasi (PBF) resmi terdaftar dengan nomor izin edar BPOM/Kemenkes yang dapat diverifikasi.',
    },
    {
      q: 'Berapa lama estimasi pengiriman obat sampai ke alamat saya?',
      a: 'Untuk area jangkauan pengiriman instan, obat sampai dalam 45-60 menit setelah verifikasi resep dan pembayaran selesai. Pengiriman reguler diproses pada hari yang sama dengan kurir khusus farmasi bersegel pengaman.',
    },
    {
      q: 'Bagaimana standar pengemasan obat untuk menjaga stabilitas zat aktif?',
      a: 'Kami menerapkan standar Cara Distribusi Obat yang Baik (CDOB). Obat sensitif suhu (seperti insulin) dikemas dengan insulated box dan ice gel khusus. Paket obat disegel rapat tanpa menampilkan daftar obat di luar demi menjaga kerahasiaan privasi Anda.',
    },
    {
      q: 'Apakah saya bisa berkonsultasi mengenai aturan pakai dan efek samping obat?',
      a: 'Tentu. Tim Apoteker ber-STRA kami siap memberikan edukasi farmakoterapi gratis mengenai dosis, jadwal minum obat, interaksi antar obat, serta penanganan efek samping ringan.',
    },
    {
      q: 'Metode pembayaran apa saja yang diterima?',
      a: 'Kami menerima pembayaran melalui QRIS, Transfer Bank Virtual Account, Kartu Debit/Kredit, serta dompet digital terpopuler.',
    },
  ];

  return (
    <section id="faq" className="border-b border-slate-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('faq_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="mt-12 space-y-3">
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
                  className="flex w-full items-center justify-between p-4 text-left transition hover:bg-slate-50 active:scale-[0.99] sm:p-5"
                >
                  <span className="pr-4 text-sm font-bold text-slate-900 sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-800 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <IconChevronDown className="size-4" stroke={2} />
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
