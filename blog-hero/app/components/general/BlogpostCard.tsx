import Link from "next/link";
import React from "react";
import Image from "next/image";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const BlogpostCard = ({ data }: IappProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden ">
          <Image
            src={data.imageUrl}
            alt="image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
            {data.title}{" "}
          </h3>
          <p className="mb-4 text-sm text-gray-500 line-clamp-3">
            {data.content}{" "}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogpostCard;
