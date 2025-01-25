// useFonts.js
import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'MyFont': require('../assets/lamarkie/Lamarkie.otf'),
    'CalgaryDemo': require('../assets/calgarydemo/Calgary_DEMO.ttf'),
    'Vinary': require('../assets/vinery-demo/Vinery DEMO.ttf'),
    'DreamMeadow': require('../assets/DreamMeadow-g6m5.ttf')
  });
};

export default useFonts;
