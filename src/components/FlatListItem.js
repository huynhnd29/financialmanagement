import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class FlatListItem extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.props.index %2==0 ?'tomato' : 'blue'}}>
                <Text>
                    {this.props.authorName}  
                </Text>
                <Text>
                    {this.props.borrow}  
                </Text>
                <Text>
                    {this.props.address}  
                </Text>
                <Text>
                    {this.props.phone}  
                </Text>
                <Text>
                    {this.props.loandate}  
                </Text>
                <Text>
                    {this.props.numberday}  
                </Text>
                <Text>
                    {this.props.paymentdate}  
                </Text>
                <Text>
                    {this.props.status}  
                </Text>

            </View>
        )
    }
}
