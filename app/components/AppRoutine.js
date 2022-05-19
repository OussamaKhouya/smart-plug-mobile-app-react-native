import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";

import fonts from "../config/fonts";
import colors from "../config/colors";
import { AntDesign, Ionicons  } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class AppRoutine extends Component {
  state = {
    Date: new Date(1598051730000),
    Mode: 'date',
    Show: false,
    Week: [false, false, false, false, false, false, false],
  };
  selectDay = (index) => {
    let Week = this.state.Week;
    Week[index] = !Week[index];
    this.setState({ Week: Week });
    console.log(this.state.Week)
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.Date;
    this.setState({ Show: Platform.OS === 'ios' });
    this.setState({ Date: currentDate });
    console.log(currentDate.getDay())
  };

  showMode = (currentMode) => {
    this.setState({ Show: true });
    this.setState({ Mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  render() {
    const Week = this.state.Week;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={this.props.icon}
            style={styles.imgIcon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textIcon}>{this.props.name}</Text>
          </View>
        </View>

        <View style={styles.routine}>
          <View style={styles.info}>
            <TouchableOpacity activeOpacity={0.4} style={styles.timeContainer} onPress={this.showTimepicker}>
              <Text style={styles.timeText} >ON         :         {this.state.Date}</Text>
              {/* <AntDesign name="caretdown" size={16} color="#000A" style={{paddingTop:'5%', paddingLeft:5}}/> */}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} style={styles.timeContainer} onPress={this.showTimepicker}>
              <Text style={styles.timeText} >OFF       :         {"23:15"}</Text>
              {/* <AntDesign name="caretdown" size={16} color="#000A" style={{paddingTop:'5%', paddingLeft:5}}/> */}
            </TouchableOpacity>
            <View style={styles.jours}>

              <TouchableOpacity onPress={this.selectDay.bind(this, 0)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[0])?"white":'#CCC7'}]} 
              >L</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 1)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[1])?"white":'#CCC7'}]} 
              >M</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 2)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[2])?"white":'#CCC7'}]} 
              >M</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 3)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[3])?"white":'#CCC7'}]} 
              >J</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 4)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[4])?"white":'#CCC7'}]} 
              >V</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 5)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[5])?"white":'#CCC7'}]} 
              >S</Text></TouchableOpacity>
              
              <TouchableOpacity onPress={this.selectDay.bind(this, 6)} style={styles.j}><Text 
              style={[styles.timeText, {color:(Week[6])?"white":'#CCC7'}]} 
              >D</Text></TouchableOpacity>
            </View>
            {this.state.Show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.Date}
                mode={this.state.Mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
          </View >
          <View style={styles.clock}>
          <Ionicons name="alarm" size={40} color="#CCC7" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "15%",
    marginBottom: "2%",
    marginHorizontal: "2%",
  },
  iconContainer: {
    width: "30%",
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.bgColor10,
    paddingHorizontal: "4%",
  },
  imgIcon: {
    width: 40,
    height: "50%",
    marginBottom: "5%",
    resizeMode: "contain",
  },
  textIcon: {
    fontFamily: fonts.RalewayL,
    fontSize: 10,
    color: "#CCC7",
    textAlign: 'center',
  },
  routine: {
    flexDirection: 'row',
    //backgroundColor:'yellow',
    justifyContent:'flex-start',
    width: "60%",
    backgroundColor: colors.bgColor10,
    //backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  timeContainer: {
    //backgroundColor:'olive',
    alignItems: 'flex-start',
    flexDirection:"row",
  },
  timeText: {
    fontFamily:fonts.RalewayL,
    fontSize:16,
    color:'#CCC7'
    //backgroundColor:'olive',
  },
  jours: {
    flexDirection: 'row',
    //backgroundColor:'yellow',
    justifyContent:'flex-start'
  },
  j: {
    marginRight:'6%'
  },
  info:{
    justifyContent: "center",
    alignItems: "flex-start",
    //backgroundColor:"yellow",
  },
  clock:{
    //backgroundColor:'tomato',
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
  }
  
});
