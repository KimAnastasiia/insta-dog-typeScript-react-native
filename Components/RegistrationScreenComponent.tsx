/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { TextInput, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

type RegistrationScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'Registration'>

type UserInfo= {
    email:string
    password:string
    name:string
    breed:string
    date:number
}

type ErrorsUserInfo= {
    email:string
    password:string
    name:string
    breed:string
    date:string
}

const RegistrationScreenComponent: React.FC<RegistrationScreenComponentProps> = () => {

  const [userInfo, setUserInfo] = useState<UserInfo|any>({});
  const [errors, setErrors] = useState<ErrorsUserInfo|any>({});


  useEffect(()=>{

    let newStateErrors = { ...errors }

    if(userInfo?.name != "" && userInfo?.name?.length<5 ){
        newStateErrors = {...newStateErrors, name:"Name too short"}
    }else{
        newStateErrors = {...newStateErrors, name:""}
    }
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(userInfo?.email != null && userInfo?.email != "" && !emailPattern.test(userInfo?.email)){
        newStateErrors = {...newStateErrors, email:"Not valid email"}
    }else{
        newStateErrors = {...newStateErrors, email:""}
    }

    setErrors(newStateErrors)
   

  },[userInfo]);

  let createAccount=async()=>{

        await fetch ("http://192.168.31.75:4000/public/user",{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body:
                JSON.stringify(userInfo),
        });
    };


    return (

        <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>Create profile</Text>
            <MyInput
                onChangeText={(text) => {setUserInfo({...userInfo, name:text}); } }
                value={userInfo.name}
                placeholder={'Name'}
                secureTextEntry={false}
            />
            {errors.name !="" && <Text>{errors.name}</Text>}
                <MyInput
                onChangeText={(text) => { setUserInfo({...userInfo, breed:text})} }
                value={userInfo.breed}
                placeholder={'Breed'}
                secureTextEntry={false}
            />

            <MyInput
                onChangeText={(text) => { setUserInfo({...userInfo, date:text})} }
                value={userInfo.date}
                placeholder={'Date'}
                secureTextEntry={false}
            />
            <MyInput
                onChangeText={(text) => { setUserInfo({...userInfo, email:text})}}
                value={userInfo.email}
                placeholder={'Email'}
                secureTextEntry={false}
            />
            {errors.email !="" && <Text>{errors.email}</Text>}
            <MyInput
                onChangeText={(text) => { setUserInfo({...userInfo, password:text})} }
                value={userInfo.password}
                placeholder={'Password'}
                secureTextEntry={true}
            />
            <Button title='Create ypur page' onPress={createAccount} />
        </View>
    );
}

export default RegistrationScreenComponent;

type onChangeTextFunction = (param: string ) => void;

interface InputWithLabelProps {
    onChangeText:onChangeTextFunction,
    value:string,
    placeholder:string,
    secureTextEntry:boolean,
}

const MyInput: React.FC<InputWithLabelProps> = (props) => {

    return (
      <TextInput
        style={{ padding: 8, fontSize: 16, backgroundColor:"#EFEFEF", borderWidth:1, borderRadius:15, margin:10, width:"80%"}}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      />

  );
};
