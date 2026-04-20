"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesOverview } from "@/components/sections/services-overview"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { TestimonialsPreview } from "@/components/sections/testimonials-preview"
import { FaqSection } from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesOverview />
        <WhyChooseUs />
        <HowItWorks />
        <Pricing />
        <TestimonialsPreview />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
