/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

function App(): React.JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [codeResult, setCodeResult] = useState('vazio');

  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setCodeResult(codes[codes.length - 1].value);
      console.log('code =>', codes[codes.length - 1].value);
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  if (device == null) return <></>;

  return (
    <SafeAreaView style={styles.wrapper}>
      <Camera
        style={{width: '90%', height: 200}}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.textCode}>{codeResult}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  textCode: {
    color: '#fff',
    fontSize: 36,
  },
});

export default App;
