import { useEffect } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";
import usePost from "../hooks/usePost";
import NewPostForm from "../components/posts/NewPostForm";

export default function HomePage() {
  const { state, dispatch } = usePost();

  const { apiAuth } = useAxiosIntercept();

  useEffect(() => {
    dispatch({ type: actions.post.POSTS_FETCHING });

    const fetchPosts = async () => {
      try {
        const response = await apiAuth.get(`/posts`);
        if (response.status === 200) {
          dispatch({ type: actions.post.POSTS_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({ type: actions.post.POST_FETCH_ERROR, error: error.message });
      }
    };

    fetchPosts();
  }, []);

  if (state?.loading) {
    return <div>Post fetching...</div>;
  }

  if (state?.error) {
    return <div>Error in fetching posts {state?.error}</div>;
  }

  return (
    <>
      <NewPostForm />
      <PostList posts={state?.posts} />
    </>
  );
}
