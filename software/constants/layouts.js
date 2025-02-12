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

const dropdownVibration = [
    "Vibration 1",
    "Vibration 2",
    "Vibration 3"
]

const dropdownSound = [
    "Sound 1",
    "Sound 2",
    "Sound 3",
]

const settings = [
    {
        title: "Profile",
        imageSource: profileIcon,
        destination: "/settings/profile/",
    },
    {
        title: "Glasses",
        imageSource: glassesIcon,
        destination: "/settings/glasses/",
    },
    {
        title: "Stick",
        imageSource: blindStickIcon,
        destination: "/settings/stick/",
    },
    {
        title: "Dark Mode",
        imageSource: darkModeIcon
    }
]

const profile = [
    {
        title: "Name",
        imageSource: nameIcon,
        destination: "/settings/profile/name",
    },
    {
        title: "Email",
        imageSource: emailIcon,
        destination: "/settings/profile/email",
    },
    {
        title: "Log Out",
        imageSource: logOutIcon,
        destination: "/(auth)/sign-in",
        replace: true,
    },
    {
        title: "Reset Password",
        imageSource: resetPasswordIcon,
        destination: "/settings/profile/reset-password",
    },
    {
        title: "Delete Account",
        imageSource: deleteAccountIcon,
        destination: "/settings/profile/delete-account",
    }
]

const glasses = [
    {
        title: "Status",
        imageSource: status,
        status: true
    },
    {
        title: "Sound",
        imageSource: sound,
        dropdown: dropdownSound
    }
]

const stick = [
    {
        title: "Status",
        imageSource: status,
        status: false
    },
    {
        title: "Vibration",
        imageSource: vibration,
        dropdown: dropdownVibration
    }
]

export default {
    settings,
    profile,
    glasses,
    stick
}