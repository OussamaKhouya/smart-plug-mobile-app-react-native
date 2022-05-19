import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Addprise } from "../DB/prise/Addprise";

import MenuItem from "../components/MenuItem";
import AppText from "../components/AppText";
import AppHeading from "../components/AppHeading";
import colors from "../config/colors";
import fonts from "../config/fonts";
import AppImagePicker from "../components/AppImagePicker";
import AppButton from "../components/AppButton";

export default class IconChoice extends Component {
   state = {
     ImgUrl: " ", 
     SelectedTracker:[true,false,false,false,false,false,false,false,false, false, false],
     selectedIcon:2, 
    };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin des autorisations de votre camera pour que cela fonctionne!');
    }
  }

  selectImage = async () => {
    try {
      const resulat = await ImagePicker.launchImageLibraryAsync();
      if(!resulat.cancelled)
        this.setState({ImgUrl:resulat.uri, SelectedTracker: this.state.SelectedTracker.map(key => false)})
    } catch (error) {
      console.log('Erreur dans la lecture d\'une image', error);
    }
  }
  select = (ordre, icon) => {
          let tab = this.state.SelectedTracker;
          tab = tab.map(key => false);
          tab[ordre - 1] = true;
          //use order not icons : database uses numbers for icons not url
          this.setState({ImgUrl: " ", SelectedTracker:tab, selectedIcon:ordre}); 
  }
  showData = () => { 
    Addprise(this.props.route.params.email, this.props.route.params.nomMachine,this.state.selectedIcon );
    console.log(this.props.route.params.email, this.props.route.params.nomMachine, this.state.selectedIcon)
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Personnalisez votre icone</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
        choisissez une icone pour vous aider à identifier à quoi votre Smart Plug
            est connectée
        </Text>
      </View>
      <View style={styles.imgContainer}>
      <View style={styles.imgs}>
          <AppImagePicker 
          styleImage={{ }} 
          itemImage={(this.state.ImgUrl === " ")?require("../assets/icons/camera2.png"):{uri:this.state.ImgUrl}} 
          selectImage={this.selectImage}/>
          <MenuItem onSelectEvent={this.select.bind(this,1 ,'icon1.png')} selected={this.state.SelectedTracker[1 - 1]} itemImage={require("../assets/icons/icon1.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,2 ,'icon2.png')} selected={this.state.SelectedTracker[2 - 1]} itemImage={require("../assets/icons/icon2.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,3 ,'icon3.png')} selected={this.state.SelectedTracker[3 - 1]} itemImage={require("../assets/icons/icon3.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,4 ,'icon4.png')} selected={this.state.SelectedTracker[4 - 1]} itemImage={require("../assets/icons/icon4.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,5 ,'icon5.png')} selected={this.state.SelectedTracker[5 - 1]} itemImage={require("../assets/icons/icon5.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,6 ,'icon6.png')} selected={this.state.SelectedTracker[6 - 1]} itemImage={require("../assets/icons/icon6.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,7 ,'icon7.png')} selected={this.state.SelectedTracker[7 - 1]} itemImage={require("../assets/icons/icon7.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,8 ,'icon8.png')} selected={this.state.SelectedTracker[8 - 1]} itemImage={require("../assets/icons/icon8.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,9 ,'icon9.png')} selected={this.state.SelectedTracker[9 - 1]}  itemImage={require("../assets/icons/icon9.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,10,'icon10.png')} selected={this.state.SelectedTracker[10 - 1]} itemImage={require("../assets/icons/icon10.png")} />
          <MenuItem onSelectEvent={this.select.bind(this,11,'icon11.png')} selected={this.state.SelectedTracker[11 - 1]} itemImage={require("../assets/icons/icon11.png")} />
        
      </View>
      </View>
      <View style={styles.button}>
        <AppButton
          title="suivant"
          onPress={() =>{ 
            this.showData();
            this.props.navigation.navigate("WifiScreen")}}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor10,
  },
  titleContainer: {
    //backgroundColor:'green',
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.RalewayL,
    fontSize: 28,
    textAlign: "center",
    color: colors.black,
  },
  descriptionContainer: {
    //backgroundColor:'red',
    height: "10%",
    alignItems: "center",
    
  },
  description: {
    fontFamily: fonts.RalewayL,
    fontSize: 18,
    textAlign: "center",
    width: "80%",
    color: colors.black,
  },
  imgContainer:{
    height: "40%",
    justifyContent:'flex-end',
    alignItems:'center',
  },
  imgs: {
   // backgroundColor:'green',
    height:'80%',
    flexDirection: "row",
    flexWrap: "wrap",
    
  },
  button: {
   // backgroundColor:'tomato',
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },

});
