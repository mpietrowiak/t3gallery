import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/db/queries";
import { Button } from "~/components/ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="grid h-full grid-cols-[1fr_minmax(350px,350px)]">
      <div className="flex grow items-center justify-center">
        <img src={image.url} className="object-contain" />
      </div>

      <div className="border-l bg-zinc-900/90">
        <h1 className="border-b p-4 text-center text-xl font-bold">
          {image.name}
        </h1>

        <div className="p-4">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.username}</span>
        </div>

        <div className="p-4">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-4">
          <form
            action={async () => {
              "use server";

              await deleteImage(image.id);
            }}
          >
            <Button variant="destructive">Delete</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
