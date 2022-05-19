import {Alert} from 'react-native';
import firebase from 'firebase';

export const AddUser = async (uid, identifiant, email) => {
    try {
        return await firebase.database().ref(`users/${uid}`)
        .set({
            uid:uid,
            identifiant:identifiant,
            email:email,
        })
        
    } catch (error) {
        Alert.alert(error)
    }
}