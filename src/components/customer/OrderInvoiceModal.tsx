'use client';

import { IconCheck, IconPrinter, IconReceipt, IconX } from '@tabler/icons-react';
import type { CustomerOrder } from '@/data/customerData';

type OrderInvoiceModalProps = {
  order: CustomerOrder;
  customerName: string;
  customerAddress: string;
  onClose: () => void;
};

/**
 * Official Digital Pharmacy Invoice & Prescription Receipt Modal.
 *
 * @param props Invoice modal properties containing order and customer info.
 * @returns JSX element for the digital invoice modal.
 */
export function OrderInvoiceModal(props: OrderInvoiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <IconReceipt className="size-4 text-emerald-700" />
            <span>Faktur Resmi Penyerahan Obat Apotek</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
            >
              <IconPrinter className="size-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={props.onClose}
              aria-label="Tutup faktur"
              className="cursor-pointer rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
            >
              <IconX className="size-4.5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Pharmacy Letterhead */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-700 text-sm font-black text-white">
                  ✚
                </span>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Apotek Nyo<span className="text-emerald-700">pharma</span>
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                PT Nyopharma Sehat Indonesia • SIA No: 445/SIA/0192/B/2021
              </p>
              <p className="text-xs text-slate-500">
                SIPA APJ: 19920814/SIPA_31.71/2021/2048 (apt. Sarah Ramadhani)
              </p>
              <p className="text-xs text-slate-500">
                Jl. Farmasi Sehat Medika No. 12, Senayan, Jakarta Pusat
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-[#edf7f2] p-3 text-right sm:text-right">
              <span className="block text-[10px] font-extrabold tracking-wider text-emerald-800 uppercase">
                Bukti Pembayaran Lunas
              </span>
              <span className="mt-0.5 block font-mono text-sm font-black text-slate-900">
                {props.order.orderNumber}
              </span>
              <span className="text-[11px] text-slate-500">
                {props.order.orderDate} • {props.order.orderTime}
              </span>
            </div>
          </div>

          {/* Patient Details & Shipping Info */}
          <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 text-xs sm:grid-cols-2">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">
                Diberikan Kepada (Pasien):
              </span>
              <span className="mt-0.5 block font-bold text-slate-900">{props.customerName}</span>
              <span className="mt-0.5 block text-slate-600">Alamat: {props.customerAddress}</span>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">
                Metode Pembayaran & Pengiriman:
              </span>
              <span className="mt-0.5 block font-bold text-slate-900">
                {props.order.paymentMethod}
              </span>
              <span className="mt-0.5 block text-slate-600">
                Pengiriman: {props.order.courierService}
              </span>
            </div>
          </div>

          {/* Table of Medications */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-100/75 text-[11px] font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-2.5">Sediaan Obat / Alkes</th>
                  <th className="px-3 py-2.5 text-center">Jumlah</th>
                  <th className="px-3 py-2.5 text-right">Harga Satuan</th>
                  <th className="px-4 py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {props.order.items.map((it) => (
                  <tr key={it.medicationId}>
                    <td className="px-4 py-3">
                      <span className="block font-bold text-slate-900">{it.name}</span>
                      <span className="block text-[11px] text-slate-500">
                        {it.genericName} • {it.unit}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center font-mono font-semibold text-slate-800">
                      {it.quantity}
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-slate-600">
                      Rp {it.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                      {it.formattedPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Pharmacist Stamp */}
          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            {/* Pharmacist Stamp and Signature */}
            <div className="flex items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 text-center">
                <span className="text-[9px] font-black text-emerald-800 uppercase">
                  Nyopharma Verified
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                <span className="block font-bold text-slate-800">
                  apt. Sarah Ramadhani, S.Farm.
                </span>
                <span>Apoteker Penanggung Jawab (APJ)</span>
                <span className="block text-[10px] text-emerald-700">
                  CDOB Certified No: 092/CDOB/BPOM/2022
                </span>
              </div>
            </div>

            {/* Calculations */}
            <div className="w-full sm:w-64">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Obat</span>
                  <span className="font-mono">
                    Rp {props.order.subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kemasan Segel CDOB</span>
                  <span className="font-mono text-emerald-700">
                    {props.order.packagingFee === 0
                      ? 'GRATIS'
                      : `Rp ${props.order.packagingFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
                  <span>Total Tagihan Lunas</span>
                  <span className="font-mono text-emerald-800">
                    Rp {props.order.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <IconCheck className="size-4 text-emerald-600" />
            <span>Faktur sah terdaftar di sistem farmasi digital Kemenkes RI</span>
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="cursor-pointer rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
