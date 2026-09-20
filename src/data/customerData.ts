import { getStoredPaidOrders } from '@/data/cartStore';
import { MEDICATIONS_DATA } from '@/data/medicationsData';

export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  avatarInitials: string;
  avatarBg: string;
  memberTier: string;
  memberTierBadgeClass: string;
  rewardPoints: number;
  verifiedBadge: string;
};

type TrackingStep = {
  stepNumber: number;
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
};

type CustomerOrderItem = {
  medicationId: string;
  name: string;
  genericName: string;
  quantity: number;
  price: number;
  formattedPrice: string;
  unit: string;
  image: string;
  categoryLabel: string;
};

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  orderTime: string;
  status: 'in_transit' | 'delivered' | 'processing';
  statusLabel: string;
  statusBadgeClass: string;
  courierName: string;
  courierService: string;
  packagingType: string;
  paymentMethod: string;
  subtotal: number;
  packagingFee: number;
  totalAmount: number;
  items: CustomerOrderItem[];
  trackingSteps: TrackingStep[];
};

export type DigitalPrescription = {
  id: string;
  prescriptionNumber: string;
  doctorName: string;
  clinicName: string;
  issuedDate: string;
  status: 'verified' | 'fulfilled' | 'active';
  statusLabel: string;
  statusBadgeClass: string;
  diagnosis: string;
  prescribedDrugs: string[];
  pharmacistNotes: string;
};

export type RefillReminder = {
  id: string;
  medicationName: string;
  genericName: string;
  dosageSchedule: string;
  remainingDays: number;
  refillDueDate: string;
  packSize: string;
  price: number;
  formattedPrice: string;
  productId: string;
};

const customerBudi: CustomerProfile = {
  id: 'cust-budi',
  name: 'Bpk. Ir. Budi Santoso',
  email: 'budi.santoso@gmail.com',
  phone: '0812-9876-5432',
  address: 'Jl. Melati Indah No. 42, Cluster Alam Segar, BSD City',
  city: 'Tangerang Selatan',
  postalCode: '15310',
  avatarInitials: 'BS',
  avatarBg: 'bg-emerald-700 text-white',
  memberTier: 'Member Gold Prioritas',
  memberTierBadgeClass: 'bg-amber-100 text-amber-900 border-amber-300/80',
  rewardPoints: 1250,
  verifiedBadge: 'Pasien Terverifikasi Kemenkes RI',
};

const customerRatna: CustomerProfile = {
  id: 'cust-ratna',
  name: 'Ibu Ratna Wardani',
  email: 'ratna.wardani@yahoo.co.id',
  phone: '0813-1122-3344',
  address: 'Jl. Kemang Raya No. 18, RT 04/RW 02, Bangka, Mampang',
  city: 'Jakarta Selatan',
  postalCode: '12730',
  avatarInitials: 'RW',
  avatarBg: 'bg-teal-700 text-white',
  memberTier: 'Member Sehat Plus',
  memberTierBadgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300/80',
  rewardPoints: 840,
  verifiedBadge: 'Pasien Terverifikasi Kemenkes RI',
};

export const DEMO_CUSTOMERS: CustomerProfile[] = [customerBudi, customerRatna];
export const DEFAULT_CUSTOMER: CustomerProfile = customerBudi;

const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'NYO-ORD-202609-8421',
    customerId: 'cust-budi',
    orderDate: '20 Sep 2026',
    orderTime: '11:45 WIB',
    status: 'in_transit',
    statusLabel: 'Dalam Pengiriman Kurir Segel CDOB',
    statusBadgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    courierName: 'Kurir Farmasi Khusus (Pak Joko - Motor Bersekat Termal)',
    courierService: 'Pengantaran Khusus CDOB 2 Jam Sampai',
    packagingType: 'Segel Tamper-Evident Anti-Rusak & Suhu Terkendali 20-25°C',
    paymentMethod: 'QRIS Instant Payment (Lunas)',
    subtotal: 315_000,
    packagingFee: 0,
    totalAmount: 315_000,
    items: [
      {
        medicationId: 'prod-omega3',
        name: 'Omega 3 Fish Oil 1000 mg',
        genericName: 'Natural EPA & DHA Omega-3 Fatty Acids',
        quantity: 1,
        price: 185_000,
        formattedPrice: 'Rp 185.000',
        unit: 'Bottle @ 60 Softgels',
        image: '/assets/images/products/omega3.jpg',
        categoryLabel: 'VITAMIN & IMUNITAS',
      },
      {
        medicationId: 'prod-vitamind3',
        name: 'Vitamin D3 1000 IU',
        genericName: 'Cholecalciferol 1000 IU',
        quantity: 1,
        price: 130_000,
        formattedPrice: 'Rp 130.000',
        unit: 'Bottle @ 120 Chewable Tablets',
        image: '/assets/images/products/vitamind3.jpg',
        categoryLabel: 'VITAMIN & IMUNITAS',
      },
    ],
    trackingSteps: [
      {
        stepNumber: 1,
        title: 'Pesanan Dikonfirmasi & Skrining Apoteker',
        description: 'Apoteker Penanggung Jawab memeriksa kelayakan obat dan tanggal kedaluwarsa.',
        time: '11:45 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 2,
        title: 'Obat Disiapkan & Disegel Anti-Rusak CDOB',
        description: 'Sediaan obat diperiksa ganda dan dibungkus segel hologram standar farmasi.',
        time: '12:05 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 3,
        title: 'Diserahkan ke Kurir Khusus Farmasi',
        description:
          'Kurir khusus farmasi bergerak menuju alamat tujuan di BSD City, Tangerang Selatan.',
        time: '12:20 WIB',
        isCompleted: true,
        isCurrent: true,
      },
      {
        stepNumber: 4,
        title: 'Tiba di Alamat Pasien',
        description: 'Paket diserahkan langsung kepada penerima dengan verifikasi nomor pesanan.',
        time: 'Estimasi 12:55 WIB',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: 'NYO-ORD-202608-1904',
    customerId: 'cust-budi',
    orderDate: '15 Agu 2026',
    orderTime: '09:20 WIB',
    status: 'delivered',
    statusLabel: 'Pesanan Selesai Diterima',
    statusBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    courierName: 'Kurir Farmasi Nyopharma Express',
    courierService: 'Reguler Terjadwal Bersegel',
    packagingType: 'Kemasan Rantai Dingin & Kardus Anti-Bentur',
    paymentMethod: 'Transfer Bank Mandiri Virtual Account',
    subtotal: 153_000,
    packagingFee: 0,
    totalAmount: 153_000,
    items: [
      {
        medicationId: 'med-04',
        name: 'Amlodipine Besylate 10 mg',
        genericName: 'Amlodipine Besylate',
        quantity: 3,
        price: 35_000,
        formattedPrice: 'Rp 105.000',
        unit: '3 Strip @ 10 Tablet',
        image: '/assets/images/products/amlodipine.jpg',
        categoryLabel: 'PERAWATAN KRONIS',
      },
      {
        medicationId: 'med-03',
        name: 'Ester-C 500 mg + Citrus Bioflavonoids',
        genericName: 'Calcium Ascorbate & Bioflavonoid Complex',
        quantity: 1,
        price: 48_000,
        formattedPrice: 'Rp 48.000',
        unit: 'Botol @ 30 Tablet',
        image: '/assets/images/products/esterc.jpg',
        categoryLabel: 'VITAMIN & IMUNITAS',
      },
    ],
    trackingSteps: [
      {
        stepNumber: 1,
        title: 'Pesanan Dikonfirmasi',
        description: 'Resep hipertensi ditelaah kesesuaian dosis oleh apoteker.',
        time: '09:20 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 2,
        title: 'Etiket Aturan Pakai Ditempelkan',
        description: 'Etiket putih aturan 1x sehari diminum pagi hari.',
        time: '09:40 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 3,
        title: 'Kurir Mengantar',
        description: 'Kurir mengantar langsung ke BSD City.',
        time: '10:00 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 4,
        title: 'Diterima oleh Bpk. Budi Santoso',
        description: 'Paket telah diterima dalam kondisi segel utuh.',
        time: '10:42 WIB',
        isCompleted: true,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'ord-103',
    orderNumber: 'NYO-ORD-202607-6520',
    customerId: 'cust-budi',
    orderDate: '10 Jul 2026',
    orderTime: '14:10 WIB',
    status: 'delivered',
    statusLabel: 'Pesanan Selesai Diterima',
    statusBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    courierName: 'Kurir Khusus Alat Kesehatan',
    courierService: 'Asuransi Paket Penuh + Kalibrasi Mandiri',
    packagingType: 'Bubble Wrap Berlapis & Dus Segel Pabrikan',
    paymentMethod: 'BCA Virtual Account (Lunas)',
    subtotal: 385_000,
    packagingFee: 0,
    totalAmount: 385_000,
    items: [
      {
        medicationId: 'med-08',
        name: 'Tensimeter Digital Upper Arm Precision',
        genericName: 'Digital Blood Pressure Monitor Clinical Grade',
        quantity: 1,
        price: 385_000,
        formattedPrice: 'Rp 385.000',
        unit: '1 Unit + Manset Ergonomis',
        image: '/assets/images/products/tensimeter.jpg',
        categoryLabel: 'ALAT MEDIS & P3K',
      },
    ],
    trackingSteps: [
      {
        stepNumber: 1,
        title: 'Pengujian Mutu Kalibrasi',
        description: 'Unit tensimeter dicek segel garansi resmi 5 tahun Omron.',
        time: '14:10 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 2,
        title: 'Paket Siap Dikirim',
        description: 'Buku garansi distempel resmi Apotek Nyopharma.',
        time: '14:35 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 3,
        title: 'Kurir Mengirimkan ke Alamat',
        description: 'Diantar dalam box tahan guncangan.',
        time: '15:10 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 4,
        title: 'Diterima oleh Penerima',
        description: 'Diterima di rumah dalam keadaan sempurna.',
        time: '16:05 WIB',
        isCompleted: true,
        isCurrent: false,
      },
    ],
  },
  {
    id: 'ord-201',
    orderNumber: 'NYO-ORD-202609-5109',
    customerId: 'cust-ratna',
    orderDate: '18 Sep 2026',
    orderTime: '23:15 WIB',
    status: 'delivered',
    statusLabel: 'Pesanan Darurat Selesai Diterima',
    statusBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    courierName: 'Kurir Siaga Darurat 24 Jam',
    courierService: 'Pengantaran Malam Cepat Nyopharma Express',
    packagingType: 'Kemasan Rapi Tertutup Rapat Privasi',
    paymentMethod: 'GoPay Instant Payment',
    subtotal: 50_000,
    packagingFee: 0,
    totalAmount: 50_000,
    items: [
      {
        medicationId: 'med-01',
        name: 'Paracetamol 500 mg Kaplet',
        genericName: 'Paracetamol (Acetaminophen)',
        quantity: 2,
        price: 8500,
        formattedPrice: 'Rp 17.000',
        unit: '2 Strip @ 10 Kaplet',
        image: '/assets/images/products/paracetamol.jpg',
        categoryLabel: 'OBAT BEBAS',
      },
      {
        medicationId: 'med-07',
        name: 'Sirup Madu Herbal Flu & Batuk Anak 60ml',
        genericName: 'Herbal Cough & Cold Pediatric Formula',
        quantity: 1,
        price: 28_000,
        formattedPrice: 'Rp 28.000',
        unit: 'Botol @ 60 ml',
        image: '/assets/images/products/coughsyrup.jpg',
        categoryLabel: 'IBU & ANAK',
      },
    ],
    trackingSteps: [
      {
        stepNumber: 1,
        title: 'Verifikasi Resep Tengah Malam',
        description: 'Apoteker jaga malam menelaah dosis paracetamol untuk anak.',
        time: '23:15 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 2,
        title: 'Sediaan Diracik Cepat',
        description: 'Obat disiapkan dalam waktu 10 menit dengan etiket dosis.',
        time: '23:25 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 3,
        title: 'Kurir Siaga Menuju Kemang',
        description: 'Kurir bergerak dari apotek cabang Jaksel.',
        time: '23:35 WIB',
        isCompleted: true,
        isCurrent: false,
      },
      {
        stepNumber: 4,
        title: 'Tiba di Lokasi Pasien',
        description: 'Diterima oleh Ibu Ratna dalam 38 menit.',
        time: '23:53 WIB',
        isCompleted: true,
        isCurrent: false,
      },
    ],
  },
];

export const DEMO_PRESCRIPTIONS: DigitalPrescription[] = [
  {
    id: 'rx-301',
    prescriptionNumber: 'RX-JKS-202608-4102',
    doctorName: 'dr. Ahmad Faisal, Sp.PD (Spesialis Penyakit Dalam)',
    clinicName: 'RS Siloam Hospitals Semanggi',
    issuedDate: '15 Agustus 2026',
    status: 'fulfilled',
    statusLabel: 'Telah Ditebus Penuh',
    statusBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    diagnosis: 'Hipertensi Primer Stadium 1 & Pemeliharaan Kardiovaskular',
    prescribedDrugs: [
      'Amlodipine Besylate 10 mg tab No. XXX (1x sehari pagi)',
      'Ester-C 500 mg tab No. XXX (1x sehari siang)',
    ],
    pharmacistNotes:
      'Resep terverifikasi legal SIPA. Tidak ditemukan interaksi berisiko tinggi. Terjadwal refill tiap 30 hari.',
  },
  {
    id: 'rx-302',
    prescriptionNumber: 'RX-TNG-202609-7719',
    doctorName: 'drg. Melisa Putri (Dokter Gigi & Mulut)',
    clinicName: 'Klinik Medika Pratama BSD',
    issuedDate: '18 September 2026',
    status: 'active',
    statusLabel: 'Resep Aktif (Belum Ditebus)',
    statusBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    diagnosis: 'Profilaksis Pasca Pembersihan Karang Gigi & Peradangan Gusi',
    prescribedDrugs: [
      'Amoxicillin 500 mg tab No. XV (3x sehari habiskan)',
      'Paracetamol 500 mg No. X (Bila nyeri)',
    ],
    pharmacistNotes: 'Menunggu konfirmasi pasien untuk pengantaran resep.',
  },
];

export const DEMO_REFILL_REMINDERS: RefillReminder[] = [
  {
    id: 'refill-01',
    medicationName: 'Amlodipine Besylate 10 mg',
    genericName: 'Amlodipine Besylate Antihipertensi',
    dosageSchedule: 'Diminum 1x sehari tiap pagi (pukul 07.00)',
    remainingDays: 7,
    refillDueDate: '27 September 2026',
    packSize: 'Strip @ 10 Tablet (Butuh 3 Strip)',
    price: 35_000,
    formattedPrice: 'Rp 35.000 / strip',
    productId: 'med-04',
  },
];

function getFulfillmentMeta(status: string) {
  if (status === 'delivered') {
    return {
      statusLabel: 'Pesanan Selesai Diterima',
      statusBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    };
  }
  if (status === 'ready_to_ship') {
    return {
      statusLabel: 'Siap Dikirim Kurir Farmasi',
      statusBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    };
  }
  return {
    statusLabel: 'Sedang Diracik & Disegel Apoteker',
    statusBadgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
  };
}

/**
 * Fetch all customer orders including dummy records and any user-placed live orders.
 *
 * @param customerId Selected demo customer id.
 * @returns Combined array of customer orders sorted newest first.
 */
export function getCustomerOrders(customerId: string): CustomerOrder[] {
  const baseOrders = INITIAL_ORDERS.filter((ord) => ord.customerId === customerId);

  // Read stored paid orders created in this browser session
  const storedPaid = getStoredPaidOrders();
  if (storedPaid.length === 0) {
    return baseOrders;
  }

  const liveOrders: CustomerOrder[] = storedPaid.map((p) => {
    const meta = getFulfillmentMeta(p.fulfillmentStatus);
    const orderItems: CustomerOrderItem[] = p.items.map((it) => {
      const matchingMed = MEDICATIONS_DATA.find((m) => m.id === it.medicationId);
      return {
        medicationId: it.medicationId,
        name: it.name,
        genericName: matchingMed?.genericName ?? it.name,
        quantity: it.quantity,
        price: it.price,
        formattedPrice: `Rp ${(it.price * it.quantity).toLocaleString('id-ID')}`,
        unit: it.unit,
        image: matchingMed?.image ?? '/assets/images/products/omega3.jpg',
        categoryLabel: matchingMed?.categoryLabel ?? 'FARMASI RESMI',
      };
    });

    const isDelivered = p.fulfillmentStatus === 'delivered';
    return {
      id: p.id,
      orderNumber: p.orderNumber,
      customerId,
      orderDate: 'Hari Ini',
      orderTime: p.paidAt,
      status: isDelivered ? 'delivered' : 'processing',
      statusLabel: meta.statusLabel,
      statusBadgeClass: meta.statusBadgeClass,
      courierName: 'Kurir Farmasi Nyopharma CDOB Express',
      courierService: 'Pengantaran Segel Rantai Dingin 2 Jam Sampai',
      packagingType: 'Kemasan Khusus Segel Hologram BPOM',
      paymentMethod: p.paymentMethod,
      subtotal: p.subtotal,
      packagingFee: p.packagingFee,
      totalAmount: p.totalAmount,
      items: orderItems,
      trackingSteps: [
        {
          stepNumber: 1,
          title: 'Pembayaran SaaS Terverifikasi',
          description: `Pembayaran ${p.paymentMethod} otomatis dikonfirmasi gerbang pembayaran apotek.`,
          time: p.paidAt,
          isCompleted: true,
          isCurrent: false,
        },
        {
          stepNumber: 2,
          title: 'Skrining Apoteker & Pengemasan CDOB',
          description: 'Apoteker memeriksa sediaan dan memasang segel pengaman anti-rusak.',
          time: 'Dalam Proses',
          isCompleted: true,
          isCurrent: true,
        },
        {
          stepNumber: 3,
          title: 'Kurir Khusus Mengantarkan ke Rumah',
          description: `Kurir mengantar langsung ke alamat ${p.shippingAddress}.`,
          time: 'Menunggu Penyerahan',
          isCompleted: false,
          isCurrent: false,
        },
        {
          stepNumber: 4,
          title: 'Pesanan Diterima',
          description: 'Penerima menandatangani bukti serah terima sediaan farmasi.',
          time: 'Estimasi 2 Jam',
          isCompleted: false,
          isCurrent: false,
        },
      ],
    };
  });

  return [...liveOrders, ...baseOrders];
}
