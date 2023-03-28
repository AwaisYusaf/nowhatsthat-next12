import React from 'react'
import Image from "next/image"
import Link from "next/link"
const APP_URL = 'http://localhost:1337';
import { removeQuestionMark } from '../lib/post';
function Tag({ children }: any) {
    return <Link href={`/blog/tag/${children}`}
        className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</Link>
}


function PostHighlight({ post, type }: any) {
    if (!post) {
        return <p>Loading...</p>
    }
    const { Date, Description, Title } = post.attributes;
    let tags;
    if (post.attributes.tags) {
        tags = post.attributes.tags.data
    }
    const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;
    const initialUrl = type == "featured" ? "/featured/post" : "/blog/post";
    return (
        <section className="mt-8 flex flex-col md:w-4/12 w-11/12 p-5 my-3">
            <Link href={`${initialUrl}/${removeQuestionMark(Title.toLowerCase().split(" ").join("-"))}`}>
                <Image src={imgUrl} alt="blog" width="1600" height="900"
                    className="rounded-xl transition duration-300 hover:-translate-y-1 cursor-pointer w-full h-[280px] object-cover" />
            </Link>
            <div className="flex mt-4">
                {tags && tags.map((tag: { attributes: { Name: string } }, index: number) => {
                    return <Tag key={index}>{tag.attributes.Name}</Tag>
                })}
            </div>
            <Link href={`${initialUrl}/${removeQuestionMark(Title.toLowerCase().split(" ").join("-"))}`}
                className="text-2xl font-bold cursor-pointer hover:underline ml-2 title overflow-hidden">
                {Title}</Link>
        </section>
    )
}

export default PostHighlight