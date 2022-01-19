import { StyleSheet } from "react-native"
import Colors from "../../../../Utils/Colors"
import { extendTheme, NativeBaseProvider } from "native-base";

const theme = extendTheme({
  components: {
    FAB: {
      baseStyle: {},
      defaultProps: {
        colorScheme: Colors.primary,
      },
      variants: {},
      sizes: {},
    }
  }
});

export default theme