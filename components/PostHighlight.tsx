import React from 'react'
import Image from "next/image"
function Tag({ children }: any) {
    return <p className="bg-green-50 text-xs mr-4 px-3 py-1 my-2 rounded-full font-medium hover:bg-green-200 cursor-pointer transition duration-300">{children}</p>
}
function PostHighlight() {
    return (
        <section className="mt-8 flex flex-col md:w-4/12 w-11/12 p-5 my-3">

            <Image src="/assets/images/blog2.jpeg" alt="blog" width="1800" height="200"
                className="rounded-xl transition duration-300 hover:-translate-y-1" />
            <div className="flex mt-4">
                <Tag>Lifestyle</Tag>
                <Tag>Eco</Tag>
            </div>


            <h2 className="text-2xl font-bold cursor-pointer hover:underline ml-2 title">AI can solve new problems very easily</h2>
            <p className='ml-2 text-md text-gray-600 mt-3 text-ellipsis overflow-hidden whitespace-nowrap sp'>Vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper.
                Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales. Nullam felis libero,
                congue quis ipsum et, lacinia maximus eros. Vestibulum ante ipsum primis in faucibus.</p>

        </section>
    )
}

export default PostHighlight