'use client';

import { IconCheck, IconShoppingCart } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import type { MedicationItem } from '@/data/medicationsData';
import { MEDICATIONS_DATA } from '@/data/medicationsData';

type ProductCatalogProps = {
  activeSearchQuery?: string;
  categoryFilter?: string;
  onCategoryChange?: (category: string) => void;
  onOpenPrescriptionModal: () => void;
  onSelectProduct: (product: MedicationItem) => void;
  onAddToCart: (product: MedicationItem) => void;
  onBuyNow: (product: MedicationItem) => void;
};

/**
 * Modern Trending Health Products catalog matching healthcare e-commerce design.
 *
 * @param props Component properties containing callbacks and search/filter state.
 * @returns JSX element for the trending health products section.
 */
export const ProductCatalog = (props: ProductCatalogProps) => {
  const t = useTranslations('Index');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isViewAll, setIsViewAll] = useState(false);
  const [addedToastId, setAddedToastId] = useState<string | null>(null);

  const activeCat =
    props.categoryFilter && props.categoryFilter !== 'all'
      ? props.categoryFilter
      : selectedCategory;

  const searchQuery = props.activeSearchQuery?.toLowerCase().trim() ?? '';

  const categories = [
    {
      id: 'all',
      label: t('cat_all'),
      count: MEDICATIONS_DATA.length,
    },
    {
      id: 'prescription',
      label: t('cat_prescription'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'prescription').length,
    },
    {
      id: 'otc',
      label: t('cat_otc'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'otc').length,
    },
    {
      id: 'vitamins',
      label: t('cat_vitamins'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'vitamins').length,
    },
    {
      id: 'chronic',
      label: t('cat_chronic'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'chronic').length,
    },
    {
      id: 'maternal',
      label: t('cat_maternal'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'maternal').length,
    },
    {
      id: 'medical',
      label: t('cat_medical'),
      count: MEDICATIONS_DATA.filter((p) => p.category === 'medical').length,
    },
  ];

  const matchingCategoryProducts = MEDICATIONS_DATA.filter((p) => {
    const matchesCategory = activeCat === 'all' || p.category === activeCat;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.genericName.toLowerCase().includes(searchQuery) ||
      p.indication.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Default view: show only 5 featured products when on 'all' without active search query
  const isDefaultFeaturedView = !isViewAll && activeCat === 'all' && !searchQuery;

  const displayedProducts = isDefaultFeaturedView
    ? matchingCategoryProducts.filter((p) => p.isTrending).slice(0, 5)
    : matchingCategoryProducts;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    props.onCategoryChange?.(categoryId);
  };

  const handleQuickAdd = (product: MedicationItem) => {
    props.onAddToCart(product);
    setAddedToastId(product.id);
    setTimeout(() => {
      setAddedToastId(null);
    }, 1800);
  };

  const handleSelectProduct = (product: MedicationItem) => {
    props.onSelectProduct(product);
  };

  let headerToggleButton = null;
  if (isDefaultFeaturedView) {
    headerToggleButton = (
      <button
        type="button"
        onClick={() => {
          setIsViewAll(true);
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs transition hover:bg-emerald-50 hover:text-emerald-950 active:scale-[0.98]"
      >
        <span>
          {t('trending_view_all')} ({MEDICATIONS_DATA.length})
        </span>
        <span aria-hidden="true">→</span>
      </button>
    );
  } else if (activeCat === 'all' && !searchQuery) {
    headerToggleButton = (
      <button
        type="button"
        onClick={() => {
          setIsViewAll(false);
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs transition hover:bg-emerald-50 hover:text-emerald-950 active:scale-[0.98]"
      >
        <span aria-hidden="true">←</span>
        <span>{t('trending_show_featured')} (5 Produk)</span>
      </button>
    );
  } else {
    headerToggleButton = (
      <button
        type="button"
        onClick={() => {
          handleCategorySelect('all');
          setIsViewAll(false);
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-[0.98]"
      >
        <span>✕ Tampilkan Semua ({MEDICATIONS_DATA.length})</span>
      </button>
    );
  }

  let bottomActionSection = null;
  if (isDefaultFeaturedView) {
    bottomActionSection = (
      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
        <button
          type="button"
          onClick={() => {
            setIsViewAll(true);
          }}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-2xl bg-emerald-800 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-900 hover:shadow-lg active:scale-[0.98]"
        >
          <span>
            {t('trending_view_all')} ({MEDICATIONS_DATA.length} Sediaan)
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
        <p className="text-xs font-medium text-slate-500">
          Menampilkan 5 produk unggulan terpopuler. Tekan tombol di atas untuk membuka seluruh
          katalog obat & alat medis.
        </p>
      </div>
    );
  } else if (activeCat === 'all' && !searchQuery) {
    bottomActionSection = (
      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
        <button
          type="button"
          onClick={() => {
            setIsViewAll(false);
            const catalogEl = document.querySelector('#catalog');
            catalogEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-emerald-500 hover:text-emerald-800 active:scale-[0.98]"
        >
          <span className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
          <span>{t('trending_show_featured')} (Tampilkan 5 Teratas)</span>
        </button>
      </div>
    );
  }

  return (
    <section id="catalog" className="relative bg-[#f0f8f4] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t('trending_products_title')}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t('trending_products_subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {headerToggleButton}

            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
              <span className="flex size-2 rounded-full bg-emerald-500" />
              <span>
                {isDefaultFeaturedView
                  ? `5 Produk Unggulan`
                  : `${displayedProducts.length} Produk Sediaan`}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters (Always visible for quick navigation) */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-emerald-100/80 pt-5">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  handleCategorySelect(cat.id);
                }}
                className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-[0.98] ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`py-0.2 rounded-full px-1.5 text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-emerald-700/80 text-emerald-100'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty state if search or filter has no results */}
        {displayedProducts.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-3 text-base font-bold text-slate-800">
              Tidak Ada Obat atau Alat Medis yang Sesuai
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Coba sesuaikan kata kunci pencarian atau pilih kategori lain di atas.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategorySelect('all');
                setIsViewAll(false);
              }}
              className="mt-4 cursor-pointer rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-900"
            >
              Lihat Semua Produk
            </button>
          </div>
        ) : (
          /* Products Grid: 5 columns on desktop matching reference */
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-100/60 bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl sm:p-4"
              >
                <div>
                  {/* Top Image Container with soft pastel mint background */}
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#edf7f2] p-3">
                    {/* Category / Promo Pill Badge at Top-Left */}
                    {prod.productBadge && (
                      <span
                        className={`absolute top-2.5 left-2.5 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${prod.productBadge.bgClass} ${prod.productBadge.textClass}`}
                      >
                        {prod.productBadge.text}
                      </span>
                    )}

                    {/* Product Packshot Photo */}
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectProduct(prod);
                      }}
                      aria-label={`Lihat detail ${prod.name}`}
                      className="relative h-full w-full cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    >
                      {prod.image ? (
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 220px, 260px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-black text-emerald-700">
                          💊
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="mt-3.5">
                    <p className="text-[10px] font-extrabold tracking-wider text-emerald-700 uppercase">
                      {prod.categoryLabel}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        handleSelectProduct(prod);
                      }}
                      className="mt-1 block w-full cursor-pointer text-left transition-colors hover:text-emerald-700"
                    >
                      <h3
                        className="line-clamp-1 text-base font-extrabold text-slate-900"
                        title={prod.name}
                      >
                        {prod.name}
                      </h3>
                    </button>

                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {prod.spec ?? prod.unit}
                    </p>

                    {/* Star Rating & Review Count */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <span className="text-amber-500">★</span>
                      <span className="font-bold text-slate-800">{prod.rating ?? 4.8}</span>
                      <span className="text-slate-400">({prod.reviewCount ?? 120})</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="mt-3.5 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900">{prod.formattedPrice}</span>
                    {prod.formattedOriginalPrice && (
                      <span className="text-xs font-normal text-slate-400 line-through">
                        {prod.formattedOriginalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleQuickAdd(prod);
                    }}
                    className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-800 px-3 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-900 active:scale-[0.98]"
                  >
                    {addedToastId === prod.id ? (
                      <>
                        <IconCheck className="size-4 text-emerald-300" />
                        <span>{t('trending_added')}</span>
                      </>
                    ) : (
                      <>
                        <IconShoppingCart className="size-4 text-emerald-200" stroke={2} />
                        <span>{t('trending_add_to_cart')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA / Toggle Section */}
        {bottomActionSection}
      </div>
    </section>
  );
};
