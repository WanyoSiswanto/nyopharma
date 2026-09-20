'use client';

import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconCreditCard,
  IconMinus,
  IconPill,
  IconPlus,
  IconQrcode,
  IconShieldCheck,
  IconTrash,
  IconTruck,
  IconX,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import type { CartItem } from '@/data/cartStore';
import {
  calculateCartSummary,
  clearCart,
  getStoredCart,
  removeFromCart,
  savePaidOrder,
  updateCartQuantity,
} from '@/data/cartStore';
import type { MedicationItem, PaidOrder } from '@/data/medicationsData';
import { Link } from '@/libs/I18nNavigation';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  directItem?: { product: MedicationItem; quantity: number } | null;
  onOrderCompleted?: (order: PaidOrder) => void;
};

const getPaymentMethodLabel = (method: 'qris' | 'va_bca' | 'va_mandiri' | 'cc') => {
  if (method === 'qris') {
    return 'QRIS Instan';
  }
  if (method === 'va_bca') {
    return 'BCA Virtual Account';
  }
  if (method === 'va_mandiri') {
    return 'Mandiri Virtual Account';
  }
  return 'Kartu Kredit / Debit';
};

function CartReviewStep(props: {
  cartItems: CartItem[];
  summary: ReturnType<typeof calculateCartSummary>;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  onCustomerNameChange: (val: string) => void;
  onCustomerPhoneChange: (val: string) => void;
  onShippingAddressChange: (val: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  if (props.cartItems.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <IconPill className="size-7" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-slate-900">Keranjang Belanja Kosong</h3>
        <p className="mt-1 text-xs text-slate-500">
          Pilih obat dari katalog untuk mulai berbelanja.
        </p>
        <button
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Jelajahi Katalog Obat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      <div>
        <h3 className="mb-2.5 text-xs font-bold tracking-wider text-slate-400 uppercase">
          Daftar Obat yang Dipesan ({props.summary.totalCount} item)
        </h3>
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-slate-50/50 p-2 sm:p-3">
          {props.cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between gap-3 px-2 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`py-0.2 rounded border px-1.5 text-[9px] font-bold ${item.product.badgeColor}`}
                  >
                    {item.product.categoryLabel}
                  </span>
                  <p className="truncate text-xs font-bold text-slate-900">{item.product.name}</p>
                </div>
                <p className="mt-0.5 font-mono text-[11px] font-semibold text-emerald-800">
                  {item.product.formattedPrice}{' '}
                  <span className="font-normal text-slate-400">/ {item.product.unit}</span>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
                  <button
                    type="button"
                    aria-label="Kurangi kuantitas"
                    onClick={() => {
                      props.onUpdateQty(item.product.id, item.quantity - 1);
                    }}
                    className="flex size-6 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
                  >
                    <IconMinus className="size-3" />
                  </button>
                  <span className="w-6 text-center font-mono text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah kuantitas"
                    onClick={() => {
                      props.onUpdateQty(item.product.id, item.quantity + 1);
                    }}
                    className="flex size-6 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
                  >
                    <IconPlus className="size-3" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label="Hapus item"
                  onClick={() => {
                    props.onRemoveItem(item.product.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <IconTrash className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3.5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase">
          <IconTruck className="size-4 text-emerald-700" />
          <span>Data Penerima & Alamat Pengiriman</span>
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="customerName"
              className="mb-1 block text-[11px] font-semibold text-slate-600"
            >
              Nama Pasien / Penerima
            </label>
            <input
              id="customerName"
              type="text"
              required
              value={props.customerName}
              onChange={(e) => {
                props.onCustomerNameChange(e.target.value);
              }}
              placeholder="Nama lengkap"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="customerPhone"
              className="mb-1 block text-[11px] font-semibold text-slate-600"
            >
              Nomor WhatsApp
            </label>
            <input
              id="customerPhone"
              type="tel"
              required
              value={props.customerPhone}
              onChange={(e) => {
                props.onCustomerPhoneChange(e.target.value);
              }}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="shippingAddress"
            className="mb-1 block text-[11px] font-semibold text-slate-600"
          >
            Alamat Lengkap Pengiriman
          </label>
          <textarea
            id="shippingAddress"
            required
            rows={2}
            value={props.shippingAddress}
            onChange={(e) => {
              props.onShippingAddressChange(e.target.value);
            }}
            placeholder="Alamat rumah, kelurahan, kecamatan"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal Obat:</span>
          <span className="font-mono font-semibold">
            Rp {props.summary.subtotal.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Pengemasan Higienis CDOB:</span>
          <span className="font-mono font-semibold text-emerald-700">
            {props.summary.packagingFee === 0
              ? 'GRATIS'
              : `Rp ${props.summary.packagingFee.toLocaleString('id-ID')}`}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-emerald-200/80 pt-2 font-bold text-slate-900">
          <span>Total Tagihan:</span>
          <span className="font-mono text-base font-black text-emerald-800">
            Rp {props.summary.totalAmount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-800 py-3 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:bg-emerald-700"
      >
        Lanjut ke Pembayaran Digital (SaaS) →
      </button>
    </form>
  );
}

function PaymentStep(props: {
  paymentMethod: 'qris' | 'va_bca' | 'va_mandiri' | 'cc';
  totalAmount: number;
  isProcessingPay: boolean;
  copiedVa: boolean;
  onPaymentMethodChange: (method: 'qris' | 'va_bca' | 'va_mandiri' | 'cc') => void;
  onCopyVa: () => void;
  onSimulatePay: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
        <span className="text-base">⚡</span>
        <p>
          <strong>SaaS Pay-to-Process:</strong> Pesanan obat Anda langsung diteruskan ke antrean
          Apoteker untuk diracik & dikemas <strong>setelah pembayaran berhasil diverifikasi</strong>
          .
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
          Metode Pembayaran Digital:
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              props.onPaymentMethodChange('qris');
            }}
            className={`rounded-xl border p-3 text-left text-xs transition ${
              props.paymentMethod === 'qris'
                ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <IconQrcode className="size-4 text-emerald-700" />
              <span className="font-bold">QRIS Instan</span>
            </div>
            <p className="text-[10px] font-normal text-slate-500">
              BCA, Mandiri, GoPay, OVO, ShopeePay
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              props.onPaymentMethodChange('va_bca');
            }}
            className={`rounded-xl border p-3 text-left text-xs transition ${
              props.paymentMethod === 'va_bca'
                ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <IconShieldCheck className="size-4 text-emerald-700" />
              <span className="font-bold">Virtual Account</span>
            </div>
            <p className="text-[10px] font-normal text-slate-500">BCA, Mandiri, BRI, BNI</p>
          </button>

          <button
            type="button"
            onClick={() => {
              props.onPaymentMethodChange('cc');
            }}
            className={`rounded-xl border p-3 text-left text-xs transition ${
              props.paymentMethod === 'cc'
                ? 'border-emerald-600 bg-emerald-50/70 font-bold text-emerald-950 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <IconCreditCard className="size-4 text-emerald-700" />
              <span className="font-bold">Kartu Kredit</span>
            </div>
            <p className="text-[10px] font-normal text-slate-500">Visa, Mastercard, JCB</p>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
        {props.paymentMethod === 'qris' && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-800">Pindai QRIS untuk Membayar</p>
            <div className="relative mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-2xl border-2 border-slate-800 bg-white p-2.5 shadow-sm">
              <div className="grid h-full w-full grid-cols-6 gap-1 rounded-lg bg-slate-900 p-2 opacity-90">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <span className="absolute rounded border border-emerald-200 bg-white px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                NYOPHARMA
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Total:{' '}
              <strong className="font-mono text-sm text-emerald-800">
                Rp {props.totalAmount.toLocaleString('id-ID')}
              </strong>
            </p>
          </div>
        )}

        {props.paymentMethod === 'va_bca' && (
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-slate-800">Nomor BCA Virtual Account</p>
            <div className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2 font-mono text-base font-bold text-slate-900">
              <span>8801298410293847</span>
              <button
                type="button"
                onClick={props.onCopyVa}
                className="flex items-center gap-1 font-sans text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                <IconCopy className="size-3.5" />
                <span>{props.copiedVa ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">Atas Nama: PT NYOPHARMA FARMA UTAMA</p>
          </div>
        )}

        {props.paymentMethod === 'cc' && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-800">Gateway Kartu Kredit Terproteksi</p>
            <div className="mx-auto max-w-xs space-y-2 rounded-xl border border-slate-200 bg-white p-3 text-left text-xs">
              <input
                type="text"
                disabled
                value="•••• •••• •••• 4242"
                className="w-full rounded-lg bg-slate-50 p-2 font-mono text-slate-700"
              />
              <div className="flex gap-2 font-mono">
                <input
                  type="text"
                  disabled
                  value="12/28"
                  className="w-1/2 rounded-lg bg-slate-50 p-1.5"
                />
                <input
                  type="text"
                  disabled
                  value="CVC: 888"
                  className="w-1/2 rounded-lg bg-slate-50 p-1.5"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={props.isProcessingPay}
        onClick={props.onSimulatePay}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {props.isProcessingPay ? (
          <>
            <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span>Memverifikasi Pembayaran Digital...</span>
          </>
        ) : (
          <span>⚡ Konfirmasi Pembayaran Berhasil (Simulasi Bayar Lunas)</span>
        )}
      </button>
    </div>
  );
}

function SuccessReceiptStep(props: { order: PaidOrder; onClose: () => void }) {
  return (
    <div className="space-y-5 py-4 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-md">
        <IconCheck className="size-8" stroke={2.5} />
      </div>

      <div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
          Status: SUDAH DIBAYAR (LUNAS)
        </span>
        <h3 className="mt-2 text-xl font-extrabold text-slate-900">Pembayaran Terverifikasi!</h3>
        <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-slate-600">
          Pesanan obat Anda telah lunas dan{' '}
          <strong>otomatis diteruskan ke Apoteker Nyopharma</strong> untuk dilakukan skrining
          klinis, peracikan, dan pengemasan higienis berstandar CDOB.
        </p>
      </div>

      <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left font-mono text-xs">
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Nomor Invoice:</span>
          <span className="font-bold text-slate-900">{props.order.orderNumber}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Waktu Bayar:</span>
          <span className="font-semibold text-slate-800">{props.order.paidAt} WIB</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Penerima:</span>
          <span className="font-semibold text-slate-800">{props.order.customerName}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Metode:</span>
          <span className="font-semibold text-emerald-800">{props.order.paymentMethod}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
          <span>Total Lunas:</span>
          <span className="text-emerald-800">
            Rp {props.order.totalAmount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Link
          href="/dashboard"
          className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white transition hover:bg-slate-800"
        >
          Buka Dashboard Apoteker (Cek Pesanan Masuk)
        </Link>
        <button
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="flex-1 rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
}

export function CheckoutModal(props: CheckoutModalProps) {
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('Bambang Prasetyo');
  const [customerPhone, setCustomerPhone] = useState('081234567890');
  const [shippingAddress, setShippingAddress] = useState('Jl. Menteng Raya No. 18, Jakarta Pusat');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va_bca' | 'va_mandiri' | 'cc'>(
    'qris',
  );
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PaidOrder | null>(null);
  const [copiedVa, setCopiedVa] = useState(false);

  // Derive cart items without synchronous setState in effect
  const [activeItems, setActiveItems] = useState<CartItem[]>([]);

  if (!props.isOpen) {
    return null;
  }

  let currentCartItems: CartItem[];
  if (props.directItem) {
    currentCartItems = [props.directItem];
  } else if (activeItems.length > 0) {
    currentCartItems = activeItems;
  } else {
    currentCartItems = getStoredCart();
  }
  const summary = calculateCartSummary(currentCartItems);

  const handleUpdateQty = (productId: string, newQty: number) => {
    if (props.directItem) {
      setActiveItems([{ product: props.directItem.product, quantity: newQty }]);
    } else {
      const updated = updateCartQuantity(productId, newQty);
      setActiveItems(updated);
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (props.directItem) {
      setActiveItems([]);
    } else {
      const updated = removeFromCart(productId);
      setActiveItems(updated);
    }
  };

  const handleProceedToPayment = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentCartItems.length > 0) {
      setStep('payment');
    }
  };

  const handleSimulatePaymentSuccess = () => {
    setIsProcessingPay(true);
    setTimeout(() => {
      const orderData = {
        customerName: customerName.trim() || 'Pelanggan Nyopharma',
        customerPhone: customerPhone.trim() || '081234567890',
        shippingAddress: shippingAddress.trim() || 'Alamat Apotek Nyopharma',
        items: currentCartItems.map((item) => ({
          medicationId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          unit: item.product.unit,
        })),
        subtotal: summary.subtotal,
        packagingFee: summary.packagingFee,
        totalAmount: summary.totalAmount,
        paymentMethod: getPaymentMethodLabel(paymentMethod),
      };

      const newPaidOrder = savePaidOrder(orderData);
      setCompletedOrder(newPaidOrder);
      if (!props.directItem) {
        clearCart();
      }
      setIsProcessingPay(false);
      setStep('success');
      if (props.onOrderCompleted) {
        props.onOrderCompleted(newPaidOrder);
      }
    }, 900);
  };

  const handleCopyVa = () => {
    void navigator.clipboard.writeText('8801298410293847');
    setCopiedVa(true);
    setTimeout(() => {
      setCopiedVa(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            {step === 'payment' && (
              <button
                type="button"
                aria-label="Kembali ke keranjang"
                onClick={() => {
                  setStep('cart');
                }}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <IconArrowLeft className="size-5" />
              </button>
            )}
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <IconPill className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                {step === 'cart' && 'Keranjang & Pengiriman Obat'}
                {step === 'payment' && 'Pembayaran Digital Nyopharma (SaaS)'}
                {step === 'success' && 'Pembayaran Terverifikasi (Lunas)'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {step === 'cart' && 'Periksa pesanan obat dan alamat pengantaran Anda'}
                {step === 'payment' &&
                  'Pesanan otomatis diproses apoteker setelah pembayaran lunas'}
                {step === 'success' && 'Pesanan diteruskan ke Apoteker untuk skrining & peracikan'}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup jendela checkout"
            onClick={() => {
              props.onClose();
            }}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <IconX className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {step === 'cart' && (
            <CartReviewStep
              cartItems={currentCartItems}
              summary={summary}
              customerName={customerName}
              customerPhone={customerPhone}
              shippingAddress={shippingAddress}
              onCustomerNameChange={(val) => {
                setCustomerName(val);
              }}
              onCustomerPhoneChange={(val) => {
                setCustomerPhone(val);
              }}
              onShippingAddressChange={(val) => {
                setShippingAddress(val);
              }}
              onUpdateQty={handleUpdateQty}
              onRemoveItem={handleRemoveItem}
              onSubmit={handleProceedToPayment}
              onClose={props.onClose}
            />
          )}

          {step === 'payment' && (
            <PaymentStep
              paymentMethod={paymentMethod}
              totalAmount={summary.totalAmount}
              isProcessingPay={isProcessingPay}
              copiedVa={copiedVa}
              onPaymentMethodChange={(m) => {
                setPaymentMethod(m);
              }}
              onCopyVa={handleCopyVa}
              onSimulatePay={handleSimulatePaymentSuccess}
            />
          )}

          {step === 'success' && completedOrder && (
            <SuccessReceiptStep order={completedOrder} onClose={props.onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
