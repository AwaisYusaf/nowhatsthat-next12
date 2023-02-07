import React from 'react'

function HomeLayout({ children }: any) {
    return (
        <main className="flex flex-col items-center  w-full">
            <div className="md:w-9/12 w-9/12 flex flex-col items-center">
                {children}
            </div>
        </main>
    )
}

export default HomeLayout