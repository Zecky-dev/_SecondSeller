import React from 'react'

import {View,Text,Image} from 'react-native'

import { getStyles } from './EmptyList.style'
import { useTheme } from '../../context/ThemeContext'

import EmptyListDark from '@assets/images/empty_list_dark.png'
import EmptyListLight from '@assets/images/empty_list_light.png'


const EmptyList = ({label}) => {
    
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const EmptyListVector = theme === "dark" ? EmptyListDark : EmptyListLight
    

    return (
        <View style={styles.container}>
            <Image source={EmptyListVector} style={styles.vector} />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

export default EmptyList