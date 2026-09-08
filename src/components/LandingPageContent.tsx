'use client';

import { useState } from 'react';
import { CtaBanner } from '@/components/CtaBanner';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { Navbar } from '@/components/Navbar';
import { PharmacistTeam } from '@/components/PharmacistTeam';
import { PrescriptionUploadCard } from '@/components/PrescriptionUploadCard';
import { ProductCatalog } from '@/components/ProductCatalog';
import { QuickServices } from '@/components/QuickServices';
import { Testimonials } from '@/components/Testimonials';
import { TrustAndSafety } from '@/components/TrustAndSafety';

export const LandingPageContent = () => {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenPrescriptionModal={() => {
          setIsPrescriptionModalOpen(true);
        }}
      />

      <main>
        {/* Hero Section with Quick Search & Trust Badges */}
        <HeroSection
          onOpenPrescriptionModal={() => {
            setIsPrescriptionModalOpen(true);
          }}
          onSearchQuery={(q) => {
            setSearchQuery(q);
          }}
        />

        {/* 4 Core Quick Services */}
        <QuickServices
          onOpenPrescriptionModal={() => {
            setIsPrescriptionModalOpen(true);
          }}
        />

        {/* Prescription Upload Dedicated Section */}
        <PrescriptionUploadCard />

        {/* Interactive Drug & Health Catalog */}
        <ProductCatalog
          activeSearchQuery={searchQuery}
          onOpenPrescriptionModal={() => {
            setIsPrescriptionModalOpen(true);
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

      {/* Comprehensive Medical Footer */}
      <Footer />

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
