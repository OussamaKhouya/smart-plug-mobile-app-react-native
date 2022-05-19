import React from "react";
import { Text, View, StyleSheet, Image , TouchableOpacity, Button} from "react-native";

import colors from "../config/colors";
import fonts from "../config/fonts";

import firebase from 'firebase';


class WelcomeScreen extends React.Component {
  state = { user: {} };

   // for a functional component use useEffect() in place of componentDidMount (see code in notion)
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>

      <View  style={styles.logoContainer}>
      <Image source={require('../assets/icons/logo.png')}/>
      <Text style={styles.logoDescription}>Plateforme de recherche et de formation en énergies solaires</Text>
      </View>

      <View style={styles.control}>

      <TouchableOpacity style={styles.Done}  onPress={() => this.props.navigation.push("OnOffScreen")}>
      <Text style={styles.BtnText}> Aller au tableau de bord</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.Done,{backgroundColor:'#d00'}]}  
      onPress={() => 
      //this.props.navigation.navigate("PlugingScreen")
      this.props.navigation.navigate("PriseRenomer",{user:this.state.user.email})
      
      }>
      <Text style={[styles.BtnText, {color:colors.white}]}>Ajouter un nouveau prise</Text>
      </TouchableOpacity>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:100}}>
          <Text 
          style={{color:colors.logoText, margin:10, fontSize:20,textAlign:'center',fontFamily:fonts.RalewayL,}}>
            {this.state.user.email}</Text>
          <TouchableOpacity 
          style={[styles.Done,{width:100, backgroundColor:'#d00', borderRadius:1, alignItems: 'center'}]}  
          onPress={() => {
            firebase.auth().signOut();
            // this.props.navigation.navigate("LoadingScreen");
            }}>
            
            <Text style={[styles.BtnText, {color:colors.white}]} >Sign Out</Text>
          </TouchableOpacity>
      </View>
      
      </View>

    </View>
  );
    
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent:'center',
    alignItems:'center'
  },
   logoContainer:{
    position:"absolute",
    top:100,
    alignItems:'center'
   },
   logoDescription:{
     color:colors.logoText,
     textAlign:'center',
     fontFamily:'RalewayL',
     paddingTop:10,
     fontSize:15,
     width:200,
   },
   control:{
     height:150,
     width:'100%',
     position:'absolute',
     top:480,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center'
   },
   Done:{
    backgroundColor:colors.btnColor,
        borderRadius:15,
        padding:8,
        width:190,
        marginBottom:20,
   },
   BtnText:{
    color:colors.black,
    fontSize:14,
    textAlign:'center',
    fontFamily:fonts.RalewayM,
    textTransform:'uppercase',
   }

});

export default WelcomeScreen;
