import {CommunitySection, HeroSection, TextSlide, VisionSection} from "@/components";


export default function Home() {
  return (
      <>
        <HeroSection />
          <TextSlide style="text-[max(2em,4vw)]" text={"Women’s rights are human rights!"} />
        <VisionSection />
        <CommunitySection />
      </>
  );
}
