import React from 'react'
import Image from "next/image"
import Link from "next/link"
const APP_URL = 'http://localhost:1337';
function Tag({ children }: any) {
    return <Link href={`/blog/tag/${children}`}
        className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</Link>
}


function PostHighlight({ post }: any) {

    if (!post) {
        return <p>Loading...</p>
    }
    const { Date, Description, Title } = post.attributes;
    const tags = post.attributes.tags.data;
    const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;

    return (
        <section className="mt-8 flex flex-col md:w-4/12 w-11/12 p-5 my-3">
            <Link href={Title.split(" ").join("-")}>
                <Image src={imgUrl} alt="blog" width="1800" height="200"
                    className="rounded-xl transition duration-300 hover:-translate-y-1 cursor-pointer" />
            </Link>
            <div className="flex mt-4">
                <Tag>Lifestyle</Tag>
                <Tag>Eco</Tag>
            </div>


            <Link href={Title.split(" ").join("-")}
                className="text-2xl font-bold cursor-pointer hover:underline ml-2 title overflow-hidden">
                {Title}</Link>
        </section>
    )
}

export default PostHighlight