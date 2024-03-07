import { getImagePath } from "../../utils";

export default function PostBody({ poster, content }) {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 space-y-4">
      <p className="leading-relaxed">{content}</p>
      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img className="w-1/2" src={getImagePath(poster)} alt={"poster"} />
        )}
      </div>
    </div>
  );
}
