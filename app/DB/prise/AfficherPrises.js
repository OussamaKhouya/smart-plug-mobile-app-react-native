import {Alert} from 'react-native';
import * as firebase from 'firebase';

export const AfficherPrises =  (prises) => {
    try {
         firebase.database().ref(`prises`)
        .on('value', snapshat => {
            const duplist = snapshat.val();
            const temp = []
            for(var id in duplist)
            {
                temp.push({id, ...duplist[id]})
            }
            // prises = {...temp};
           // Object.assign(prises, {...temp})
          //reutn prises = temp[0].id
           return(temp);
        });
        
        
    } catch (error) {
        Alert.alert(error)
    }
}