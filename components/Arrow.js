import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';

const Arrow = ({ status }) => {
    return (
        <View style={{ opacity: status == 0 ? 0 : 1, transform: status == 1 ? [{ rotate: '0deg'}] : [{ rotate: '180deg'}] }}>
            <AntDesign name="arrowdown" size={16} color="gray" />
        </View>
    )
}

export default Arrow