import React from 'react'
import {View,Text} from 'react-native'

import { Button } from './components/Button'
import { Input } from './components/Input'
import { AdvertisementCard } from './components/AdvertisementCard'

const App = () => {
    return (
        <View>
            <AdvertisementCard product={{name: "Gaming Laptop", price: "15.000"}}/>
    

        </View>
    )
}

export default App