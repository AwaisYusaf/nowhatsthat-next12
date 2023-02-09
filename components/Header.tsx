import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
    return (
        <header className="flex w-full items-center px-12">
            <Link href="/">
                <Image src="/assets/images/logo.png" alt="logo" width="180" height="10" />
            </Link>
            <div className="md:flex flex-1 font-semibold transition text-md text-gray-600 hidden">
                <Link href="/" className="mx-6 ml-10 hover:text-black">
                    Home
                </Link>
                <Link href="/blog" className="mx-6 hover:text-black">
                    Blog
                </Link>
                <Link href="/blog" className="mx-6 hover:text-black">
                    Privacy Policy
                </Link>
                <Link href="/blog" className="mx-6 hover:text-black">
                    Terms & Conditions
                </Link>
                <Link href="/blog" className="mx-6 hover:text-black">
                    Contact
                </Link>
                <Link href="/blog" className="mx-6 hover:text-black">
                    About Us
                </Link>
            </div>
            <Link href="/" className="hidden md:flex bg-green-700 text-white font-semibold px-8 py-2 rounded-full transition-all hover:shadow-lg " >Become a Subscriber</Link>
        </header >
    );
}

export default Header;
