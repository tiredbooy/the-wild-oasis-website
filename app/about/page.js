import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid items-center grid-cols-1 px-4 text-base lg:grid-cols-5 sm:text-lg gap-x-8 sm:gap-x-12 lg:gap-x-24 gap-y-12 sm:gap-y-16 lg:gap-y-32 sm:px-6 lg:px-0">
      {/* First Section - Text */}
      <div className="order-1 lg:col-span-3">
        <h1 className="mb-6 text-3xl font-medium sm:mb-8 lg:mb-10 sm:text-4xl text-accent-400">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins?.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* First Section - Image */}
      <div className="order-2 lg:col-span-2">
        <Image
          src={image1}
          quality={80}
          placeholder="blur"
          alt="Family sitting around a fire pit in front of cabin"
          className="rounded-lg"
        />
      </div>

      {/* Second Section - Image */}
      <div className="relative order-4 lg:col-span-2 aspect-square lg:order-3">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover rounded-lg"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      {/* Second Section - Text */}
      <div className="order-3 lg:col-span-3 lg:order-4">
        <h1 className="mb-6 text-3xl font-medium sm:mb-8 lg:mb-10 sm:text-4xl text-accent-400">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block px-6 py-4 mt-3 text-base font-semibold transition-all rounded-sm sm:px-8 sm:py-5 sm:mt-4 sm:text-lg bg-accent-500 text-primary-800 hover:bg-accent-600"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
