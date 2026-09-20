type MedicationCategory = 'prescription' | 'otc' | 'vitamins' | 'maternal' | 'chronic' | 'medical';

export type MedicationItem = {
  id: string;
  name: string;
  genericName: string;
  category: MedicationCategory;
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  originalPrice?: number;
  formattedOriginalPrice?: string;
  unit: string;
  spec?: string;
  rating?: number;
  reviewCount?: number;
  isTrending?: boolean;
  productBadge?: {
    text: string;
    bgClass: string;
    textClass: string;
  };
  image?: string;
  bpomNumber: string;
  manufacturer: string;
  indication: string;
  composition: string;
  dosage: string;
  contraindication: string;
  sideEffects: string;
  storageTemp: string;
  isPrescriptionRequired: boolean;
  stock: number;
  badgeColor: string;
};

export type PaidOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: {
    medicationId: string;
    name: string;
    quantity: number;
    price: number;
    unit: string;
  }[];
  subtotal: number;
  packagingFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid';
  fulfillmentStatus: 'processing' | 'ready_to_ship' | 'delivered';
  paidAt: string;
};

export const MEDICATIONS_DATA: MedicationItem[] = [
  {
    id: 'med-01',
    name: 'Paracetamol 500 mg Kaplet',
    genericName: 'Paracetamol (Acetaminophen)',
    category: 'otc',
    categoryLabel: 'OBAT BEBAS',
    price: 8500,
    formattedPrice: 'Rp 8.500',
    unit: 'Strip @ 10 Kaplet',
    spec: '10 Kaplet • 500mg',
    rating: 4.8,
    reviewCount: 240,
    productBadge: {
      text: 'Pereda Demam',
      bgClass: 'bg-emerald-100/90 border border-emerald-300/60',
      textClass: 'text-emerald-900',
    },
    image: '/assets/images/products/paracetamol.jpg',
    bpomNumber: 'DBL9812345604A1',
    manufacturer: 'PT Kimia Farma Tbk',
    indication:
      'Menurunkan demam tinggi, meredakan sakit kepala, sakit gigi, dan nyeri otot ringan hingga sedang.',
    composition: 'Tiap kaplet mengandung Paracetamol murni 500 mg.',
    dosage:
      'Dewasa & anak >12 th: 1-2 kaplet, 3-4 kali sehari sesudah makan (maksimal 8 kaplet/24 jam). Anak 6-12 th: 1/2-1 kaplet 3 kali sehari.',
    contraindication:
      'Hipersensitivitas terhadap paracetamol, gangguan fungsi hati atau ginjal berat.',
    sideEffects:
      'Reaksi alergi kulit ringan (jarang). Dosis berlebih jangka panjang berisiko hepatotoksik.',
    storageTemp: 'Simpan di bawah suhu 30°C, kering dan terlindung dari cahaya matahari langsung.',
    isPrescriptionRequired: false,
    stock: 142,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'prod-omega3',
    name: 'Omega 3 Fish Oil 1000 mg',
    genericName: 'Natural EPA & DHA Omega-3 Fatty Acids',
    category: 'vitamins',
    categoryLabel: 'VITAMINS & SUPPLEMENTS',
    price: 185_000,
    formattedPrice: 'Rp 185.000',
    originalPrice: 240_000,
    formattedOriginalPrice: 'Rp 240.000',
    unit: 'Bottle @ 60 Softgels',
    spec: '60 Softgels • High EPA/DHA',
    rating: 4.8,
    reviewCount: 420,
    isTrending: true,
    productBadge: {
      text: 'Best Seller',
      bgClass: 'bg-emerald-100/90 border border-emerald-300/60',
      textClass: 'text-emerald-900',
    },
    image: '/assets/images/products/omega3.jpg',
    bpomNumber: 'SI204312341',
    manufacturer: 'NaturaHealth Laboratories',
    indication:
      'Mendukung kesehatan kardiovaskular, fungsi kognitif otak, dan memelihara kesehatan penglihatan dengan konsentrasi EPA & DHA murni.',
    composition:
      'Tiap softgel mengandung Minyak Ikan Salmon Murni 1000 mg (EPA 300 mg, DHA 200 mg), Vitamin E 5 IU.',
    dosage: '1-2 softgel per hari sesudah makan pagi atau malam.',
    contraindication: 'Hipersensitivitas terhadap produk olahan laut atau minyak ikan.',
    sideEffects: 'Rasa amis ringan bila diminum saat lambung kosong.',
    storageTemp: 'Simpan di bawah suhu 25°C pada tempat sejuk dan kering.',
    isPrescriptionRequired: false,
    stock: 85,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'prod-vitamind3',
    name: 'Vitamin D3 1000 IU',
    genericName: 'Cholecalciferol 1000 IU',
    category: 'vitamins',
    categoryLabel: 'IMMUNITY BOOSTER',
    price: 130_000,
    formattedPrice: 'Rp 130.000',
    originalPrice: 150_000,
    formattedOriginalPrice: 'Rp 150.000',
    unit: 'Bottle @ 120 Chewable Tablets',
    spec: '120 Chewable Tablets',
    rating: 4.9,
    reviewCount: 810,
    isTrending: true,
    productBadge: {
      text: 'Immunity',
      bgClass: 'bg-sky-100/90 border border-sky-300/60',
      textClass: 'text-sky-900',
    },
    image: '/assets/images/products/vitamind3.jpg',
    bpomNumber: 'SD211514781',
    manufacturer: 'NaturaHealth Nutrition',
    indication:
      'Meningkatkan sistem daya tahan tubuh seluler, memfasilitasi penyerapan kalsium optimal, dan memperkuat struktur tulang & gigi.',
    composition: 'Tiap tablet kunyah mengandung Cholecalciferol (Vitamin D3) 1000 IU (25 mcg).',
    dosage: '1 tablet kunyah sehari sesudah makan utama.',
    contraindication: 'Penderita hiperkalsemia atau hipervitaminosis D.',
    sideEffects: 'Sangat aman dikonsumsi harian sesuai batas asupan anjuran.',
    storageTemp: 'Simpan di bawah suhu 30°C, hindarkan dari kelembapan tinggi.',
    isPrescriptionRequired: false,
    stock: 120,
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'prod-zincovit',
    name: 'Zincovit Multivitamin Syrup',
    genericName: 'Multivitamins & Zinc Mineral Syrup',
    category: 'otc',
    categoryLabel: 'GENERAL WELLNESS',
    price: 98_000,
    formattedPrice: 'Rp 98.000',
    unit: 'Bottle 200 ml',
    spec: '200ml Bottle • Minerals',
    rating: 4.7,
    reviewCount: 310,
    isTrending: true,
    productBadge: {
      text: 'Daily Tonic',
      bgClass: 'bg-emerald-100/90 border border-emerald-300/60',
      textClass: 'text-emerald-900',
    },
    image: '/assets/images/products/zincovit.jpg',
    bpomNumber: 'SD181653291',
    manufacturer: 'Apex Healthcare Pharmaceuticals',
    indication:
      'Tonik multivitamin dan mineral seng esensial untuk menjaga metabolisme aktif, stamina tubuh, dan pemulihan kebugaran harian.',
    composition:
      'Zinc Gluconate, Vitamin A, B-Complex (B1, B2, B6, B12), C, D3, E, Nicotinamide dalam sirup perisa sitrus.',
    dosage: 'Dewasa: 10 ml sekali sehari sesudah makan. Anak-anak: 5 ml sekali sehari.',
    contraindication: 'Hipersensitivitas terhadap komponen sediaan multivitamin sirup.',
    sideEffects: 'Tidak menimbulkan keluhan pada dosis lazim.',
    storageTemp: 'Simpan di tempat kering dan sejuk pada suhu ruangan terkontrol.',
    isPrescriptionRequired: false,
    stock: 94,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'prod-ashwagandha',
    name: 'Ashwagandha Pure Extract',
    genericName: 'Withania Somnifera Root Extract',
    category: 'otc',
    categoryLabel: 'HERBAL & AYURVEDIC',
    price: 162_000,
    formattedPrice: 'Rp 162.000',
    originalPrice: 200_000,
    formattedOriginalPrice: 'Rp 200.000',
    unit: 'Bottle @ 60 Veg Capsules',
    spec: '60 Veg Capsules • Stress',
    rating: 4.9,
    reviewCount: 530,
    isTrending: true,
    productBadge: {
      text: '19% OFF',
      bgClass: 'bg-rose-100/90 border border-rose-300/60',
      textClass: 'text-rose-800',
    },
    image: '/assets/images/products/ashwagandha.jpg',
    bpomNumber: 'TR223015671',
    manufacturer: 'Himalayan Pure Herbals',
    indication:
      'Membantu menyeimbangkan hormon kortisol, meredakan ketegangan stres mental, dan meningkatkan kualitas tidur lelap alami.',
    composition:
      'Ekstrak akar Withania somnifera murni terstandar withanolides 5% 500 mg per kapsul nabati.',
    dosage: '1 kapsul 2 kali sehari sesudah makan atau 1 kapsul menjelang istirahat malam.',
    contraindication: 'Wanita hamil dan menyusui tanpa konsultasi dokter.',
    sideEffects: 'Efek sedasi ringan yang menenangkan tubuh.',
    storageTemp: 'Simpan di tempat kering, sejuk, dan terhindar dari sinar matahari.',
    isPrescriptionRequired: false,
    stock: 65,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'prod-bloodglucose',
    name: 'Blood Glucose Test Kit',
    genericName: 'Digital Blood Glucose Monitoring System',
    category: 'medical',
    categoryLabel: 'DIABETES CARE',
    price: 280_000,
    formattedPrice: 'Rp 280.000',
    originalPrice: 320_000,
    formattedOriginalPrice: 'Rp 320.000',
    unit: 'Box of 50 Strips + Meter',
    spec: 'Pack of 50 Strips • Rapid',
    rating: 4.6,
    reviewCount: 190,
    isTrending: true,
    productBadge: {
      text: 'Clinical Grade',
      bgClass: 'bg-emerald-100/90 border border-emerald-300/60',
      textClass: 'text-emerald-900',
    },
    image: '/assets/images/products/bloodglucose.jpg',
    bpomNumber: 'AKL20101918231',
    manufacturer: 'GlucoCare Medical Devices Ltd',
    indication:
      'Pemantauan mandiri kadar glukosa darah kapiler presisi klinis dengan hasil pembacaan cepat dalam 5 detik.',
    composition:
      '1 alat monitor glukometer digital, 50 strip tes glukosa terkalibrasi, 1 lancing device, 10 jarum lancet.',
    dosage: 'Gunakan 1 strip per pengetesan sesuai jadwal pemantauan dokter.',
    contraindication: 'Khusus pemeriksaan in vitro diagnostik mandiri.',
    sideEffects: 'Nyeri tusukan sesaat pada bantalan ujung jari.',
    storageTemp: 'Simpan vial strip pada rentang suhu 4-30°C dalam kondisi tertutup rapat.',
    isPrescriptionRequired: false,
    stock: 45,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'med-02',
    name: 'Amoxicillin Trihydrate 500 mg',
    genericName: 'Amoxicillin Trihydrate',
    category: 'prescription',
    categoryLabel: 'OBAT KERAS (RESEP)',
    price: 22_000,
    formattedPrice: 'Rp 22.000',
    unit: 'Strip @ 10 Kapsul',
    spec: '10 Kapsul • 500mg',
    rating: 4.9,
    reviewCount: 185,
    productBadge: {
      text: 'Antibiotik Keras',
      bgClass: 'bg-rose-100/90 border border-rose-300/60',
      textClass: 'text-rose-900',
    },
    image: '/assets/images/products/amoxicillin.jpg',
    bpomNumber: 'GKL0412345601A1',
    manufacturer: 'PT Bernofarm Pharmaceutical',
    indication:
      'Antibiotik spektrum luas untuk infeksi bakteri saluran pernapasan atas, faringitis, bronkitis, otitis media, dan infeksi saluran kemih.',
    composition:
      'Tiap kapsul mengandung Amoxicillin Trihydrate setara Amoxicillin anhidrat 500 mg.',
    dosage:
      'Dewasa: 1 kapsul (500 mg) tiap 8 jam sesudah makan. Wajib dihabiskan sesuai instruksi apoteker/dokter untuk mencegah resistensi antibiotik.',
    contraindication: 'Riwayat alergi antibiotik golongan penisilin atau sefalosporin.',
    sideEffects:
      'Mual, diare ringan, ruam kulit. Segera hubungi faskes bila timbul biduran atau sesak.',
    storageTemp: 'Simpan pada suhu ruangan terkontrol 20-25°C, tempat sejuk dan kedap udara.',
    isPrescriptionRequired: true,
    stock: 58,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'med-03',
    name: 'Ester-C 500 mg + Citrus Bioflavonoids',
    genericName: 'Calcium Ascorbate & Bioflavonoid Complex',
    category: 'vitamins',
    categoryLabel: 'VITAMIN & IMUNITAS',
    price: 48_000,
    formattedPrice: 'Rp 48.000',
    originalPrice: 60_000,
    formattedOriginalPrice: 'Rp 60.000',
    unit: 'Botol @ 30 Tablet',
    spec: '30 Tablet • Non-Acidic',
    rating: 4.9,
    reviewCount: 380,
    productBadge: {
      text: 'Ramah Lambung',
      bgClass: 'bg-amber-100/90 border border-amber-300/60',
      textClass: 'text-amber-900',
    },
    image: '/assets/images/products/esterc.jpg',
    bpomNumber: 'POM SD191555891',
    manufacturer: 'PT Kalbe Farma Tbk',
    indication:
      'Memelihara daya tahan tubuh, antioksidan menangkal radikal bebas, dan mempercepat pemulihan pasca sakit dengan formulasi netral ramah lambung.',
    composition: 'Ester-C (Calcium Ascorbate) 500 mg, Citrus Bioflavonoids 100 mg, Kalsium 60 mg.',
    dosage: '1 tablet sehari diminum bersama atau sesudah makan pagi/siang.',
    contraindication: 'Hipersensitivitas terhadap komponen vitamin C kalsium askorbat.',
    sideEffects:
      'Umumnya sangat aman ditoleransi tubuh. Tidak memicu perih lambung pada penderita maag.',
    storageTemp: 'Simpan di bawah suhu 25°C dalam wadah tertutup rapat, hindari tempat lembab.',
    isPrescriptionRequired: false,
    stock: 85,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'med-04',
    name: 'Amlodipine Besylate 10 mg',
    genericName: 'Amlodipine Besylate',
    category: 'chronic',
    categoryLabel: 'PERAWATAN KRONIS',
    price: 35_000,
    formattedPrice: 'Rp 35.000',
    unit: 'Strip @ 10 Tablet',
    spec: '10 Tablet • 10mg',
    rating: 4.8,
    reviewCount: 195,
    productBadge: {
      text: 'Antihipertensi',
      bgClass: 'bg-sky-100/90 border border-sky-300/60',
      textClass: 'text-sky-900',
    },
    image: '/assets/images/products/amlodipine.jpg',
    bpomNumber: 'GKL1212345602A1',
    manufacturer: 'PT Dexa Medica',
    indication:
      'Terapi hipertensi primer dan profilaksis angina pectoris kronis stabil untuk menurunkan risiko komplikasi kardiovaskular.',
    composition: 'Tiap tablet mengandung Amlodipine Besylate setara Amlodipine basa 10 mg.',
    dosage:
      'Dosis awal 5 mg sekali sehari, dapat ditingkatkan dokter menjadi 10 mg sekali sehari. Diminum pada jam yang sama tiap hari.',
    contraindication: 'Hipotensi berat, syok kardiogenik, stenosis aorta derajat berat.',
    sideEffects: 'Edema perifer (kaki bengkak ringan), pusing, flushing kemerahan pada wajah.',
    storageTemp: 'Simpan pada suhu kamar (15-30°C), lindungi dari cahaya langsung.',
    isPrescriptionRequired: true,
    stock: 92,
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'med-05',
    name: 'Metformin HCl 500 mg Film-Coated',
    genericName: 'Metformin Hydrochloride',
    category: 'chronic',
    categoryLabel: 'PERAWATAN KRONIS',
    price: 18_000,
    formattedPrice: 'Rp 18.000',
    unit: 'Strip @ 10 Tablet',
    spec: '10 Tablet • 500mg',
    rating: 4.8,
    reviewCount: 210,
    productBadge: {
      text: 'Kontrol Gula',
      bgClass: 'bg-emerald-100/90 border border-emerald-300/60',
      textClass: 'text-emerald-900',
    },
    image: '/assets/images/products/metformin.jpg',
    bpomNumber: 'GKL0812345603A1',
    manufacturer: 'PT Tempo Scan Pacific',
    indication:
      'Obat lini pertama terapi diabetes melitus tipe 2, meningkatkan sensitivitas reseptor insulin perifer dan menekan glukoneogenesis hepatik.',
    composition: 'Tiap tablet salut selaput mengandung Metformin HCl 500 mg.',
    dosage:
      '1 tablet 2-3 kali sehari, diminum bersama makanan atau segera sesudah makan untuk meminimalkan efek samping gastrointestinal.',
    contraindication:
      'Gagal ginjal kronis (eGFR <30 mL/min), asidosis metabolik, gagal jantung kongestif berat.',
    sideEffects:
      'Rasa logam di lidah, kembung, mual ringan (dapat dicegah dengan konsumsi saat makan).',
    storageTemp: 'Simpan pada suhu sejuk 20-25°C, terlindung dari kelembaban tinggi.',
    isPrescriptionRequired: true,
    stock: 120,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'med-06',
    name: 'Lantus Solostar Insulin Pen 100 IU/ml',
    genericName: 'Insulin Glargine rDNA',
    category: 'prescription',
    categoryLabel: 'COLD-CHAIN (INSULIN)',
    price: 215_000,
    formattedPrice: 'Rp 215.000',
    unit: '1 Pen @ 3 ml (300 IU)',
    spec: '1 Pen @ 3 ml (300 IU)',
    rating: 5,
    reviewCount: 88,
    productBadge: {
      text: 'Rantai Dingin 2-8°C',
      bgClass: 'bg-cyan-100/90 border border-cyan-300/60',
      textClass: 'text-cyan-900',
    },
    image: '/assets/images/products/insulin.jpg',
    bpomNumber: 'DKI0512345608A1',
    manufacturer: 'Sanofi-Aventis Indonesia',
    indication:
      'Insulin analog kerja panjang (basal insulin 24 jam) untuk kontrol gula darah harian pada pasien diabetes melitus tipe 1 dan tipe 2.',
    composition: 'Tiap ml larutan mengandung 100 IU Insulin Glargine biosintetik DNA rekombinan.',
    dosage:
      'Injeksi subkutan sekali sehari pada jam yang sama setiap hari (area perut/paha). Dosis dititrasi sesuai target gula darah.',
    contraindication: 'Kondisi hipoglikemia aktif, alergi terhadap insulin glargine.',
    sideEffects:
      'Hipoglikemia bila dosis berlebih atau telat makan, lipodistrofi pada titik injeksi yang tidak dirotasi.',
    storageTemp:
      'Wajib Cold-Chain 2-8°C di dalam chiller. Pen yang sedang dipakai tahan 28 hari pada suhu kamar (<30°C).',
    isPrescriptionRequired: true,
    stock: 24,
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    id: 'med-07',
    name: 'Sirup Madu Herbal Flu & Batuk Anak 60ml',
    genericName: 'Herbal Cough & Cold Pediatric Formula',
    category: 'maternal',
    categoryLabel: 'IBU & ANAK',
    price: 28_000,
    formattedPrice: 'Rp 28.000',
    unit: 'Botol @ 60 ml',
    spec: 'Botol @ 60 ml',
    rating: 4.9,
    reviewCount: 165,
    productBadge: {
      text: 'Formula Anak',
      bgClass: 'bg-amber-100/90 border border-amber-300/60',
      textClass: 'text-amber-900',
    },
    image: '/assets/images/products/coughsyrup.jpg',
    bpomNumber: 'POM TR183612341',
    manufacturer: 'PT Industri Jamu Borobudur',
    indication:
      'Meredakan batuk berdahak, melegakan saluran napas, meredakan pilek dan radang tenggorokan pada anak.',
    composition:
      'Ekstrak daun saga, ekstrak jahe merah, madu hutan murni, ekstrak daun mint, propolis.',
    dosage:
      'Anak 2-6 tahun: 1 sendok takar (5 ml) 3 kali sehari. Anak 7-12 tahun: 2 sendok takar (10 ml) 3 kali sehari sesudah makan.',
    contraindication: 'Anak di bawah usia 1 tahun (risiko botulisme madu mentah).',
    sideEffects: 'Aman untuk anak, tanpa alkohol dan tanpa kandungan pemanis buatan berlebih.',
    storageTemp: 'Simpan pada suhu di bawah 30°C, hindari paparan sinar matahari langsung.',
    isPrescriptionRequired: false,
    stock: 76,
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  {
    id: 'med-08',
    name: 'Tensimeter Digital Upper Arm Precision',
    genericName: 'Digital Blood Pressure Monitor Clinical Grade',
    category: 'medical',
    categoryLabel: 'ALAT MEDIS & P3K',
    price: 385_000,
    formattedPrice: 'Rp 385.000',
    originalPrice: 450_000,
    formattedOriginalPrice: 'Rp 450.000',
    unit: '1 Unit + Manset Ergonomis',
    spec: 'Garansi Resmi 5 Thn',
    rating: 4.9,
    reviewCount: 312,
    productBadge: {
      text: 'Presisi Klinis',
      bgClass: 'bg-slate-100/90 border border-slate-300/60',
      textClass: 'text-slate-900',
    },
    image: '/assets/images/products/tensimeter.jpg',
    bpomNumber: 'KEMENKES RI AKL 20501912345',
    manufacturer: 'Omron Healthcare Indonesia',
    indication:
      'Pengukuran tekanan darah sistolik, diastolik, dan deteksi denyut nadi tidak teratur (aritmia) mandiri di rumah dengan presisi klinis.',
    composition:
      '1 Alat Tensimeter Digital, 1 Manset Ukuran Dewasa 22-32 cm, 4 Baterai AA, 1 Tas Penyimpan, Buku Manual Garansi 5 Tahun.',
    dosage: 'Gunakan pagi dan malam hari dalam posisi duduk rileks setelah istirahat 5 menit.',
    contraindication: 'Lengan dengan fistula arteriovena atau pasca mastektomi.',
    sideEffects: 'Tidak ada efek samping farmakologis.',
    storageTemp: 'Simpan di tempat kering dan bersih, suhu 10-40°C.',
    isPrescriptionRequired: false,
    stock: 30,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];
