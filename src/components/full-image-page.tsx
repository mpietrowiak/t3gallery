import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="w-96 object-contain" />
      </div>

      <div className="flex w-48 flex-col border-l">
        <h1 className="text-xl font-bold">{image.name}</h1>

        <div className="flex flex-col">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.username}</span>
        </div>

        <div className="flex flex-col">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
