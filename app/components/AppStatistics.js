import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import fonts from "../config/fonts";
import {
  AntDesign
} from "@expo/vector-icons";
import colors from "../config/colors";
import AChart from "./AppChart";

export default class AppCompte extends Component {
    state = {
      showList: false,
      title:"Voltage",
      SelectedSection: [true, false, false, false],
    }
    select = (index, title) => {
      let tab = this.state.SelectedSection;
      tab = [false, false, false, false];
      tab[index] = true;
      this.setState({ SelectedSection: tab, title: title });
      this.setState({showList : false})
    };
  render() {
    const sections = this.state.SelectedSection;
    return (
      <View style={styles.container}>
        <View style={styles.StatHeader}>
        <TouchableOpacity onPress={() => this.setState({showList: !this.state.showList})} style={{flex:2, justifyContent:'center'}}>
        <Text 
        style={{fontFamily:fonts.RalewayR, fontSize:30, color:'black',}}>
          {this.state.title}&nbsp;
          <AntDesign name={(!this.state.showList)?'caretdown':"caretup"} size={24} color="#000A" />
          </Text>
        </TouchableOpacity >
        { (this.state.showList) ? (          
        <View style={styles.header2}>

        <TouchableOpacity style={styles.listitem}   onPress={this.select.bind(this, 0, "Voltage")}>
        <Text style={styles.itemText}>Voltage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listitem}   onPress={this.select.bind(this, 1, "Courant")}>
        <Text style={styles.itemText}>Courant</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.listitem}   onPress={this.select.bind(this, 2, "Energie")}>
        <Text style={styles.itemText}>Energie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listitem}   onPress={this.select.bind(this, 3, "Puissance")}>
        <Text style={styles.itemText}>Puissance</Text>
        </TouchableOpacity>

        </View>
        ):null}

      
        </View>

        {/* Voltage */}
        {sections[0] ? (
        <View style={styles.chartContainer}>
        <View style={{ alignItems:'center', }}>
        <Text style={{fontSize: 20, fontFamily: fonts.RalewayR,color:'black',}}>
            {"176.87 V"} <Text style={{fontFamily:fonts.RalewayEL}}> (maintenant)</Text></Text>
        </View>
        <AChart 
        XValues={[["10","17"], ["10","22"], ["10","27"],["10","32"] ,["10","37"] , ["10","42"],["10","47"] ]} 
        YValues = {[175.02, 175.58, 176.9, 176.8, 176.33, 177.15,176.87 ]} />
        </View>
        ): (
              <></>
            )}
        {/* Courant */}
      {sections[1] ? (
        <View style={styles.chartContainer}>
        <View style={{ alignItems:'center', }}>
        <Text style={{fontSize: 20, fontFamily: fonts.RalewayR,color:'black',}}>
            {"6.44 A"} <Text style={{fontFamily:fonts.RalewayEL}}> (maintenant)</Text></Text>
        </View>
        <AChart 
        XValues={[["10","17"], ["10","22"], ["10","27"],["10","32"] ,["10","37"] , ["10","42"],["10","47"] ]} 
        YValues = {[6.51, 6.62, 6.75, 6.85, 6.25, 6.32,6.44 ]} />
        </View>
        ): (
              <></>
            )}
        {/* Energie */}
      {sections[2] ? (
        <View style={styles.chartContainer}>
        <View style={{ alignItems:'center', }}>
        <Text style={{fontSize: 20, fontFamily: fonts.RalewayR,color:'black',}}>
            {"176.87 J"} <Text style={{fontFamily:fonts.RalewayEL}}> (maintenant)</Text></Text>
        </View>
        <AChart 
        XValues={[["10","17"], ["10","22"], ["10","27"],["10","32"] ,["10","37"] , ["10","42"],["10","47"] ]} 
        YValues = {[175.04, 175.58, 176.9, 176.8, 176.33, 177.15,176.87 ]} />
        </View>
        ): (
              <></>
            )}
        {/* Puissance */}
      {sections[3] ? (
        <View style={styles.chartContainer}>
        <View style={{ alignItems:'center', }}>
        <Text style={{fontSize: 20, fontFamily: fonts.RalewayR,color:'black',}}>
            {"1482.09 Watt"} <Text style={{fontFamily:fonts.RalewayEL}}> (maintenant)</Text></Text>
        </View>
        <AChart 
        XValues={[["10","17"], ["10","22"], ["10","27"],["10","32"] ,["10","37"] , ["10","42"],["10","47"] ]} 
        YValues = {[1481.57, 1482.54, 1482.95, 1483.33, 1482.12, 1483.23,1482.09 ]} />
        </View>
        ): (
              <></>
            )}






      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    position:'absolute',
    alignItems:'center',

  },
  StatHeader:{
    flex:1,
    alignItems:'center',
    zIndex: 1,
    
    //backgroundColor:'green'
  },
  chartContainer:{
    flex:8,
    zIndex: 0,
    position: 'absolute' ,
    top:80,
    //sbackgroundColor:'blue',
  },
  header2:{
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'baseline',
    backgroundColor:colors.bgColor10,
    width:180,
    //alignSelf:'flex-end',
  },
  listitem:{
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    paddingLeft:15,
    paddingVertical:8,
    width:'100%',
  },
  itemText:{
    fontFamily:fonts.RalewayL,
    fontSize:16,
  }
});
