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

import Nav from './components/AR';

const useMount = func => useEffect(() => func(), []);

export default () => {
  const [text, setText] = useState('Initializing AR...');
  const [textura, setTextura] = useState(null);
  const [model, setModel] = useState(null)
  const [id, setId] = useState(0);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      console.log(initialUrl)

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        if (initialUrl !== null) {
          setId(initialUrl.split('?')[1].split('=')[1])
        } else {
          setId(30)
        }
        
      }, 1000);
    };

    getUrlAsync();
  });

  useEffect(() => {
    if (id !== 0) {
      console.log(id)
      const options = { method: 'GET' };

    fetch('https://lamaison.glitch.me/produto/' + id, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setTextura("https://lamaisontest.blob.core.windows.net/arquivos/" + response.textura)
        setModel("https://lamaisontest.blob.core.windows.net/arquivos/" + response.modelo)
      })
      .catch(err => console.error(err));
    }
  }, [id])

  useEffect(() => {
    if (model !== null && textura !== null) {
      setProcessing(false)
    }
  }, [textura, model])

  if (processing) {
    return (
      <View>
        <Text style={{color: 'white'}}>CARREGANDO AGUARDE</Text>
      </View>
    )
  } else {
    return (
      <Nav textura={textura} obj={model} id={id}/>
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
