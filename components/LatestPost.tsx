import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { removeQuestionMark } from '../lib/post';

const APP_URL = "http://localhost:1337";
type PostType = {
    title: string;
    description: any;
    date: string;
    thumbnailUrl: string;
    slug: string;
    tags: { title: string, thumbnailUrl: string }[]
}


function Tag({ children }: any) {
    return <Link href={`/blog/tag/${children}`} className="bg-green-50 hover:bg-green-200 transition duration-300 text-xs mx-2 px-3 py-1 rounded-full font-medium">{children}</Link>
}


function LatestPost({ post }: { post: PostType }) {
    if (!post.title) {
        return <p>Loading...</p>
    }
    // const { Date, Description, Title } = post.attributes;
    // const tags = post.attributes.tags.data;
    // const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;

    return (
        <section className="mb-4 md:mb-0 flex flex-col items-center lg:items-start">
            <Link href={`/blog/post/${post.slug}`}
                className='flex flex-col lg:items-start items-center'>
                <Image src={post.thumbnailUrl} alt="blog" width={1200} height={400}
                    className="w-11/12 rounded-md hover:-translate-y-1 transition duration-300 cursor-pointer" />
            </Link>
            <div className="flex mt-4">
                {post.tags.map((tag: { title: string, thumbnailUrl: string }, index: number) => {
                    return <Tag key={index}>{tag.title}</Tag>
                })}
            </div>
            <Link href={`/blog/post/${post.slug}`}
                className="title font-semibold md:text-6xl text-2xl transition-all md:w-10/12 w-11/12 mt-6 hover:text-gray-600 text-black cursor-pointer leading-snug">
                {post.title}</Link>
            <p className="text-medium md:text-2xl text-lg mt-5 md:w-3/4 w-11/12 text-gray-500 leading-relaxed">
                Vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper.
                Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales.
                Nullam felis libero, congue quis ipsum et, lacinia maximus eros. Vestibulum ante ipsum primis in faucibus.
            </p>
        </section>
    )
}

export default LatestPost