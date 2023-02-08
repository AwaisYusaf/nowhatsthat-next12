import React from 'react'
import Head from "next/head";
import HomeLayout from '../../components/HomeLayout';
import PostHighlight from '../../components/PostHighlight';
function Blogs() {
    return (
        <main>
            <Head>
                <title>Blog | Now Whats That</title>
            </Head>
            <HomeLayout>
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

export default Blogs