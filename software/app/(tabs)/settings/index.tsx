import SettingPage from "@/components/tabs/settings/SettingPage";
import { useContext } from "react";

import backgrounds from "@/constants/backgrounds";
import layouts from "@/constants/layouts";

import { ThemeContext } from "@/app/_layout";

export default function Settings() {
    const [dark, _] = useContext(ThemeContext)

    return (
        <SettingPage
            title="Settings"
            backgroundSource={dark ? backgrounds.darkSettings : backgrounds.settings}
            layoutSource={layouts.settings}
        />
    )
}