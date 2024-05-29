import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <main className="flex flex-wrap justify-center gap-4">
      {[...images].map((image) => (
        <div key={image.id} className="relative h-36 w-48 bg-black">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt="image"
              width={192}
              height={192}
              className="h-full w-full object-cover"
            />
            <p className="text-sx absolute inset-x-0 bottom-0 bg-zinc-900/50 p-1 text-sm font-bold">
              {image.name}
            </p>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
