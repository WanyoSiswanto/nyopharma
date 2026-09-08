'use client';

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
    <header className="sticky top-0 z-50 w-full border-b border-teal-100/70 bg-white/90 shadow-xs backdrop-blur-md">
      {/* Top emergency & trust bar */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-900 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-medium">Layanan Apotek 24 Jam • Respons Cepat & Tersegel</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>
              Hotline Darurat: <strong>0800-1-NYOPHARMA</strong>
            </span>
            <span>•</span>
            <span>
              Izin Kemenkes RI: <strong>503/048/SIA/2024</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white shadow-md shadow-teal-700/20">
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v16m-8-8h16" />
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              NYO<span className="text-teal-600">PHARMA</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Apotek & Farmasi Digital
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label={t('home_link')}>
          <a
            href="#layanan"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('services_link')}
          </a>
          <a
            href="#resep"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('prescription_link')}
          </a>
          <a
            href="#katalog"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('products_link')}
          </a>
          <a
            href="#keamanan"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('safety_link')}
          </a>
          <a
            href="#apoteker"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('pharmacists_link')}
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('faq_link')}
          </a>
          <a
            href="#kontak"
            className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
          >
            {t('contact_link')}
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/sign-in/"
            className="text-xs font-semibold text-slate-700 hover:text-teal-700"
          >
            {t('sign_in_link')}
          </Link>
          <Link
            href="/sign-up/"
            className="text-xs font-semibold text-slate-700 hover:text-teal-700"
          >
            {t('sign_up_link')}
          </Link>

          <LocaleSwitcher />

          <a
            href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/70 px-3.5 py-2 text-xs font-semibold text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
          >
            <svg
              className="size-4 text-teal-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {t('cta_chat_pharmacist')}
          </a>

          <button
            type="button"
            onClick={props.onOpenPrescriptionModal}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-teal-600/30 transition hover:-translate-y-0.5 hover:bg-teal-700 active:translate-y-0"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            {t('cta_upload_rx')}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
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
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            <a
              href="#layanan"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('services_link')}
            </a>
            <a
              href="#resep"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('prescription_link')}
            </a>
            <a
              href="#katalog"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('products_link')}
            </a>
            <a
              href="#keamanan"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('safety_link')}
            </a>
            <a
              href="#apoteker"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('pharmacists_link')}
            </a>
            <a
              href="#faq"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('faq_link')}
            </a>

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  props.onOpenPrescriptionModal?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                {t('cta_upload_rx')}
              </button>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 py-2.5 text-sm font-semibold text-teal-800"
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
                {t('cta_chat_pharmacist')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
