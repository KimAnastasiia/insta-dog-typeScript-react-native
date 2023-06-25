/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import data from '../Utility/data';
import stylesPosts from '../Utility/allStyles/stylesPosts';
interface WoofCardProps {
  id:string,
  avatar:string,
  name:string,
}

interface AvatarProps {
  url:string,
}

interface TitleProps {
  children:string,
}

interface HeadingProps {
  children:string,
}

const Avatar: React.FC<AvatarProps>  = ({url}) => (
  <Image
    style={stylesPosts.avatar}
    source={{ uri: url }}
  />
);

const Title: React.FC<TitleProps> = ({children}) => (
  <Text style={stylesPosts.title}>
    {children}
  </Text>
);

const Heading: React.FC<HeadingProps>  = ({children}) => (
  <Text style={stylesPosts.heading}>
    {children}
  </Text>
);

const WoofCard: React.FC<WoofCardProps> = ({id, avatar, name}) => (
  <View key={id} style={woofCardStyles.card}>
    <Avatar url={avatar}/>
    <View>
      <Title>
      {name}
      </Title>
    </View>
  </View>
);


const woofCardStyles = StyleSheet.create({
  card: {
    width:120,
    height:150,
    borderColor:"gray",
    borderWidth:1,
    borderRadius:20,
    margin:10,
    alignItems:"center",
    justifyContent:"space-around",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});


const PostsScreenPart1Component: React.FC<{}>=()=> {
  return (
    <View >
       <Heading>Trending Woofs</Heading>
       <ScrollView horizontal >
          {data.woofs.map(woof =>
            <WoofCard
              id={woof.id}
              name={woof.name}
              avatar={woof.avatar}
            />
          )}
        </ScrollView>
    </View>
  );
};

export default PostsScreenPart1Component;
