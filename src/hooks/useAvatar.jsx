import useAuth from "./useAuth";
import useProfile from "./useProfile";

export default function useAvatar(post) {
  const { auth } = useAuth();
  const { state } = useProfile();
  const isMe = post?.author?.id === state?.user?.id;
  const avatar = post?.id
    ? isMe
      ? state?.user?.avatar
      : post?.author?.avatar
    : state?.user?.avatar ?? auth?.user?.avatar;
  const avatarURL = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;
  return { avatarURL };
}
