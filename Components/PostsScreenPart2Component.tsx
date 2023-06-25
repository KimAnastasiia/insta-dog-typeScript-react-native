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
interface WoofPostProps {
  image:string,
  title:string,
  description:string,
}

interface HeadingProps {
  children:string,
};

const Heading: React.FC<HeadingProps>  = ({children}) => (
  <Text style={stylesPosts.heading}>
    {children}
  </Text>
);

const WoofPost: React.FC<WoofPostProps> = ({image, title, description}) => (
  <View style={woofPostStyles.layout}>
    <Image style={woofPostStyles.image} source={{ uri:image }} />
    <View style={woofPostStyles.content}>
      <Text style={woofPostStyles.title}>{title}</Text>
      <Text style={woofPostStyles.description}>{description}</Text>
    </View>
  </View>
);

const woofPostStyles = StyleSheet.create({
  layout: {
    margin:16,
    flex:1,
  },
  image: {
    flex:1,
    height:100,
  },
  content: {
    flex:2,
  },
  title: {
    fontWeight:"bold",
  },
  description: {
    color:"black",
  },
});

const PostsScreenPart2Component: React.FC<{}>=()=> {
  return (
    <View >
      <ScrollView >
        <Heading > New Woof Posts</Heading>
        {data.posts.map(post =>
        <WoofPost
          image={post.image}
          title={post.title}
          description={post.description}
          />
        )}
      </ScrollView>
    </View>
  );
};


export default PostsScreenPart2Component;
