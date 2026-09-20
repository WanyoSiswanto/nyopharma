'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { getStoredPaidOrders, updateOrderFulfillment } from '@/data/cartStore';
import type { PaidOrder } from '@/data/medicationsData';
import { OrdersQueueView } from './OrdersQueueView';

type PrescriptionItem = {
  id: string;
  code: string;
  patientName: string;
  patientAge: string;
  doctor: string;
  hospital: string;
  medications: string[];
  clinicalNote: string;
  hasInteractionWarning: boolean;
  status: 'pending' | 'urgent' | 'dispensing' | 'ready';
  time: string;
};

type CriticalStockItem = {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  pbfDistributor: string;
  fefoDate: string;
};

const INITIAL_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: 'rx-101',
    code: 'RX-2026-0891',
    patientName: 'Ny. Hendrawan (58 th)',
    patientAge: '58 th (Geriatri)',
    doctor: 'dr. Budi Santoso, Sp.JP',
    hospital: 'RS Jantung Harapan Sehat',
    medications: ['Amlodipine 10mg (1x1)', 'Atorvastatin 20mg (0-0-1)', 'Bisoprolol 2.5mg (1x1)'],
    clinicalNote: 'Dosis aman untuk pasien geriatri. Fungsi ginjal & tensi terpantau.',
    hasInteractionWarning: false,
    status: 'urgent',
    time: '8 menit yang lalu',
  },
  {
    id: 'rx-102',
    code: 'RX-2026-0892',
    patientName: 'Tn. Arya Wijaya (42 th)',
    patientAge: '42 th',
    doctor: 'dr. Ratna Sari, Sp.PD-KEMD',
    hospital: 'Klinik Spesialis Penyakit Dalam',
    medications: [
      'Metformin 500mg (3x1 dc)',
      'Glimepiride 2mg (1x1 ac)',
      'Lantus Insulin Pen (1x10 IU)',
    ],
    clinicalNote:
      '⚠️ Peringatan: Edukasi pasien mengenai tanda hipoglikemia & cara injeksi Lantus dingin.',
    hasInteractionWarning: true,
    status: 'urgent',
    time: '14 menit yang lalu',
  },
  {
    id: 'rx-103',
    code: 'RX-2026-0893',
    patientName: 'An. Keisha (6 th)',
    patientAge: '6 th (Pediatri)',
    doctor: 'dr. Maya Farida, Sp.A',
    hospital: 'RSIA Kasih Ibu',
    medications: ['Amoxicillin Clavulanate Syr 60ml (3x1 cth)', 'Paracetamol Drop (prn)'],
    clinicalNote: 'Perhitungan dosis berdasarkan BB 19kg terverifikasi tepat.',
    hasInteractionWarning: false,
    status: 'dispensing',
    time: '25 menit yang lalu',
  },
  {
    id: 'rx-104',
    code: 'RX-2026-0894',
    patientName: 'Ibu Ratri Kumala (34 th)',
    patientAge: '34 th',
    doctor: 'dr. Gunawan, Sp.P',
    hospital: 'RS Paru Utama',
    medications: ['Symbicort Turbuhaler 160/4.5 (2x1 puff)', 'Cetirizine 10mg (1x1 malam)'],
    clinicalNote:
      'Etiket petunjuk inhaler siap cetak. Pasien minta konseling cara berkumur pasca inhalasi.',
    hasInteractionWarning: false,
    status: 'ready',
    time: '42 menit yang lalu',
  },
];

const CRITICAL_STOCK: CriticalStockItem[] = [
  {
    id: 'st-01',
    name: 'Lantus Solostar Insulin Pen 100 IU/ml',
    category: 'Cold-Chain (2-8°C)',
    currentStock: 3,
    minStock: 12,
    unit: 'Pen 3ml',
    pbfDistributor: 'PT Mensa Bina Sukses',
    fefoDate: 'Okt 2027',
  },
  {
    id: 'st-02',
    name: 'Cefixime Trihydrate 200mg Kapsul',
    category: 'Antibiotik Keras (G)',
    currentStock: 8,
    minStock: 30,
    unit: 'Strip @10',
    pbfDistributor: 'PT Kimia Farma Trading',
    fefoDate: 'Feb 2028',
  },
  {
    id: 'st-03',
    name: 'Salbutamol Inhaler 100mcg',
    category: 'Sistem Pernapasan',
    currentStock: 2,
    minStock: 10,
    unit: 'Inhaler Canister',
    pbfDistributor: 'PT Anugrah Argon Medica',
    fefoDate: 'Nov 2027',
  },
  {
    id: 'st-04',
    name: 'Paracetamol Drops Pediatri 15ml',
    category: 'Pediatri & Sirup',
    currentStock: 4,
    minStock: 20,
    unit: 'Botol',
    pbfDistributor: 'PT Enseval Putera Megatrading',
    fefoDate: 'Jul 2028',
  },
];

const getSeverityDetails = (severity: 'contraindicated' | 'major' | 'moderate' | 'safe') => {
  if (severity === 'contraindicated') {
    return {
      classes: 'bg-rose-50 border-rose-300 text-rose-950',
      icon: '⛔',
      label: 'KONTRAINDIKASI KLINIS',
    };
  }
  if (severity === 'major') {
    return {
      classes: 'bg-amber-50 border-amber-300 text-amber-950',
      icon: '⚠️',
      label: 'PERINGATAN MAYOR',
    };
  }
  return {
    classes: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    icon: '✅',
    label: 'KOMPATIBEL & AMAN',
  };
};

const INITIAL_DEMO_ORDERS: PaidOrder[] = [
  {
    id: 'ord-demo-01',
    orderNumber: 'NYO-ORD-202609-8821',
    customerName: 'Ny. Dewi Sartika',
    customerPhone: '081298765432',
    shippingAddress: 'Jl. Cikini Raya No. 45, Menteng, Jakarta Pusat',
    items: [
      {
        medicationId: 'med-01',
        name: 'Paracetamol 500 mg Kaplet',
        quantity: 2,
        price: 8500,
        unit: 'Strip @ 10 Kaplet',
      },
      {
        medicationId: 'med-03',
        name: 'Ester-C 500 mg + Citrus Bioflavonoids',
        quantity: 1,
        price: 48_000,
        unit: 'Botol @ 30 Tablet',
      },
    ],
    subtotal: 65_000,
    packagingFee: 0,
    totalAmount: 65_000,
    paymentMethod: 'QRIS Instan',
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    paidAt: '13:42',
  },
  {
    id: 'ord-demo-02',
    orderNumber: 'NYO-ORD-202609-7734',
    customerName: 'Tn. Hendra Gunawan',
    customerPhone: '081345678901',
    shippingAddress: 'Apartemen Sudirman Park Tower B Lt. 12, Jakarta Selatan',
    items: [
      {
        medicationId: 'med-04',
        name: 'Amlodipine Besylate 10 mg',
        quantity: 2,
        price: 35_000,
        unit: 'Strip @ 10 Tablet',
      },
    ],
    subtotal: 70_000,
    packagingFee: 0,
    totalAmount: 70_000,
    paymentMethod: 'BCA Virtual Account',
    paymentStatus: 'paid',
    fulfillmentStatus: 'ready_to_ship',
    paidAt: '12:15',
  },
];

export function PharmacyDashboard(_props: { locale: string }) {
  const t = useTranslations('Dashboard');
  const [activeTab, setActiveTab] = useState<'rx' | 'orders' | 'stock' | 'checker'>('rx');
  const [filterStatus, setFilterStatus] = useState<'all' | 'urgent' | 'dispensing'>('all');
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(INITIAL_PRESCRIPTIONS);
  const [paidOrders, setPaidOrders] = useState<PaidOrder[]>(() => {
    const stored = getStoredPaidOrders();
    return stored.length > 0 ? stored : INITIAL_DEMO_ORDERS;
  });
  const [selectedRx, setSelectedRx] = useState<PrescriptionItem | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Interaction checker state
  const [drugA, setDrugA] = useState('Simvastatin');
  const [drugB, setDrugB] = useState('Gemfibrozil');
  const [checkerResult, setCheckerResult] = useState<{
    severity: 'contraindicated' | 'major' | 'moderate' | 'safe';
    summary: string;
    clinicalAction: string;
  }>({
    severity: 'contraindicated',
    summary:
      'Kombinasi Simvastatin dan Gemfibrozil sangat meningkatkan konsentrasi statin dalam darah hingga 3-5x lipat.',
    clinicalAction:
      'KONTRAINDIKASI: Tingkat risiko rhabdomyolysis & miopati parah sangat tinggi. Rekomendasi apoteker: Gunakan alternatif Fenofibrate atau konsultasikan ke dokter penanggung jawab untuk titrasi statin tunggal.',
  });

  const handleApproveRx = (id: string) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === id) {
          const nextStatus = rx.status === 'urgent' ? 'dispensing' : 'ready';
          return { ...rx, status: nextStatus };
        }
        return rx;
      }),
    );
    setNotificationMsg(
      'Resep berhasil diverifikasi! Etiket digital telah dicetak untuk sistem dispensing.',
    );
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3500);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    nextStatus: 'processing' | 'ready_to_ship' | 'delivered',
  ) => {
    updateOrderFulfillment(orderId, nextStatus);
    setPaidOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, fulfillmentStatus: nextStatus } : ord)),
    );
    let msg = 'Status pesanan berhasil diperbarui.';
    if (nextStatus === 'ready_to_ship') {
      msg = 'Pesanan dikonfirmasi telah dikemas CDOB & siap di-pickup!';
    } else if (nextStatus === 'delivered') {
      msg = 'Pesanan berhasil diserahkan ke kurir pengiriman.';
    }
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3500);
  };

  const handleRunInteractionCheck = () => {
    if (
      (drugA.toLowerCase().includes('simva') && drugB.toLowerCase().includes('gemfi')) ||
      (drugB.toLowerCase().includes('simva') && drugA.toLowerCase().includes('gemfi'))
    ) {
      setCheckerResult({
        severity: 'contraindicated',
        summary: 'Kombinasi Simvastatin dan Gemfibrozil meningkatkan kadar serum statin drastis.',
        clinicalAction:
          'KONTRAINDIKASI: Risiko rhabdomyolysis tinggi. Sarankan penggantian ke fenofibrate atau ezetimibe.',
      });
    } else if (
      (drugA.toLowerCase().includes('warfa') && drugB.toLowerCase().includes('cipro')) ||
      (drugB.toLowerCase().includes('warfa') && drugA.toLowerCase().includes('cipro'))
    ) {
      setCheckerResult({
        severity: 'major',
        summary: 'Ciprofloxacin menghambat metabolisme CYP2C9 pada Warfarin.',
        clinicalAction:
          'MAYOR: Peningkatan INR dan risiko pendarahan. Pantau ketat nilai PT/INR atau pilih antibiotik alternatif.',
      });
    } else {
      setCheckerResult({
        severity: 'safe',
        summary: `Tidak ditemukan interaksi berbahaya yang signifikan antara ${drugA} dan ${drugB}.`,
        clinicalAction:
          'AMAN: Dapat diberikan bersamaan sesuai petunjuk waktu minum (ac/dc) dan jeda konsumsi yang direkomendasikan.',
      });
    }
  };

  const filteredPrescriptions = prescriptions.filter((rx) => {
    if (filterStatus === 'urgent') {
      return rx.status === 'urgent';
    }
    if (filterStatus === 'dispensing') {
      return rx.status === 'dispensing';
    }
    return true;
  });

  const severityDetails = getSeverityDetails(checkerResult.severity);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-800 px-5 py-3.5 text-white shadow-2xl">
          <span className="text-xl">✅</span>
          <p className="text-sm font-semibold">{notificationMsg}</p>
        </div>
      )}

      {/* Top Banner: Real-time Pharmacy Facility Status */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {t('pharmacy_status')}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t('welcome_back')}{' '}
              <span className="text-emerald-400">apt. Sarah Ramadhani, S.Farm.</span>
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Apoteker Penanggung Jawab (APJ) • SIPA: 19920814/SIPA_31.71/2021/2048
            </p>
          </div>

          {/* CDOB Environmental Monitor */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5">
              <span className="text-base">🌡️</span>
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Ruang Obat
                </p>
                <p className="text-xs font-bold text-emerald-400">
                  21.8°C <span className="text-[10px] font-normal text-slate-400">(Optimal)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5">
              <span className="text-base">❄️</span>
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Chiller Vaksin
                </p>
                <p className="text-xs font-bold text-sky-400">
                  3.6°C <span className="text-[10px] font-normal text-slate-400">(Aman 2-8°)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5">
              <span className="text-base">💧</span>
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Kelembaban
                </p>
                <p className="text-xs font-bold text-emerald-300">54% RH</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-lg font-bold text-amber-600">
              📋
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              Perlu Ditinjau
            </span>
          </div>
          <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
            {t('kpi_pending_rx')}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">12</span>
            <span className="text-xs font-semibold text-amber-700">2 butuh konfirmasi</span>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg font-bold text-emerald-600">
              📦
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              Siap Kirim
            </span>
          </div>
          <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
            {t('kpi_ready_dispatch')}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">28</span>
            <span className="text-xs font-semibold text-emerald-700">100% tersertifikasi</span>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/70 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-lg font-bold text-sky-700">
              💬
            </span>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">
              Tele-Farmasi
            </span>
          </div>
          <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
            {t('kpi_consultations')}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">7</span>
            <span className="text-xs font-semibold text-sky-700">4 pasien geriatri</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/10 text-lg font-bold text-slate-800">
              📈
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              +12.4%
            </span>
          </div>
          <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
            {t('kpi_revenue')}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">Rp 14,85 Jt</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-8" aria-label="Tabs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('rx');
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'rx'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            <span>📑</span>
            <span>{t('tab_prescriptions')}</span>
            <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {prescriptions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('orders');
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            <span>🛍️</span>
            <span>Pesanan Lunas (SaaS)</span>
            <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {paidOrders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('stock');
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'stock'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            <span>⚠️</span>
            <span>{t('tab_inventory')}</span>
            <span className="ml-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
              {CRITICAL_STOCK.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('checker');
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'checker'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            <span>🔬</span>
            <span>{t('tab_clinical')}</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: Prescription Screening Queue */}
      {activeTab === 'rx' && (
        <div className="space-y-4">
          {/* Quick Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus('all');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t('quick_filter_all')} ({prescriptions.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus('urgent');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  filterStatus === 'urgent'
                    ? 'bg-amber-600 text-white'
                    : 'border border-amber-200/60 bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                {t('quick_filter_urgent')} (2)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus('dispensing');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  filterStatus === 'dispensing'
                    ? 'bg-sky-700 text-white'
                    : 'border border-sky-200/60 bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                {t('quick_filter_dispensing')} (1)
              </button>
            </div>
            <div className="text-xs font-medium text-slate-500">
              Standar Skrining: Permenkes No. 73 Tahun 2016
            </div>
          </div>

          {/* Prescriptions List */}
          <div className="space-y-4">
            {filteredPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-center">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200/60 bg-emerald-50 text-sm font-bold text-emerald-700">
                      Rx
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {rx.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{rx.patientName}</span>
                        <span className="text-xs font-medium text-slate-500">
                          ({rx.patientAge})
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Dokter: <span className="font-semibold text-slate-700">{rx.doctor}</span> •{' '}
                        {rx.hospital}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400">{rx.time}</span>
                    {rx.status === 'urgent' && (
                      <span className="rounded-full border border-amber-300/60 bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                        ⚡ Butuh Skrining
                      </span>
                    )}
                    {rx.status === 'dispensing' && (
                      <span className="rounded-full border border-sky-300/60 bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800">
                        🔄 Dalam Peracikan
                      </span>
                    )}
                    {rx.status === 'ready' && (
                      <span className="rounded-full border border-emerald-300/60 bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                        ✅ Siap Diserahkan
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 py-3.5 text-xs md:grid-cols-2">
                  <div>
                    <p className="mb-2 font-semibold tracking-wider text-slate-400 uppercase">
                      Rincian Obat yang Diresepkan:
                    </p>
                    <ul className="space-y-1.5">
                      {rx.medications.map((med, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 font-medium text-slate-800"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold tracking-wider text-slate-400 uppercase">
                      Analisis Skrining Farmasi:
                    </p>
                    <div
                      className={`rounded-xl border p-3 text-xs leading-relaxed ${
                        rx.hasInteractionWarning
                          ? 'border-amber-300 bg-amber-50/80 font-medium text-amber-900'
                          : 'border-emerald-200/80 bg-emerald-50/50 text-emerald-900'
                      }`}
                    >
                      {rx.clinicalNote}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRx(rx);
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      🔍 Rincian Pasien & SIP
                    </button>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20kami%20dari%20Apotek%20Nyopharma%20ingin%20mengonfirmasi%20resep%20Anda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-200/60 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      <span>💬</span>
                      <span>{t('btn_whatsapp')}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {rx.status === 'ready' ? (
                      <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        ✓ Resep Tuntas & Terverifikasi
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleApproveRx(rx.id);
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                      >
                        <span>✓</span>
                        <span>
                          {rx.status === 'urgent' ? t('btn_approve') : 'Tandai Siap Diambil'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SaaS Verified Paid Orders Queue */}
      {activeTab === 'orders' && (
        <OrdersQueueView orders={paidOrders} onUpdateStatus={handleUpdateOrderStatus} />
      )}

      {/* TAB 3: Critical Stock & FEFO Inventory Control */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-bold">Peringatan Reorder Point (ROP) & Kadaluarsa</p>
                <p className="mt-0.5 text-xs text-rose-800">{t('stock_low_notice')}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setNotificationMsg('Draft Surat Pesanan (SP) otomatis dikirimkan ke PBF rekanan.');
                setTimeout(() => {
                  setNotificationMsg(null);
                }, 3500);
              }}
              className="shrink-0 rounded-xl bg-rose-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-rose-800"
            >
              {t('btn_create_po')}
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-3.5">Nama Sediaan & Kategori</th>
                    <th className="px-5 py-3.5">Stok Saat Ini</th>
                    <th className="px-5 py-3.5">Batas Minimal (ROP)</th>
                    <th className="px-5 py-3.5">Distributor Resmi (PBF)</th>
                    <th className="px-5 py-3.5">Kadaluarsa (FEFO)</th>
                    <th className="px-5 py-3.5 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CRITICAL_STOCK.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <span className="mt-0.5 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-extrabold text-rose-600">
                          {item.currentStock} {item.unit}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {item.minStock} {item.unit}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700">
                        {item.pbfDistributor}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded border border-amber-200 bg-amber-50 px-2 py-1 font-mono font-bold text-amber-800">
                          {item.fefoDate}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setNotificationMsg(
                              `Order dibuat untuk ${item.name} ke ${item.pbfDistributor}`,
                            );
                            setTimeout(() => {
                              setNotificationMsg(null);
                            }, 3500);
                          }}
                          className="rounded-lg border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
                        >
                          + Order SP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Clinical Drug Interaction Checker */}
      {activeTab === 'checker' && (
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span>🔬</span>
              <span>Modul Skrining Klinis Farmakoterapi</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Pemeriksaan Interaksi Obat & Kontraindikasi
            </h2>
            <p className="mt-1 max-w-2xl text-xs text-slate-500">
              Gunakan modul ini sebelum memvalidasi resep untuk mendeteksi interaksi farmakokinetik
              dan farmakodinamik berbahaya.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200/70 bg-slate-50 p-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="drugA"
                className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
              >
                Obat Pertama (Kandidat A)
              </label>
              <input
                id="drugA"
                type="text"
                value={drugA}
                onChange={(e) => {
                  setDrugA(e.target.value);
                }}
                placeholder="Contoh: Simvastatin, Warfarin, Metformin"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="drugB"
                className="mb-1.5 block text-xs font-bold tracking-wider text-slate-700 uppercase"
              >
                Obat Kedua (Kandidat B)
              </label>
              <input
                id="drugB"
                type="text"
                value={drugB}
                onChange={(e) => {
                  setDrugB(e.target.value);
                }}
                placeholder="Contoh: Gemfibrozil, Ciprofloxacin"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setDrugA('Simvastatin');
                  setDrugB('Gemfibrozil');
                }}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                Coba: Simvastatin + Gemfibrozil
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrugA('Warfarin');
                  setDrugB('Ciprofloxacin');
                }}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                Coba: Warfarin + Cipro
              </button>
            </div>

            <button
              type="button"
              onClick={handleRunInteractionCheck}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
            >
              🔍 Analisis Interaksi Sekarang
            </button>
          </div>

          {/* Checker Result Panel */}
          <div className={`rounded-2xl border p-6 ${severityDetails.classes}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">{severityDetails.icon}</span>
              <h3 className="text-sm font-extrabold tracking-wider uppercase">
                Status Interaksi: {severityDetails.label}
              </h3>
            </div>
            <p className="mb-2 text-sm font-semibold">{checkerResult.summary}</p>
            <div className="mt-3 border-t border-black/10 pt-3 text-xs leading-relaxed font-medium">
              <span className="font-bold">Rekomendasi Farmakoterapi: </span>
              {checkerResult.clinicalAction}
            </div>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Lembar Skrining Resep: {selectedRx.code}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedRx(null);
                }}
                className="p-1 text-xl font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong className="text-slate-800">Pasien:</strong> {selectedRx.patientName}
              </p>
              <p>
                <strong className="text-slate-800">Dokter Penulis Resep:</strong>{' '}
                {selectedRx.doctor}
              </p>
              <p>
                <strong className="text-slate-800">Fasilitas Kesehatan:</strong>{' '}
                {selectedRx.hospital}
              </p>
              <p>
                <strong className="text-slate-800">Daftar Obat:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-5">
                {selectedRx.medications.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-1 font-semibold text-slate-800">Catatan Apoteker:</p>
                <p>{selectedRx.clinicalNote}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRx(null);
                }}
                className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApproveRx(selectedRx.id);
                  setSelectedRx(null);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
              >
                Setujui Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
