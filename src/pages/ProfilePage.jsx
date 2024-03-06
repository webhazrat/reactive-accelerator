import { useEffect } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

export default function ProfilePage() {
  const { auth } = useAuth();
  const { apiAuth } = useAxiosIntercept();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await apiAuth.get(`/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({ type: actions.profile.DATA_ERROR, error: error.message });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>User profile loading...</div>;
  }
  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
}
