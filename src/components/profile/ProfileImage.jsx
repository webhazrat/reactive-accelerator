import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import { useRef } from "react";
import { actions } from "../../actions";
import Photo from "../../assets/icons/addPhoto.svg";
import { getImagePath } from "../../utils";
import useUser from "../../hooks/useUser";

export default function ProfileImage() {
  const fileRef = useRef();
  const { dispatch } = useProfile();
  const { user } = useUser();
  const { apiAuth } = useAxiosIntercept();

  const handleFileRef = (e) => {
    e.preventDefault();
    fileRef.current.addEventListener("change", selectedImage);
    fileRef.current.click();
  };

  const selectedImage = async () => {
    const formData = new FormData();
    for (const file of fileRef.current.files) {
      formData.append("avatar", file);
    }
    try {
      const response = await apiAuth.post(
        `/profile/${user?.id}/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      dispatch({ type: actions.profile.DATA_ERROR, error: error.message });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="w-40 h-40 rounded-full object-cover border border-gray-600"
        src={user?.avatar ? getImagePath(user?.avatar) : Photo}
        alt={`${user?.firstName} ${user?.lastName}`}
      />

      <form>
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleFileRef}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={fileRef} hidden />
      </form>
    </div>
  );
}
