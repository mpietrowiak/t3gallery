import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/db/queries";
import { Button } from "~/components/ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="w-96 object-contain" />
      </div>

      <div className="flex w-48 flex-col border-l">
        <h1 className="border-b p-2 text-center text-xl">{image.name}</h1>

        <div className="p-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.username}</span>
        </div>

        <div className="p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
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
