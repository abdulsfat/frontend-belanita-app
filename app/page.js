import {
  CommunitySection,
  HeroSection,
  TextSlide,
  VisionSection,
} from "@/components";

export default function Home() {
  return (
      <>
        <HeroSection />
          <TextSlide text={"Women’s rights are human rights!"} />
        <VisionSection />
        <CommunitySection />
      </>
  );
}
