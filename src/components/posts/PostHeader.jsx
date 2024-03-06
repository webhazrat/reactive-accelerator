import TimeIcon from "../../assets/icons/time.svg";
import DotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import useAvatar from "../../hooks/useAvatar";
import { useState } from "react";
import { getFromDateToNow } from "../../utils";
export default function PostHeader({ post }) {
  const { avatarURL } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full"
          src={avatarURL}
          alt={post?.author?.name}
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
        <button onClick={() => setShowAction((prev) => !prev)}>
          <img src={DotIcon} alt="3dots of Action" />
        </button>

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
