# React Native Chart Kit Example

Expo validation app for `react-native-chart-kit`.

This branch uses the local sibling checkout of the library:

```sh
react-native-chart-kit-example/
react-native-chart-kit/
```

## Run

```sh
npm install
npm start
npm run ios
npm run android
npm run android:build
npm run web
```

`npm start` runs the managed Expo preview. `npm run ios` and `npm run android`
generate native projects and run local native builds, so they require Xcode or an
Android SDK/JDK toolchain.

`npm run android:build` runs an Android APK build without launching a device. It
patches the generated Gradle wrapper to 8.14.3 because the React Native 0.83
template currently generates Gradle 9 while its Foojay toolchain resolver still
targets Gradle 8.

Use this app before publishing chart-kit changes to verify native rendering,
gradients, touch handlers, and layout on iOS and Android.
