import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

export default class MinePage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Mine</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6f7'
    }
});