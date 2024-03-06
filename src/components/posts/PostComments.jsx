import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";
import CommentList from "./CommentList";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
export default function PostComments({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [showComment, setShowComment] = useState(true);
  const [comment, setComment] = useState("");
  const { avatarURL } = useAvatar();
  const { apiAuth } = useAxiosIntercept();

  const handleComment = async (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      try {
        const response = await apiAuth.patch(`/posts/${post.id}/comment`, {
          comment,
        });
        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-10 w-full rounded-full bg-lighterDark px-4 focus:outline-none"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => handleComment(e)}
          />
        </div>
      </div>
      {post.comments.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowComment((prev) => !prev)}
            className="text-gray-300 max-md:text-sm"
          >
            All Comment ▾
          </button>
        </div>
      )}

      {showComment && <CommentList comments={comments} />}
    </div>
  );
}
