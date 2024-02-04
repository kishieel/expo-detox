import { by, device, element, expect } from 'detox';

describe('Sign Up Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should display sign up form', async () => {
        await expect(element(by.id('sign-up-form'))).toBeVisible();
    });

    it('should fail to submit form with empty fields', async () => {
        await element(by.id('submit')).tap();
        await expect(element(by.id('error').withAncestor(by.id('nickname')))).toHaveText('Nickname is required.');
        await expect(element(by.id('error').withAncestor(by.id('email')))).toHaveText('Email is required.');
        await expect(element(by.id('error').withAncestor(by.id('password')))).toHaveText('Password is required.');
        await expect(element(by.id('error').withAncestor(by.id('confirm')))).toHaveText(
            'Password confirmation is required.',
        );
        await expect(element(by.id('error').withAncestor(by.id('terms')))).toHaveText(
            'Term of use agreement is required.',
        );
    });

    it('should fail to submit form with invalid data', async () => {
        await element(by.id('input').withAncestor(by.id('nickname'))).typeText('ab');
        await element(by.id('input').withAncestor(by.id('email'))).typeText('invalidemail');
        await element(by.id('input').withAncestor(by.id('password'))).typeText('weak');
        await element(by.id('input').withAncestor(by.id('confirm'))).typeText('mismatchedpassword');

        await waitFor(element(by.id('submit')))
            .toBeVisible()
            .whileElement(by.id('sign-up-scroll'))
            .scroll(50, 'down');
        await element(by.id('input').withAncestor(by.id('terms'))).tap();
        await element(by.id('submit')).tap();

        await expect(element(by.id('error').withAncestor(by.id('nickname')))).toHaveText(
            'Nickname must contains at least 3 characters.',
        );
        await expect(element(by.id('error').withAncestor(by.id('email')))).toHaveText('Email is invalid.');
        await expect(element(by.id('error').withAncestor(by.id('password')))).toHaveText(
            'Password must contains at least 8 characters.',
        );
    });

    it('should submit form with valid data', async () => {
        await element(by.id('input').withAncestor(by.id('nickname'))).typeText('ValidNickname');
        await element(by.id('input').withAncestor(by.id('email'))).typeText('valid@example.com');
        await element(by.id('input').withAncestor(by.id('password'))).typeText('StrongPassword1');
        await element(by.id('input').withAncestor(by.id('confirm'))).typeText('StrongPassword1\n');

        await waitFor(element(by.id('submit')))
            .toBeVisible()
            .whileElement(by.id('sign-up-scroll'))
            .scroll(50, 'down');
        await element(by.id('input').withAncestor(by.id('terms'))).tap();
        await element(by.id('input').withAncestor(by.id('news'))).tap();
        await element(by.id('submit')).tap();

        await waitFor(element(by.id('home-screen')))
            .toBeVisible()
            .withTimeout(15000);
    });
});
