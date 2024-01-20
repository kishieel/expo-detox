import Colors from '@app/constants/Colors';
import FontFamily from '@app/constants/FontFamily';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="sign-up"
            screenOptions={{
                headerShown: true,
                headerTintColor: Colors.White,
                headerStyle: { backgroundColor: Colors.Twilight },
                headerTitleStyle: { fontFamily: FontFamily.MPlusRounded1cBlack },
                tabBarActiveTintColor: Colors.White,
                tabBarStyle: { backgroundColor: Colors.Twilight },
                tabBarLabelStyle: { fontFamily: FontFamily.MPlusRounded1cBlack },
            }}>
            <Tabs.Screen
                name="sign-up"
                options={{
                    title: 'SIGN UP',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user-plus" color={color} />,
                }}
            />
            <Tabs.Screen
                name="sign-in"
                options={{
                    title: 'SIGN IN',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
                }}
            />
        </Tabs>
    );
}
