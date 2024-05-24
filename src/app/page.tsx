import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export const dynamic = "force-dynamic";

async function Images() {
  const user = auth();
  if (!user.userId) {
    return <div>Not logged in</div>;
  }
  const imgs = await db.query.images.findMany({
    // this only works when user is logged in so we can assume that the userId is present
    where: (users, { eq }) => eq(users.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="flex flex-wrap gap-4">
      {imgs.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt="image" />
          <p>{image.name}</p>
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
