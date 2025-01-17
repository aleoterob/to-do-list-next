"use client";

import TodoList from "./components/TodoList";

const MyApp = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-azulJuztina">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="flex flex-row justify-center items-center w-full sm:pl-0 md:pl-0 lg:pl-0 xl:pl-0 pt-10 text-4xl text-center sm:text-6xl lg:text-6xl xl:text-6xl font-montserrat font-light text-white">
          TO DO LIST
        </h1>
        <h1 className="flex flex-row justify-center items-center w-full text-center sm:pl-0 md:pl-0 lg:pl-0 xl:pl-0 pt-6 text-2xl sm:text-4xl font-montserrat font-extralight text-white">
          Next.js - Redux Persist - Tailwind - Gsap.js
        </h1>
        <div className="flex flex-col justify-center items-center w-full pt-10 pb-40">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
