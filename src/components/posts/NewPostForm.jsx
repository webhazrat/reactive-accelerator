import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";
import PostControl from "./PostControl";

export default function NewPostForm() {
  const [showPostControl, setShowPostControl] = useState(false);
  const { avatarURL } = useAvatar();

  const handleShow = () => {
    setShowPostControl((prev) => !prev);
  };
  return (
    <>
      {showPostControl ? (
        <PostControl onShow={handleShow} />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={avatarURL}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={handleShow}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
