import React, { useState } from 'react'
import Head from "next/head";
import HomeLayout from '../../components/HomeLayout';
import PostHighlight from '../../components/PostHighlight';
import Link from "next/link";
import { createClient } from 'contentful';

const APP_URL = 'http://localhost:1337';


function Tag({ children }: any) {
    return <Link
        className={`${children == "All" ? "bg-black text-white" : "bg-green-100 hover:bg-green-200"}  text-lg mx-2 px-4 py-1 rounded-full font-medium cursor-pointer`}

        href={children == "All" ? "/blog" : `/blog/tag/${children}`}>
        {children}
    </Link>
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});



const fetchTags = async () => {
    // Contentful
    const res = await client.getEntries({
        content_type: "tag"
    });
    return res.items.map((item: any) => {
        const { title, thumbnail: { fields: { file: { url } } } } = item.fields;
        return { title, thumbnailUrl: "https:" + url }
    })
}

const fetchBlog = async () => {
    // Contentful
    const res = await client.getEntries({
        content_type: "blog"
    });
    return res.items.map((item: any) => {
        const { title, thumbnail: { fields: { file: { url } } }, description, slug, date, tags } = item.fields;
        const { id } = item.sys;
        const blogTags = tags.map((tag: any) => {
            const { title, thumbnail: { fields: { file: { url } } } } = tag.fields;
            return { title, thumbnailUrl: "https:" + url }
        })
        return { id, title, thumbnailUrl: "https:" + url, slug, date, description, tags: blogTags }
    })
}


export async function getServerSideProps() {
    const url = `${APP_URL}/api/posts?populate=*`;
    const res = await fetch(url);
    const { data } = await res.json();

    const url2 = `${APP_URL}/api/tags?populate=*`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();

    const [blog, ctags] = await Promise.all([fetchBlog(), fetchTags()]);

    return {
        props: {
            posts: data,
            tags: data2.data,
            blog,
            ctags
        }
    }
}




function Blogs({ posts, tags, blog, ctags }: any) {
    let postsData = [posts[posts.length - 1]];
    for (let i = posts.length - 2; i >= 0; i--) {
        postsData.push(posts[i]);
    }
    console.log(blog);
    console.log(ctags);


    return (
        <main>
            <Head>
                <title>Blog | Now Whats That</title>
            </Head>
            <HomeLayout>

                <div className="flex mt-4 w-full">
                    <Tag>All</Tag>
                    {
                        ctags.map((tag: any, index: number) => {
                            return <Tag key={index}>{tag.title}</Tag>
                        })
                    }
                </div>
                <div className="w-full"><h3
                    className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">All</h3></div>
                <div className="flex flex-wrap w-full">
                    {
                        blog.map((post: any, index: number) => {
                            return <PostHighlight key={index} post={post} type="" />
                        })
                    }
                </div>
            </HomeLayout>
        </main>
    )
}

export default Blogs;