/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
  "Vase_1.obj": {
    pos: [0,0,0],
    scale: [0.08,0.08,0.08],
    rotation: [0,0,0]
  },
  "round.obj": {
    pos: [0,0,0],
    scale: [0.0003,0.0003,0.0003],
    rotation: [90,0,0]
  },
  "Paiting.obj": {
    pos: [0,0,0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0, 0, 0]
  },
  "lemon.obj": {
    pos: [0,0,0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0, 180, 0]
  },
  "arandel.obj": {
    pos: [0,0,0],
    scale: [0.001, 0.001, 0.001],
    rotation: [90, 0 , 90]
  },
  "vasoOriental.obj": {
    pos: [0,0,0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0,0,0]
  }
}

// const Cena2 = () => {
//   const [text, setText] = useState('Initializing AR...');

//   function onInitialized(state, reason) {
//     console.log('guncelleme', state, reason);
//     if (state === ViroConstants.TRACKING_NORMAL) {
//       setText('Hello World!');
//     } else if (state === ViroConstants.TRACKING_NONE) {
//       // Handle loss of tracking
//     }
//   }

//   ViroARTrackingTargets.createTargets({
//     felipe:{
//       source: require('./felipe357.jpg'),
//       orientation: 'Down',
//       physicalWidth: 1,
//     },
//   });
//   return (
//     // <ViroARScene onTrackingUpdated={onInitialized}>
    

//     // </ViroARScene>
//     <View>
//       <Text>Arroz cozido</Text>
//     </View>
//   );
// };

const AR = (props) => {
  const [text, setText] = useState('Initializing AR...');

  // const handleClick = () => {
  //   props.sceneNavigator.push({ scene: Cena2 })
  // }

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
      physicalWidth: 0.12,
    },
  });
  return (
    // <ViroARScene onTrackingUpdated={onInitialized}>
    

    // </ViroARScene>
    <ViroARScene>
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

ViroMaterials.createMaterials({
  face: {
    shininess: 1.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./vasoOriental/vasoOriental.png'),
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
