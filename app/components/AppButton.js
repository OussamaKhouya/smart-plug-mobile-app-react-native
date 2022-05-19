import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';

function AppButton({title, onPress,style,styleText}) {
    return (
        <TouchableOpacity activeOpacity={0.4} style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.title,styleText]} >{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#9ACD32',
        borderRadius:15,
        padding:4,
        width:170,
    },
    title:{
        color:colors.bgColor10,
        fontSize:18,
        textAlign:'center',
        fontFamily:fonts.RalewayL,
        textTransform:'uppercase',
    }
})

export default AppButton;