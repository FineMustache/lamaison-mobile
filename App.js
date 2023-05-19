import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Linking } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroImage,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroARPlane,
  ViroBox,
  ViroARImageMarker,
  ViroARTrackingTargets
} from '@viro-community/react-viro';

const medidasModel = {
  // Defina as medidas do modelo aqui
};

const AR = (props) => {
  const [text, setText] = useState('Initializing AR...');
  const [textura, setTextura] = useState('vaso_turcao.jpg');

  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event;
      console.log(url)
    };

    if (Platform.OS === 'android') {
      const url = Linking.getInitialURL();
      console.log('macaco', url)
      handleDeepLink({ url });
    } else {
      Linking.addEventListener('url', handleDeepLink);
    }

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      // Lógica para quando o rastreamento está funcionando normalmente
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Lógica para quando o rastreamento não está disponível
    }
  }

  ViroARTrackingTargets.createTargets({
    felipe: {
      source: require('./felipe357.jpg'),
      orientation: 'Down',
      physicalWidth: 0.12,
    },
  });

  ViroMaterials.createMaterials({
    face: {
      shininess: 1.0,
      lightingModel: 'Blinn',
      diffuseTexture: { uri: "https://lamaisontest.blob.core.windows.net/arquivos/Painting-1681469941861.jpg" },
    },
  });
  return (
    // <ViroARScene onTrackingUpdated={onInitialized}>
    

    // </ViroARScene>
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target="felipe" onAnchorFound={() => console.log("achou")}>
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('./vasoOriental/vasoOriental.obj')}
          position={[0, 0, 0]}
          scale={[0.001, 0.001, 0.001]}
          rotation={[0, 0, 0]}
          type="OBJ"
          materials="face"
        />
        {/* <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} /> */}
      </ViroARImageMarker>
  </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: AR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
