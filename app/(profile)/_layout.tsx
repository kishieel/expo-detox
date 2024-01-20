import Colors from '@app/constants/Colors';
import FontFamily from '@app/constants/FontFamily';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTintColor: Colors.White,
                headerStyle: { backgroundColor: Colors.Twilight },
                headerTitleStyle: { fontFamily: FontFamily.MPlusRounded1cBlack },
            }}>
            <Stack.Screen name="home" options={{ title: 'Home' }} />
        </Stack>
    );
}
