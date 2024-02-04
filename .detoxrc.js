module.exports = {
    as: true,
    testRunner: {
        args: {
            '$0': 'jest',
            config: 'e2e/jest.config.ts',
        },
        jest: {
            setupTimeout: 120000,
        },
    },
    apps: {
        'android.release': {
            type: 'android.apk',
            build: 'cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release',
            binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
        },
    },
    devices: {
        attached: {
            type: 'android.attached',
            device: {
                adbName: '.*',
            },
        },
        emulator: {
            type: 'android.emulator',
            device: {
                avdName: 'Pixel_5_API_29',
            },
        },
    },
    configurations: {
        'android.att.release': {
            device: 'attached',
            app: 'android.release',
        },
        'android.emu.release': {
            device: 'emulator',
            app: 'android.release',
        },
    },
};
