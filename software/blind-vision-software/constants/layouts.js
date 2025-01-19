import profileIcon from "../assets/icons/settings/index/profile.png"
import glassesIcon from "../assets/icons/settings/index/glasses.png"
import blindStickIcon from "../assets/icons/settings/index/blind-stick.png"
import darkModeIcon from "../assets/icons/settings/index/dark-mode.png"

import nameIcon from "../assets/icons/settings/profile/name.png"
import emailIcon from "../assets/icons/settings/profile/email.png"
import logOutIcon from "../assets/icons/settings/profile/log-out.png"
import resetPasswordIcon from "../assets/icons/settings/profile/reset-password.png"
import deleteAccountIcon from "../assets/icons/settings/profile/delete-account.png"

import status from "../assets/icons/settings/glasses-stick/status.png"
import sound from "../assets/icons/settings/glasses-stick/sound.png"
import vibration from "../assets/icons/settings/glasses-stick/vibration.png"

const settings = [
    {
        title: "Profile",
        imageSource: profileIcon,
        destination: "/settings/profile/",
        showStatus: false
    },
    {
        title: "Glasses",
        imageSource: glassesIcon,
        destination: "/settings/glasses/",
        showStatus: false
    },
    {
        title: "Stick",
        imageSource: blindStickIcon,
        destination: "/settings/stick/",
        showStatus: false
    },
    {
        title: "Dark Mode",
        imageSource: darkModeIcon,
        destination: null,
        showStatus: false
    }
]

const profile = [
    {
        title: "Name",
        imageSource: nameIcon,
        destination: "/settings/profile/name",
        showStatus: false
    },
    {
        title: "Email",
        imageSource: emailIcon,
        destination: "/settings/profile/email",
        showStatus: false
    },
    {
        title: "Log Out",
        imageSource: logOutIcon,
        destination: "/settings/profile/log-out",
        showStatus: false
    },
    {
        title: "Reset Password",
        imageSource: resetPasswordIcon,
        destination: "/settings/profile/reset-password",
        showStatus: false
    },
    {
        title: "Delete Account",
        imageSource: deleteAccountIcon,
        destination: "/settings/profile/delete-account",
        showStatus: false
    }
]

const glasses = [
    {
        title: "Status",
        imageSource: status,
        destination: "",
        showStatus: true
    },
    {
        title: "Sound",
        imageSource: sound,
        destination: "",
        showStatus: false
    }
]

const stick = [
    {
        title: "Status",
        imageSource: status,
        destination: "",
        showStatus: true
    },
    {
        title: "Vibration",
        imageSource: vibration,
        destination: "",
        showStatus: false
    }
]

export default {
    settings,
    profile,
    glasses,
    stick
}