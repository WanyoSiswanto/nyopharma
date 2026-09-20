'use client';

import {
  IconFileText,
  IconMenu2,
  IconSearch,
  IconShieldCheck,
  IconShoppingCart,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Link } from '@/libs/I18nNavigation';

type NavbarProps = {
  locale: string;
  onOpenPrescriptionModal?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
};

const handleSearchSubmit = () => {
  const catalogElement = document.querySelector('#catalog');
  if (catalogElement) {
    catalogElement.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Modern, uncluttered healthcare e-commerce header matching user reference.
 * Features a clean logo, wide pill search, vertical action triggers, and category navigation.
 *
 * @param props Component properties for cart, search, categories, and modal actions.
 * @returns JSX element for the clean top navigation header.
 */
export const Navbar = (props: NavbarProps) => {
  const t = useTranslations('Index');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navCategories = [
    {
      id: 'medicines',
      label: t('menu_medicines'),
      target: '#catalog',
      filterCategory: 'prescription',
    },
    {
      id: 'health_products',
      label: t('menu_health_products'),
      target: '#catalog',
      filterCategory: 'vitamins',
    },
    {
      id: 'personal_care',
      label: t('menu_personal_care'),
      target: '#catalog',
      filterCategory: 'otc',
    },
    {
      id: 'baby_care',
      label: t('menu_baby_care'),
      target: '#catalog',
      filterCategory: 'maternal',
    },
    {
      id: 'devices',
      label: t('menu_devices'),
      target: '#catalog',
      filterCategory: 'medical',
    },
    {
      id: 'chronic_care',
      label: t('menu_chronic_care'),
      target: '#catalog',
      filterCategory: 'chronic',
    },
    {
      id: 'health_services',
      label: t('menu_health_services'),
      target: '#services',
      badge: t('menu_new_badge'),
    },
    {
      id: 'offers',
      label: t('menu_offers'),
      target: '#catalog',
      filterCategory: 'all',
    },
  ];

  const handleCategoryClick = (target: string, filterCategory?: string) => {
    if (filterCategory) {
      props.onCategoryChange?.(filterCategory);
    }
    const element = document.querySelector(target);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white shadow-2xs">
      {/* Tier 1: Main Brand Logo, Wide Pill Search, and 3 Vertical Action Triggers */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:gap-8 lg:px-8">
        {/* Brand Logo matching MediCare+ Pharmacy style */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4a2 2 0 0 1 4 0v6h6a2 2 0 1 1 0 4h-6v6a2 2 0 1 1-4 0v-6H4a2 2 0 1 1 0-4h6V4z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Nyo<span className="text-emerald-600">Pharma+</span>
            </span>
            <span className="mt-1 text-[9px] font-extrabold tracking-[0.22em] text-emerald-700 uppercase">
              PHARMACY
            </span>
          </div>
        </Link>

        {/* Center: Wide Pill Search Bar */}
        <div className="mx-4 hidden max-w-2xl flex-1 items-center md:flex">
          <div className="relative flex w-full items-center rounded-full border border-slate-200/90 bg-[#f8faf9] p-1 shadow-2xs transition-all focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-500/15 hover:border-slate-300">
            <input
              type="text"
              value={props.searchQuery ?? ''}
              onChange={(e) => {
                props.onSearchQueryChange?.(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              placeholder={t('header_search_placeholder')}
              className="w-full bg-transparent px-5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSearchSubmit}
              aria-label="Cari Sediaan Obat"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-95"
            >
              <IconSearch className="size-4.5" stroke={2.2} />
            </button>
          </div>
        </div>

        {/* Right Actions: 3 Vertical Action Buttons (Icon Top, Label Bottom) */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Action 1: Upload Prescription */}
          <button
            type="button"
            onClick={props.onOpenPrescriptionModal}
            className="group flex cursor-pointer flex-col items-center justify-center text-center transition hover:opacity-85"
          >
            <div className="flex size-6.5 items-center justify-center text-slate-700 transition-colors group-hover:text-emerald-700">
              <IconFileText className="size-5.5 sm:size-6" stroke={1.75} />
            </div>
            <span className="mt-1 text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t('header_upload_rx')}
            </span>
          </button>

          {/* Action 2: Customer Account & Sign In with Dropdown Menu */}
          <div className="group relative">
            <Link
              href="/customer/orders/"
              className="flex cursor-pointer flex-col items-center justify-center text-center no-underline transition hover:opacity-85"
            >
              <div className="flex size-6.5 items-center justify-center text-slate-700 transition-colors group-hover:text-emerald-700">
                <IconUser className="size-5.5 sm:size-6" stroke={1.75} />
              </div>
              <span className="mt-1 text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-emerald-800">
                {t('header_sign_in_register')}
              </span>
            </Link>

            {/* Quick Access Account Dropdown Popover */}
            <div className="invisible absolute top-full right-0 z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div className="w-56 rounded-2xl border border-emerald-100 bg-white p-2 shadow-xl shadow-slate-900/10">
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Akses Akun Nyopharma
                </div>
                <Link
                  href="/customer/orders/"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <IconUser className="size-4 text-emerald-600" />
                  <span>Akun Pelanggan</span>
                </Link>
                <Link
                  href="/sign-in/"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <IconShieldCheck className="size-4 text-emerald-600" />
                  <span>Portal Apoteker & SIPA</span>
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <LogoutButton
                  locale={props.locale}
                  label="Keluar (Logout)"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                />
              </div>
            </div>
          </div>

          {/* Action 3: Cart with Badge Counter */}
          <button
            type="button"
            onClick={props.onOpenCart}
            className="group relative flex cursor-pointer flex-col items-center justify-center text-center transition hover:opacity-85"
            aria-label="Keranjang Belanja"
          >
            <div className="relative flex size-6.5 items-center justify-center text-slate-700 transition-colors group-hover:text-emerald-700">
              <IconShoppingCart className="size-5.5 sm:size-6" stroke={1.75} />
              <span className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-emerald-600 font-mono text-[9px] font-black text-white shadow-xs">
                {props.cartCount ?? 0}
              </span>
            </div>
            <span className="mt-1 text-[11px] font-semibold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t('header_cart')}
            </span>
          </button>

          {/* Locale Switcher */}
          <div className="hidden border-l border-slate-200 pl-3 xl:block">
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 active:scale-95 md:hidden"
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

      {/* Mobile Search Bar (Visible on mobile screens) */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative flex w-full items-center rounded-full border border-slate-200 bg-[#f8faf9] p-1 shadow-2xs">
          <input
            type="text"
            value={props.searchQuery ?? ''}
            onChange={(e) => {
              props.onSearchQueryChange?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
            placeholder={t('header_search_placeholder')}
            className="w-full bg-transparent px-4 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSearchSubmit}
            aria-label="Cari Sediaan Obat"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs"
          >
            <IconSearch className="size-4" stroke={2.2} />
          </button>
        </div>
      </div>

      {/* Tier 2: Category Navigation Links Bar */}
      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-x-auto px-4 py-2.5 sm:px-6 lg:gap-8 lg:px-8">
          <nav className="flex w-full items-center justify-between gap-6 text-xs font-semibold whitespace-nowrap text-slate-700 sm:text-sm">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  handleCategoryClick(cat.target, cat.filterCategory);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 py-0.5 text-slate-700 transition-colors hover:text-emerald-700"
              >
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="py-0.2 rounded-full bg-blue-600 px-1.5 font-mono text-[9px] font-black text-white">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500">Pengaturan Bahasa</span>
            <LocaleSwitcher />
          </div>

          <nav className="flex flex-col gap-1">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCategoryClick(cat.target, cat.filterCategory);
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-black text-white">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Link
                href="/customer/orders/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800"
              >
                <IconUser className="size-4 text-emerald-700" />
                <span>Akun Pelanggan & Riwayat Pesanan</span>
              </Link>

              <Link
                href="/sign-in/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800"
              >
                <IconShieldCheck className="size-4 text-emerald-700" />
                <span>Portal Apoteker & SIPA</span>
              </Link>

              <div className="flex w-full">
                <LogoutButton
                  locale={props.locale}
                  label="Keluar dari Akun (Logout)"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/60 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  props.onOpenPrescriptionModal?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-800"
              >
                <IconFileText className="size-4" stroke={2} />
                <span>{t('header_upload_rx')}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
