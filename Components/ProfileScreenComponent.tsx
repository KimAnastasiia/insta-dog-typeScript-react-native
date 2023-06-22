/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../Utility/data';


const ProfileScreenComponent:React.FC<{}>=()=>{

    type User ={
        name:string,
        id:number,
        email:string,
        date:number,
        breed:string
    }
    interface AvatarProps {
      url:string,
    }
    const Avatar: React.FC<AvatarProps>  = ({url}) => (
      <Image
        style={stylesProfile.avatar}
        source={{ uri: url }}
      />
    );
    
    const [user, setUser]=useState<Array<User>>([])

    useEffect(()=>{
        getUser();
    },[])

    let getUser=async()=>{
       let response = await fetch ("http://192.168.31.75:4000/user?apiKey="+ await AsyncStorage.getItem('apiKey'));
       if(response.ok){
        let data = await response.json();
        setUser(data)
       }
    };
    return (
      <View>

        {user.map((userData)=>
        <View>
            <View style={stylesProfile.layout}>
              <Avatar url={data.woofs[0].avatar}/>
              <Text style={stylesProfile.title}>Hi, {userData.name}</Text>
            </View>
            <View style={stylesProfile.layout}>
              <Pressable  style={stylesProfile.button}>
                <Text style={stylesProfile.textInButton}>Change profile</Text>
              </Pressable>
          </View>
        </View>
        )}
      </View>
    )
};
const stylesProfile = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems:"center",
    height:"50%"
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  }, 
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom:38,
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
  avatar: {
    borderRadius: 50,
    width:90,
    height:90,
  },
  
});

export default ProfileScreenComponent;