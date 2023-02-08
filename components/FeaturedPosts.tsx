import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
function Tag({ children }: any) {
    return <p className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</p>
}
function Post() {
    return <section className="mt-8 lg:w-1/4 md:w-8/12 sm:w-11/12 p-5 bg-green-800 m-6 rounded-xl flex flex-col items-center cursor-pointer hover:-translate-y-1 transition duration-300">
        <Image src="/assets/images/blog2.jpeg" alt="blog" width="300" height="200"
            className="rounded-xl" />
        <div className="flex mt-4 w-full ml-4">
            <Tag>Lifestyle</Tag>
            <Tag>Eco</Tag>
        </div>
        <h2 className="text-2xl font-bold cursor-pointer hover:underline ml-2 title text-white">AI can solve new problems very easily</h2>
    </section>
}


function FeaturedPosts() {
    return (
        <div className='bg-green-100 w-full flex flex-col items-center rounded-xl py-14 '>
            <p className='text-lg text-gray-700 font-semibold'>Editor’s Choice</p>
            <h1 className='title my-8 font-bold md:text-4xl text-2xl text-center leading-normal'>Get started with our<br /> best stories</h1>
            <div className='flex justify-center flex-wrap'>
                <Post />
                <Post />
                <Post />
            </div>

            <div className='w-full flex justify-center mt-8 hover:underline'><Link href="/">See all featured posts →</Link></div>

        </div>
    )
}

export default FeaturedPosts