'use client';

import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheck,
  IconDoorExit,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconShieldCheck,
  IconStethoscope,
  IconUser,
  IconUserCheck,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { clearAdminSessionCookie, setAdminSessionCookie } from '@/utils/AuthActions';

type RoleType = 'customer' | 'pharmacist';

type DemoAccount = {
  id: string;
  roleType: RoleType;
  email: string;
  name: string;
  roleLabel: string;
  metaInfo: string;
  avatarBg: string;
  password: string;
  targetUrl: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  // Patient / Customer Profiles
  {
    id: 'cust-budi',
    roleType: 'customer',
    name: 'Bpk. Ir. Budi Santoso',
    email: 'budi.santoso@gmail.com',
    roleLabel: 'Pasien Terverifikasi (Gold Member)',
    metaInfo: 'Terapi Hipertensi & Diabetes Rutin • 1.250 Poin',
    avatarBg: 'bg-emerald-700 text-white',
    password: 'pasien123',
    targetUrl: '/customer/orders/',
  },
  {
    id: 'cust-ratna',
    roleType: 'customer',
    name: 'Ibu Ratna Wardani',
    email: 'ratna.wardani@yahoo.co.id',
    roleLabel: 'Pasien Terverifikasi (Sehat Plus)',
    metaInfo: 'Pembelian Suplemen & Multivitamin • 840 Poin',
    avatarBg: 'bg-teal-700 text-white',
    password: 'pasien123',
    targetUrl: '/customer/orders/',
  },

  // Pharmacist & Staff Profiles
  {
    id: 'apj',
    roleType: 'pharmacist',
    name: 'apt. Sarah Ramadhani, S.Farm.',
    email: 'admin@nyopharma.com',
    roleLabel: 'Kepala Apoteker & APJ',
    metaInfo: 'SIPA: 19920814/SIPA_31.71/2021/2048',
    avatarBg: 'bg-emerald-800 text-white',
    password: 'admin123',
    targetUrl: '/dashboard',
  },
  {
    id: 'clinical',
    roleType: 'pharmacist',
    name: 'apt. Dimas Prasetyo, M.Clin.Pharm.',
    email: 'apoteker@nyopharma.com',
    roleLabel: 'Apoteker Pelayanan & Klinis',
    metaInfo: 'SIPA: 19950322/SIPA_31.73/2022/3102',
    avatarBg: 'bg-emerald-900 text-white',
    password: 'apotek123',
    targetUrl: '/dashboard',
  },
];

type ActiveUserSession = {
  name: string;
  email: string;
  role: string;
  roleType: RoleType;
  targetUrl: string;
};

function parseStoredUser(
  raw: string | null,
): { name?: string; email?: string; role?: string } | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'name' in parsed &&
      typeof parsed.name === 'string'
    ) {
      const email =
        'email' in parsed && typeof parsed.email === 'string' ? parsed.email : undefined;
      const role = 'role' in parsed && typeof parsed.role === 'string' ? parsed.role : undefined;
      return {
        name: parsed.name,
        email,
        role,
      };
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

function getActiveSessionFromStorage(locale: string): ActiveUserSession | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const cust = parseStoredUser(localStorage.getItem('nyo_customer_user'));
  if (cust?.name && cust.email) {
    return {
      name: cust.name,
      email: cust.email,
      role: 'Pasien / Pelanggan',
      roleType: 'customer',
      targetUrl: `/${locale}/customer/orders/`,
    };
  }
  const admin = parseStoredUser(localStorage.getItem('nyo_admin_user'));
  if (admin?.name && admin.email) {
    return {
      name: admin.name,
      email: admin.email,
      role: admin.role ?? 'Apoteker Penanggung Jawab',
      roleType: 'pharmacist',
      targetUrl: `/${locale}/dashboard`,
    };
  }
  return null;
}

/**
 * Unified Medical Authentication Portal for Nyopharma Patients and Pharmacists.
 *
 * @param props Component properties containing the active locale.
 * @returns JSX element representing the login and session management interface.
 */
export function AdminSignInForm(props: { locale: string }) {
  const t = useTranslations('SignIn');
  const router = useRouter();

  const [activeRole, setActiveRole] = useState<RoleType>('customer');
  const [email, setEmail] = useState('budi.santoso@gmail.com');
  const [password, setPassword] = useState('pasien123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeSession, setActiveSession] = useState<ActiveUserSession | null>(() =>
    getActiveSessionFromStorage(props.locale),
  );
  const [showLogoutToast, setShowLogoutToast] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('logged_out=1');
    }
    return false;
  });
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Auto-dismiss logout toast after delay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (showLogoutToast) {
      timer = setTimeout(() => {
        setShowLogoutToast(false);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showLogoutToast]);

  // Handle role switch tab
  const handleRoleTabChange = (newRole: RoleType) => {
    setActiveRole(newRole);
    setErrorMessage('');
    if (newRole === 'customer') {
      setEmail('budi.santoso@gmail.com');
      setPassword('pasien123');
    } else {
      setEmail('admin@nyopharma.com');
      setPassword('admin123');
    }
  };

  // Execute authenticated sign in
  const executeLogin = async (account: DemoAccount) => {
    setIsLoading(true);
    setErrorMessage('');

    // Set authentication session cookie via server action for route protection
    await setAdminSessionCookie(rememberMe);

    // Save session in localStorage
    try {
      if (account.roleType === 'customer') {
        localStorage.setItem(
          'nyo_customer_user',
          JSON.stringify({
            name: account.name,
            email: account.email,
            role: account.roleLabel,
            loginAt: new Date().toISOString(),
          }),
        );
        localStorage.removeItem('nyo_admin_user');
      } else {
        localStorage.setItem(
          'nyo_admin_user',
          JSON.stringify({
            name: account.name,
            email: account.email,
            role: account.roleLabel,
            loginAt: new Date().toISOString(),
          }),
        );
        localStorage.removeItem('nyo_customer_user');
      }
    } catch {
      // Ignore storage errors in private browsing
    }

    setTimeout(() => {
      const destination =
        account.targetUrl.startsWith('/') && !account.targetUrl.startsWith(`/${props.locale}`)
          ? `/${props.locale}${account.targetUrl}`
          : account.targetUrl;
      router.push(destination);
      router.refresh();
    }, 400);
  };

  // Explicit sign out / logout handler
  const handleSignOutSession = async () => {
    setIsLoading(true);
    await clearAdminSessionCookie();
    try {
      localStorage.removeItem('nyo_admin_user');
      localStorage.removeItem('nyo_customer_user');
      localStorage.removeItem('nyo_active_role');
    } catch {
      // Ignore storage errors
    }
    setActiveSession(null);
    setShowLogoutToast(true);
    setIsLoading(false);
    setTimeout(() => {
      setShowLogoutToast(false);
    }, 4500);
  };

  // Submit manual form
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const matchedAccount = DEMO_ACCOUNTS.find(
      (acc) =>
        acc.roleType === activeRole &&
        acc.email.toLowerCase() === email.trim().toLowerCase() &&
        acc.password === password,
    );

    if (matchedAccount) {
      void executeLogin(matchedAccount);
    } else {
      // Fallback matching for customer demo
      if (activeRole === 'customer' && email.includes('@')) {
        const [fallbackCust] = DEMO_ACCOUNTS;
        if (fallbackCust) {
          void executeLogin(fallbackCust);
          return;
        }
      }
      setErrorMessage(t('error_credentials'));
    }
  };

  const visibleAccounts = DEMO_ACCOUNTS.filter((acc) => acc.roleType === activeRole);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6 sm:py-10">
      {/* Top Breadcrumb & Home Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-bold text-slate-600 transition-colors hover:text-emerald-800"
        >
          <div className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-2xs transition group-hover:border-emerald-300 group-hover:bg-emerald-50">
            <IconArrowLeft className="size-4 text-slate-600 transition group-hover:text-emerald-700" />
          </div>
          <span>{t('back_to_home')}</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 shadow-2xs">
          <IconShieldCheck className="size-3.5 text-emerald-600" />
          <span>SSL 256-Bit</span>
        </span>
      </div>

      {/* Logout Success Toast Alert */}
      {showLogoutToast && (
        <div className="animate-fade-in mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 shadow-sm">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <IconCheck className="size-4" stroke={3} />
          </div>
          <div>
            <p className="font-bold text-emerald-950">Berhasil Keluar (Signed Out)</p>
            <p className="mt-0.5 text-emerald-800">{t('logged_out_toast')}</p>
          </div>
        </div>
      )}

      {/* Active Session Warning & Switcher Banner */}
      {activeSession && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200/90 bg-linear-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/80 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
                <IconUserCheck className="size-5" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-900 uppercase">
                  {t('active_session_badge')}
                </span>
                <p className="text-sm font-black text-slate-900">{activeSession.name}</p>
                <p className="text-xs text-emerald-800">{activeSession.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <Link
                href={activeSession.targetUrl}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-800"
              >
                <span>{t('btn_continue_session')}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  void handleSignOutSession();
                }}
                className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-700 shadow-2xs transition hover:bg-rose-50"
                title="Keluar dari sesi ini"
              >
                <IconDoorExit className="size-4" stroke={2} />
                <span>{t('btn_sign_out')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Authentication Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-9">
        {/* Medical Brand Header */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-3.5 py-1 text-xs font-bold tracking-wide text-emerald-800 uppercase">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            {t('badge')}
          </div>

          <div className="mb-2 flex items-center justify-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 text-xl font-black text-white shadow-md shadow-emerald-900/20">
              +
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              NyoPharma<span className="text-emerald-600">+</span>
            </span>
          </div>

          <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
            {t('subtitle')}
          </p>
        </div>

        {/* Dual-Role Selector Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              handleRoleTabChange('customer');
            }}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
              activeRole === 'customer'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <IconUser className="size-4" stroke={2} />
            <span>{t('tab_customer')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleRoleTabChange('pharmacist');
            }}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
              activeRole === 'pharmacist'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <IconStethoscope className="size-4" stroke={2} />
            <span>{t('tab_pharmacist')}</span>
          </button>
        </div>

        {/* 1-Click Quick Demo Accounts */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-[#f4f9f6] p-4.5">
          <div className="mb-3 flex items-start gap-2.5">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-xs font-bold text-white shadow-xs">
              ⚡
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 sm:text-sm">{t('demo_title')}</h2>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                {t('demo_subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {visibleAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                aria-label={`Gunakan akun demo ${account.name}`}
                onClick={() => {
                  void executeLogin(account);
                }}
                disabled={isLoading}
                className="group flex cursor-pointer flex-col justify-between rounded-xl border border-emerald-200/80 bg-white p-3 text-left shadow-2xs transition-all hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-xs active:scale-[0.98] disabled:opacity-50"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs ${account.avatarBg}`}
                    >
                      {account.name
                        .split(' ')
                        .filter(
                          (w) =>
                            !w.startsWith('Bpk') && !w.startsWith('Ibu') && !w.startsWith('apt'),
                        )
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                        {account.name}
                      </p>
                      <p className="truncate text-[10px] font-semibold text-emerald-700">
                        {account.roleLabel}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 line-clamp-1 text-[11px] text-slate-500">{account.metaInfo}</p>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-emerald-700 py-1.5 text-center text-[11px] font-bold text-white shadow-2xs transition-colors group-hover:bg-emerald-800">
                  <span>1-Klik Masuk</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
            <IconAlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
            <div>
              <p className="font-bold">Autentikasi Gagal</p>
              <p className="mt-0.5 text-rose-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Standard Manual Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
            >
              {t('email_label')}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <IconMail className="size-4.5" stroke={1.75} />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={
                  activeRole === 'customer' ? 'nama@gmail.com' : 'apoteker@nyopharma.com'
                }
                className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-bold tracking-wider text-slate-700 uppercase"
              >
                {t('password_label')}
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                }}
                className="cursor-pointer text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
              >
                {t('forgot_password')}
              </button>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <IconLock className="size-4.5" stroke={1.75} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-11 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 transition hover:text-slate-700"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? (
                  <IconEyeOff className="size-4.5" stroke={1.75} />
                ) : (
                  <IconEye className="size-4.5" stroke={1.75} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
                className="size-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-slate-600">{t('remember_me')}</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>{t('submitting')}</span>
              </>
            ) : (
              <span>{t('submit_button')}</span>
            )}
          </button>

          {/* New Patient Registration Link */}
          <div className="mt-4 text-center text-xs text-slate-600">
            <span>{t('no_account')} </span>
            <Link
              href="/sign-up/"
              className="font-bold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              {t('sign_up_link')}
            </Link>
          </div>
        </form>

        {/* Security & compliance footer */}
        <div className="mt-8 flex items-start gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <IconShieldCheck className="size-4" />
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">{t('security_notice')}</p>
        </div>
      </div>

      {/* Forgot Password Helper Dialog */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <IconShieldCheck className="size-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Bantuan Lupa Kata Sandi</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              Untuk keamanan resep medis dan riwayat terapi, pemulihan sandi dapat dilakukan melalui
              verifikasi WhatsApp resmi Apoteker Nyopharma atau silakan gunakan salah satu{' '}
              <strong>Akun Demo Cepat (1-Klik)</strong> yang disediakan di halaman ini.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                }}
                className="cursor-pointer rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
