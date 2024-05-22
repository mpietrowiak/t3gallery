import { headers } from "next/headers";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/bcd14c8f-f70a-4659-b4fa-d4cd656eafed-jlxq4b.jpg",
  "https://utfs.io/f/5cd075d0-43c7-431b-aae3-86c4a0b0d4a4-b59o1m.jpg",
  "https://utfs.io/f/f0ac1bc5-c731-4e4c-b35e-f47dc1642c67-ioprb0.png",
  "https://utfs.io/f/95ce5704-c618-4b6b-8bb1-7f5c25968f6c-ikjve5.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  url,
  id: index + 1,
}));

export default async function HomePage() {
  headers();
  const posts = await db.query.posts.findMany();

  // console.log(posts);

  return (
    <main className="flex flex-wrap gap-4">
      {posts.map((post) => (
        <div key={post.id}>{post.name}</div>
      ))}
      {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
        <div key={image.id + "-" + index} className="w-48">
          <img src={image.url} alt="image" />
        </div>
      ))}
    </main>
  );
}
