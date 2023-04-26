/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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

const AR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  ViroARTrackingTargets.createTargets({
    felipe:{
      source: require('./felipe357.jpg'),
      orientation: 'Down',
      physicalWidth: 1,
    },
  });
  return (
    // <ViroARScene onTrackingUpdated={onInitialized}>
    

    // </ViroARScene>
    <ViroARScene>
      <ViroARImageMarker target="felipe" onAnchorFound={() => console.log("achou")}>
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('./vase/Vase_1.obj')}
          position={[0, 0, 0]}
          scale={[0.08, 0.08, 0.08]}
          rotation={[0, 0, 0]}
          type="OBJ"
          materials="face"
        />
        {/* <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} /> */}
      </ViroARImageMarker>
  </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  face: {
    shininess: 1.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./vase/Vase_1_Vase_Diffuse.jpg'),
  },
});

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
