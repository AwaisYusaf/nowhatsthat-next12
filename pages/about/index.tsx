import Image from 'next/image'
import React from 'react'

type Props = {}

function About({ }: Props) {
    return (
        <div className="flex flex-col-reverse">
            <p className="text-md lg:text-lg leading-8 text-center w-[50%] self-center">

                Welcome to our website! We are a team of passionate writers and experts who are dedicated to provide you with informative and
                engaging content on a wide range of topics.
                <br />
                My name is Wajahat, and I am one of the writers on our team. I have always been fascinated by the power of words and the
                ability to use them to inform, inspire, and connect with others. As a part of team, I am constantly exploring new topics
                and seeking out fresh perspectives to share with our readers.
                <br />

                Our website covers a broad range of topics, from science and technology to health and wellness, arts and culture, finance,
                and much more. Our goal is to provide you with high-quality articles that are both informative and enjoyable to read.
                <br />

                We believe that knowledge is power, and we as a team strive to empower our readers by sharing accurate and up-to-date
                information on the topics that matter most to them. We also believe in the power of storytelling and aim to bring you
                articles that not only inform but also engage and entertain.
                <br />

                Our team of writers and experts has diverse backgrounds and experiences, which allows us to offer a wide range of
                perspectives on the topics we cover. We are committed to deliver articles that are well-researched, thought-provoking,
                and written with our readers in mind.
                <br />

                Thank you for visiting our website, and we hope that you find our articles informative and enjoyable. If you have any
                questions or feedback, please dont hesitate to get in touch with us. We are always happy to hear from our readers.
                <br />

            </p>
            <div className="" >
                <Image width={500} height={500} alt="img" src="/assets/about-us.png" className='mx-auto' />
            </div>
            <span className='my-4 text-5xl font-bold block text-center'>About Us</span>


        </div>
    )
}

export default About