import React from "react";

const Article = () => {
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="relative mb-12">
        <span className="text-textColor/20 absolute -top-14 right-0 -z-10 text-9xl font-extrabold">
          04
        </span>
        <h1 className="text-6xl font-bold">
          Articles <span className="text-primary">Me</span>
        </h1>
        <span className="bg-primary absolute right-3 bottom-0 h-1 w-24" />
      </div>
    </section>
  );
};

export default Article;
