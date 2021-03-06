/* eslint-disable react-hooks/exhaustive-deps */
import Img from "components/img";
import AssetsContext from "context/assets";
import PostContext from "context/post";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateFollowing } from "services/firebase";

interface Props {
  username: string;
  profileDocId: string;
  profileId: string;
  userId: string;
  userDocId: string;
  userFollowing: string[];
}

export default function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  userDocId,
  userFollowing: following,
}: Props) {
  const [followed, setFollowed] = useState(false);

  const { images, getAvatar } = useContext(AssetsContext);
  const { setUpdate } = useContext(PostContext);

  useEffect(() => {
    if (username) getAvatar(username);
  }, [username]);

  const handleFollow = async () => {
    if (
      await updateFollowing(
        { doc: userDocId, id: userId, following },
        { doc: profileDocId, id: profileId }
      )
    )
      setFollowed(true);

    setUpdate(true);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-center justify-between">
      <div className="flex items-center">
        <Img
          circle
          className="rounded-full w-8 flex mr-3"
          src={images[`${username}.jpg`]}
          alt={`suggested-profile-${username}`}
          skeletonSize={{ width: 32, height: 32 }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollow}
      >
        Follow
      </button>
    </div>
  ) : null;
}
