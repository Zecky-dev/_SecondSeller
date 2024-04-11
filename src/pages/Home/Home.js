import React from 'react'
import {View,Text} from 'react-native'

import { Advertisements, EmailValidation } from '@pages'

import { useUser } from '../../context/UserProvider'

const Home = () => {

    const {user,setUser} = useUser()

    return (
        <View>
            <Text>Home!</Text>
        </View>
    )
}

export default Home