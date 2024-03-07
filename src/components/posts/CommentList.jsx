import { getImagePath } from "../../utils";

export default function CommentList({ comments }) {
  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-3 pt-4">
            <img
              className="max-w-6 max-h-6 rounded-full"
              src={getImagePath(comment.author.avatar)}
              alt={comment.author.name}
            />
            <div>
              <div className="flex gap-1 text-xs lg:text-sm">
                <span>{comment.author.name}: </span>
                <span>{comment.comment}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
