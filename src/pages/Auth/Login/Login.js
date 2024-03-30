import React from 'react'
import {View,Text,Image} from 'react-native'

import CONSTANTS from '../../../utils/constants'

import styles from './Login.style'

import LoginSVG from '../../../assets/svgs/login.svg'


const Login = () => {
    return (
        <View>
            <Text style={styles.appName}>{CONSTANTS.APP_NAME}</Text>
            <Text style={styles.appSlogan}>{CONSTANTS.APP_SLOGAN}</Text>
            <LoginSVG/>

        </View>
    )
}

export default Login