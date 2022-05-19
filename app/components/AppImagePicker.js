import React, { Component } from 'react'
import { StyleSheet, Image, TouchableHighlight, View } from 'react-native'

export default class AppImagePicker extends Component {
    render() {
        return (
            <TouchableHighlight 
            underlayColor='rgba(255,255,255,.6)' 
            style={styles.menuItem} 
            onPress={() => this.props.selectImage()}>
                <Image  source= {this.props.itemImage} 
                        style={styles.image}
                        resizeMode="stretch" />
            </TouchableHighlight>
            
        );
    }
}

const styles = StyleSheet.create({
    menuItem:{
        width:'25%',
        height:'25%',
        padding:10,
        alignItems: "center",
        justifyContent: "center",
       // backgroundColor:"#fff",
       // opacity:.5,
        
    },
    image:{
        width:60,
        height:60,
    },
})
