import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src={logo} width="60" height="60" alt="The Wild Oasis logo" quality={100} />
      <span className="hidden text-xl font-semibold text-primary-100 md:block">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
