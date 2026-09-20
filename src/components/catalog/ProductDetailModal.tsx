'use client';

import {
  IconAlertCircle,
  IconCheck,
  IconMinus,
  IconPill,
  IconPlus,
  IconShieldCheck,
  IconShoppingCart,
  IconTemperature,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { MedicationItem } from '@/data/medicationsData';

type ProductDetailModalProps = {
  product: MedicationItem;
  onClose: () => void;
  onAddToCart: (product: MedicationItem, quantity: number) => void;
  onBuyNow: (product: MedicationItem, quantity: number) => void;
};

export function ProductDetailModal(props: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'dosage' | 'safety'>('info');
  const [isAddedToast, setIsAddedToast] = useState(false);

  const subtotal = props.product.price * quantity;

  const handleIncrease = () => {
    if (quantity < props.product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartClick = () => {
    props.onAddToCart(props.product, quantity);
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
    }, 2200);
  };

  const handleBuyNowClick = () => {
    props.onBuyNow(props.product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Toast Notification for Add to Cart */}
        {isAddedToast && (
          <div className="absolute top-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-lg">
            <IconCheck className="size-4" stroke={2.5} />
            <span>Berhasil ditambahkan ke keranjang belanja!</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white shadow-sm">
              <IconPill className="size-6" stroke={1.75} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${props.product.badgeColor}`}
                >
                  {props.product.categoryLabel}
                </span>
                <span className="font-mono text-[11px] font-semibold text-slate-500">
                  BPOM: {props.product.bpomNumber}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                {props.product.name}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                {props.product.genericName} • {props.product.manufacturer}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup jendela rincian obat"
            onClick={() => {
              props.onClose();
            }}
            className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('info');
              }}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeTab === 'info'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Indikasi & Manfaat
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('dosage');
              }}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeTab === 'dosage'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Komposisi & Aturan Pakai
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('safety');
              }}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeTab === 'safety'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Peringatan & Penyimpanan
            </button>
          </div>

          {/* Tab 1: Indikasi & Manfaat */}
          {activeTab === 'info' && (
            <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <h3 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  <IconShieldCheck className="size-4 text-emerald-700" />
                  <span>Indikasi Klinis & Terapi Farmakologi</span>
                </h3>
                <p className="text-xs leading-relaxed text-slate-700">{props.product.indication}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Bentuk Sediaan & Kemasan
                  </span>
                  <p className="mt-0.5 font-bold text-slate-900">{props.product.unit}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Ketersediaan Stok
                  </span>
                  <p className="mt-0.5 font-bold text-emerald-700">
                    Tersedia ({props.product.stock} unit di Apotek)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Komposisi & Dosis */}
          {activeTab === 'dosage' && (
            <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <h3 className="mb-1.5 text-[11px] font-bold tracking-wider text-slate-900 uppercase">
                  Komposisi Zat Aktif
                </h3>
                <p className="font-medium text-slate-800">{props.product.composition}</p>
              </div>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4">
                <h3 className="mb-1.5 text-[11px] font-bold tracking-wider text-emerald-900 uppercase">
                  Aturan & Petunjuk Penggunaan
                </h3>
                <p className="font-medium text-emerald-950">{props.product.dosage}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Peringatan & CDOB Storage */}
          {activeTab === 'safety' && (
            <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/60 p-4">
                <h3 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-rose-900 uppercase">
                  <IconAlertCircle className="size-4 text-rose-600" />
                  <span>Kontraindikasi & Perhatian Khusus</span>
                </h3>
                <p className="text-rose-950">{props.product.contraindication}</p>
                <p className="mt-2 text-[11px] text-rose-900">
                  <strong>Efek Samping Potensial:</strong> {props.product.sideEffects}
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/60 p-4">
                <IconTemperature className="mt-0.5 size-5 shrink-0 text-sky-700" />
                <div>
                  <h3 className="mb-1 text-[11px] font-bold tracking-wider text-sky-900 uppercase">
                    Standar Penyimpanan CDOB Apotek
                  </h3>
                  <p className="text-sky-950">{props.product.storageTemp}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Price Calculator & Actions */}
        <div className="border-t border-slate-200 bg-slate-50/80 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Quantity Selector & Subtotal */}
            <div className="flex items-center justify-between gap-6 sm:justify-start">
              <div>
                <span className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Jumlah Pesanan
                </span>
                <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-1">
                  <button
                    type="button"
                    aria-label="Kurangi jumlah"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="flex size-7 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <IconMinus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah jumlah"
                    onClick={handleIncrease}
                    disabled={quantity >= props.product.stock}
                    className="flex size-7 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <IconPlus className="size-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Total Tagihan
                </span>
                <span className="font-mono text-lg font-extrabold text-emerald-800 sm:text-xl">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/80 px-4 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 active:scale-[0.98] sm:flex-initial"
              >
                <IconShoppingCart className="size-4 text-emerald-700" stroke={2} />
                <span>+ Keranjang</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNowClick}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:bg-emerald-700 active:scale-[0.98] sm:flex-initial"
              >
                <span>Beli & Bayar Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
