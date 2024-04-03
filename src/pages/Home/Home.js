import React from 'react'
import {View,Text} from 'react-native'

import { AdvertisementDetail, CreateAdvertisement } from '@pages'



const Home = () => {
    return (
        <View style={{flex: 1}}>
            <CreateAdvertisement/>
        </View>
    )
}

export default Home