import useUser from "./useUser";

export default function usePostAvatar(post) {
  const { user } = useUser();
  const avatar =
    user?.id === post?.author?.id ? user?.avatar : post?.author?.avatar;
  return { avatar };
}
