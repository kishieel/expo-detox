import { FormInput } from '@app/components/FormInput';
import { Button } from '@app/components/StyledButton';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import { SignInFormSchema, useSignInForm } from '@app/forms/useSignInForm';
import { SignUpFormSchema } from '@app/forms/useSignUpForm';
import { useRequest } from '@app/hooks/useRequest';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function SignInScreen() {
    const { control, handleSubmit } = useSignInForm();
    const signUpRequest = useRequest<SignInFormSchema, { token: string }>('POST', '/sign-in');

    const onSubmit = useCallback(async (data: SignInFormSchema) => {
        const response = await signUpRequest.run(data);

        if ('token' in response) router.replace('/home');
        else throw response; // @mock: here should be the proper error handling
    }, []);

    return (
        <ScrollView testID="sign-in-scroll" style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
            <View testID="sign-in-form" style={styles.contentWrapper}>
                <FormInput
                    testID="email"
                    label="Email"
                    name="email"
                    placeholder="hello@happy-engineer.tech"
                    control={control}
                />
                <FormInput
                    testID="password"
                    label="Password"
                    name="password"
                    placeholder={'•'.repeat(8)}
                    control={control}
                    secure
                />
                <View style={styles.fill} />
                <Button testID="submit" title="SIGN IN" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.Twilight,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    contentWrapper: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        gap: 16,
    },
    fill: {
        flex: 1,
    },
});
