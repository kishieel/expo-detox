import { Text } from '@app/components/StyledText';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import FontFamily from '@app/constants/FontFamily';
import { StyleSheet, TouchableHighlight } from 'react-native';

export function Button({ testID, title, onPress }: ButtonProps) {
    return (
        <TouchableHighlight testID={testID} style={styles.highlight} onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export type ButtonProps = {
    testID?: string;
    onPress: () => void;
    title: string;
};

const styles = StyleSheet.create({
    highlight: {
        borderRadius: 8,
    },
    button: {
        borderRadius: 8,
        backgroundColor: Colors.Comet,
    },
    text: {
        color: Colors.White,
        padding: 16,
        textAlign: 'center',
        fontFamily: FontFamily.MPlusRounded1cBlack,
        fontSize: 16,
    },
});
