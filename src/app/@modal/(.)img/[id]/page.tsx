import { Modal } from "./modal";

import { getImage } from "~/server/db/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }
  const image = await getImage(idAsNumber);
  return (
    <Modal>
      <img src={image.url} className="w-96" />
    </Modal>
  );
}
