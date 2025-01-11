import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import icons from "@/constants/icons";

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
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#0059FF",
                    tabBarInactiveTintColor: "#434343",
                    tabBarStyle: {
                        borderTopWidth: 1,
                        height: 75
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
        </>
    )
}