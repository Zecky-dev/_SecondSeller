import React from 'react'
import {View,Text} from 'react-native'

import { AdvertisementDetail, CreateAdvertisement, Profile, Chat } from '@pages'

const Home = () => {
    return (
        <View style={{flex: 1}}>
            <Chat/>
        </View>
    )
}

export default Home