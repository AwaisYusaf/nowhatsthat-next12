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
function filterPosts(tag: string, posts: any) {
    console.log("Filter posts called..");
    let targetPosts: any = [];
    for (let i = 0; i < posts.data.length; i++) {
        // posts.data[i].attributes.tags will return object schema : {data: [ { id: 5, attributes: [Object] }, { id: 6, attributes: [Object] } ]}
        const postTags = posts.data[i].attributes.tags.data;
        for (let j = 0; j < postTags.length; j++) {
            if (postTags[j].attributes.Name == tag) {
                targetPosts.push(posts.data[i])
            }
        }
    }
    console.log("Tagrte postS:", targetPosts);
    return targetPosts;
}
export async function getStaticProps({ params }: { params: { tag: string } }) {
    const url = `${APP_URL}/api/posts?populate=*`;
    const res = await fetch(url);
    const data = await res.json();
    const targetPosts = filterPosts(params.tag, data);
    console.log("getStaticProps() inside post/[tag]: ", targetPosts);
    const url2 = `${APP_URL}/api/tags?populate=*`;
    const res2 = await fetch(url2);
    const data2 = await res2.json();
    return { props: { posts: targetPosts, tags: data2.data, tag: params.tag } };
}

function Blogs({ posts, tags, tag }: any) {
    if (!posts) {
        return <p className='text-gray-600 font-semibold'>No Post with {tag} avaiable</p>
    }
    let postsData: any = [];
    for (let i = posts.length - 1; i >= 0; i--) {
        postsData.push(posts[i]);
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
                    className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">{tag}</h3></div>
                <div className="flex flex-wrap w-full">
                    {postsData.length > 0 ? (
                        postsData.map((post: any, index: number) => {
                            return <PostHighlight key={index} post={post} />
                        }))
                        : <p className='text-gray-600 font-semibold text-center w-full mt-20'>No {tag} post avaiable</p>}
                </div>

            </HomeLayout>
        </main>
    )
}

export default Blogs;