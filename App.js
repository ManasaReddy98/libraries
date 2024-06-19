import React from 'react';
import {
    View,
    StyleSheet,
    Touchable,
    TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

import RNFS from 'react-native-fs';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {

    const [{ cameraRef }, { takePicture }] = useCamera(null);
  
    const captureHandle = async () => {
        try {
            const data = await takePicture();
            console.log(data.uri);
            const filePath = data.uri;
            const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
            RNFS.moveFile(filePath, newFilePath)
                .then(() => {
                    console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
                
                <TouchableOpacity onPress={()=>captureHandle()}>
                  <Text style={{color:'green'}}>Submit</Text>
                </TouchableOpacity>
            </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});