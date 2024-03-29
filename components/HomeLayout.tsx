import React from "react";

function HomeLayout({ children }: any) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="xl:w-10/12 md:w-11/12 w-full flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}

export default HomeLayout;
