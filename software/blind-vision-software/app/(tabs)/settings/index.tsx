import SettingPage from "@/components/tabs/settings/SettingPage";

import backgrounds from "@/constants/backgrounds";
import layouts from "@/constants/layouts";

export default function Settings() {
    return (
        <SettingPage
            title="Settings"
            backgroundSource={backgrounds.settings}
            layoutSource={layouts.settings}
        />
    )
}