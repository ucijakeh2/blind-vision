import profile from "../assets/icons/settings/index/profile.png"
import glasses from "../assets/icons/settings/index/glasses.png"
import blindStick from "../assets/icons/settings/index/blind-stick.png"
import darkMode from "../assets/icons/settings/index/dark-mode.png"

const settingsLayout = [
    {
        title: "Profile",
        imageSource: profile,
        destination: "/settings/profile"
    },
    {
        title: "Glasses",
        imageSource: glasses,
        destination: "/settings/glasses"
    },
    {
        title: "Stick",
        imageSource: blindStick,
        destination: "/settings/stick"
    },
    {
        title: "Dark Mode",
        imageSource: darkMode,
        destination: null
    },
]

const styles = {
    auth: {
        foreignAuthButton: "bg-white border rounded"
    },
    tabs: {
        safeAreaViewStyle: "h-full bg-white flex flex-col items-center justify-end",
        headerImageStyle: "absolute top-0"
    },
}

const layout = {
    settings: settingsLayout
}

export default {
    styles,
    layout
}