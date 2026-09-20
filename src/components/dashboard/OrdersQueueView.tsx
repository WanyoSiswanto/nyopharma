'use client';

import { useState } from 'react';
import type { PaidOrder } from '@/data/medicationsData';

const formatIdr = (amount: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);

const getStatusBadge = (status: 'processing' | 'ready_to_ship' | 'delivered') => {
  if (status === 'processing') {
    return {
      classes: 'bg-amber-100 text-amber-900 border-amber-300',
      label: '⏳ Sedang Diracik & Dikemas CDOB',
    };
  }
  if (status === 'ready_to_ship') {
    return {
      classes: 'bg-sky-100 text-sky-900 border-sky-300',
      label: '📦 Siap Diambil Kurir',
    };
  }
  return {
    classes: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    label: '✅ Terkirim ke Pasien',
  };
};

type OrdersQueueViewProps = {
  orders: PaidOrder[];
  onUpdateStatus: (
    orderId: string,
    nextStatus: 'processing' | 'ready_to_ship' | 'delivered',
  ) => void;
};

/**
 * Renders the queue of customer orders that have completed payment.
 *
 * @param props Component properties containing orders and status updater.
 * @returns JSX element representing the orders queue table and cards.
 */
export function OrdersQueueView(props: OrdersQueueViewProps) {
  const [filter, setFilter] = useState<'all' | 'processing' | 'ready_to_ship' | 'delivered'>('all');

  const filteredOrders = props.orders.filter((order) => {
    if (filter === 'processing') {
      return order.fulfillmentStatus === 'processing';
    }
    if (filter === 'ready_to_ship') {
      return order.fulfillmentStatus === 'ready_to_ship';
    }
    if (filter === 'delivered') {
      return order.fulfillmentStatus === 'delivered';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Informative Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/40 p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-lg text-white shadow-sm">
            💳
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Antrean Pesanan Pembeli (SaaS Pay-to-Process)
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Sesuai SOP Nyopharma, obat hanya diproses dan diracik setelah sistem memverifikasi
              pembayaran lunas (100% Guaranteed Payment).
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-emerald-800">
          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
          <span>Sinkronisasi Pembayaran Real-Time</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFilter('all');
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Pesanan ({props.orders.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter('processing');
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'processing'
                ? 'bg-amber-600 text-white'
                : 'border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Perlu Diracik ({props.orders.filter((o) => o.fulfillmentStatus === 'processing').length}
            )
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter('ready_to_ship');
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'ready_to_ship'
                ? 'bg-sky-700 text-white'
                : 'border border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100'
            }`}
          >
            Siap Pickup Kurir (
            {props.orders.filter((o) => o.fulfillmentStatus === 'ready_to_ship').length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter('delivered');
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === 'delivered'
                ? 'bg-emerald-700 text-white'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Selesai ({props.orders.filter((o) => o.fulfillmentStatus === 'delivered').length})
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500">
          Standar Pengemasan: CDOB BPOM No. 9/2019
        </span>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <span className="text-4xl">📦</span>
          <h3 className="mt-3 text-base font-bold text-slate-800">
            Tidak Ada Pesanan Pada Kategori Ini
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Pesanan dari katalog pembeli yang telah lunas akan muncul secara otomatis di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.fulfillmentStatus);
            const cleanPhone = order.customerPhone.replaceAll(/[^\d]/gu, '');
            const waPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
            const waMessage = encodeURIComponent(
              `Halo ${order.customerName}, kami dari Apotek Nyopharma mengonfirmasi pesanan Anda No. ${order.orderNumber}. Obat telah kami racik dan segel sesuai standar CDOB BPOM.`,
            );

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5 sm:flex-row sm:items-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-black tracking-wider text-emerald-800">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">Dibayar pukul {order.paidAt}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      <span>✓</span>
                      <span>LUNAS ({order.paymentMethod})</span>
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${badge.classes}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Order Details Body */}
                <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-3">
                  {/* Left Column: Customer & Delivery Info */}
                  <div className="space-y-3 lg:border-r lg:border-slate-100 lg:pr-6">
                    <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Informasi Pemesan & Alamat
                    </p>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
                      <p className="font-mono text-xs text-slate-600">{order.customerPhone}</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                      <p className="font-semibold text-slate-700">Tujuan Pengiriman:</p>
                      <p className="mt-1 leading-relaxed">{order.shippingAddress}</p>
                    </div>
                  </div>

                  {/* Middle Column: Items Ordered */}
                  <div className="space-y-3 lg:border-r lg:border-slate-100 lg:pr-6">
                    <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Item Sediaan Obat ({order.items.length} Macam)
                    </p>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-[11px] text-slate-500">
                              {item.quantity} x {formatIdr(item.price)} ({item.unit})
                            </p>
                          </div>
                          <span className="font-bold text-slate-800">
                            {formatIdr(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Financial & Packaging Summary */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        Rincian SaaS Transaksi
                      </p>
                      <div className="space-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal Obat:</span>
                          <span className="font-medium">{formatIdr(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Segel CDOB & Kemasan:</span>
                          <span className="font-medium">
                            {order.packagingFee === 0 ? 'Gratis' : formatIdr(order.packagingFee)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                          <span>Total Diterima Apotek:</span>
                          <span className="text-emerald-700">{formatIdr(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pharmacist Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <a
                        href={`https://wa.me/${waPhone}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
                      >
                        <span>💬</span>
                        <span>WA Pasien</span>
                      </a>

                      {order.fulfillmentStatus === 'processing' && (
                        <button
                          type="button"
                          onClick={() => {
                            props.onUpdateStatus(order.id, 'ready_to_ship');
                          }}
                          className="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                        >
                          📦 Kemas & Siap Kirim
                        </button>
                      )}

                      {order.fulfillmentStatus === 'ready_to_ship' && (
                        <button
                          type="button"
                          onClick={() => {
                            props.onUpdateStatus(order.id, 'delivered');
                          }}
                          className="flex-1 rounded-xl bg-sky-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-800"
                        >
                          🚚 Serahkan ke Kurir
                        </button>
                      )}

                      {order.fulfillmentStatus === 'delivered' && (
                        <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800">
                          ✓ Pesanan Selesai
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
