/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const stylesRegistration = StyleSheet.create({
    textInput: {
        padding: 8,
        fontSize: 16,
        backgroundColor:'#EFEFEF',
        borderWidth:1,
        borderRadius:15,
        margin:10,
        width:'80%',
    },
    layout: {
        flex:1,
        alignItems:'center',
         justifyContent:'center',
    },
    title: {
      textAlign:'center',
      fontWeight:'bold',
      fontSize:30,
    },
    alert:{
        color:'red',
        width:'90%'
    },
});

export default stylesRegistration;
