'use client';

import { IconFileText, IconMessageDots, IconShoppingCart } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type ProductItem = {
  id: string;
  name: string;
  category: 'prescription' | 'otc' | 'vitamins' | 'maternal' | 'chronic' | 'medical';
  categoryLabel: string;
  indication: string;
  bpomNumber: string;
  isPrescriptionRequired: boolean;
  price: string;
  unit: string;
  dosage: string;
};

type ProductCatalogProps = {
  activeSearchQuery?: string;
  onOpenPrescriptionModal: () => void;
};

export const ProductCatalog = (props: ProductCatalogProps) => {
  const t = useTranslations('Index');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: ProductItem[] = [
    {
      id: 'p1',
      name: 'Paracetamol 500 mg Kaplet',
      category: 'otc',
      categoryLabel: 'Obat Bebas',
      indication: 'Meredakan demam, sakit kepala, dan nyeri ringan hingga sedang.',
      bpomNumber: 'DBL9812345604A1',
      isPrescriptionRequired: false,
      price: 'Rp 8.500',
      unit: 'Strip @ 10 Kaplet',
      dosage: 'Dewasa: 1-2 kaplet 3-4 kali sehari sesudah makan.',
    },
    {
      id: 'p2',
      name: 'Amoxicillin Trihydrate 500 mg',
      category: 'prescription',
      categoryLabel: 'Obat Resep',
      indication: 'Antibiotik untuk infeksi saluran pernapasan, telinga, dan saluran kemih.',
      bpomNumber: 'GKL0412345601A1',
      isPrescriptionRequired: true,
      price: 'Rp 22.000',
      unit: 'Strip @ 10 Kapsul',
      dosage: 'Wajib sesuai resep dokter dan diminum sampai habis.',
    },
    {
      id: 'p3',
      name: 'Ester-C 500 mg + Citrus Bioflavonoids',
      category: 'vitamins',
      categoryLabel: 'Vitamin & Imunitas',
      indication: 'Meningkatkan daya tahan tubuh dengan formula ramah lambung.',
      bpomNumber: 'POM SD191555891',
      isPrescriptionRequired: false,
      price: 'Rp 48.000',
      unit: 'Botol @ 30 Tablet',
      dosage: '1 tablet sehari bersama makanan.',
    },
    {
      id: 'p4',
      name: 'Amlodipine Besylate 10 mg',
      category: 'chronic',
      categoryLabel: 'Perawatan Kronis',
      indication: 'Mengontrol tekanan darah tinggi (hipertensi) dan angina pectoris.',
      bpomNumber: 'GKL1212345602A1',
      isPrescriptionRequired: true,
      price: 'Rp 35.000',
      unit: 'Strip @ 10 Tablet',
      dosage: '1 kali sehari pada jam yang sama sesuai anjuran dokter.',
    },
    {
      id: 'p5',
      name: 'Minyak Telon Plus Lavender & Eucalyptus',
      category: 'maternal',
      categoryLabel: 'Ibu & Anak',
      indication: 'Menghangatkan tubuh bayi dan melindungi dari gigitan nyamuk hingga 8 jam.',
      bpomNumber: 'POM TR202654321',
      isPrescriptionRequired: false,
      price: 'Rp 32.500',
      unit: 'Botol 100 ml',
      dosage: 'Oleskan secukupnya pada dada, perut, pinggang, dan telapak kaki.',
    },
    {
      id: 'p6',
      name: 'Digital Upper Arm Blood Pressure Monitor',
      category: 'medical',
      categoryLabel: 'Alat Medis',
      indication: 'Tensimeter digital presisi klinis dengan deteksi detak jantung tidak teratur.',
      bpomNumber: 'AKL 20501912345',
      isPrescriptionRequired: false,
      price: 'Rp 385.000',
      unit: '1 Unit + Manset Standar',
      dosage: 'Gunakan saat istirahat untuk pemantauan tensi harian di rumah.',
    },
    {
      id: 'p7',
      name: 'Metformin HCl 500 mg Film-Coated',
      category: 'chronic',
      categoryLabel: 'Perawatan Kronis',
      indication: 'Terapi lini pertama untuk mengontrol kadar glukosa darah pada diabetes tipe 2.',
      bpomNumber: 'GKL0812345603A1',
      isPrescriptionRequired: true,
      price: 'Rp 18.000',
      unit: 'Strip @ 10 Tablet',
      dosage: 'Diminum bersama atau segera sesudah makan.',
    },
    {
      id: 'p8',
      name: 'Sirup Madu Herbal Flu & Batuk Anak',
      category: 'maternal',
      categoryLabel: 'Ibu & Anak',
      indication: 'Meredakan batuk berdahak, pilek, dan melegakan tenggorokan si kecil.',
      bpomNumber: 'POM TR183612341',
      isPrescriptionRequired: false,
      price: 'Rp 28.000',
      unit: 'Botol 60 ml',
      dosage: 'Anak 2-6 tahun: 1 sendok takar (5ml) 3 kali sehari.',
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !props.activeSearchQuery ||
      p.name.toLowerCase().includes(props.activeSearchQuery.toLowerCase()) ||
      p.indication.toLowerCase().includes(props.activeSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: t('cat_all') },
    { id: 'prescription', label: t('cat_prescription') },
    { id: 'otc', label: t('cat_otc') },
    { id: 'vitamins', label: t('cat_vitamins') },
    { id: 'maternal', label: t('cat_maternal') },
    { id: 'chronic', label: t('cat_chronic') },
    { id: 'medical', label: t('cat_medical') },
  ];

  return (
    <section id="katalog" className="bg-slate-50/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Eyebrow (#2 of 3 allowed) */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-teal-100/70 px-3 py-1 text-xs font-bold tracking-wide text-teal-800 uppercase">
            {t('catalog_badge')}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('catalog_title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('catalog_subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                }}
                className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition active:scale-[0.98] ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/30'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
            >
              <div>
                {/* Badges & Regulation */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      prod.isPrescriptionRequired
                        ? 'border border-rose-200 bg-rose-50 text-rose-700'
                        : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {prod.isPrescriptionRequired ? t('product_badge_rx') : t('product_badge_free')}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {t('product_badge_bpom')}: {prod.bpomNumber}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="mt-3 text-base leading-snug font-bold text-slate-900">
                  {prod.name}
                </h3>

                {/* Packaging */}
                <div className="mt-1 text-xs text-slate-500">
                  <span>{prod.unit}</span>
                </div>

                {/* Indication */}
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {prod.indication}
                </p>

                {/* Dosage instruction */}
                <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-2 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Aturan: </span>
                  {prod.dosage}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-5 border-t border-slate-100 pt-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Harga Resmi:</span>
                  <span className="text-base font-extrabold text-teal-800">{prod.price}</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {prod.isPrescriptionRequired ? (
                    <button
                      type="button"
                      onClick={props.onOpenPrescriptionModal}
                      className="col-span-2 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-rose-700 active:scale-[0.98]"
                    >
                      <IconFileText className="size-3.5" stroke={2} />
                      <span>Tebus via Resep</span>
                    </button>
                  ) : (
                    <>
                      <a
                        href={`https://wa.me/6281234567890?text=Halo%20Apoteker%20Nyopharma,%20saya%20ingin%20memesan%20${encodeURIComponent(prod.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center justify-center gap-1 rounded-xl bg-teal-600 py-2.5 text-center text-xs font-bold text-white shadow-xs transition hover:bg-teal-700 active:scale-[0.98]"
                      >
                        <IconShoppingCart className="size-3.5" stroke={2} />
                        <span>{t('product_btn_order')}</span>
                      </a>
                      <a
                        href={`https://wa.me/6281234567890?text=Halo%20Apoteker,%20saya%20ingin%20tanya%20indikasi%20dan%20dosis%20${encodeURIComponent(prod.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 active:scale-[0.98]"
                      >
                        <IconMessageDots className="size-3.5" stroke={2} />
                        <span>{t('product_btn_consult')}</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
