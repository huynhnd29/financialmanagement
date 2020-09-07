import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ActivityIndicator, Linking } from 'react-native';
import { DATA } from '../data/data';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Capitalcontribution() {  
    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);    
    const [totalinvest,setTotalinvest]=useState(0)
    const [interestrate,setInterestrate]=useState(0)
    useEffect (()=>{
        getdata = async () => {
            try {
              const response = await fetch(
                `https://fake-rest-api-nodejsa.herokuapp.com/Capitalcontribution`,
              );
              const jsonData = await response.json();
            //   console.log(jsonData);
    
              setArticles(jsonData);
    
              //sau khi load setLoadding bằng flase
              setLoading(false);
              let  totall =0;
              for (var i=0;i<jsonData.length;i++){
                totall +=  jsonData[i]["borrow"]
              }
              let totallmoney=0;
              for (var i=0;i<jsonData.length;i++){
                totallmoney +=  jsonData[i]["interestrate"]
              }
              setTotalinvest(totall)
              setInterestrate(totallmoney)
            } catch (e) {
              console.log(e);
            }
          };
          getdata()
          console.log('get News');
    },[])          
    const renderItem = ({item, index}) => {
       
        return (
            <TouchableOpacity >
              <View style={styles.container}>
                 
                     <View>
                        <Text style={{fontWeight:"bold",color:"black",fontSize:20}}>{item.authorName}</Text>
                        <Text>Tiền đầu tư : {item.borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text>
                        <Text>Lãi suất : {item.interestrate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text>
                     </View>
                     <View>
                         <Text>Ngày đầu tư</Text>
                         <Text>{item.investdate}</Text>
                     </View>
                
                 
              </View>
            </TouchableOpacity>
          );
    };   
    return (
        <SafeAreaView style={{flex:1}}>
                    <View style={styles.header}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
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
                    <View style={{marginTop:40}}>
                        
                        <Text style={{color:"#fff",fontSize:16}}>Góp vốn</Text>
                        <Text style={styles.totallmoney}>{totalinvest.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text>
                        <Text style={{color:"#fff"}}>Lãi xuất: {interestrate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Text>
                        <Icon name="diamond" size={30} color="gray"/>
                        
                        
                    </View>
                    
                </View>




            {isLoading ? (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{alignItems: 'center', justifyContent: 'center'}}
            />
        ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        width:"100%",
        flexDirection:"row",
        padding:12,
        alignItems:"center",
        justifyContent:"space-between",
      },
      header:{
        width:"100%",
        height:"30%",
        backgroundColor:"#212330",
        
        paddingHorizontal:8,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4
    },
    totallmoney:{
        fontWeight:"bold",
        fontSize:32,
        color:"#fff"
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

