import React, { useState } from "react";
import Head from "next/head";
import HomeLayout from "../../../components/HomeLayout";
import PostHighlight from "../../../components/PostHighlight";
import Link from "next/link";
import { useRouter } from "next/router";

import { createClient } from "contentful";

function Tag({ children }: any) {
  const path = useRouter().query;
  return (
    <Link
      className={`${
        path.tag == children
          ? "text-white bg-black"
          : "bg-green-100 hover:bg-green-200"
      }  text-lg mx-2 px-4 py-1 rounded-full font-medium cursor-pointer`}
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

function filterPosts(tag: string, posts: any) {
  let targetPosts: any = [];

  for (let i = 0; i < posts.length; i++) {
    // posts.data[i].attributes.tags will return object schema : {data: [ { id: 5, attributes: [Object] }, { id: 6, attributes: [Object] } ]}

    for (let j = 0; j < posts[i].tags.length; j++) {
      if (posts[i].tags[j].title == tag) {
        targetPosts.push(posts[i]);
      }
      console.log(posts[i].tags[j]);
    }
  }

  return targetPosts;
}
async function getAllPossibleTags() {
  const tags = await fetchTags();
  const paths = tags.map((tag: any) => {
    return {
      params: {
        tag: tag.title,
      },
    };
  });
  return paths;
}

export async function getStaticPaths() {
  const paths = await getAllPossibleTags();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const [blog, tags] = await Promise.all([fetchBlog(), fetchTags()]);

  const targetPosts = filterPosts(params.tag, blog);

  return { props: { posts: targetPosts, tags, tag: params.tag } };
}

function Blogs({ posts, tags, tag }: any) {
  if (!posts) {
    return (
      <p className="text-gray-600 font-semibold">No Post with {tag} avaiable</p>
    );
  }

  return (
    <main>
      <Head>
        <title>Blog | Now Whats That</title>
      </Head>
      <HomeLayout>
        <div className="flex mt-4 w-full">
          <Tag>All</Tag>
          {tags.map((tag: any, index: number) => {
            return <Tag key={index}>{tag.title}</Tag>;
          })}
        </div>
        <div className="w-full">
          <h3 className="uppercase font-bold text-md ml-5 border-b-2 border-green-300 w-fit mt-5">
            {tag}
          </h3>
        </div>
        <div className="flex flex-wrap w-full">
          {posts.length > 0 ? (
            posts.map((post: any, index: number) => {
              return <PostHighlight key={index} post={post} type="" />;
            })
          ) : (
            <p className="text-gray-600 font-semibold text-center w-full mt-20">
              No {tag} post avaiable
            </p>
          )}
        </div>
      </HomeLayout>
    </main>
  );
}

export default Blogs;
