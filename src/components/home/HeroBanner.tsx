'use client';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type HeroBannerProps = {
  locale: string;
  onUploadPrescriptionClick: () => void;
};

const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Modern auto-sliding Hero Banner with organic background image integration.
 *
 * @param props Component properties containing locale and action callbacks.
 * @returns JSX element for the dynamic homepage hero carousel.
 */
export function HeroBanner(props: HeroBannerProps) {
  const t = useTranslations('Index');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const slides = [
    {
      id: 'slide-1',
      badge: t('badge_trust'),
      heading1: t('hero_heading_1'),
      heading2: t('hero_heading_2'),
      subtitle: t('hero_subtitle_new'),
      badges: [
        { icon: '🛡️', label: t('hero_badge_genuine') },
        { icon: '💳', label: t('hero_badge_secure') },
        { icon: '⏱️', label: t('hero_badge_delivery') },
      ],
      ctaText: t('hero_cta_order'),
      ctaAction: () => {
        scrollToSection('#catalog');
      },
      secondaryCtaText: t('hero_cta_upload'),
      secondaryCtaAction: () => {
        props.onUploadPrescriptionClick();
      },
      image: '/assets/images/hero_pharmacist.jpg',
      imageAlt: 'Apoteker Penanggung Jawab Apotek Nyopharma',
    },
    {
      id: 'slide-2',
      badge: t('hero_slide2_badge'),
      heading1: t('hero_slide2_heading_1'),
      heading2: t('hero_slide2_heading_2'),
      subtitle: t('hero_slide2_subtitle'),
      badges: [
        { icon: '⚡', label: t('hero_slide2_badge1') },
        { icon: '📋', label: t('hero_slide2_badge2') },
        { icon: '🔒', label: t('hero_slide2_badge3') },
      ],
      ctaText: t('hero_slide2_cta'),
      ctaAction: () => {
        scrollToSection('#services');
      },
      secondaryCtaText: t('hero_cta_upload'),
      secondaryCtaAction: () => {
        props.onUploadPrescriptionClick();
      },
      image: '/assets/images/hero_telehealth.jpg',
      imageAlt: 'Konsultasi Telefarmasi Nyopharma Bersama Apoteker',
    },
    {
      id: 'slide-3',
      badge: t('hero_slide3_badge'),
      heading1: t('hero_slide3_heading_1'),
      heading2: t('hero_slide3_heading_2'),
      subtitle: t('hero_slide3_subtitle'),
      badges: [
        { icon: '❄️', label: t('hero_slide3_badge1') },
        { icon: '📦', label: t('hero_slide3_badge2') },
        { icon: '🏛️', label: t('hero_slide3_badge3') },
      ],
      ctaText: t('hero_slide3_cta'),
      ctaAction: () => {
        scrollToSection('#keamanan');
      },
      secondaryCtaText: t('hero_cta_order'),
      secondaryCtaAction: () => {
        scrollToSection('#catalog');
      },
      image: '/assets/images/hero_distribution.jpg',
      imageAlt: 'Penyimpanan Sediaan Farmasi Rantai Dingin CDOB',
    },
  ];

  // Auto-slide effect every 5 seconds, pauses when hovered
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (!isPaused) {
      timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPaused, slides.length]);

  useEffect(() => {
    const node = sectionRef.current;
    const handleEnter = () => {
      setIsPaused(true);
    };
    const handleLeave = () => {
      setIsPaused(false);
    };
    node?.addEventListener('mouseenter', handleEnter);
    node?.addEventListener('mouseleave', handleLeave);
    return () => {
      node?.removeEventListener('mouseenter', handleEnter);
      node?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const currentSlide = slides[activeSlide] ?? slides[0];
  if (!currentSlide) {
    return null;
  }

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handleCtaClick = () => {
    currentSlide.ctaAction();
  };

  const handleSecondaryCtaClick = () => {
    currentSlide.secondaryCtaAction();
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Carousel Utama Nyopharma"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/40 pt-6 pb-14 lg:pt-10 lg:pb-20"
    >
      {/* Background Decorative Ambient Blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Slide Text Content */}
          <div className="space-y-6 lg:col-span-6 xl:col-span-7">
            <div className="transition-all duration-500 ease-out">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span>{currentSlide.badge}</span>
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-5xl">
                <span>{currentSlide.heading1}</span>
                <br />
                <span className="text-emerald-700">{currentSlide.heading2}</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* 3 Pillars of Trust for the current slide */}
            <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
              {currentSlide.badges.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-sm font-bold text-emerald-800">
                    {b.icon}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Slide Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all hover:bg-emerald-800 active:scale-[0.98]"
              >
                <span>{currentSlide.ctaText}</span>
                <span className="text-base">→</span>
              </button>

              <button
                type="button"
                onClick={handleSecondaryCtaClick}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-800 active:scale-[0.98]"
              >
                <span>📄</span>
                <span>{currentSlide.secondaryCtaText}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Harmonious Organic Backdrop Photo */}
          <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-5">
            {/* Organic Curved Teal / Mint Backdrop Element with Leaves Accent */}
            <div className="relative flex items-center justify-center">
              {/* Main Organic Circle / Arch Backdrop */}
              <div className="relative h-80 w-80 overflow-hidden rounded-full bg-gradient-to-tr from-emerald-300/60 via-emerald-200/50 to-emerald-100/80 shadow-2xl sm:h-96 sm:w-96 lg:h-[440px] lg:w-[440px]">
                {/* Decorative Botanical Leaf Silhouettes SVG */}
                <svg
                  className="pointer-events-none absolute -bottom-4 -left-4 h-36 w-36 text-emerald-600/20"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M50 0 C20 30 20 70 50 100 C80 70 80 30 50 0 Z" />
                  <path d="M10 50 C40 20 80 20 100 50 C80 80 40 80 10 50 Z" opacity="0.6" />
                </svg>
                <svg
                  className="pointer-events-none absolute top-4 -right-4 h-28 w-28 text-emerald-700/20"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M50 0 C30 30 30 70 50 100 C70 70 70 30 50 0 Z" />
                </svg>

                {/* Harmonious Integrated Photo: Organic Arched Fit */}
                <div className="relative h-full w-full">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1200px) 440px, 460px"
                    className="object-cover object-top transition-all duration-700 ease-in-out hover:scale-103"
                  />
                  {/* Subtle Gradient Fog at the base for seamless integration */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-100/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Nav Chevrons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Slide sebelumnya"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>

          {/* Interactive Slide Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveSlide(idx);
                  }}
                  aria-label={`Pindah ke slide ${idx + 1}`}
                  className={`cursor-pointer rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-2.5 w-8 bg-emerald-600 shadow-xs'
                      : 'h-2.5 w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Slide berikutnya"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
