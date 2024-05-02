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
    secret = false,
    additionalStyles,
    errors,
    value,
    maxLength,
    multiline = false,
    onSubmitEditing,
}) => {

    const [inputVisible,setInputVisible] = useState(secret)

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

            <View style={[styles.inputContainer,additionalStyles?.inputContainer]}>
                <TextInput
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={inputVisible}
                    style={styles.input}
                    multiline = {multiline}
                    value={value}
                    maxLength={maxLength}
                    onSubmitEditing={onSubmitEditing}
                />
                {
                    secret && (
                        <Pressable
                            onPress={() => setInputVisible(!inputVisible)}
                        >
                            <Icon
                            name={
                                inputVisible ? "eye-off" : "eye"
                            }
                            color={COLORS.blackMuted}
                            size={CONSTANTS.fontSize.L5}/>
                        </Pressable>
                        
                    )
                }
            </View>

            {errors && <Text style={styles.errorMessage} >{errors}</Text>}
            
            
        
        </View>
    )
}

export default Input