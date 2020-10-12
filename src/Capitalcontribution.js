import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ActivityIndicator, Linking } from 'react-native';
import { DATA } from '../data/data';
import Icon from 'react-native-vector-icons/FontAwesome';
function formatCurrency(value) {
   
  return value?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default function Capitalcontribution() {  
    const [isLoading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [articles, setArticles] = useState([]);    
    const [totalinvest,setTotalinvest]=useState(0)
    const [interestrate,setInterestrate]=useState(0)
    const [Capital,setCapital]= useState({
      authorName:"",
      borrow:0,
      investdate:"",
      interestrate:0,
      description:""
    })
    useEffect (()=>{
        async function getdata() {
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
    const Caipitalinformation = (authorName,borrow,investdate,interestrate,description)=>{
      setCapital({
        authorName:authorName,
        borrow:borrow,
        investdate:investdate,
        interestrate:interestrate,
        description:description
      })
      setModalVisible(true)
    }
    const renderItem = ({item, index}) => {
       
        return (
            <TouchableOpacity onPress={()=>Caipitalinformation(item.authorName,item.borrow,item.investdate,item.interestrate,item.description)} >
              <View style={styles.container}  >
                 
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
                            <TouchableOpacity style={styles.addnew} onPress={()=>setModalVisible2(true)}>
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:16}}>
                    <TouchableOpacity style={styles.addnew} onPress={()=>setModalVisible(false)}>
                        <Text style={{fontWeight:"bold"}}>OK</Text>
                    </TouchableOpacity>
                
                
                <View style={styles.headermodal}>
                    <Text style={[styles.text,{fontWeight:"bold",fontSize:24}]}>{Capital.authorName}</Text>
                    <Text style={styles.text}> {formatCurrency(Capital.borrow)} VNĐ</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Ngày đầu tư:</Text>
                    <Text style={styles.text}> {Capital.investdate}</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Lợi nhuận dự tính:</Text>
                    <Text style={styles.text}> {formatCurrency(Capital.interestrate)} VNĐ</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Mô Tả:</Text>
                    <Text style={styles.text}> {Capital.description}</Text>
                </View>
               
                
                
                
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            >
            <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:16}}>
                <TouchableOpacity style={styles.addnew} onPress={()=>setModalVisible2(false)}>
                    <Text style={{fontWeight:"bold"}}>OK</Text>
                </TouchableOpacity>
                
                {/* <TextInput style={styles.input} placeholder=" Tên khách hàng" onChangeText={text => setName(text)} />
                <TextInput style={styles.input} placeholder=" Số điện thoại" onChangeText={text => setPhone(text)}/>
                <TextInput style={styles.input} placeholder=" Bát" onChangeText={text => setBorrow(text)} />
                <TextInput style={styles.input} placeholder=" Địa chỉ" onChangeText={text => setAddress(text)}/>
                <TextInput style={styles.input} placeholder=" tỷ lên /10" onChangeText={text => setRatio(text)}/>
                <TextInput style={styles.input} placeholder=" Ngày nhận tiền (Năm - tháng - ngày)" onChangeText={text => setLoandate(text)}/>
                <TextInput style={styles.input} placeholder=" Trả trong" onChangeText={text => setNumberday(text)}/>
                {/* <TextInput style={styles.input} placeholder=" kỳ" onChangeText={text => setPay(text)}/> */}
              
                
                
                
            </View>
      </Modal>
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
    text:{
      fontSize:16,
      marginTop:8
  },
  descriptonstyle:{
      width:"100%",
      height:"30%",
      borderWidth:0.8,
      borderColor:"gray",
      padding:4
  },
  headermodal:{
      marginTop:16,
      width:"100%",
      height:"15%",
      alignItems:"center",
      borderBottomColor:"#d2dae2",
      borderBottomWidth:1
  },
  infomation:{
      width:"100%",
      height:"10%",
      borderBottomColor:"#d2dae2",
      borderBottomWidth:1,
      justifyContent:"center",
      
  },
  totallmoney:{
      fontWeight:"bold",
      fontSize:32,
      color:"#fff"
  },
});

