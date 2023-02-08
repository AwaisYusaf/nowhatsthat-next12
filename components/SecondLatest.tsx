import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { removeQuestionMark } from '../lib/post';
const APP_URL = "http://localhost:1337";
function Tag({ children }: any) {
    return <Link href={`/blog/tag/${children}`} className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</Link>
}
function SecondLatest({ post }: any) {
    if (!post.attributes) {
        return <p>Loading...</p>
    }
    const { Date, Description, Title } = post.attributes;
    const tags = post.attributes.tags.data;
    const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;
    return (
        <section className="mt-8 hidden lg:block">
            <Link href={`/blog/post/${removeQuestionMark(Title.toLowerCase().split(" ").join("-"))}`}>
                <Image src={imgUrl} alt="blog" width="400" height="200"
                    className="rounded-xl hover:-translate-y-1 transition duration-300 cursor-pointer" />
            </Link>
            <div className="flex mt-4">
                {tags.map((tag: { attributes: { Name: string } }, index: number) => {
                    return <Tag key={index}>{tag.attributes.Name}</Tag>
                })}
            </div>
            <Link href={`/blog/post/${removeQuestionMark(Title.toLowerCase().split(" ").join("-"))}`}
                className="text-2xl font-bold cursor-pointer hover:underline title">{Title}</Link>
        </section>
    )
}

export default SecondLatest