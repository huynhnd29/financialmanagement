import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import flatListData from '../../data/flatListData'
import React, { Component } from 'react'

export default class Bang extends Component {
    render() {
        return (
          
                <View style={{flex: 1, marginTop: 22}}>
                <FlatList
                data = {flatListData}
                renderItem = {({item,index})=>{
                    return(
                        <FlatListItem item={item} index={index}>
                        </FlatListItem>
                    )
                }
            }
                >

                </FlatList>
            </View>
           
        )
    }
}
