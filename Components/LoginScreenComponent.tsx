/* eslint-disable prettier/prettier */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Button, Alert } from 'react-native';
import { RootStackParamList } from './AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InputFunction = (param: string ) => void;

type LoginScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'Login'>

interface BoxProps {
  placeholder:string,
  value:string,
  secureTextEntry:boolean,
  callBack:InputFunction
}

const Box: React.FC<BoxProps>=({placeholder,value,secureTextEntry, callBack})=>(
    <View style={{justifyContent:"center",alignItems:"center" , width:"100%"}}>
        <TextInput style={{margin: 8, borderWidth:1, width:"90%", borderRadius:70, padding:10}} placeholder={placeholder} value={value} secureTextEntry={secureTextEntry} onChangeText={(text)=>{callBack(text)}}/>
    </View>
);

const LoginScreenComponent:React.FC<LoginScreenComponentProps>=(props)=>{

    const [email, setEmail]=useState<string>("")
    const [password, setPassword]=useState<string>("")

    let login=async()=>{
        let response = await fetch ("http://192.168.31.75:4000/public/user/verification",{ 
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              email : email,
              password: password,
          },),
        });
        if (response.ok){
          let data = await response.json();
          if (data.messege == "Incorrect password or email"){
            return Alert.alert('Incorrect password or email', 'Check all the information again', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          } else {
            props.navigation.push('MainNavigator');
            await AsyncStorage.setItem('apiKey', data.apiKey);
            /*
            let myApiKey=await AsyncStorage.getItem('apiKey');
            console.log(myApiKey);
            */
            AsyncStorage.setItem('userId', data.userId);
          }
        }

    };
    return (
      <View style={{ height:"100%"}}>
        <View style={[styles.layout, {height:"80%"}]}>
          <Text style={styles.title}>Insta dog</Text>
          <Box value={email} placeholder="Email" callBack={setEmail} secureTextEntry={false}/>
          <Box value={password} placeholder="Password" callBack={setPassword} secureTextEntry={true}  />
          <Pressable  style={styles.button} onPress={login}>
              <Text style={styles.textInButton}>Sign in</Text>
          </Pressable>
        </View>
        <View style={[styles.layout, {height:"20%"}]}>
          <Text style={{}}>Don't have an account?</Text>
          <Button title="Sign up" onPress={() => props.navigation.push("Registration")}/>
        </View>
      </View>
    ) 
  };
  const styles = StyleSheet.create({
    layout: {
      justifyContent: 'center',
      alignItems:"center",
    },
    title: {
      margin: 24,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    }, 
    button:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius:50,
      elevation: 3,
      backgroundColor: 'black',
      width:"90%",
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
export default LoginScreenComponent;
