import React from "react";
import HomeLayout from "../../../components/HomeLayout";
import Head from "next/head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";

import { parseISO, format } from "date-fns";

const client = createClient({
  space: "1x6ki17dg0qb",
  accessToken: "zgGSibJAwdQVT-0Gg3H7Efims0MHsjfFNdewiYyAXrM",
});

const fetchFeaturedBlog = async () => {
  // Contentful
  const res = await client.getEntries({
    content_type: "featuredBlog",
  });
  return res.items.map((item: any) => {
    const {
      title,
      thumbnail: {
        fields: {
          file: { url },
        },
      },
      description,
      slug,
      date,
    } = item.fields;
    const { id } = item.sys;
    return { id, title, thumbnailUrl: "https:" + url, slug, date, description };
  });
};

async function getAllSlugs() {
  const blog = await fetchFeaturedBlog();

  const paths = blog.map((post: any) => {
    const { slug } = post;
    return {
      params: { slug },
    };
  });
  return paths;
}

async function getPostBySlug(slug: string) {
  const res = await client.getEntries({
    content_type: "featuredBlog",
    "fields.slug": slug,
  });
  if (res.items) {
    return res.items[0].fields;
  }
  return null;
}

export async function getStaticPaths() {
  const paths = await getAllSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      props: {
        post: false,
      },
    };
  }
  return {
    props: { post },
    revalidate: 10,
  };
}

function Post({ post }: any) {
  if (!post) {
    return <h1>Unable to find post</h1>;
  }
  const {
    title,
    description,
    date,
    thumbnail: {
      fields: {
        file: { url },
      },
    },
  } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <HomeLayout>
        <article className={styles.container}>
          <span className="text-end text-gray-600 font-semibold lg:w-8/12 w-11/12">
            <time dateTime={date}>
              {format(parseISO(date), "LLLL d, yyyy")}
            </time>
          </span>
          <Image
            alt="post-image"
            width={1200}
            height={500}
            src={"https:" + url}
            className="rounded-lg lg:w-8/12 w-11/12"
          />
          <h1 style={{ color: "black", textAlign: "center" }}>{title}</h1>

          <div className="lg:w-8/12 w-11/12 mt-10">
            {documentToReactComponents(description)}
          </div>
        </article>
      </HomeLayout>
    </>
  );
}

export default Post;
