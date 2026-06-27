import { registerRootComponent } from "expo";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

LoadSkiaWeb({
  locateFile: (file) => `/${file}`
}).then(async () => {
  const App = (await import("./App")).default;

  registerRootComponent(App);
});
