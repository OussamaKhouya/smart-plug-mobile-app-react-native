import {Alert} from 'react-native';
import firebase from 'firebase';

export const Addprise = async (email,nomMachine, icon) => {
    try {
        return await firebase.database().ref(`prises`)
        .push()
        .set({
            email:email,
            nomMachine:nomMachine,
            icon:icon,
            ssid:'SSID_NETWORK_Wi-Fi',
            etat:'OFF',
            key_etat:'CLEE_API',
            key_voltage:'CLEE_API_voltage',
            key_courant:'CLEE_API_courant',
            key_puissance:'CLEE_API_puissance',
            key_energie:'CLEE_API_energie',
        })
        
    } catch (error) {
        Alert.alert(error)
    }
}