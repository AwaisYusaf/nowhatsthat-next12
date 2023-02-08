import React from 'react'
import Image from "next/image"
function Tag({ children }: any) {
    return <p className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</p>
}
function SecondLatest() {
    return (
        <section className="mt-8 hidden lg:block">
            <Image src="/assets/images/blog2.jpeg" alt="blog" width="400" height="200"
                className="rounded-xl hover:-translate-y-1 transition duration-300 cursor-pointer" />
            <div className="flex mt-4">
                <Tag>Lifestyle</Tag>
                <Tag>Eco</Tag>
            </div>
            <h2 className="text-2xl font-bold cursor-pointer hover:underline ml-2 title">AI can solve new problems very easily</h2>
        </section>
    )
}

export default SecondLatest