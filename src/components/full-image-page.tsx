import { getImage } from "~/server/db/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="object-contain" />
      </div>

      <div className="flex w-48 flex-col border-l">
        <h1 className="text-xl font-bold">{image.name}</h1>
      </div>
    </div>
  );
}
