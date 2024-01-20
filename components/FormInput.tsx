import { Text } from '@app/components/StyledText';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import FontFamily from '@app/constants/FontFamily';
import { Control, useController } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { StyleSheet, TextInput } from 'react-native';

export function FormInput<T extends FieldValues>({
    testID,
    label,
    name,
    placeholder,
    control,
    secure,
}: FormInputProps<T>) {
    const { field, fieldState } = useController({ name, control });
    const { error } = fieldState;

    return (
        <View testID={testID} style={styles.formInputContainer}>
            <Text testID="label" style={styles.formInputLabel}>
                {label}
            </Text>
            <TextInput
                testID="input"
                style={[styles.formInputText, error ? styles.formInputInvalid : {}]}
                value={field.value}
                onChangeText={field.onChange}
                placeholder={placeholder}
                secureTextEntry={secure}
            />
            {error && (
                <Text testID="error" style={styles.formInputError}>
                    {error.message}
                </Text>
            )}
        </View>
    );
}

export type FormInputProps<T extends FieldValues> = {
    testID?: string;
    label: string;
    placeholder: string;
    secure?: boolean;
    name: FieldPath<T>;
    control: Control<T>;
};

const styles = StyleSheet.create({
    formInputContainer: {
        width: '100%',
        gap: 8,
    },
    formInputLabel: {
        fontFamily: FontFamily.MPlusRounded1cBlack,
        fontSize: 16,
    },
    formInputText: {
        color: Colors.White,
        backgroundColor: Colors.Comet,
        borderRadius: 8,
        fontFamily: FontFamily.MPlusRounded1cMedium,
        fontSize: 16,
        padding: 16,
    },
    formInputInvalid: {
        borderColor: Colors.Red,
        borderWidth: 1,
    },
    formInputError: {
        fontFamily: FontFamily.MPlusRounded1cMedium,
        color: Colors.Red,
        fontSize: 16,
    },
});
