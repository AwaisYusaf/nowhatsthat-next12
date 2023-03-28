import Image from 'next/image'
import React from 'react'
import { useForm } from "react-hook-form";

type Props = {}
type InputTypes = {
    name: string;
    email: string;
    message: string;
}

function Contact({ }: Props) {
    const { register, handleSubmit } = useForm<InputTypes>();
    function submitForm(data: InputTypes) {
        console.log(data);
    }
    return (
        <div className='flex min-h-[85vh] flex-col lg:flex-row'>
            <div className="basis-1/2 flex justify-center items-center">
                <Image width={1000} height={800} alt="" src="/assets/contact-us.png" className='w-[400px]' />
            </div>
            <div className='basis-1/2 flex items-center'>
                <form className='flex flex-col w-10/12 mx-auto lg:mx-0 lg:w-3/4 xl:w-1/2 space-y-6' onSubmit={handleSubmit(submitForm)}>
                    <p className='text-4xl font-semibold text-center lg:text-start'>Send us a message💌</p>
                    <input type="text" placeholder="Name" {...register("name")} className='contactInput' />
                    <input type="email" placeholder="Email" {...register("email")} className='contactInput' />
                    <textarea placeholder="Message" {...register("message")} className='contactInput h-[250px]' />
                    <button type="submit" className='bg-green-700 text-white py-3 uppercase font-bold rounded  transition-all hover:shadow-lg shadow-green-600'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact