'use client';

import { IconFileText, IconMenu2, IconMessageDots, IconPill, IconX } from '@tabler/icons-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-teal-100/80 bg-white/95 shadow-xs backdrop-blur-md">
      {/* Top emergency & license bar */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-900 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-medium">Layanan Apotek 24 Jam Siaga - Kemasan Tersegel</span>
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

      {/* Main navigation container */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white shadow-sm shadow-teal-700/20">
            <IconPill className="size-6" stroke={1.75} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl leading-tight font-extrabold tracking-tight text-slate-900">
              NYO<span className="text-teal-600">PHARMA</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Apotek Digital Berlisensi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label={t('home_link')}>
          <a
            href="#layanan"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('services_link')}
          </a>
          <a
            href="#resep"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('prescription_link')}
          </a>
          <a
            href="#katalog"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('products_link')}
          </a>
          <a
            href="#keamanan"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('safety_link')}
          </a>
          <a
            href="#apoteker"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('pharmacists_link')}
          </a>
          <a
            href="#faq"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('faq_link')}
          </a>
          <a
            href="#kontak"
            className="text-xs font-semibold text-slate-700 transition hover:text-teal-700"
          >
            {t('contact_link')}
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/sign-in/"
            className="text-xs font-semibold text-slate-600 transition hover:text-teal-700"
          >
            {t('sign_in_link')}
          </Link>
          <Link
            href="/sign-up/"
            className="text-xs font-semibold text-slate-600 transition hover:text-teal-700"
          >
            {t('sign_up_link')}
          </Link>

          <LocaleSwitcher />

          <a
            href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/80 px-3 py-2 text-xs font-bold text-teal-800 transition hover:bg-teal-100 active:scale-[0.98]"
          >
            <IconMessageDots className="size-4 text-teal-700" stroke={1.75} />
            <span>{t('cta_chat_pharmacist')}</span>
          </a>

          <button
            type="button"
            onClick={props.onOpenPrescriptionModal}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs shadow-teal-600/30 transition hover:bg-teal-700 active:scale-[0.98]"
          >
            <IconFileText className="size-4" stroke={1.75} />
            <span>{t('cta_upload_rx')}</span>
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
            className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98]"
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

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
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
            <a
              href="#kontak"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
            >
              {t('contact_link')}
            </a>

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  props.onOpenPrescriptionModal?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700 active:scale-[0.98]"
              >
                <IconFileText className="size-4" stroke={1.75} />
                <span>{t('cta_upload_rx')}</span>
              </button>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20konsultasi%20obat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 py-2.5 text-sm font-semibold text-teal-800 active:scale-[0.98]"
              >
                <IconMessageDots className="size-4" stroke={1.75} />
                <span>{t('cta_chat_pharmacist')}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
