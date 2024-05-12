import React, {useState} from 'react'
import { TextInput, View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { getStyles } from './Input.style'
import THEMECOLORS from '../../utils/colors'
import CONSTANTS from '../../utils/constants'
import { useTheme } from '../../context/ThemeContext'

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

    const { theme } = useTheme()
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    const styles = getStyles(theme)
    
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
                    placeholderTextColor={COLORS.textMutedColor}
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
                            color={COLORS.textColor}
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