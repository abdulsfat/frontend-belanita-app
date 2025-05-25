import Image from "next/image";

export function CommunitySection() {
  return (
    <>
      <section className="flex flex-col items-center justify-center py-10 w-full px-8 mt-10 ">
        <div className="text-center">
          <h1 className="text-6xl">Make Change Possible</h1>
          <h1 className="text-6xl flex items-center justify-center mt-3">
            With{" "}
            <span className="px-4 flex items-center gap-2 ml-2">
              <Image src="/women.png" alt="img-women" width={50} height={50} />
              <Image
                src="/women-2.png"
                alt="img-women"
                width={50}
                height={50}
              />
            </span>
            <span className="ml-2">Belanita</span>
          </h1>
        </div>
        <p className="w-96 mt-9 leading-5 text-center">
          Join our community dedicated to safety and support, with over
          <span className="font-bold text-secondary"> 26,000 </span> women
          empowered and assisted.
        </p>
      </section>
    </>
  );
}
