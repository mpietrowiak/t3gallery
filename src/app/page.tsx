import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/db/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <main className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <Link href={`/img/${image.id}`}>
            <Image src={image.url} alt="image" width={192} height={192} />
            <p>{image.name}</p>
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
