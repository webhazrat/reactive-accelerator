import { useDebugValue, useEffect, useState } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import useAuth from "../hooks/useAuth";
import Avatar from "../assets/images/avatars/avatar_1.png";
import EditIcon from "../assets/icons/edit.svg";
import TimeIcon from "../assets/icons/time.svg";
import DotIcon from "../assets/icons/3dots.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import PosterImage from "../assets/images/poster.png";
import LikeIcon from "../assets/icons/like.svg";
import CommentIcon from "../assets/icons/comment.svg";
import ShareIcon from "../assets/icons/share.svg";

export default function ProfilePage() {
  const { auth } = useAuth();
  const { apiAuth } = useAxiosIntercept();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await apiAuth.get(`/profile/${auth?.user?.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiAuth, auth]);

  console.log({ user });

  if (loading) {
    return <div>User profile loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col items-center py-8 text-center">
        <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
          <img className="max-w-full" src={Avatar} alt="sumit saha" />

          <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
            <img src={EditIcon} alt="Edit" />
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="leading-[231%] lg:text-lg">{user?.email}</p>
        </div>
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {user?.bio}
            </p>
          </div>
          <button className="flex-center h-7 w-7 rounded-full">
            <img src={EditIcon} alt="Edit" />
          </button>
        </div>
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

      <article className="card mt-6 lg:mt-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={Avatar}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
              <div className="flex items-center gap-1.5">
                <img src={TimeIcon} alt="time" />
                <span className="text-sm text-gray-400 lg:text-base">
                  12 min ago
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button>
              <img src={DotIcon} alt="3dots of Action" />
            </button>

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
          </div>
        </header>
        <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
          <div className="flex items-center justify-center overflow-hidden">
            <img className="max-w-full" src={PosterImage} alt="poster" />
          </div>
          <p>
            Grateful for the incredible experience of serving as the President
            of the Grand Jury board for this year's Digital Marketing Award
            organized by Bangladesh Brand Forum. Judging the best digital
            marketing campaigns was not just a responsibility but a journey of
            appreciation for innovation and creativity. The judging process,
            ensuring transparency, brought to light so many beautiful campaigns.
            Cheers to the dynamic world of digital marketing! sdfasd asdca sdfa
            sdca sdfa
          </p>
        </div>
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
          <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
            <img src={LikeIcon} alt="Like" />
            <span>Like</span>
          </button>

          <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
            <img src={CommentIcon} alt="Comment" />
            <span>Comment(2)</span>
          </button>

          <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
            <img src={ShareIcon} alt="Share" />
            <span>Share</span>
          </button>
        </div>

        <div>
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
              src={Avatar}
              alt="avatar"
            />

            <div className="flex-1">
              <input
                type="text"
                className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                name="post"
                id="post"
                placeholder="What's on your mind?"
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-gray-300 max-md:text-sm">
              All Comment ▾
            </button>
          </div>
          <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            <div className="flex items-center gap-3 pt-4">
              <img
                className="max-w-6 max-h-6 rounded-full"
                src={Avatar}
                alt="avatar"
              />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>Tapas Adhikari: </span>
                  <span>Great Sumit Saha dada ❤</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <img
                className="max-w-6 max-h-6 rounded-full"
                src={Avatar}
                alt="avatar"
              />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>Sumit Saha: </span>
                  <span>Great Sumit Saha dada ❤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
