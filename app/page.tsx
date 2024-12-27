import { AccordionComponent } from "@/components/homepage/accordion-component";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import Pricing from "@/components/homepage/pricing";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import Footer from '@/components/wrapper/footer'

export default function Home() {
  

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[3rem] p-3">
        <HeroSection />
      </div>

      <div className="flex flex-col  p-2 w-full justify-center items-center">
        <MarketingCards />
      </div>

      {(config.auth.enabled && config.payments.enabled) && <div className="flex flex-col justify-center items-center w-full my-[8rem]">
        <Pricing />
      </div>}


      <Footer />

    </PageWrapper>
  );
}
