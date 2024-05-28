import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }
  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
