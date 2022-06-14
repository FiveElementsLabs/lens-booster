import { useEffect } from "react";
import { useState } from "react";
import { getProfiles } from "../api/profile/get-profiles";
import { useSharedState } from "../context/store";
import actions from "../context/actions";

export const useProfile = () => {
  const [{ account, provider }, dispatch] = useSharedState();
  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();

  const changeProfile = (profile) => {
    setCurrentProfile(profile);
    localStorage.setItem("current_profile", profile.handle);
  };

  const loadProfiles = async () => {
    console.log(account, "account");

    if (account) {
      const current = localStorage.getItem("current_profile");
      const res = await getProfiles(account, provider.getSigner());
      console.log(res)
      setProfiles(res.profiles.items);

      // Set the profile as the first in the array as default.
      // If we have a user in memory, check that it's one of the
      // currently logged user's profiles, and set it to be remembered
      // upon page refresh.
      if (current) {
        const currentProfileFromHandle = res.profiles.items.find(
          (pr) => pr.handle === current
        );
        if (currentProfileFromHandle) {
          setCurrentProfile(currentProfileFromHandle);
          console.log(currentProfileFromHandle);
          dispatch({
            type: actions.SET_CURRENT_PROFILE,
            payload: { currentProfile: currentProfileFromHandle },
          });
          console.log("currentProfileFromHandle: ", currentProfileFromHandle);
        } else {
          changeProfile(res.profiles.items[0]);
          console.log("here is the first profile: ", res.profiles.items[0]);
          dispatch({
            type: actions.SET_CURRENT_PROFILE,
            payload: { currentProfile: res.profiles.items[0] },
          });
        }
      } else {
        changeProfile(res.profiles.items[0]);
        dispatch({
          type: actions.SET_CURRENT_PROFILE,
          payload: { currentProfile: res.profiles.items[0] },
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      await loadProfiles();
    })();
  }, [account]);

  return { profiles, currentProfile, changeProfile };
};
