import { Button } from '@app/components/StyledButton';
import { Text } from '@app/components/StyledText';
import { View } from '@app/components/StyledView';
import FontFamily from '@app/constants/FontFamily';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
    const onSignOut = useCallback(() => {
        router.replace('/sign-up');
    }, []);

    return (
        <View testID="home-screen" style={styles.container}>
            <Text style={styles.text}>Welcome!</Text>
            <Button testID="sign-out" onPress={onSignOut} title="SIGN OUT" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-evenly',
    },
    text: {
        fontFamily: FontFamily.MPlusRounded1cBlack,
        fontSize: 36,
        textAlign: 'center',
    },
});
