import React from 'react'
import {View,Text, FlatList} from 'react-native'

import { Button } from './components/Button'
import { Input } from './components/Input'
import { AdvertisementCard } from './components/AdvertisementCard'
import { ChatBubble } from './components/ChatBubble'

const App = () => {

    const products = [
        {
            id: 1,
            name: "Gaming Laptop",
            price: 15_000
        },
        {
            id: 2,
            name: "Macbook Pro",
            price: 52_000
        },
        {
            id: 3,
            name: "Sweatshirt",
            price: 500
        },
        
    ]


    return (
        <View>

            <ChatBubble owner={true}/>
            <ChatBubble owner={false}/>
            <ChatBubble owner={false}/>
            <ChatBubble owner={true}/>
            <ChatBubble owner={true}/>


        </View>
    )
}

export default App