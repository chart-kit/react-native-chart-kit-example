# Chart Kit Pro Preview

Expo app for reviewing free `react-native-chart-kit/v2` charts and
`@chart-kit/pro/react-native` charts together.

This app intentionally tracks Expo SDK 54 for broad Expo Go compatibility during visual review.
It expects a sibling `../react-native-chart-kit` checkout on the public `next`
branch so the preview uses current `react-native-chart-kit/v2` source.

## Run

```bash
npm install
npm start
```

Then scan the QR code with Expo Go while your computer and phone are on the same network.
If Expo Go does not discover the LAN server, use tunnel mode:

```bash
npm start -- --tunnel
```

Useful commands:

```bash
npm run typecheck
npm run start -- --clear
npm test
npm run android
npm run ios
npm run web:build
```
