import React, { Component } from 'react'

import { View, FlatList, StyleSheet, Text } from "react-native"

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

class Picker extends Component {
    render() {
        const { data } = this.props
        return (
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={item => item.id}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});


export default Picker