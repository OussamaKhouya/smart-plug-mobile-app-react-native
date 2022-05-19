import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import fonts from "../config/fonts";
import AppButton from "./AppButton";
import { Fontisto, Feather, MaterialCommunityIcons ,FontAwesome   } from '@expo/vector-icons';
import colors from "../config/colors";
import firebase from 'firebase';

export default class AppCompte extends Component {
  // state = { user: {} };
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       this.setState({user: user});
  //     }
  //   })
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.part1}>
          <View style={styles.imgContainer}>
              <Image style={styles.img} source={require("../assets/icons/user.png")} />
              
              <Text style={styles.text1}>Identifiant</Text>
          </View>
          <View style={styles.descriptionContainer}>
          <View style={styles.card}>
          <Feather name="phone" size={24} color={colors.bgColor11} /><Text style={styles.text2}>(+212) 567-894-23-15</Text></View>
          <View style={styles.card}>
          <Fontisto name="email" size={24} color={colors.bgColor11} /><Text style={styles.text2}>{this.props.user.email}</Text></View>
          <View style={styles.card}>
          <MaterialCommunityIcons name="power-plug-outline" size={28} color={colors.bgColor11} /><Text style={styles.text2}>{this.props.NbOfPlugs}</Text></View>
          
          <TouchableOpacity style={styles.card} onPress={this.props.signOut}>
          <FontAwesome name="sign-out" size={24} color={'#000'} /><Text style={[styles.text2,{color:'#000', fontFamily:fonts.RalewayM}]}>Se deconnecter</Text></TouchableOpacity>
          
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "98%",
  },
  part1: {
    flex: 1,
    //backgroundColor: "#aaa9a944",
    backgroundColor: colors.bgColor10,
    flexDirection: "column",
    borderRadius:30,

  },
  imgContainer: {
    flex: 4,
    //backgroundColor: "#aaa9a955",
    //backgroundColor: "#fffa",
    justifyContent:'center',
    alignItems:'center',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
  },
  img:{
    width: 130,
    height: 130,
    borderRadius:70
  },
  descriptionContainer: {
    flex: 6,
    //backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'stretch',
    paddingHorizontal:'13%',
    paddingBottom:'20%',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,

  },
  card:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'baseline',
    paddingBottom:6,
    //backgroundColor: "#fff",
  },
  text1:{
    fontFamily:fonts.RalewayM,
    fontSize:24,
    borderBottomWidth:1
  },
  text2:{
    fontFamily:fonts.RalewayL,
    fontSize:18,
    paddingBottom:5,
    paddingLeft:'5%'
  },

});
