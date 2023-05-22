import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity } from 'react-native';
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
    pos: [0, 0, 0],
    scale: [0.08, 0.08, 0.08],
    rotation: [0, 0, 0]
  },
  "round.obj": {
    pos: [0, 0, 0],
    scale: [0.0003, 0.0003, 0.0003],
    rotation: [90, 0, 0]
  },
  "Paiting.obj": {
    pos: [0, 0, 0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0, 0, 0]
  },
  "lemon.obj": {
    pos: [0, 0, 0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0, 180, 0]
  },
  "arandel.obj": {
    pos: [0, 0, 0],
    scale: [0.001, 0.001, 0.001],
    rotation: [90, 0, 90]
  },
  "vasoOriental.obj": {
    pos: [0, 0, 0],
    scale: [0.001, 0.001, 0.001],
    rotation: [0, 0, 0]
  }
}

const useMount = func => useEffect(() => func(), []);

export default () => {
  const [text, setText] = useState('Initializing AR...');
    const [textura, setTextura] = useState('vaso_turcao.jpg');
    const [id, setId] = useState(24);
    const [processing, setProcessing] = useState(true);
  const AR = (props) => {
    

    useMount(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.getInitialURL();

        // The setTimeout is just for testing purpose
        setTimeout(() => {
          if (initialUrl !== null) {
            setId(initialUrl.split('?')[1].split('=')[1])
          }
          setProcessing(false);
        }, 1000);
      };

      getUrlAsync();
    });

    useEffect(() => {
      const options = { method: 'GET' };

      fetch('https://gem-giant-cobbler.glitch.me/produto/25', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          setTextura("https://lamaisontest.blob.core.windows.net/arquivos/" + response.textura)
        })
        .catch(err => console.error(err));
    }, [id])

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
        diffuseTexture: { uri: textura },
      },
    });
    return (
      // <ViroARScene onTrackingUpdated={onInitialized}>


      // </ViroARScene>
      <ViroARScene onTrackingUpdated={onInitialized}>
        <ViroARImageMarker target="felipe" onAnchorFound={() => console.log("achou")}>
          <ViroAmbientLight color="#FFFFFF" />
          <Viro3DObject
            source={{ uri: "https://lamaisontest.blob.core.windows.net/arquivos/Painting-1681469942241.obj" }}
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

  if (processing) {
    return(
      <View>
        <TouchableOpacity onPress={() => setProcessing(false)}>
          <Text>AI EU CRINJEI PAPAI</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: AR,
        }}
        style={styles.f1}
      />
    );
  }

  
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
