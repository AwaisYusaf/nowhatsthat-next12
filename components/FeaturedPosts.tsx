import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { removeQuestionMark } from '../lib/post';
function Tag({ children }: any) {
    return <p className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</p>
}

const APP_URL = 'http://localhost:1337';

function Post({ data }: any) {
    return <section className="mt-8 lg:w-1/4 md:w-8/12 sm:w-11/12 p-5 bg-green-800 m-6 rounded-xl flex flex-col items-center cursor-pointer hover:-translate-y-1 transition duration-300">
        <Link href={`/featured/post/${removeQuestionMark(data.attributes.Title.toLowerCase().split(" ").join("-"))}`}>
            <Image src={`${APP_URL + data.attributes.Image.data.attributes.url}`} alt="blog" width="300" height="200"
                className="rounded-xl" />
        </Link>
        {/* <div className="flex mt-4 w-full ml-4">
            <Tag>Lifestyle</Tag>
            <Tag>Eco</Tag>
        </div> */}
        <Link href={`/featured/post/${removeQuestionMark(data.attributes.Title.toLowerCase().split(" ").join("-"))}`} className="text-2xl font-bold cursor-pointer hover:underline ml-2 title text-white mt-3">{data.attributes.Title}</Link>
    </section>
}


function FeaturedPosts({ posts }: any) {
    let myPosts: any = []
    for (let i = posts.length - 1; i >= 0; i--) {
        myPosts.push(posts[i]);
    }

    return (
        <div className='bg-green-100 w-full flex flex-col items-center rounded-xl py-14 '>
            <p className='text-lg text-gray-700 font-semibold'>Editor’s Choice</p>
            <h1 className='title my-8 font-bold md:text-4xl text-2xl text-center leading-normal'>Get started with our<br /> best stories</h1>
            <div className='flex justify-center flex-wrap'>
                {
                    myPosts.map((post: any, index: number) => {
                        return <Post key={index} data={post} />
                    })
                }
            </div>

            <div className='w-full flex justify-center mt-8 hover:underline'><Link href="/featured">See all featured posts →</Link></div>

        </div>
    )
}

export default FeaturedPosts