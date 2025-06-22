import {CommunitySection, HeroSection, TextSlide, VisionSection} from "@/components";
import FadeInSection from "@/app/_components/FadeIn/FadeInSection";
import {ReportSection} from "@/app/_components/LandingPage/ReportSection";
import FAQSection from "@/app/_components/LandingPage/FAQSection";
import {ArticleSection} from "@/app/_components/LandingPage/ArticleSection";


export default function Home() {
    return (
        <>
            <HeroSection/>
            <TextSlide style="text-[max(2em,4vw)]" text={"Women’s rights are human rights!"}/>
            <FadeInSection>
                <VisionSection/>
            </FadeInSection>
            <FadeInSection>
                <CommunitySection/>
            </FadeInSection>
            <FadeInSection>
                <ReportSection/>
            </FadeInSection>
            <FadeInSection>
                <FAQSection/>
            </FadeInSection>
            <FadeInSection>
                <ArticleSection/>
            </FadeInSection>
        </>
    );
}
