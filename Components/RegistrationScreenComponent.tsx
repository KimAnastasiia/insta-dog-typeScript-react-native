/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { TextInput, View, Text, Pressable,Alert, TouchableOpacity,TextInputFocusEventData,NativeSyntheticEvent  } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import stylesRegistration from '../Utility/allStyles/stylesRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RegistrationScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'Registration'>

type UserInfo= {
    email:string
    password:string
    name:string
}

type ErrorsUserInfo= {
    email:string
    password:string
    name:string
}

const RegistrationScreenComponent: React.FC<RegistrationScreenComponentProps> = (props) => {

  const [userInfo, setUserInfo] = useState<UserInfo|any>({});
  const [errors, setErrors] = useState<ErrorsUserInfo|any>({});


    useEffect(()=>{
        setErrors({...errors, email:''});
    },[userInfo.email]);

    useEffect(()=>{
        setErrors({...errors, name:''});
    },[userInfo.name]);

    const onBlurEmail = ()=>{

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if  (userInfo?.email != null && userInfo?.email !== '' && !emailPattern.test(userInfo?.email)){
            setErrors({...errors, email:'Not valid email'});
        } else {
            setErrors({...errors, email:''});
        }
    };

    const onBlurName = ()=>{
        if (userInfo?.name !== '' && userInfo?.name?.length < 2 ){
            setErrors({...errors, name:'Name too short'});
        } else {
            setErrors({...errors, name:''});
        }
    };

    let createAccount = async()=>{

        let response = await fetch('http://192.168.31.75:4000/public/user',{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body:
                JSON.stringify(userInfo),
        });
        if (response.ok){
            let data = await response.json();
            if (data.error=="error in email"){
              return Alert.alert(data.message, 'Change mail', [
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
            <View style={[stylesRegistration.layout, {height:'80%'}]}>
                <Text style={stylesRegistration.title}>Create profile</Text>
                <MyInput
                    onChangeText={(text) => {setUserInfo({...userInfo, name:text}); } }
                    value={userInfo.name}
                    placeholder={'Name'}
                    secureTextEntry={false}
                    onBlur={onBlurName}
                />
                {errors.name && <MyText content={errors.name}/>}
                <MyInput
                    onChangeText={(text) => { setUserInfo({...userInfo, email:text})}}
                    value={userInfo.email}
                    placeholder={'Email'}
                    secureTextEntry={false}
                    onBlur={onBlurEmail}
                />
                {(errors.email) && <MyText content={errors.email}/>}
                <MyInput
                    onChangeText={(text) => { setUserInfo({...userInfo, password:text})} }
                    value={userInfo.password}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />
                <Pressable style={stylesRegistration.button} onPress={createAccount}>
                    <Text style={stylesRegistration.textInButton}>Register</Text>
                </Pressable>
            </View>
            <View style={stylesRegistration.layout}>
                <TouchableOpacity style={stylesRegistration.buttonNavigate} onPress={() => props.navigation.push("Login")}>
                    <Text style={stylesRegistration.buttonTextNavigate}>Login</Text>
                </TouchableOpacity>
          </View>
        </View>
    );
};

export default RegistrationScreenComponent;

type onChangeTextFunction = (param: string ) => void;
type onBlurFunction = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
interface InputWithLabelProps {
    onChangeText:onChangeTextFunction,
    value:string,
    placeholder:string,
    secureTextEntry:boolean,
    onBlur?:onBlurFunction
}

const MyInput: React.FC<InputWithLabelProps> = ({onChangeText,value,placeholder,secureTextEntry, onBlur}) => {

    return (
      <TextInput
        style={stylesRegistration.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
      />

  );
};
interface MyTextProps {
    content:string
}
const MyText: React.FC<MyTextProps> = ({content}) => {

    return (
    <Text
        style={stylesRegistration.alert}
    >
        {content}
    </Text>

  );
};
