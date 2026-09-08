'use client';

import {
  IconFileText,
  IconMenu2,
  IconMessageDots,
  IconPill,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Link } from '@/libs/I18nNavigation';

type NavbarProps = {
  onOpenPrescriptionModal?: () => void;
};

export const Navbar = (props: NavbarProps) => {
  const t = useTranslations('RootLayout');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 shadow-xs backdrop-blur-md">
      {/* Top emergency and license bar */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-emerald-950 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-medium tracking-wide">
              Layanan Apotek 24 Jam Siaga - Kemasan Tersegel Aman
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[11px] text-teal-100 sm:flex">
            <span>
              Hotline Darurat: <strong className="font-mono text-white">0800-1-NYOPHARMA</strong>
            </span>
            <span>
              Izin Kemenkes RI: <strong className="font-mono text-white">503/048/SIA/2024</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3 no-underline">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white shadow-sm shadow-teal-700/25">
            <IconPill className="size-6" stroke={1.75} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl leading-none font-black tracking-tight text-slate-900">
              NYO<span className="text-teal-600">PHARMA</span>
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Apotek Digital Berlisensi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Clean, Proportional & Centered) */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label={t('home_link')}>
          <a
            href="#layanan"
            className="text-sm font-medium whitespace-nowrap text-slate-600 transition hover:text-teal-700"
          >
            {t('services_link')}
          </a>
          <a
            href="#katalog"
            className="text-sm font-medium whitespace-nowrap text-slate-600 transition hover:text-teal-700"
          >
            {t('products_link')}
          </a>
          <a
            href="#keamanan"
            className="text-sm font-medium whitespace-nowrap text-slate-600 transition hover:text-teal-700"
          >
            {t('safety_link')}
          </a>
          <a
            href="#apoteker"
            className="text-sm font-medium whitespace-nowrap text-slate-600 transition hover:text-teal-700"
          >
            {t('pharmacists_link')}
          </a>
          <a
            href="#faq"
            className="text-sm font-medium whitespace-nowrap text-slate-600 transition hover:text-teal-700"
          >
            {t('faq_link')}
          </a>
        </nav>

        {/* Desktop Right Actions (Structured & Balanced) */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LocaleSwitcher />

          <div className="h-5 w-px shrink-0 bg-slate-200" aria-hidden="true" />

          <Link
            href="/sign-in/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-700 transition hover:bg-slate-100 hover:text-teal-700"
          >
            <IconUser className="size-4 text-slate-500" stroke={1.75} />
            <span>{t('sign_in_link')}</span>
          </Link>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-teal-200/90 bg-teal-50/70 px-3.5 py-2 text-xs font-bold whitespace-nowrap text-teal-800 transition hover:bg-teal-100 active:scale-[0.98]"
          >
            <IconMessageDots className="size-4 text-teal-700" stroke={1.75} />
            <span>{t('cta_chat_pharmacist')}</span>
          </a>

          <button
            type="button"
            onClick={props.onOpenPrescriptionModal}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold whitespace-nowrap text-white shadow-sm shadow-teal-700/25 transition hover:bg-teal-800 active:scale-[0.98]"
          >
            <IconFileText className="size-4" stroke={1.75} />
            <span>{t('cta_upload_rx')}</span>
          </button>
        </div>

        {/* Mobile / Tablet Bar Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={props.onOpenPrescriptionModal}
            className="hidden items-center gap-1 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs sm:inline-flex"
          >
            <IconFileText className="size-3.5" stroke={1.75} />
            <span>{t('cta_upload_rx')}</span>
          </button>

          <LocaleSwitcher />

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <IconX className="size-5" stroke={1.75} />
            ) : (
              <IconMenu2 className="size-5" stroke={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1.5">
            <a
              href="#layanan"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('services_link')}
            </a>
            <a
              href="#resep"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('prescription_link')}
            </a>
            <a
              href="#katalog"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('products_link')}
            </a>
            <a
              href="#keamanan"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('safety_link')}
            </a>
            <a
              href="#apoteker"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('pharmacists_link')}
            </a>
            <a
              href="#faq"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('faq_link')}
            </a>
            <a
              href="#kontak"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('contact_link')}
            </a>

            <div className="my-2 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between px-2 pb-3">
                <Link
                  href="/sign-in/"
                  className="text-xs font-bold text-slate-700 hover:text-teal-700"
                >
                  {t('sign_in_link')}
                </Link>
                <Link
                  href="/sign-up/"
                  className="text-xs font-bold text-teal-700 hover:text-teal-800"
                >
                  {t('sign_up_link')}
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    props.onOpenPrescriptionModal?.();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-sm font-bold text-white shadow-sm hover:bg-teal-800 active:scale-[0.98]"
                >
                  <IconFileText className="size-4" stroke={1.75} />
                  <span>{t('cta_upload_rx')}</span>
                </button>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50/80 py-3 text-sm font-bold text-teal-800 active:scale-[0.98]"
                >
                  <IconMessageDots className="size-4 text-teal-700" stroke={1.75} />
                  <span>{t('cta_chat_pharmacist')}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
