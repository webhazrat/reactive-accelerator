import { useState } from "react";
import LikeIcon from "../../assets/icons/like.svg";
import LikeFilledIcon from "../../assets/icons/like-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";
import useAuth from "../../hooks/useAuth";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
export default function PostActions({ post }) {
  const { auth } = useAuth();
  const { apiAuth } = useAxiosIntercept();
  const [liked, setLiked] = useState(post.likes.includes(auth?.user?.id));

  const handleLike = async () => {
    try {
      const response = await apiAuth.patch(`/posts/${post.id}/like`);
      if (response.status === 200) {
        setLiked((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      setLiked((prev) => prev);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        onClick={handleLike}
      >
        <img src={liked ? LikeFilledIcon : LikeIcon} alt="Like" />
        <span>{liked ? "Liked" : "Like"}</span>
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({post.comments.length ?? 0})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}
