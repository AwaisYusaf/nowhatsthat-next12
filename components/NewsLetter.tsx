import React from 'react'

function NewsLetter() {
    return (
        <div className="bg-green-800 flex flex-col items-center p-7 rounded-xl text-white">
            <div className="w-full"><h3 className="uppercase my-2 font-thin text-sm">Newsletter</h3></div>
            <h2 className="text-3xl font-bold">Get all the latest posts delivered straight to your inbox.</h2>
            <input placeholder="Your email address"
                className="px-5 py-3 rounded-full w-11/12 outline-none border-none mt-5 text-black" />
            <button className="px-4 py-2 rounded-full w-10/12 outline-none border-none bg-white text-black mt-5">Subscribe</button>
        </div>
    )
}

export default NewsLetter