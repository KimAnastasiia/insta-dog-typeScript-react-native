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
        marginBottom:20,
    },
    alert:{
        color:'red',
        width:'90%',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius:50,
        elevation: 3,
        backgroundColor: 'black',
        width:'90%',
        marginTop:26,
    },
    textInButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default stylesRegistration;
