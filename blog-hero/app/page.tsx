import Image from "next/image";
import { prisma } from "./utils/db";
const getData = async () => {
  // const items = [{ title: "Post 1", content: "This is the content of post 1" }];

  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
    },
  });
  // return items;

  return data;
};

export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <h1 key={item.title}>{item.title}</h1>
        ))}
      </div>
    </div>
  );
}
