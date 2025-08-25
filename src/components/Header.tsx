import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Image
            src="/logo/SakarWhizzoOrignalBlack.png"
            alt="Sakar Whizzo Logo"
            width={200}
            height={80}
            className="h-auto max-w-[200px]"
            priority
          />
        </div>
      </div>
    </header>
  );
}
