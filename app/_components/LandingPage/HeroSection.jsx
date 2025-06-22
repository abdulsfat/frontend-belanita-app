import { ButtonEmergency } from "@/components";
import Image from "next/image";

export function HeroSection() {
  return (
      <section className="flex flex-col md:flex-row items-start justify-between gap-6 py-8 px-4 md:px-8 mt-10 md:mt-20 w-full">
        {/* Image Section */}
        <div className="w-full md:w-[58%] rounded-3xl">
          <Image
              width={800}
              height={800}
              src="/hero.png"
              alt="Hero Image"
              className="rounded-3xl w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-[42%] flex flex-col items-start justify-start">
          <div className="bg-gradient-to-br from-primary to-primary/80 w-full py-10 md:py-20 px-6 md:px-14 mb-4 md:mb-3 rounded-3xl">
            <div className="flex flex-col justify-center items-start gap-10 md:gap-16">
              <p className="bg-tertiary rounded-full px-4 md:px-5 py-1 text-xs md:text-sm text-secondary">
                WOMEN’S RIGHTS
              </p>
              <h1 className="text-black font-medium text-4xl md:text-7xl leading-tight">
                Welcome to <br />
                Belanita
              </h1>
              <p className="text-sm md:text-base text-black">
              <span className="font-medium">
                Championing Women’s Rights: <br />
              </span>
                Empowering Voices, Ensuring Equality for a Just and Inclusive Future.
              </p>
            </div>
          </div>
          <ButtonEmergency />
        </div>
      </section>
  );
}
