"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import logo from "@/assets/logoAzul.png";

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
}

const MobileNav = ({}: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-x-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt=""
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-6">
          <Link href="/" className="flex items-center m-4 gap-2">
            <Image src={logo} alt="" width={38} height={38} />
            <h1 className="font-ibm-plex-serif font-bold text-[22px] text-[#000430]">
              Finance360
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 mx-3",
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        
                          <Image
                            src={item.imgURL || "/placeholder.svg"}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn(
                              isActive ? "brightness-0 invert" : ""
                            )}
                          />
                         
                        <p className="text-sm font-medium md:hidden lg:block">
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
          <nav></nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
