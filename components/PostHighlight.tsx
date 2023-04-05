import React from "react";
import Image from "next/image";
import Link from "next/link";
const APP_URL = "http://localhost:1337";
import { removeQuestionMark } from "../lib/post";

type PostType = {
  title: string;
  description: any;
  date: string;
  thumbnailUrl: string;
  slug: string;
  tags: { title: string; thumbnailUrl: string }[];
};

function Tag({ children }: any) {
  return (
    <Link
      href={`/blog/tag/${children}`}
      className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300"
    >
      {children}
    </Link>
  );
}

function PostHighlight({ post, type }: { post: PostType; type: string }) {
  if (!post.title) {
    return <p>Loading...</p>;
  }
  const { title, description, slug, thumbnailUrl, tags } = post;

  // const imgUrl = APP_URL + post.attributes.Image.data.attributes.formats.large.url;
  const initialUrl = type == "featured" ? "/featured/post" : "/blog/post";
  //   md:w-4/12 w-11/12 p-5
  return (
    <section className="flex flex-col relative group lg:px-0 px-3">
      <Link href={`${initialUrl}/${slug}`} className="">
        <Image
          src={thumbnailUrl}
          alt="blog"
          width="1600"
          height="900"
          className="rounded-xl transition duration-300 group-hover:-translate-y-1 cursor-pointer w-full h-[280px] object-cover"
        />
      </Link>
      <div className="flex mt-4">
        {tags &&
          tags.map((tag: any, index: number) => {
            return <Tag key={index}>{tag.title}</Tag>;
          })}
      </div>
      <Link
        href={`${initialUrl}/${slug}`}
        className="text-2xl font-bold cursor-pointer hover:underline ml-2 title overflow-hidden"
      >
        <div className="flex items-start">
          <h3 className="flex-1 title">{title}</h3>
          {type == "featured" && (
            <Image
              src="/assets/star.png"
              width="30"
              height="30"
              alt="Anythin"
              className="z-50"
            />
          )}
        </div>
      </Link>
    </section>
  );
}

export default PostHighlight;
