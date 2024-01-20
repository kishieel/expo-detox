import { FormCheck } from '@app/components/FormCheck';
import { FormInput } from '@app/components/FormInput';
import { Button } from '@app/components/StyledButton';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import { SignUpFormSchema, useSignUpForm } from '@app/forms/useSignUpForm';
import { useRequest } from '@app/hooks/useRequest';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function SignUpScreen() {
    const { control, handleSubmit } = useSignUpForm();
    const signUpRequest = useRequest<SignUpFormSchema, { token: string }>('POST', '/sign-up');

    const onSubmit = useCallback(async (data: SignUpFormSchema) => {
        const response = await signUpRequest.run(data);

        if ('token' in response) router.replace('/home');
        else throw response; // @mock: here should be the proper error handling
    }, []);

    return (
        <ScrollView testID="sign-up-scroll" style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
            <View testID="sign-up-form" style={styles.contentWrapper}>
                <FormInput
                    testID="nickname"
                    label="Nickname"
                    name="nickname"
                    placeholder="Happy Engineer"
                    control={control}
                />
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
                <FormInput
                    testID="confirm"
                    label="Confirm password"
                    name="confirm"
                    placeholder={'•'.repeat(8)}
                    control={control}
                    secure
                />
                <FormCheck
                    testID="terms"
                    label="I agree to the terms of use and privacy policy."
                    name="terms"
                    control={control}
                />
                <FormCheck
                    testID="news"
                    label="I agree to receive the newsletter."
                    name="newsletter"
                    control={control}
                />
                <View style={styles.fill} />
                <Button testID="submit" title="SIGN UP" onPress={handleSubmit(onSubmit)} />
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
