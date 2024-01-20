import { Text } from '@app/components/StyledText';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import FontFamily from '@app/constants/FontFamily';
import { Control, useController } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Pressable, StyleSheet } from 'react-native';

export function FormCheck<T extends FieldValues>({ testID, name, control, label }: FormInputProps<T>) {
    const { field, fieldState } = useController({ name, control });
    const { error } = fieldState;

    return (
        <View testID={testID} style={styles.formCheckContainer}>
            <View style={styles.formCheckRow}>
                <Pressable testID="input" onPress={() => field.onChange(!field.value)}>
                    <View style={[styles.formCheckBox, error ? styles.formCheckInvalid : {}]}>
                        <Text testID="checkbox" style={styles.formCheckTic}>
                            {field.value ? '✓' : null}
                        </Text>
                    </View>
                </Pressable>
                <Text testID="label" style={styles.formCheckLabel}>
                    {label}
                </Text>
            </View>
            {error && (
                <Text testID="error" style={styles.formCheckError}>
                    {error.message}
                </Text>
            )}
        </View>
    );
}

export type FormInputProps<T extends FieldValues> = {
    testID?: string;
    label: string;
    name: FieldPath<T>;
    control: Control<T>;
};

const styles = StyleSheet.create({
    formCheckContainer: {
        width: '100%',
        gap: 8,
    },
    formCheckRow: {
        gap: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    formCheckBox: {
        backgroundColor: Colors.Comet,
        borderRadius: 8,
        width: 24,
        height: 24,
    },
    formCheckLabel: {
        fontFamily: FontFamily.MPlusRounded1cMedium,
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },
    formCheckTic: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 28,
        color: Colors.Green,
    },
    formCheckInvalid: {
        borderColor: Colors.Red,
        borderWidth: 1,
    },
    formCheckError: {
        fontFamily: FontFamily.MPlusRounded1cMedium,
        color: Colors.Red,
        fontSize: 16,
    },
});
