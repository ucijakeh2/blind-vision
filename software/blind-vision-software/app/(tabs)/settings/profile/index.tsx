import SettingPage from "@/components/tabs/settings/SettingPage";

import backgrounds from "@/constants/backgrounds";
import layouts from "@/constants/layouts";

const Profile = () => {
  return (
    <SettingPage
      title="Profile"
      backgroundSource={backgrounds.profile}
      layoutSource={layouts.profile}
      includeBackButton
    />
  )
}

export default Profile;