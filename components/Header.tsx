import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropDown = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  return (
    <div className=" flex md:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Customise options"
          >
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/">Home</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/blog">Blog</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/terms">Terms & Conditions</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/about"> About us</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              <Link href="/contact">Contact us</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

function Header() {
  return (
    <header className="flex w-full items-center px-4 lg:px-12 justify-between">
      <Link href="/">
        <Image
          src="/assets/images/logo.jpg"
          alt="logo"
          width="120"
          height="120"
          className="p-4"
        />
      </Link>
      <DropDown />
      <div className="lg:flex flex-1 font-semibold transition text-md text-gray-600 hidden">
        <Link href="/" className="mx-6 ml-10 hover:text-black">
          Home
        </Link>
        <Link href="/blog" className="mx-6 hover:text-black">
          Blog
        </Link>
        <Link href="/privacy-policy" className="mx-6 hover:text-black">
          Privacy Policy
        </Link>
        <Link href="/terms" className="mx-6 hover:text-black">
          Terms & Conditions
        </Link>
        <Link href="/contact" className="mx-6 hover:text-black">
          Contact
        </Link>
        <Link href="/about" className="mx-6 hover:text-black">
          About Us
        </Link>
      </div>
      <Link
        href="/"
        className="hidden md:flex bg-green-700 text-white font-semibold px-8 py-2 rounded-full transition-all hover:shadow-lg "
      >
        Become a Subscriber
      </Link>
    </header>
  );
}

export default Header;
