import TimeIcon from "../../assets/icons/time.svg";
import DotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import { getFromDateToNow, getImagePath } from "../../utils";
import useUser from "../../hooks/useUser";
import usePostAvatar from "../../hooks/useAvatar";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import { actions } from "../../actions";
import usePost from "../../hooks/usePost";
export default function PostHeader({ post }) {
  const { user } = useUser();
  const { avatar } = usePostAvatar(post);
  const { apiAuth } = useAxiosIntercept();
  const { dispatch } = usePost();
  const [showAction, setShowAction] = useState(false);
  const isMyPost = user?.id === post?.author?.id;

  const handleDelete = async (postId) => {
    if (confirm("Are your sure to delete?")) {
      try {
        const response = await apiAuth.delete(`/posts/${postId}`);
        if (response.status === 200) {
          dispatch({ type: actions.post.POST_DELETED, id: postId });
        }
      } catch (error) {
        dispatch({ type: actions.post.POST_FETCH_ERROR, error: error.message });
      }
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full"
          src={getImagePath(avatar)}
          alt={post.author.name}
        />
        <div>
          <h6 className="font-semibold">{post.author.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400">
              {getFromDateToNow(post?.createAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        {isMyPost && (
          <button onClick={() => setShowAction((prev) => !prev)}>
            <img src={DotIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={() => handleDelete(post.id)}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
