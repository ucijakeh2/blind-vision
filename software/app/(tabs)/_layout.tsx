import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Peripheral } from "react-native-ble-manager";
import { Image, View } from "react-native";
import { Tabs } from "expo-router";

import icons from "@/constants/icons";

import { ThemeContext } from "../_layout";

type PeripheralContextType = [Peripheral | null, Dispatch<SetStateAction<Peripheral | null>>]
export const DeviceContext = createContext<PeripheralContextType>([null, () => {}])

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-8 h-6"
            />
        </View>
    )
}

export default function TabsLayout() {
    const [dark, _] = useContext(ThemeContext)
    const [device, setDevice] = useState<Peripheral | null>(null);

    const darkTheme = (dark: boolean) => {
        if (dark) {
            return {
                tabBarInactiveTintColor: "white",
                borderColor: "#1F1F1F",
                backgroundColor: "#0F0F0F"
            }
        } else {
            return {
                tabBarInactiveTintColor: "#434343",
                borderColor: "#FDFDFD",
                backgroundColor: "white"
            }
        }
    }

    return (
        <DeviceContext.Provider value={[device, setDevice]}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#0059FF",
                    tabBarInactiveTintColor: darkTheme(dark).tabBarInactiveTintColor,
                    tabBarStyle: {
                        paddingTop: 10,
                        borderTopWidth: 1,
                        height: 75,
                        borderColor: darkTheme(dark).borderColor,
                        backgroundColor: darkTheme(dark).backgroundColor
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="maps"
                    options={{
                        title: "Maps",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                icon={icons.maps}
                                color={color}
                                name="Maps"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                icon={icons.settings}
                                color={color}
                                name="Settings"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </DeviceContext.Provider>
    )
}