'use client';

import { IconCheck, IconMapPin, IconTruck, IconX } from '@tabler/icons-react';
import type { CustomerOrder } from '@/data/customerData';

type OrderTrackingModalProps = {
  order: CustomerOrder;
  onClose: () => void;
};

function getStepDotClass(isCompleted: boolean, isCurrent: boolean) {
  if (isCompleted) {
    return 'border-emerald-600 bg-emerald-600 text-white shadow-xs';
  }
  if (isCurrent) {
    return 'border-sky-500 bg-white text-sky-600 animate-pulse';
  }
  return 'border-slate-300 bg-white text-slate-300';
}

/**
 * Interactive Live Order Tracking Modal with pharmacy cold-chain and CDOB timeline.
 *
 * @param props Component properties containing the order and close callback.
 * @returns JSX element for the order tracking modal.
 */
export function OrderTrackingModal(props: OrderTrackingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <IconTruck className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-slate-900">
                Pelacakan Pengiriman CDOB
              </h2>
              <p className="text-xs text-slate-500">
                No. Resep/Pesanan:{' '}
                <span className="font-mono font-semibold text-slate-700">
                  {props.order.orderNumber}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 text-sm text-slate-700">
          {/* Status highlight banner */}
          <div className="rounded-2xl border border-emerald-200/80 bg-linear-to-r from-emerald-50 to-teal-50/70 p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
                  Status Terkini
                </span>
                <p className="text-base font-black text-emerald-950">{props.order.statusLabel}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${props.order.statusBadgeClass}`}
              >
                {props.order.status === 'delivered' ? 'Selesai' : 'Aktif'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-emerald-200/60 pt-3 text-xs sm:grid-cols-2">
              <div>
                <span className="text-slate-500">Ekspedisi Khusus:</span>
                <p className="font-semibold text-slate-800">{props.order.courierName}</p>
              </div>
              <div>
                <span className="text-slate-500">Standar Pengemasan:</span>
                <p className="font-semibold text-slate-800">{props.order.packagingType}</p>
              </div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="mt-6">
            <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Riwayat Proses Penyerahan Sediaan
            </h3>

            <div className="relative mt-4 pl-6 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-0.5 before:bg-slate-200">
              {props.order.trackingSteps.map((step) => (
                <div key={step.stepNumber} className="relative pb-6 last:pb-0">
                  {/* Circle icon on timeline bar */}
                  <div
                    className={`absolute -left-6 flex size-5 items-center justify-center rounded-full border-2 ${getStepDotClass(
                      step.isCompleted,
                      step.isCurrent,
                    )}`}
                  >
                    {step.isCompleted ? (
                      <IconCheck className="size-3" stroke={3} />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current" />
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <span
                      className={`text-xs font-bold ${
                        step.isCompleted || step.isCurrent ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{step.time}</span>
                  </div>

                  <p
                    className={`mt-1 text-xs leading-relaxed ${
                      step.isCompleted || step.isCurrent ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Items Summary in this Order */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Sediaan dalam Pengiriman ({props.order.items.length} Item)</span>
              <span className="font-mono text-emerald-800">
                Rp {props.order.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="mt-2.5 divide-y divide-slate-100">
              {props.order.items.map((item) => (
                <div
                  key={item.medicationId}
                  className="flex items-center justify-between py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-slate-400">x{item.quantity}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-600">
                    {item.formattedPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4 sm:px-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <IconMapPin className="size-4 text-emerald-600" />
            <span>Pengantaran Khusus Berizin Kemenkes</span>
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-98"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
