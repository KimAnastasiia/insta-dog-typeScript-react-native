/* eslint-disable prettier/prettier */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState,useEffect  } from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Alert,TextInputFocusEventData, NativeSyntheticEvent,TouchableOpacity } from 'react-native';
import { RootStackParamList } from './AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InputFunction = (param: string ) => void;
type onBlurFunction = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
type LoginScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'Login'>

interface BoxProps {
  placeholder:string,
  value:string,
  secureTextEntry:boolean,
  callBack:InputFunction,
  onBlur?: onBlurFunction;
}

const Box: React.FC<BoxProps>=({placeholder,value,secureTextEntry, callBack, onBlur})=>(
    <View style={{justifyContent:"center",alignItems:"center" , width:"100%"}}>
        <TextInput style={{margin: 8, borderWidth:1, width:"90%", borderRadius:70, padding:10}} placeholder={placeholder} value={value} secureTextEntry={secureTextEntry} onChangeText={(text)=>{callBack(text)}} onBlur={onBlur}/>
    </View>
);

const LoginScreenComponent:React.FC<LoginScreenComponentProps>=(props)=>{

    const [email, setEmail]=useState<string>("")
    const [password, setPassword]=useState<string>("")
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    useEffect(()=>{
      setErrorEmail("");
    },[email]);

    useEffect(()=>{
      setErrorPassword("");
    },[password]);

    const onBlurEmail=()=>{
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email != null && email != "" && !emailPattern.test(email)){
        setErrorEmail("Wrong email format");
      } else if(email==""){
        setErrorEmail("Enter your email");
      } else {
        setErrorEmail("");
      }
    };

    const onBlurPasswor=()=>{
      if (password==""){
        setErrorPassword("Enter your password");
      } else {
        setErrorPassword("");
      }
    };

    let login = async()=>{
      if (errorEmail=="" && errorPassword ==""){
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
          if (data.message == "Incorrect password" || data.message == "Incorrect email" ){
            return Alert.alert(data.message, 'Fix the information', [
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
      }

    };
    return (
      <View style={{ height:"100%"}}>
        <View style={[styles.layout, {height:"80%"}]}>
          <Text style={styles.title}>Insta dog</Text>
          <Box value={email} placeholder="Email" callBack={setEmail} secureTextEntry={false} onBlur={onBlurEmail}/>
          {errorEmail !="" && <Text style={styles.alert}>{errorEmail}</Text>}
          <Box value={password} placeholder="Password" callBack={setPassword} secureTextEntry={true} onBlur={onBlurPasswor}/>
          {errorPassword !="" && <Text style={styles.alert}>{errorPassword}</Text>}
          <Pressable style={styles.button} onPress={login}>
              <Text style={styles.textInButton}>Sign in</Text>
          </Pressable>
        </View>
        <View style={styles.layout}>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity style={styles.buttonNavigate} onPress={() => props.navigation.push("Registration")}>
            <Text style={styles.buttonTextNavigate}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) 
  };
  const styles = StyleSheet.create({
    layout: {
      justifyContent: 'center',
      alignItems: "center",
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
    alert:{
      color:"red",
      width:"90%"
    },
    buttonNavigate: {
      backgroundColor: '#AC7878',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius:50,
      width:"60%",
      margin:20,
    },
    buttonTextNavigate: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign:"center"
    },
    text:{
      fontSize:18,
      color:"#696969"
    },
  });
export default LoginScreenComponent;


