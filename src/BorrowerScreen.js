import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ActivityIndicator, Linking } from 'react-native';
import { DATA } from '../data/data';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function BorrowerScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [loandate,setLoandate]=useState("")
    const [numberday,setNumberday]=useState(0)
    const [status,setStatus]=useState("")
    const [borrow,setBorrow]=useState("")
    const [description,setDescription]=useState("")
    const [ratio,setRatio]=useState(0)
    const [moneyaday,setMoneyaday]=useState(0)
    const [interestrate,setInterestrate]=useState(0)

    const [isLoading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    
    const [totalloanamount, setTotalloanamount] = useState(0);

    const [postData, setPostData] = useState({});
    
    const customerinformation=(name,phone,address,loandate,numberday,status,borrow,description,ratio)=>{
        setModalVisible(true)
        setName(name)
        setPhone(phone)
        setAddress(address)
        setLoandate(loandate)
        setNumberday(numberday)
        setStatus(status)
        setBorrow(borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')),
        setDescription(description)
        setRatio(ratio)
        borrow = borrow/50
        setMoneyaday(borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
    }
    useEffect (()=>{
        getdata = async () => {
            try {
              const response = await fetch(
                `https://fake-rest-api-nodejsa.herokuapp.com/user`,
              );
              const jsonData = await response.json();
              console.log(jsonData);
    
              setArticles(jsonData);
    
              //sau khi load setLoadding bằng flase
              setLoading(false);
              let  totall =0;
              for (var i=0;i<jsonData.length;i++){
                totall +=  jsonData[i]["borrow"]
              }
              let totallmoney=0;
              for (var i=0;i<jsonData.length;i++){
                totallmoney +=  (jsonData[i]["borrow"]-jsonData[i]["borrow"]*jsonData[i]["ratio"]/10)
              }
              console.log(totall)
              setTotalloanamount(totall)
              setInterestrate(totallmoney)
            } catch (e) {
              console.log(e);
            }
          };
          getdata()
          console.log("totalloanamount: " + totalloanamount);
          console.log('get News');
    },[])
    async function insertData(uri,data){
        const response = await fetch(uri,{
            method:"POST",
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
    const renderItem = ({item, index}) => {
       
            return (
                <TouchableOpacity onPress={()=>customerinformation(item.authorName,item.phone,item.address,item.loandate,item.numberday,item.status,item.borrow,item.description,item.ratio)}>
                  {/* <View style={styles.container}>
                      <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold",color:"blue"}}>{item.authorName}</Text>
                          <Text>{item.phone}</Text>
                            
                      </View>
                      <View style={styles.namephone}>
                          
                          <Text>{item.borrow}</Text>
                      </View>
                      <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold"}}>{item.status}</Text>
                      </View>
                      <View style={styles.namephone}>
                          <Text>Hôm Nay</Text>
                      </View>
                  </View> */}
                  <View style={styles.container}>
                     <View style={{justifyContent:"space-around"}}>
                        <Text style={{fontWeight:"bold",color:"black",fontSize:20}}>{item.authorName}</Text>
                        <Text>Còn : {item.remain.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text>
                     </View>
                     <View style={{flexDirection:"row-reverse"}}>
                     <View style={styles.namephone}>
                          <Text>Hôm Nay</Text>
                      </View>
                        <View style={styles.namephone}>
                          <Text style={{fontWeight:"bold"}}>{item.status}</Text>
                         </View>
                         
                     </View>
                  </View>
                
                  
                </TouchableOpacity>
              );
        
           
        
            
    };  
    async function summit (){
       
        setModalVisible2(false)
        insertData("https://fake-rest-api-nodejsa.herokuapp.com/user",postData)
    }
    const summitdata =(name1,borrow1,address1,phone1,loandate1,numberday1,description1,ratio1,moneyaday1)=>{
        setPostData({
               id: 23 ,
               authorName: name1,
               borrow:borrow1,
               address:address1,
               phone:phone1,
               loandate:loandate1,
               numberday:numberday1,
               paymentdate:50,
               status:"Đang vay",
               remain:borrow1,
               description:description1,
               ratio:ratio1,
               moneyaday:moneyaday1
       })
    }
    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
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
                    <View style={{marginTop:60}}>
                        <Text style={styles.totallmoney}>{totalloanamount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ</Text>
                        <Text style={{color:"#fff"}}>Lãi xuất: {interestrate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        <Icon name="bitbucket" size={30} color="gray"/>
                        
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
                    <Text style={[styles.text,{fontWeight:"bold"}]}>Khách hàng: {name}</Text>
                    <TouchableOpacity onPress={()=>dialCall(phone)} >
                        <Text style={styles.text}>SĐT: {phone}</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.text}>Bát: {borrow} VNĐ (10 ăn {ratio})</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Địa chỉ:</Text>
                    <Text style={styles.text}> {address}</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Ngày nhận tiền:</Text>
                    <Text style={styles.text}> {loandate}</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Trả trong:</Text>
                    <Text style={styles.text}> {numberday} Ngày</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Trạng thái:</Text>
                    <Text style={styles.text}> {status}</Text>
                </View>
                <View style={styles.infomation}>
                    <Text style={{color:"gray"}}> Tiền 1 ngày:</Text>
                    <Text style={styles.text}> {moneyaday}</Text>
                </View>
                
                
                <Text style={styles.text}>Mô tả :</Text>
                <View style={{alignItems:"center",marginTop:8}}>
                    <View style={styles.descriptonstyle}>
                        <Text style={styles.text} >{description}</Text>
                    </View>
                </View>
                
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            >
            <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:16}}>
                <TouchableOpacity style={styles.addnew} onPress={()=>summit()}>
                    <Text style={{fontWeight:"bold"}}>OK</Text>
                </TouchableOpacity>
                
                <TextInput style={styles.input} placeholder=" Tên khách hàng" onChangeText={text => setName(text)} />
                <TextInput style={styles.input} placeholder=" Số điện thoại" onChangeText={text => setPhone(text)}/>
                <TextInput style={styles.input} placeholder=" Bát" onChangeText={text => setBorrow(text)} />
                <TextInput style={styles.input} placeholder=" Địa chỉ" onChangeText={text => setAddress(text)}/>
                <TextInput style={styles.input} placeholder=" tỷ lên /10" onChangeText={text => setRatio(text)}/>
                <TextInput style={styles.input} placeholder=" Ngày nhận tiền" onChangeText={text => setLoandate(text)}/>
                <TextInput style={styles.input} placeholder=" Trả trong" onChangeText={text => setNumberday(text)}/>
                {/* <TextInput style={styles.input} placeholder=" kỳ" onChangeText={text => setPay(text)}/> */}
                <TextInput style={styles.input} placeholder=" Tiền 1 ngày" onChangeText={text => setMoneyaday(text)}/>
                <TextInput style={styles.input} placeholder=" Mô tả" onChangeText={text => setDescription(text)}/>
                <TouchableOpacity style={styles.addnew} onPress={()=>summitdata(name,borrow,address,phone,loandate,numberday,description,ratio,moneyaday)}>
                    <Text style={{fontWeight:"bold"}}>Thêm</Text>
                </TouchableOpacity>
                
                
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
    height:80,
    flexDirection:"row",
    paddingHorizontal:8,
    alignItems:"center",
    justifyContent:"space-between"
  },
  namephone:{
      borderLeftWidth:0.5,
      borderLeftColor:'#bdc3c7',
      width:"30%",
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
        height:"30%",
        backgroundColor:"#212330",
        
        paddingHorizontal:8,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4
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
    input:{
        width:"100%",
        height:"8%",
        borderColor:"#d2dae2",
        borderWidth:1,
        justifyContent:"center",
        marginTop:8,
        paddingHorizontal:8
    }
});

