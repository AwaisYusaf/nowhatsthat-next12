import React, { useState } from 'react'
import Head from "next/head";
import HomeLayout from '../../../components/HomeLayout';
import PostHighlight from '../../../components/PostHighlight';
import Link from "next/link";
import { useRouter } from "next/router";
const APP_URL = 'http://localhost:1337';
function Tag({ children }: any) {
    const path = useRouter().query;
    return <Link
        className={`${path.tag == children ? "text-white bg-black" : "bg-green-100 hover:bg-green-200"}  text-lg mx-2 px-4 py-1 rounded-full font-medium cursor-pointer`}
        href={children == "All" ? "/blog" : `/blog/tag/${children}`}>
        {children}
    </Link>
}
async function getAllPossibleTags() {
    const url = `${APP_URL}/api/tags`;
    const res = await fetch(url);
    const { data } = await res.json();
    const paths = data.map((tag: any) => {
        return {
            params: {
                tag: tag.attributes.Name
            }
        }
    })
    return paths;
}

export async function getStaticPaths() {
    const paths = await getAllPossibleTags();
    return { paths, fallback: false }
}
function contains(arr: any, item: any) {
    for (let i = 0; i < arr; i++) {
        if (arr.attributes.Name === item) {
            return true;
        }
    }
    return false;
}
export async function getStaticProps({ params }: { params: { tag: string } }) {
    const url = `${APP_URL}/api/posts?populate=*`;
    const res = await fetch(url);
    const data = await res.json();
    const targetPosts = data.data.filter((post: any) => {
        return contains(post.attributes.tags.data, params.tag);
    });
    const url2 = `${APP_URL}/api/tags?populate=*`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();
    return { props: { posts: targetPosts, tags: data2.data } };
}

function Blogs({ posts, tags }: any) {

    if (!posts) {
        return <h1>No Post with this tag</h1>
    }
    return (
        <main>
            <Head>
                <title>Blog | Now Whats That</title>
            </Head>
            <HomeLayout>

                <div className="flex mt-4 w-full">
                    <Tag >All</Tag>
                    {
                        tags.map((tag: any, index: number) => {
                            return <Tag key={index}>{tag.attributes.Name}</Tag>
                        })
                    }
                </div>
                <div className="w-full"><h3
                    className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">Lifestyle</h3></div>
                <div className="flex flex-wrap w-full">
                    <PostHighlight />
                    <PostHighlight />
                    <PostHighlight />
                    <PostHighlight />
                    <PostHighlight />
                </div>

            </HomeLayout>
        </main>
    )
}

export default Blogs;