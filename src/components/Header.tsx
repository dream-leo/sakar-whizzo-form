import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Link
            href="https://sakarwhizzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 duration-300"
          >
            <Image
              src="/logo/SakarWhizzoOrignalBlack.png"
              alt="Sakar Whizzo Logo"
              width={200}
              height={80}
              className="h-auto max-w-[200px]"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
