import Image from "next/image";
import {ButtonEmergency} from "@/components";
import FadeInSection from "@/app/_components/FadeIn/FadeInSection";

export function ReportSection() {
    return (
        <section
            className="flex flex-col md:flex-row items-center justify-between gap-10 py-10 w-full px-4 md:px-12 mt-10">
            <FadeInSection direction="right">
            <div className="flex flex-col justify-between items-start w-full md:w-[40%] gap-6">
                <h1 className="text-black text-4xl md:text-6xl leading-snug">
                    Report completed quickly.
                </h1>
                <p className="text-sm md:text-md font-light text-black w-full leading-6 md:leading-7">
                    Report your issue through the complaint form and receive a prompt response from our staff.
                </p>
                <ButtonEmergency/>
            </div>
            </FadeInSection>

            <FadeInSection direction="left">
            <div className="w-full md:w-[54rem] rounded-3xl overflow-hidden">
                <Image
                    src="/report.png"
                    alt="Hero Image"
                    width={2080}
                    height={2080}
                    className="w-full h-full object-cover"
                />
            </div>
            </FadeInSection>
        </section>
    );
}
