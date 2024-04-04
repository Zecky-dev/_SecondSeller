import React from 'react'
import {View,Text, FlatList} from  'react-native'

import styles from './Advertisements.style'

import { AdvertisementCard } from '@components'

const Advertisements = ({advertisements}) => {

    const user = "Zecky"

    return (
        <View style={styles.container}>
            <FlatList
                data={advertisements}
                renderItem={({item}) => <AdvertisementCard advertisement={item} isOwner={user === item.owner} big={true} onPress={() => console.log("Test")}/>}
            />
        </View>
    )
}

export default Advertisements