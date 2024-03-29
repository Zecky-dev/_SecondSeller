import React, {useState} from 'react'
import { TextInput, View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './Input.style'
import COLORS from '../../utils/colors'
import CONSTANTS from '../../utils/constants'

const Input = ({
    label,
    placeholder = "",
    onChangeText,
    keyboardType = "default",
    secret,
    additionalStyles,
}) => {

    const [inputVisible,setInputVisible] = useState(false)

    return (
        <View style={[
            styles.outerContainer,
            additionalStyles?.outerContainer
        ]}>
            {label && (
                <Text style={[
                    styles.label,
                    additionalStyles?.label
                ]}>
                    {label}
                </Text>
            ) }

            <View style={[styles.inputContainer,additionalStyles?.inputContainerr]}>
                <TextInput
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={!inputVisible}
                    style={styles.input}
                />
                {
                    secret && (
                        <Pressable
                            onPress={() => setInputVisible(!inputVisible)}
                        >
                            <Icon
                            name={
                                inputVisible ? "eye" : "eye-off"
                            }
                            color={COLORS.blackMuted}
                            size={CONSTANTS.fontSize.L5}/>
                        </Pressable>
                        
                    )
                }
            </View>
            
            
        
        </View>
    )
}

export default Input