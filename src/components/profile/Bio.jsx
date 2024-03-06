import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import { useState } from "react";
import { actions } from "../../actions";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";

export default function Bio() {
  const { apiAuth } = useAxiosIntercept();
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioUpdate = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await apiAuth.patch(`/profile/${state?.user?.id}`, {
        bio,
      });
      if (response.status === 200) {
        dispatch({ type: actions.profile.DATA_EDITED, data: response.data });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({ type: actions.profile.DATA_ERROR, error: error.message });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6 w-full">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400">{state?.user?.bio}</p>
        ) : (
          <textarea
            rows="4"
            className="auth-input w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setEditMode(true)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleBioUpdate}
        >
          <img src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
}
