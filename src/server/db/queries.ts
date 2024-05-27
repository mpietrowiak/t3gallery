import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from ".";

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
