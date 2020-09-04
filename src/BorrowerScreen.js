import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { DATA } from '../data/data';



export default function BorrowerScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [adress,setAdress]=useState("")
    const [loandate,setLoandate]=useState("")
    const [numberday,setNumberday]=useState(0)
    const [status,setStatus]=useState("")
    const [borrow,setBorrow]=useState("")

    const customerinformation=(name,phone,adress,loandate,numberday,status,borrow)=>{
        setModalVisible(true)
        setName(name)
        setPhone(phone)
        setAdress(adress)
        setLoandate(loandate)
        setNumberday(numberday)
        setStatus(status)
        setBorrow(borrow)
        
    }

    const renderItem = ({item, index}) => {
        if(index===0){
            return(
                <View style={styles.column}>
                    <View style={styles.namephone}>
                        <Text style={{fontWeight:"bold",color:"black"}}>Khách Hàng</Text>
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
        else{
            return (
                <TouchableOpacity onPress={()=>customerinformation(item.authorName,item.phone,item.adress,item.loandate,item.numberday,item.status,item.borrow)}>
                  <View style={styles.container}>
                      <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold",color:"blue"}}>{item.authorName}</Text>
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
        }
            
        
            
    };  
    
    return (
        <SafeAreaView>      
            <View style={styles.header}>
                <TouchableOpacity style={styles.addnew}>
                    <Text style={{fontWeight:"bold"}}>Thêm mới</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row"}}>
                    <TextInput style={styles.inputsearch} placeholder="Tên khách hàng"/>
                    <TouchableOpacity style={styles.search}>
                        <Text style={{fontWeight:"bold"}}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
                
            </View>     
         <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
        <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:16}}>
            <TouchableOpacity style={styles.addnew} onPress={()=>setModalVisible(false)}>
                <Text style={{fontWeight:"bold"}}>OK</Text>
            </TouchableOpacity>
            <Text>Khách hàng: {name}</Text>
            <Text>SĐT: {phone}</Text>
            <Text>Địa chỉ: {adress}</Text>
            {/* <Text>Bát: {borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text> */}
            <Text>Ngày nhận tiền: {loandate}</Text>
            <Text>Kỳ: {numberday} Ngày</Text>
            <Text>Trạng thái: {status}</Text>
            
        </View>
      </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width:"100%",
    height:80,
    flexDirection:"row"
  },
  namephone:{
      borderLeftWidth:0.5,
      borderLeftColor:'#bdc3c7',
      width:"25%",
      alignItems:"center",
      justifyContent:"center"
  },
  column:{
      flexDirection:"row",
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      borderTopColor:"gray",
      borderTopWidth:1,
      width:"100%",
      height:60,
      marginTop:4,
      backgroundColor:"#dfe6e9"
    },
    header:{
        width:"100%",
        height:56,
        backgroundColor:"#2c3e50",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:8
    },
    addnew:{
        backgroundColor:"#81ecec",
        width:80,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:4,
        marginTop:8,
    },
    inputsearch:{
        width:150,
        height:40,
        borderColor: 'gray',
        borderWidth: 1 ,
        backgroundColor:"#fff",
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        marginTop:8,
        marginRight:8
    },
    search:{
        backgroundColor:"#48dbfb",
        width:80,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:4,
        marginTop:8,
    },
});

