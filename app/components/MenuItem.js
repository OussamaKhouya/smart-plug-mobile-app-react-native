import React, { Component } from 'react'
import { StyleSheet, Image, TouchableHighlight, View } from 'react-native'
import colors from '../config/colors';

export default class MenuItem extends Component {
    onSelect =  () => {
            this.props.onSelectEvent();
    }
    render() {
        return (
            <TouchableHighlight 
            underlayColor='#9ACD3200' 
            style={[styles.menuItem,  (this.props.selected) ? {backgroundColor: "#4F9FAF", borderRadius:60}:{}]} 
            onPress={() => this.onSelect()}
            >
                <Image  source= {this.props.itemImage} 
                        style={[styles.image,this.props.styleImage]}
                        resizeMode="stretch" />
            </TouchableHighlight>
            
        );
    }
}

const styles = StyleSheet.create({
    menuItem:{
        width:'25%',
        height:'25%',
        padding:40,
        alignItems: "center",
        justifyContent: "center",
        
    },
    image:{
        width:60,
        height:60,
    },
})
