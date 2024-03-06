import AddPhoto from "../../assets/icons/addPhoto.svg";
import CloseIcon from "../../assets/icons/close.svg";
import { useForm } from "react-hook-form";
import useProfile from "../../hooks/useProfile";
import { getImagePath } from "../../utils";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export default function PostControl({ onShow }) {
  const { auth } = useAuth();
  const { state } = useProfile();
  const { apiAuth } = useAxiosIntercept();
  const { register, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const user = state?.user ?? auth?.user;

  const submitForm = async (formData) => {
    try {
      const response = await apiAuth.post("/posts", formData);
      //   if(response.status === 200){

      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(image);
  };

  return (
    <div className="card relative">
      <button
        className="absolute right-7 icon-btn h-8 w-8 p-0 rounded-full"
        onClick={onShow}
      >
        <img src={CloseIcon} alt="close" className="w-5" />
      </button>
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={getImagePath(user?.avatar)}
              alt={user?.name}
            />
            <div>
              <h6 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h6>

              <span className="text-gray-400">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" className="w-5" />
            Add Photo
          </label>
          <input
            {...register("image")}
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <textarea
          {...register("content")}
          name="post"
          id="post"
          placeholder="Share your thoughts..."
          className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
        />
        {selectedImage && (
          <div className="mb-4 relative">
            <button
              className="absolute right-7 icon-btn h-8 w-8 p-0 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <img src={CloseIcon} alt="close" className="w-5" />
            </button>
            <img src={selectedImage} alt="" className="w-96 mx-auto" />
          </div>
        )}
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
