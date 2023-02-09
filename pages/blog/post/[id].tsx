import React from 'react'
import { removeQuestionMark } from '../../../lib/post';
import HomeLayout from '../../../components/HomeLayout';
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from 'react-markdown'
import styles from "./style.module.css";
import Date from '../../../components/date';

import { parseISO, format } from 'date-fns';


const APP_URL = 'http://localhost:1337';



async function getAllPossibleIds() {
    const url = `${APP_URL}/api/posts`;
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.data;
    const paths = posts.map((post: any) => {
        const path = removeQuestionMark(post.attributes.Title.toLowerCase().split(' ').join('-'));
        return {
            params: { id: path }
        }
    })
    return paths;
}
async function getPostByTitle(slug: string) {
    const url = `${APP_URL}/api/posts?populate=*`;
    const res = await fetch(url);
    const data = await res.json();
    const targetPost = data.data.filter((post: any) => {
        const path = removeQuestionMark(post.attributes.Title.toLowerCase().split(' ').join('-'));
        return path === slug
    })[0];
    return targetPost;
}


export async function getStaticPaths() {
    const paths = await getAllPossibleIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    const post = await getPostByTitle(params.id);
    if (!post) {
        return {
            props: {
                post: false
            }
        }
    }
    return {
        props: { post }
    }
}


function Post({ post }: any) {
    if (!post) {
        return <h1>Unable to find post</h1>
    }
    const { Date, Description, Title } = post.attributes;
    const tags = post.attributes.tags.data;
    const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;
    return (
        <>
            <Head>
                <title>{Title}</title>
            </Head>

            <HomeLayout>
                <main className={styles.container} >
                    <span className='text-end text-gray-600 font-semibold lg:w-8/12 w-11/12'>
                        <time dateTime={Date}>{format(parseISO(Date), 'LLLL d, yyyy')}</time>
                    </span>
                    <Image alt="post-image" width={1200} height={500} src={imgUrl} className='rounded-lg lg:w-8/12 w-11/12' />

                    <div className='lg:w-8/12 w-11/12 mt-10'>
                        <ReactMarkdown>{Description}</ReactMarkdown>
                    </div>
                </main>
            </HomeLayout>
        </>
    )
}

export default Post