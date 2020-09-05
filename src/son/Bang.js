import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { flatListData } from '../../data/flatListData'
import { create } from 'react-test-renderer'
// import { DATA } from '../../data/data'

export default class Bang extends Component {
    render() {
        const SonItem = ({item,index}) => (
            <View 
            style={{flex: 1, borderRadius: 4, marginTop: 5, backgroundColor: index %2==0 ?'tomato' : 'aqua', borderRadius: 10}}
            >
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontSize: 20}}>Họ và tên : {item.authorName}</Text>
                <Text style={{fontSize: 20}}>Số tiền vay :{item.borrow}</Text>
                </View>
                <Text style={styles.danhsach}>Địa chỉ: {item.address}</Text>
                <Text style={styles.danhsach}>Số điện thoại {item.phone}</Text>
                <Text style={styles.danhsach}>Ngày vay: {item.loandate}</Text>
                <Text style={styles.danhsach}>Số ngày đã vay: {item.numberday}</Text>
                <Text style={styles.danhsach}>Ngày thanh toán : {item.paymentdate}</Text>
                <Text style={styles.danhsach}>Trạng thái: {item.status}</Text>
              

            </View>
        )
        return (
          
                <View style={{flex: 1, marginTop: 22, backgroundColor: 'red'}}>
                    <Text style={{fontSize: 25, color: 'white'}}>Danh sách thông tin vay nặng lãi</Text>
                <FlatList
                data = {flatListData}
                renderItem = {({item,index})=>{
                    return(
                        <SonItem item={item} index={index}>
                        </SonItem>
                    )
                }
            }
                >

                </FlatList>
            </View>
           
        )
    }
};
const styles = StyleSheet.create({
    danhsach: {
        fontSize : 20,
        marginLeft: 20,
    }
})