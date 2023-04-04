import React from 'react'
import Link from "next/link";
import Head from "next/head";
import HomeLayout from '../../components/HomeLayout';
import PostHighlight from '../../components/PostHighlight';


import { createClient } from "contentful";


const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

const fetchFeaturedBlog = async () => {
    // Contentful
    const res = await client.getEntries({
        content_type: "featuredBlog"
    });
    return res.items.map((item: any) => {
        const { title, thumbnail: { fields: { file: { url } } }, description, slug, date } = item.fields;
        const { id } = item.sys;
        return { id, title, thumbnailUrl: "https:" + url, slug, date, description }
    })
}


export async function getStaticProps() {
    const featuredBlog = await fetchFeaturedBlog();
    return {
        props: {
            posts: featuredBlog,
        }
    }
}

function FeaturedPosts({ posts }: any) {
    return (
        <main>
            <Head>
                <title>Blog | Now Whats That</title>
            </Head>
            <HomeLayout>


                <div className="w-full"><h3
                    className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">Featured Posts</h3></div>
                <div className="flex flex-wrap w-full">
                    {
                        posts.map((post: any, index: number) => {
                            return <PostHighlight key={index} post={post} type={"featured"} />
                        })
                    }
                </div>
            </HomeLayout>
        </main>
    )
}

export default FeaturedPosts