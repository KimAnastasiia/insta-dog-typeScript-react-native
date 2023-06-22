/* eslint-disable prettier/prettier */
import * as React from 'react';
import { SafeAreaView, ScrollView} from 'react-native';
import PostsScreenPart1Component from './PostsScreenPart1Component';
import PostsScreenPart2Component from './PostsScreenPart2Component';



const PostsScreenComponent: React.FC<{}>  = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9FA' }}>
        <ScrollView >
            <PostsScreenPart1Component/>
            <PostsScreenPart2Component/>
        </ScrollView>
    </SafeAreaView>
);

export default PostsScreenComponent;
