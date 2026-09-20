'use client';

import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconFileInvoice,
  IconFileText,
  IconHistory,
  IconMapPin,
  IconPill,
  IconRefresh,
  IconRotateClockwise2,
  IconShieldCheck,
  IconShoppingCart,
  IconSparkles,
  IconTruck,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { OrderInvoiceModal } from '@/components/customer/OrderInvoiceModal';
import { OrderTrackingModal } from '@/components/customer/OrderTrackingModal';
import { addToCart } from '@/data/cartStore';
import type { CustomerOrder, CustomerProfile } from '@/data/customerData';
import {
  DEFAULT_CUSTOMER,
  DEMO_CUSTOMERS,
  DEMO_PRESCRIPTIONS,
  DEMO_REFILL_REMINDERS,
  getCustomerOrders,
} from '@/data/customerData';
import { MEDICATIONS_DATA } from '@/data/medicationsData';
import { Link } from '@/libs/I18nNavigation';

type TabType = 'orders' | 'prescriptions' | 'refills';
type FilterStatus = 'all' | 'in_transit' | 'delivered';

/**
 * Customer Portal View Component showing purchase history, digital prescriptions, and refill reminders.
 *
 * @returns JSX element for the patient/customer account dashboard.
 */
export function CustomerPortalView() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust-budi');
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [trackingOrder, setTrackingOrder] = useState<CustomerOrder | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<CustomerOrder | null>(null);
  const [reorderSuccessId, setReorderSuccessId] = useState<string | null>(null);

  const currentCustomer: CustomerProfile =
    DEMO_CUSTOMERS.find((c) => c.id === selectedCustomerId) ?? DEFAULT_CUSTOMER;

  const allOrders = getCustomerOrders(currentCustomer.id);

  const filteredOrders = allOrders.filter((ord) => {
    if (statusFilter === 'in_transit') {
      return ord.status === 'in_transit' || ord.status === 'processing';
    }
    if (statusFilter === 'delivered') {
      return ord.status === 'delivered';
    }
    return true;
  });

  const inTransitCount = allOrders.filter(
    (o) => o.status === 'in_transit' || o.status === 'processing',
  ).length;
  const deliveredCount = allOrders.filter((o) => o.status === 'delivered').length;

  const handleReorder = (order: CustomerOrder) => {
    // Add items from this order into current shopping cart
    for (const item of order.items) {
      const originalProduct = MEDICATIONS_DATA.find((m) => m.id === item.medicationId);
      if (originalProduct) {
        addToCart(originalProduct, item.quantity);
      }
    }
    setReorderSuccessId(order.id);
    setTimeout(() => {
      setReorderSuccessId(null);
    }, 2500);
  };

  const handleRefillAdd = (productId: string) => {
    const product = MEDICATIONS_DATA.find((m) => m.id === productId);
    if (product) {
      addToCart(product, 3); // 3 strips for 30 days
      setReorderSuccessId('refill-success');
      setTimeout(() => {
        setReorderSuccessId(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      {/* Re-order Toast Alert */}
      {reorderSuccessId && (
        <div className="animate-fade-in fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-emerald-950/20">
          <IconCheck className="size-4 text-emerald-300" stroke={3} />
          <span>Obat berhasil ditambahkan ke keranjang belanja!</span>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <header className="border-b border-slate-200/80 bg-white shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-emerald-700 transition-colors hover:text-emerald-900"
            >
              <span>← Beranda Nyopharma</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-600">
              Akun Pelanggan & Riwayat Pesanan
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sign-in/"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-emerald-400 hover:text-emerald-800"
            >
              <span>Portal Apoteker (Staff)</span>
              <IconArrowRight className="size-3.5" />
            </Link>

            <LogoutButton
              locale="id"
              label="Keluar"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-rose-200 hover:bg-rose-50/80 hover:text-rose-700"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Customer Profile Banner & 1-Click Demo Account Switcher */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Customer Info */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black shadow-xs sm:size-16 sm:text-xl ${currentCustomer.avatarBg}`}
              >
                {currentCustomer.avatarInitials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                    {currentCustomer.name}
                  </h1>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${currentCustomer.memberTierBadgeClass}`}
                  >
                    {currentCustomer.memberTier}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="font-medium">{currentCustomer.phone}</span>
                  <span>•</span>
                  <span>{currentCustomer.email}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <IconShieldCheck className="size-3.5" />
                    {currentCustomer.verifiedBadge}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <IconMapPin className="size-3.5 shrink-0 text-emerald-600" />
                  <span>
                    {currentCustomer.address}, {currentCustomer.city} {currentCustomer.postalCode}
                  </span>
                </p>
              </div>
            </div>

            {/* 1-Click Demo Customer Account Switcher */}
            <div className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-left sm:items-end lg:w-72">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Pilih Akun Demo Pelanggan
              </span>
              <div className="flex w-full flex-col gap-1.5">
                {DEMO_CUSTOMERS.map((cust) => {
                  const isSelected = cust.id === selectedCustomerId;
                  return (
                    <button
                      key={cust.id}
                      type="button"
                      onClick={() => {
                        setSelectedCustomerId(cust.id);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        isSelected
                          ? 'border border-emerald-300 bg-emerald-100/90 text-emerald-900 shadow-2xs'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-[10px]">
                          {cust.avatarInitials}
                        </span>
                        <span>
                          {cust.name.split(' ')[0]} {cust.name.split(' ')[2] ?? ''}
                        </span>
                      </div>
                      {isSelected ? (
                        <span className="text-[10px] text-emerald-700">Aktif</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Pilih</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-1 flex w-full justify-end border-t border-slate-200/70 pt-2">
                <LogoutButton
                  locale="id"
                  label="Keluar dari Akun Pasien"
                  className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold text-rose-600 transition-colors hover:text-rose-800"
                />
              </div>
            </div>
          </div>

          {/* 4 KPI Summary Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-emerald-100/60 bg-[#edf7f2] p-3.5">
              <div className="flex items-center gap-2 text-emerald-800">
                <IconHistory className="size-4" />
                <span className="text-[11px] font-bold uppercase">Total Pesanan</span>
              </div>
              <span className="mt-1 block font-mono text-xl font-black text-slate-900">
                {allOrders.length} Pesanan
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Layanan pengantaran CDOB
              </span>
            </div>

            <div className="rounded-2xl border border-sky-100/60 bg-sky-50/70 p-3.5">
              <div className="flex items-center gap-2 text-sky-800">
                <IconPill className="size-4" />
                <span className="text-[11px] font-bold uppercase">Obat Rutin Aktif</span>
              </div>
              <span className="mt-1 block font-mono text-xl font-black text-slate-900">
                1 Sediaan
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Amlodipine 10 mg (Tensi)
              </span>
            </div>

            <div className="rounded-2xl border border-amber-100/60 bg-amber-50/70 p-3.5">
              <div className="flex items-center gap-2 text-amber-800">
                <IconClock className="size-4" />
                <span className="text-[11px] font-bold uppercase">Pengingat Refill</span>
              </div>
              <span className="mt-1 block font-mono text-xl font-black text-slate-900">
                7 Hari Lagi
              </span>
              <span className="text-[10px] font-medium text-slate-500">Jadwal: 27 Sep 2026</span>
            </div>

            <div className="rounded-2xl border border-purple-100/60 bg-purple-50/70 p-3.5">
              <div className="flex items-center gap-2 text-purple-800">
                <IconSparkles className="size-4" />
                <span className="text-[11px] font-bold uppercase">Poin Sehat</span>
              </div>
              <span className="mt-1 block font-mono text-xl font-black text-slate-900">
                {currentCustomer.rewardPoints.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Setara Rp {(currentCustomer.rewardPoints * 10).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </section>

        {/* Section Tabs Navigation */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab('orders');
            }}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition active:scale-98 ${
              activeTab === 'orders'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
            }`}
          >
            <IconHistory className="size-4" />
            <span>Riwayat Pembelian ({allOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('prescriptions');
            }}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition active:scale-98 ${
              activeTab === 'prescriptions'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
            }`}
          >
            <IconFileText className="size-4" />
            <span>Resep Digital Saya (2)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('refills');
            }}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition active:scale-98 ${
              activeTab === 'refills'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
            }`}
          >
            <IconRotateClockwise2 className="size-4" />
            <span>Pengingat Refill Obat (1)</span>
          </button>
        </div>

        {/* TAB 1: RIWAYAT PEMBELIAN (ORDERS) */}
        {activeTab === 'orders' && (
          <section className="mt-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('all');
                  }}
                  className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Semua ({allOrders.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('in_transit');
                  }}
                  className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                    statusFilter === 'in_transit'
                      ? 'bg-sky-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300'
                  }`}
                >
                  Dalam Pengiriman ({inTransitCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('delivered');
                  }}
                  className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                    statusFilter === 'delivered'
                      ? 'bg-emerald-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  Selesai Diterima ({deliveredCount})
                </button>
              </div>

              <span className="text-xs font-medium text-slate-500">
                Menampilkan {filteredOrders.length} transaksi resmi terverifikasi
              </span>
            </div>

            {/* List of Orders */}
            <div className="mt-5 space-y-5">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition hover:border-emerald-200 hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-[#fbfdfc] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-black text-slate-900">
                        {ord.orderNumber}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">
                        {ord.orderDate}, {ord.orderTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${ord.statusBadgeClass}`}
                      >
                        {ord.status === 'in_transit' && (
                          <span className="flex size-2 animate-pulse rounded-full bg-sky-500" />
                        )}
                        {ord.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Items List */}
                  <div className="p-5 sm:p-6">
                    <div className="divide-y divide-slate-100">
                      {ord.items.map((item) => (
                        <div
                          key={item.medicationId}
                          className="flex flex-col justify-between gap-4 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-[#edf7f2] p-1.5">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain"
                                />
                              ) : (
                                <span className="text-xl">💊</span>
                              )}
                            </div>

                            <div>
                              <span className="text-[10px] font-extrabold tracking-wider text-emerald-700 uppercase">
                                {item.categoryLabel}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                              <p className="text-xs text-slate-500">
                                {item.genericName} • {item.unit}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-baseline justify-between sm:flex-col sm:items-end sm:text-right">
                            <span className="text-xs font-medium text-slate-500">
                              {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                            </span>
                            <span className="font-mono text-sm font-black text-slate-900">
                              {item.formattedPrice}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Packaging Badge */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <IconTruck className="size-4 text-emerald-700" />
                        <span>{ord.courierName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                        <IconShieldCheck className="size-3.5" />
                        <span>{ord.packagingType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Totals and Action Buttons */}
                  <div className="flex flex-col justify-between gap-4 border-t border-slate-100 bg-[#fbfdfc] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                    <div className="flex items-baseline gap-2 text-xs">
                      <span className="text-slate-500">Total Pembayaran:</span>
                      <span className="font-mono text-base font-black text-emerald-800 sm:text-lg">
                        Rp {ord.totalAmount.toLocaleString('id-ID')}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {ord.paymentMethod}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTrackingOrder(ord);
                        }}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 active:scale-98"
                      >
                        <IconTruck className="size-3.5" />
                        <span>Lacak Kurir</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setInvoiceOrder(ord);
                        }}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 active:scale-98"
                      >
                        <IconFileInvoice className="size-3.5" />
                        <span>Lihat Faktur</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleReorder(ord);
                        }}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-900 active:scale-98"
                      >
                        <IconShoppingCart className="size-3.5" />
                        <span>Beli Lagi</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: RESEP DIGITAL SAYA (PRESCRIPTIONS) */}
        {activeTab === 'prescriptions' && (
          <section className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Daftar Resep Dokter Terverifikasi Resmi
              </h3>
              <Link
                href="/#home"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-900"
              >
                <span>+ Unggah Foto Resep Baru</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {DEMO_PRESCRIPTIONS.map((rx) => (
                <div
                  key={rx.id}
                  className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs"
                >
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="font-mono text-xs font-black text-slate-900">
                        {rx.prescriptionNumber}
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-slate-800">{rx.doctorName}</h4>
                      <p className="text-xs text-slate-500">{rx.clinicName}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${rx.statusBadgeClass}`}
                    >
                      {rx.statusLabel}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">Diagnosis Klinis:</span>
                      <p className="font-medium text-slate-800">{rx.diagnosis}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500">Sediaan Obat Diresepkan:</span>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-700">
                        {rx.prescribedDrugs.map((drug) => (
                          <li key={drug}>{drug}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-[#edf7f2] p-3 text-[11px] leading-relaxed text-emerald-900">
                      <span className="font-bold">Catatan Apoteker:</span> {rx.pharmacistNotes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: PENGINGAT REFILL OBAT (REFILLS) */}
        {activeTab === 'refills' && (
          <section className="mt-6 space-y-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
              <div className="flex items-start gap-2.5">
                <IconClock className="size-5 shrink-0 text-amber-700" />
                <div>
                  <span className="font-bold">
                    Layanan Pengingat Kepatuhan Obat (Medication Adherence)
                  </span>
                  <p className="mt-0.5 text-amber-800">
                    Apoteker Nyopharma secara otomatis mengingatkan 7 hari sebelum obat kronis Anda
                    habis untuk menjaga stabilitas tekanan darah dan kesehatan kardiovaskular.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {DEMO_REFILL_REMINDERS.map((refill) => (
                <div
                  key={refill.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-800">
                        Sisa {refill.remainingDays} Hari Lagi
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        Jadwal: {refill.refillDueDate}
                      </span>
                    </div>

                    <h4 className="mt-3 text-base font-black text-slate-900">
                      {refill.medicationName}
                    </h4>
                    <p className="text-xs text-slate-500">{refill.genericName}</p>
                    <p className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-medium text-slate-700">
                      Aturan Pakai: {refill.dosageSchedule}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-xs text-slate-500">Kebutuhan Refill:</span>
                      <span className="block font-mono text-sm font-black text-emerald-800">
                        {refill.packSize}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleRefillAdd(refill.productId);
                      }}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 active:scale-98"
                    >
                      <IconRefresh className="size-3.5" />
                      <span>Refill Sekarang</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Live Order Tracking Modal */}
      {trackingOrder && (
        <OrderTrackingModal
          order={trackingOrder}
          onClose={() => {
            setTrackingOrder(null);
          }}
        />
      )}

      {/* Official Invoice Modal */}
      {invoiceOrder && (
        <OrderInvoiceModal
          order={invoiceOrder}
          customerName={currentCustomer.name}
          customerAddress={`${currentCustomer.address}, ${currentCustomer.city}`}
          onClose={() => {
            setInvoiceOrder(null);
          }}
        />
      )}
    </div>
  );
}
