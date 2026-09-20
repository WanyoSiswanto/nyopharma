'use client';

import { IconPill } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export const Footer = () => {
  const tRoot = useTranslations('RootLayout');

  return (
    <footer id="kontak" className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1 & 2: Brand & Accreditations */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 font-bold text-slate-950">
                <IconPill className="size-6 text-slate-950" stroke={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl leading-tight font-extrabold tracking-tight text-white">
                  NYO<span className="text-emerald-400">PHARMA</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Apotek Digital Berlisensi Resmi
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400">
              Penyedia layanan farmasi digital dan apotek modern terpercaya yang memprioritaskan
              keselamatan pasien, ketepatan dosis klinis, dan integritas rantai pasok obat 100%
              original.
            </p>

            <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 font-mono text-[11px] text-slate-300">
              <div className="font-bold text-emerald-400">Izin Operasional Apotek:</div>
              <div>SIA: 503/048/SIA/DPMPTSP/2024</div>
              <div>SIPA APJ: 19920815/SIPA_32.73/2021/2004</div>
              <div>Izin Edar Farmasi Kemenkes RI Terverifikasi</div>
            </div>
          </div>

          {/* Col 3: Layanan Farmasi */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Layanan Utama</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <a href="#resep" className="transition hover:text-emerald-400">
                  Tebus Resep Dokter
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition hover:text-emerald-400">
                  Konsultasi Apoteker 24 Jam
                </a>
              </li>
              <li>
                <a href="#katalog" className="transition hover:text-emerald-400">
                  Katalog Obat & Vitamin
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition hover:text-emerald-400">
                  Langganan Obat Rutin & Kronis
                </a>
              </li>
              <li>
                <a href="#keamanan" className="transition hover:text-emerald-400">
                  Standar Distribusi CDOB
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi & Bantuan */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Pusat Bantuan</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/about/" className="transition hover:text-emerald-400">
                  {tRoot('about_link')}
                </Link>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-emerald-400">
                  {tRoot('faq_link')}
                </a>
              </li>
              <li>
                <a href="#keamanan" className="transition hover:text-emerald-400">
                  Jaminan Keaslian BPOM
                </a>
              </li>
              <li>
                <a href="#apoteker" className="transition hover:text-emerald-400">
                  {tRoot('pharmacists_link')}
                </a>
              </li>
              <li>
                <a href="#resep" className="transition hover:text-emerald-400">
                  Kebijakan Privasi Medis
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak & Jam Operasional */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">Kontak Apotek</h3>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="block font-semibold text-slate-300">Jam Operasional:</span>
                <span className="font-bold text-emerald-400">24 Jam Setiap Hari</span>
              </div>

              <div>
                <span className="block font-semibold text-slate-300">Hotline Resep Darurat:</span>
                <span className="font-mono font-bold text-white">0800-1-NYOPHARMA</span>
              </div>

              <div>
                <span className="block font-semibold text-slate-300">WhatsApp Konsultasi:</span>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline"
                >
                  +62 812-3456-7890
                </a>
              </div>

              <div>
                <span className="block font-semibold text-slate-300">Alamat Apotek Fisik:</span>
                <span className="text-slate-400">Jl. Farmasi Medika No. 88, Jakarta Selatan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer & Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-[11px] leading-relaxed text-slate-400">
          <p className="mx-auto max-w-4xl">
            <strong>Disclaimer Medis:</strong> Informasi pada situs ini ditujukan semata-mata untuk
            tujuan edukasi kefarmasian dan pemesanan obat resmi. Penggunaan obat keras golongan G
            wajib didasarkan pada resep dokter yang sah dan disetujui oleh Apoteker Penanggung
            Jawab.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-2 text-slate-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {AppConfig.name}. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-[11px] text-slate-500">
              Sistem Pelayanan Farmasi Digital Berstandar Kemenkes RI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
