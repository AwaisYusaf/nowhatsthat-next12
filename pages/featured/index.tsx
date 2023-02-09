import React from 'react'
import Link from "next/link";
import Head from "next/head";
import HomeLayout from '../../components/HomeLayout';
import PostHighlight from '../../components/PostHighlight';
const APP_URL = 'http://localhost:1337';
export async function getServerSideProps() {
    const url = `${APP_URL}/api/featured-posts?populate=*`;
    const res = await fetch(url);
    const { data } = await res.json();



    return {
        props: {
            posts: data,
        }
    }
}

function FeaturedPosts({ posts }: any) {
    console.log("On Featured Page:", posts);
    let postsData = [posts[posts.length - 1]];
    for (let i = posts.length - 2; i >= 0; i--) {
        postsData.push(posts[i]);
    }

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
                        postsData.map((post: any, index: number) => {
                            return <PostHighlight key={index} post={post} type={"featured"} />
                        })
                    }
                </div>
            </HomeLayout>
        </main>
    )
}

export default FeaturedPosts