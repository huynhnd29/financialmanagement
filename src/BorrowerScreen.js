import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { DATA } from '../data/data';



export default function BorrowerScreen() {
    const renderItem = ({item, index}) => {
        if(index===0){
            return(
                <View style={styles.column}>
                    <View style={styles.namephone}>
                        <Text style={{fontWeight:"bold"}}>Khách Hàng</Text>
                    </View>
                    <View style={styles.namephone}>
                        <Text style={{fontWeight:"bold"}}>Giao khách</Text>
                    </View>
                    <View style={styles.namephone}>
                        <Text style={{fontWeight:"bold"}}>Tình Trạng</Text>
                    </View>
                    <View style={styles.namephone}>
                        <Text style={{fontWeight:"bold"}}>Ngày phải trả</Text>
                    </View>
                </View>
            )
        }
            return (
                <TouchableOpacity>
                  <View style={styles.container}>
                      <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold"}}>{item.authorName}</Text>
                          <Text>{item.phone}</Text>
                    
                      </View>
                      <View style={styles.namephone}>
                          
                          <Text>{item.borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                      </View>
                      <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold"}}>{item.status}</Text>
                      </View>
                      <View style={styles.namephone}>
                          <Text>Hôm Nay</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              );
        
            
    };  
    
    return (
        <SafeAreaView>      
            <View style={styles.header}>
                <TouchableOpacity style={styles.addnew}>
                    <Text>Thêm mới</Text>
                </TouchableOpacity>
            </View>     
         <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    width:"100%",
    height:80,
    flexDirection:"row"
  },
  namephone:{
      borderLeftWidth:1,
      borderLeftColor:'#bdc3c7',
      width:"25%",
      alignItems:"center",
      justifyContent:"center"
  },
  column:{
      flexDirection:"row",
      borderBottomWidth: 1,
      borderBottomColor: '#bdc3c7',
      borderTopColor:"#bdc3c7",
      borderTopWidth:1,
      width:"100%",
      height:80,
      marginTop:8
    },
    header:{
        width:"100%",
        height:48
    },
    addnew:{
        backgroundColor:"#3498db",
        width:80,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:4,
        marginTop:8,
        marginLeft:8
    }
});

