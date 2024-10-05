import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-1/6 md:w-[8%] lg:w-[16%] xl:w-[1/6]">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">4:1 School</span>
        </Link>
        <Menu/>

      </div>

      {/* Right */}
      <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[5/6]  overflow-scroll bg-gray-300">
       <Navbar/>
       {children}
      </div>
    </div>
  );
}
