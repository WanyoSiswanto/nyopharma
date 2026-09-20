'use client';

import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconGift,
  IconLock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  IconStethoscope,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { setAdminSessionCookie } from '@/utils/AuthActions';

type SignUpTab = 'patient' | 'pharmacist';

/**
 * Customer & Pharmacist Registration Component with medical verification and quick demo fill.
 *
 * @param props Component properties containing the active locale.
 * @returns JSX element representing the registration form.
 */
export function CustomerSignUpForm(props: { locale: string }) {
  const t = useTranslations('SignUp');
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SignUpTab>('patient');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Pharmacist specific state
  const [sipaNumber, setSipaNumber] = useState('');
  const [university, setUniversity] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick 1-Click Fill Demo Patient
  const handleQuickDemoFill = () => {
    setFullName('drg. Anindya Putri Rahayu');
    setPhone('0812-7788-9900');
    setEmail('anindya.putri@gmail.com');
    setCity('Jakarta Selatan');
    setAddress('Jl. Senopati No. 45, Kebayoran Baru');
    setPassword('nyosehat123');
    setConfirmPassword('nyosehat123');
    setAgreeTerms(true);
    setErrorMessage('');
  };

  // Quick 1-Click Fill Demo Pharmacist
  const handleQuickPharmacistFill = () => {
    setFullName('apt. Farhan Pratama, S.Farm.');
    setPhone('0813-9900-1122');
    setEmail('farhan.pratama@nyopharma.com');
    setCity('Surabaya');
    setAddress('Apotek Nyopharma Mitra Cabang Surabaya Timur');
    setSipaNumber('19970512/SIPA_35.78/2023/4190');
    setUniversity('Universitas Airlangga (Farmasi)');
    setPassword('apoteker123');
    setConfirmPassword('apoteker123');
    setAgreeTerms(true);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreeTerms) {
      setErrorMessage(t('error_terms'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('error_password_match'));
      return;
    }

    setIsLoading(true);

    // Save newly created patient in session/localStorage
    try {
      if (activeTab === 'patient') {
        localStorage.setItem(
          'nyo_customer_user',
          JSON.stringify({
            name: fullName,
            email,
            phone,
            city,
            address,
            role: 'Pasien Terdaftar Nyopharma',
            rewardPoints: 500,
            loginAt: new Date().toISOString(),
          }),
        );
        localStorage.removeItem('nyo_admin_user');
      } else {
        localStorage.setItem(
          'nyo_admin_user',
          JSON.stringify({
            name: fullName,
            email,
            phone,
            sipa: sipaNumber,
            role: 'Apoteker Mitra (SIPA Terverifikasi)',
            loginAt: new Date().toISOString(),
          }),
        );
      }
    } catch {
      // Ignore storage errors in private browsing
    }

    // Set cookie session for continuous route authorization
    await setAdminSessionCookie(true);

    setIsSuccess(true);
    setTimeout(() => {
      if (activeTab === 'patient') {
        router.push(`/${props.locale}/customer/orders/`);
      } else {
        router.push(`/${props.locale}/dashboard`);
      }
      router.refresh();
    }, 1500);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6 sm:py-10">
      {/* Top Navigation & Security Header */}
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
          <span>Registrasi Terverifikasi</span>
        </span>
      </div>

      {/* Success Notification Card */}
      {isSuccess && (
        <div className="animate-fade-in mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-lg shadow-emerald-950/5">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <IconCheck className="size-8" stroke={3} />
          </div>
          <h2 className="mt-3 text-lg font-black text-slate-900">{t('success_title')}</h2>
          <p className="mt-1 text-xs text-emerald-800">{t('success_message')}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
            <div className="size-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <span>Menyiapkan portal Anda...</span>
          </div>
        </div>
      )}

      {/* Main Registration Card */}
      {!isSuccess && (
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-9">
          {/* Brand Header */}
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

          {/* Role Segmented Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('patient');
                setErrorMessage('');
              }}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
                activeTab === 'patient'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <IconUserPlus className="size-4" stroke={2} />
              <span>{t('tab_patient')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('pharmacist');
                setErrorMessage('');
              }}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
                activeTab === 'pharmacist'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <IconStethoscope className="size-4" stroke={2} />
              <span>{t('tab_pharmacist')}</span>
            </button>
          </div>

          {/* Quick Demo Autofill Helper */}
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-emerald-100 bg-[#f4f9f6] p-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-bold">Uji Coba Cepat:</span>
              <span className="text-[11px] text-slate-500">
                {activeTab === 'patient' ? 'Pasien baru simulasi' : 'Data apoteker ber-SIPA'}
              </span>
            </div>
            <button
              type="button"
              onClick={activeTab === 'patient' ? handleQuickDemoFill : handleQuickPharmacistFill}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-emerald-700 px-3 py-1.5 font-bold text-white shadow-2xs transition hover:bg-emerald-800 active:scale-95"
            >
              <span>{t('quick_demo_fill')}</span>
            </button>
          </div>

          {/* New Patient Benefit Banner */}
          {activeTab === 'patient' && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3.5 text-xs text-amber-950">
              <IconGift className="size-5 shrink-0 text-amber-700" />
              <div>
                <span className="font-bold">Keuntungan Akun Pasien Baru:</span>
                <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
                  Dapatkan <strong>+500 Poin Sehat</strong>, gratis biaya kemasan bersegel CDOB
                  untuk pesanan pertama, dan akses langsung konsultasi apoteker via chat.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
              <IconAlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
              <div>
                <p className="font-bold">Pendaftaran Tidak Lengkap</p>
                <p className="mt-0.5 text-rose-700">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
              >
                {t('full_name_label')}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <IconUser className="size-4.5" stroke={1.75} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  placeholder={
                    activeTab === 'patient'
                      ? 'Contoh: drg. Anindya Putri'
                      : 'apt. Nama Lengkap, S.Farm.'
                  }
                  className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Pharmacist specific field: SIPA & University */}
            {activeTab === 'pharmacist' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sipaNumber"
                    className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                  >
                    Nomor SIPA Resmi
                  </label>
                  <input
                    id="sipaNumber"
                    type="text"
                    required
                    value={sipaNumber}
                    onChange={(e) => {
                      setSipaNumber(e.target.value);
                    }}
                    placeholder="19950322/SIPA_31.73/..."
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-3.5 py-2.5 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="university"
                    className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                  >
                    Almamater Farmasi
                  </label>
                  <input
                    id="university"
                    type="text"
                    required
                    value={university}
                    onChange={(e) => {
                      setUniversity(e.target.value);
                    }}
                    placeholder="Universitas Indonesia"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-3.5 py-2.5 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* WhatsApp & Email */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                >
                  {t('phone_label')}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <IconPhone className="size-4.5" stroke={1.75} />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    placeholder="0812-3456-7890"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

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
                    placeholder="nama@email.com"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* City & Address */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label
                  htmlFor="city"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                >
                  {t('city_label')}
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="Jakarta / Tangerang"
                  className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-3.5 py-2.5 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                >
                  {t('address_label')}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <IconMapPin className="size-4.5" stroke={1.75} />
                  </div>
                  <input
                    id="address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kelurahan"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                >
                  {t('password_label')}
                </label>
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
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-11 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 transition hover:text-slate-700"
                    aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  >
                    {showPassword ? (
                      <IconEyeOff className="size-4.5" />
                    ) : (
                      <IconEye className="size-4.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
                >
                  {t('confirm_password_label')}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <IconLock className="size-4.5" stroke={1.75} />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="Ulangi kata sandi"
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] py-2.5 pr-4 pl-10 text-xs font-medium text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex cursor-pointer items-start gap-2.5 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                  }}
                  className="mt-0.5 size-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs leading-relaxed text-slate-600">
                  {t('terms_agreement')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none active:scale-[0.99] disabled:opacity-50"
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
          </form>

          {/* Already have account footer link */}
          <div className="mt-6 text-center text-xs text-slate-600">
            <span>{t('have_account')} </span>
            <Link
              href="/sign-in/"
              className="font-bold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              {t('sign_in_link')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
