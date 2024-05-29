import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from ".";
import { images } from "./schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { analyticsServerClient } from "./analytics";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  return db.query.images.findMany({
    where: (users, { eq }) => eq(users.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (image, { eq }) => eq(image.id, id),
  });

  if (!image) throw new Error("Not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      image_id: id,
      user_id: user.userId,
    },
  });

  revalidatePath("/");
  redirect("/");
}
