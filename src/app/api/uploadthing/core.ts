import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { ratelimit } from "~/server/db/ratelimit";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      const user = auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true) {
        throw new UploadThingError(
          "User does not have permission to upload images",
        );
      }

      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Rate limited");

      return {
        userId: user.userId,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
