import Image from 'next/image'
import React from 'react'

function Tag({ children }: any) {
    return <p className="bg-green-50 text-xs mx-2 px-3 py-1 rounded-full font-medium">{children}</p>
}


function LatestPost({ post }: any) {
    return (
        <section className="mb-4 md:mb-0 flex flex-col items-center">
            <Image src="/assets/images/blog1.jpeg" alt="blog" width={800} height={400}
                className="w-11/12 rounded-md hover:-translate-y-1 transition duration-300 cursor-pointer" />
            <div className="flex mt-4">
                <Tag>Lifestyle</Tag>
                <Tag>Eco</Tag>
            </div>
            <h1
                className="title font-semibold md:text-6xl text-2xl transition-all md:w-10/12 w-11/12 mt-6 hover:text-gray-600 text-black cursor-pointer leading-snug">The trick to getting more done is to have the freedom to roam around</h1>
            <p className="text-medium md:text-2xl text-lg mt-5 md:w-3/4 w-11/12 text-gray-500 leading-relaxed">
                Vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper.
                Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales.
                Nullam felis libero, congue quis ipsum et, lacinia maximus eros. Vestibulum ante ipsum primis in faucibus.
            </p>
        </section>
    )
}

export default LatestPost