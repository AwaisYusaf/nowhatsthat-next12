import React, { useState } from 'react'
import Head from "next/head";
import HomeLayout from '../../components/HomeLayout';
import PostHighlight from '../../components/PostHighlight';
import Link from "next/link";
const APP_URL = 'http://localhost:1337';
function Tag({ children }: any) {
    return <Link
        className={`${children == "All" ? "bg-black text-white" : "bg-green-100 hover:bg-green-200"}  text-lg mx-2 px-4 py-1 rounded-full font-medium cursor-pointer`}

        href={children == "All" ? "/blog" : `/blog/tag/${children}`}>
        {children}
    </Link>
}

export async function getStaticProps() {
    const url = `${APP_URL}/api/posts?populate=*`;
    const res = await fetch(url);
    const { data } = await res.json();

    const url2 = `${APP_URL}/api/tags?populate=*`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();

    return {
        props: {
            posts: data,
            tags: data2.data
        }
    }
}




function Blogs({ posts, tags }: any) {
    return (
        <main>
            <Head>
                <title>Blog | Now Whats That</title>
            </Head>
            <HomeLayout>

                <div className="flex mt-4 w-full">
                    <Tag>All</Tag>
                    {
                        tags.map((tag: any, index: number) => {
                            return <Tag key={index}>{tag.attributes.Name}</Tag>
                        })
                    }
                </div>
                <div className="w-full"><h3
                    className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">Lifestyle</h3></div>
                <div className="flex flex-wrap w-full">
                    {
                        posts.map((post: any, index: number) => {
                            return <PostHighlight key={index} post={post} />
                        })
                    }
                </div>

            </HomeLayout>
        </main>
    )
}

export default Blogs;