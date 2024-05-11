import React from 'react'

import {View,Text,Image} from 'react-native'

import { getStyles } from './EmptyList.style'
import { useTheme } from '../../context/ThemeContext'

const EmptyList = ({label, vector}) => {
    
    const {theme} = useTheme();
    const styles = getStyles(theme)
    

    return (
        <View style={styles.container}>
            <Image source={vector} style={styles.vector} />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

export default EmptyList