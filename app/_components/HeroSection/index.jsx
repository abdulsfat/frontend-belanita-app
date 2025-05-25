import { ButtonEmergency } from "@/app/_components";
import Image from "next/image";

export function HeroSection() {
  return (
    <>
      <section className="flex items-start justify-between gap-3 py-4 w-full px-8 mt-20">
        <div className="w-[58%] rounded-3xl ">
          {/* <p>tes</p> */}
          <Image
            width={800}
            height={800}
            src="/hero.png"
            alt="Hero Image"
            className="rounded-3xl"
          />
        </div>

        <div className="flex flex-col items-start justify-start w-[42%] ">
          <div className="bg-gradient-to-br from-primary to-primary/80 w-full py-20 px-14 mb-3 rounded-3xl">
            <div className="flex flex-col justify-center items-start  gap-16">
              <p className="bg-tertiary rounded-full px-5 py-1 text-sm text-secondary">
                WOMEN’S RIGHTS
              </p>
              <h1 className="text-black font-medium text-7xl">
                Welcome to <br />
                Belanita
              </h1>
              <p className="text-sm text-black">
                <span className="font-medium">
                  Championing Women’s Rights: <br />
                </span>{" "}
                Empowering Voices, Ensuring Equality for a Just and Inclusive
                Future.
              </p>
            </div>
          </div>
          <ButtonEmergency />
        </div>
      </section>
    </>
  );
}
