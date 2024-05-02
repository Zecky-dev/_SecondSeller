import React from 'react'
import {View,Text, FlatList} from  'react-native'

import styles from './Advertisements.style'

import { AdvertisementCard } from '@components'

import { mockAdvertisements } from '@utils/mockData'

const Advertisements = ({advertisements}) => {

    const user = "Zecky"

    return (
        <View style={styles.container}>
            <FlatList
                data={mockAdvertisements}
                renderItem={({item}) => <AdvertisementCard advertisement={item} isOwner={user === item.owner} onPress={() => console.log("Test")}/>}
            />
        </View>
    )
}

export default Advertisements