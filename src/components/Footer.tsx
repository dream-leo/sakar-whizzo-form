import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 overflow-hidden text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>© 2025 Sakar Whizzo. All rights reserved.</p>
          </div>

          {/* Dreamleo Credit */}
          <div className="flex items-center">
            <p className="text-gray-400 text-sm flex items-center">
              Design & Developed by{" "}
              <Link
                href="https://dreamleo.com/"
                target="_blank"
                className="inline-flex items-center space-x-1 text-white hover:text-[#CEAE92] transition-colors ml-1"
              >
                <Image
                  src="/logo/dreamleoblack.png"
                  alt="Dreamleo Web Solution"
                  width={20}
                  height={20}
                  className="filter invert"
                />
                <span className="font-medium">Dreamleo</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
