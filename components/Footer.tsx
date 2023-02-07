import Link from 'next/link';
import React from 'react'
function Footer() {
    const date = new Date();
    return (
        <div className='flex w-full mt-8'>
            <p className='ml-6 text-gray-500'>
                © NowWhatsThat {date.getFullYear()}. Created with 💖 by{" "}
                <Link href="https://www.awaisyousaf.com" className='underline' target='_blank'>Awais Yousaf</Link>.
            </p>
        </div>
    )
}

export default Footer