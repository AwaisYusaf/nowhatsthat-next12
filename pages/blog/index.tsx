import React, { useState } from "react";
import Head from "next/head";
import HomeLayout from "../../components/HomeLayout";
import PostHighlight from "../../components/PostHighlight";
import Link from "next/link";
import { createClient } from "contentful";

function Tag({ children }: any) {
  return (
    <Link
      className={`${
        children == "All"
          ? "bg-black text-white"
          : "bg-green-100 hover:bg-green-200"
      }  text-lg mx-2 px-4 py-1 rounded-full text-xs lg:text-lg md:font-medium cursor-pointer my-2`}
      href={children == "All" ? "/blog" : `/blog/tag/${children}`}
    >
      {children}
    </Link>
  );
}

const client = createClient({
  space: "1x6ki17dg0qb",
  accessToken: "zgGSibJAwdQVT-0Gg3H7Efims0MHsjfFNdewiYyAXrM",
});

const fetchTags = async () => {
  // Contentful
  const res = await client.getEntries({
    content_type: "tag",
  });
  return res.items.map((item: any) => {
    const {
      title,
      thumbnail: {
        fields: {
          file: { url },
        },
      },
    } = item.fields;
    return { title, thumbnailUrl: "https:" + url };
  });
};

const fetchBlog = async () => {
  // Contentful
  const res = await client.getEntries({
    content_type: "blog",
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
      tags,
    } = item.fields;
    const { id } = item.sys;
    const blogTags = tags.map((tag: any) => {
      const {
        title,
        thumbnail: {
          fields: {
            file: { url },
          },
        },
      } = tag.fields;
      return { title, thumbnailUrl: "https:" + url };
    });
    return {
      id,
      title,
      thumbnailUrl: "https:" + url,
      slug,
      date,
      description,
      tags: blogTags,
    };
  });
};

export async function getStaticProps() {
  const [blog, ctags] = await Promise.all([fetchBlog(), fetchTags()]);

  return {
    props: {
      blog,
      ctags,
    },
    revalidate: 10,
  };
}

function Blogs({ blog, ctags }: any) {
  return (
    <>
      <Head>
        <title>Blog | Now Whats That</title>
      </Head>
      <HomeLayout>
        <div className="flex mt-4 w-full flex-wrap md:justify-start justify-evenly">
          <Tag>All</Tag>
          {ctags.map((tag: any, index: number) => {
            return <Tag key={index}>{tag.title}</Tag>;
          })}
        </div>
        <div className="w-full">
          <h3 className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">
            All
          </h3>
        </div>

        {/* flex flex-wrap w-full justify-center lg:justify-between */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {blog.map((post: any, index: number) => {
            return <PostHighlight key={index} post={post} type="" />;
          })}
        </div>
      </HomeLayout>
    </>
  );
}

export default Blogs;
