import SettingPage from "@/components/tabs/settings/SettingPage";
import { useContext } from "react";

import backgrounds from "@/constants/backgrounds";
import layouts from "@/constants/layouts";

import { ThemeContext } from "@/app/_layout";

const Profile = () => {
  const [dark, _] = useContext(ThemeContext)

  return (
    <SettingPage
      title="Profile"
      backgroundSource={dark ? backgrounds.darkProfile : backgrounds.profile}
      layoutSource={layouts.profile}
      includeBackButton
    />
  )
}

export default Profile;