'use client';

import { IconArrowRight, IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import { ProductDetailModal } from '@/components/catalog/ProductDetailModal';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { CtaBanner } from '@/components/CtaBanner';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { TopServices } from '@/components/home/TopServices';
import { HowItWorks } from '@/components/HowItWorks';
import { Navbar } from '@/components/Navbar';
import { PharmacistTeam } from '@/components/PharmacistTeam';
import { PrescriptionUploadCard } from '@/components/PrescriptionUploadCard';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Testimonials } from '@/components/Testimonials';
import { TrustAndSafety } from '@/components/TrustAndSafety';
import { addToCart, calculateCartSummary, getStoredCart } from '@/data/cartStore';
import type { MedicationItem } from '@/data/medicationsData';

export const LandingPageContent = () => {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Medication detail and checkout states
  const [selectedProduct, setSelectedProduct] = useState<MedicationItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState<{
    product: MedicationItem;
    quantity: number;
  } | null>(null);

  // Cart tracking state for reactivity
  const [cartItemsCount, setCartItemsCount] = useState<number>(
    () => calculateCartSummary(getStoredCart()).totalCount,
  );
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(
    () => calculateCartSummary(getStoredCart()).totalAmount,
  );

  const refreshCartMetrics = () => {
    const summary = calculateCartSummary(getStoredCart());
    setCartItemsCount(summary.totalCount);
    setCartTotalAmount(summary.totalAmount);
  };

  const handleAddToCart = (product: MedicationItem, quantity = 1) => {
    addToCart(product, quantity);
    refreshCartMetrics();
  };

  const handleBuyNow = (product: MedicationItem, quantity = 1) => {
    setDirectCheckoutItem({ product, quantity });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleOpenGeneralCart = () => {
    setDirectCheckoutItem(null);
    refreshCartMetrics();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Sticky 3-Tier Header Navigation with Cart & Search */}
      <Navbar
        locale="id"
        cartCount={cartItemsCount}
        onOpenCart={handleOpenGeneralCart}
        onOpenPrescriptionModal={() => {
          setIsPrescriptionModalOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchQueryChange={(q) => {
          setSearchQuery(q);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
        }}
      />

      <main>
        {/* Modern HealixPharma Hero Banner */}
        <div id="home">
          <HeroBanner
            locale="id"
            onUploadPrescriptionClick={() => {
              setIsPrescriptionModalOpen(true);
            }}
          />
        </div>

        {/* 4 Pastel Top Services Section */}
        <div id="services">
          <TopServices
            locale="id"
            onServiceSelect={(svcId) => {
              if (svcId === 'telepharmacy' || svcId === 'lab_screening') {
                setIsPrescriptionModalOpen(true);
              } else {
                const catalogElement = document.querySelector('#catalog');
                if (catalogElement) {
                  catalogElement.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />
        </div>

        {/* Prescription Upload Dedicated Card */}
        <PrescriptionUploadCard />

        {/* Trending Health Products / Catalog */}
        <ProductCatalog
          activeSearchQuery={searchQuery}
          categoryFilter={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
          }}
          onOpenPrescriptionModal={() => {
            setIsPrescriptionModalOpen(true);
          }}
          onSelectProduct={(prod) => {
            setSelectedProduct(prod);
          }}
          onAddToCart={(prod) => {
            handleAddToCart(prod, 1);
          }}
          onBuyNow={(prod) => {
            handleBuyNow(prod, 1);
          }}
        />

        {/* 4-Step Process How It Works */}
        <HowItWorks />

        {/* Clinical Safety Standards & CDOB */}
        <TrustAndSafety />

        {/* Licensed Pharmacists Profile */}
        <PharmacistTeam />

        {/* Verified Patient Reviews */}
        <Testimonials />

        {/* Help Center & FAQ */}
        <FaqSection />

        {/* 24/7 Urgent Medication Action Banner */}
        <CtaBanner
          onOpenPrescriptionModal={() => {
            setIsPrescriptionModalOpen(true);
          }}
        />
      </main>

      {/* Floating Cart Bar at Bottom if Cart has items */}
      {cartItemsCount > 0 && !isCheckoutOpen && (
        <div className="animate-bounce-short fixed bottom-5 left-1/2 z-40 w-[92%] max-w-lg -translate-x-1/2">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-3.5 text-white shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-700/30 text-emerald-300">
                <IconShoppingCart className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-200">
                  {cartItemsCount} Obat di Keranjang Belanja
                </p>
                <p className="font-mono text-sm font-black text-white">
                  Rp {cartTotalAmount.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenGeneralCart}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-600 active:scale-[0.98]"
            >
              <span>Bayar & Proses</span>
              <IconArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comprehensive Medical Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
          }}
          onAddToCart={(prod, qty) => {
            handleAddToCart(prod, qty);
          }}
          onBuyNow={(prod, qty) => {
            handleBuyNow(prod, qty);
          }}
        />
      )}

      {/* SaaS Checkout & Pay-to-Process Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        directItem={directCheckoutItem}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectCheckoutItem(null);
          refreshCartMetrics();
        }}
        onOrderCompleted={() => {
          refreshCartMetrics();
        }}
      />

      {/* Floating Modal for Prescription Upload */}
      {isPrescriptionModalOpen && (
        <PrescriptionUploadCard
          isModal
          onClose={() => {
            setIsPrescriptionModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
