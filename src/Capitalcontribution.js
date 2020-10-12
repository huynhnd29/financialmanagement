import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import {DATA} from '../data/data';
import Icon from 'react-native-vector-icons/FontAwesome';
import { interpolate } from 'react-native-reanimated';
function formatCurrency(value) {
  return value?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default function Capitalcontribution() {
  const [isLoading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [articles, setArticles] = useState([]);
  const [totalinvest, setTotalinvest] = useState(0);
  const [interestrate, setInterestrate] = useState(0);

  const [postData, setPostData] = useState({});
  const [canpush,setCanpush]=useState(false)
  const [Capital, setCapital] = useState({
    authorName: '',
    borrow: 0,
    investdate: '',
    interestrate: 0,
    description: '',
  });
  const [addCapital, setAddCapital] = useState({
    addauthorName: '',
    addborrow: 0,
    addinvestdate: '',
    addinterestrate: 0,
    adddescription: '',
  });
  useEffect(() => {
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
        let totall = 0;
        for (var i = 0; i < jsonData.length; i++) {
          totall += jsonData[i]['borrow'];
        }
        let totallmoney = 0;
        for (var i = 0; i < jsonData.length; i++) {
          totallmoney += jsonData[i]['interestrate'];
        }
        setTotalinvest(totall);
        setInterestrate(totallmoney);
      } catch (e) {
        console.log(e);
      }
    }
    getdata();
    console.log('get News');
  }, []);
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
  const Caipitalinformation = (
    authorName,
    borrow,
    investdate,
    interestrate,
    description,
  ) => {
    setCapital({
      authorName: authorName,
      borrow: borrow,
      investdate: investdate,
      interestrate: interestrate,
      description: description,
    });
    setModalVisible(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Caipitalinformation(
            item.authorName,
            item.borrow,
            item.investdate,
            item.interestrate,
            item.description,
          )
        }>
        <View style={styles.container}>
          <View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20}}>
              {item.authorName}
            </Text>
            <Text>
              Tiền đầu tư :{' '}
              {item.borrow.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
              VNĐ
            </Text>
            <Text>
              Lãi suất :{' '}
              {item.interestrate
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
              VNĐ
            </Text>
          </View>
          <View>
            <Text>Ngày đầu tư</Text>
            <Text>{item.investdate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  async function summit (){
    if(canpush===true){
     setModalVisible2(false)
     insertData("https://fake-rest-api-nodejsa.herokuapp.com/Capitalcontribution",postData)
     setCanpush(false)
    }else{
     
     setModalVisible2(false)
    }
     
     
 }
  const summitdata = () => {
    if( addCapital.addauthorName=="" || addCapital.addborrow == 0 || addCapital.addinvestdate==""|| addCapital.addinterestrate==0||addCapital.adddescription==""){
      Alert.alert("Thiếu dữ liệu")
    }else{
      setPostData({
        authorName: addCapital.addauthorName,
        borrow: addCapital.addborrow,
        investdate: addCapital.addinvestdate,
        interestrate: addCapital.addinterestrate,
        description: addCapital.adddescription
    })
    setCanpush(true)
    Alert.alert("thêm thành công")
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.addnew}
            onPress={() => setModalVisible2(true)}>
            <Text style={{fontWeight: 'bold'}}>Thêm mới</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputsearch}
              placeholder="Tên khách hàng"
            />
            <TouchableOpacity style={styles.search}>
              <Text style={{fontWeight: 'bold'}}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{color: '#fff', fontSize: 16}}>Góp vốn</Text>
          <Text style={styles.totallmoney}>
            {totalinvest.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
            VNĐ
          </Text>
          <Text style={{color: '#fff'}}>
            Lãi xuất:{' '}
            {interestrate.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
          </Text>
          <Icon name="diamond" size={30} color="gray" />
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
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 16}}>
          <TouchableOpacity
            style={styles.addnew}
            onPress={() => setModalVisible(false)}>
            <Text style={{fontWeight: 'bold'}}>OK</Text>
          </TouchableOpacity>

          <View style={styles.headermodal}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 24}]}>
              {Capital.authorName}
            </Text>
            <Text style={styles.text}>
              {' '}
              {formatCurrency(Capital.borrow)} VNĐ
            </Text>
          </View>
          <View style={styles.infomation}>
            <Text style={{color: 'gray'}}> Ngày đầu tư:</Text>
            <Text style={styles.text}> {Capital.investdate}</Text>
          </View>
          <View style={styles.infomation}>
            <Text style={{color: 'gray'}}> Lợi nhuận dự tính:</Text>
            <Text style={styles.text}>
              {' '}
              {formatCurrency(Capital.interestrate)} VNĐ
            </Text>
          </View>
          <View style={styles.infomation}>
            <Text style={{color: 'gray'}}> Mô Tả:</Text>
            <Text style={styles.text}> {Capital.description}</Text>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 16}}>
          <TouchableOpacity
            style={styles.addnew} 
            onPress={()=>summit()}>
            <Text style={{fontWeight: 'bold'}}>OK</Text>
          </TouchableOpacity>

          
          <TextInput
            style={styles.input}
            placeholder=" Tên dự án đầu tư"
            value={addCapital.addauthorName}
            onChangeText={(text) =>
              setAddCapital({...addCapital, addauthorName: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder=" Tiền đầu tư"
            value={addCapital.addborrow}
            onChangeText={(text) =>
              setAddCapital({...addCapital, addborrow: Number(text)})
            }
          />
          <TextInput
            style={styles.input}
            placeholder=" Lợi nhuận dự tính"
            value={addCapital.addinterestrate}
            onChangeText={(text) =>
              setAddCapital({...addCapital, addinterestrate: Number(text)})
            }
          />
          <TextInput
            style={styles.input}
            placeholder=" Ngày đầu tư"
            value={addCapital.addinvestdate}
            onChangeText={(text) =>
              setAddCapital({...addCapital, addinvestdate: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder=" Mô tả"
            value={addCapital.adddescription}
            onChangeText={(text) =>
              setAddCapital({...addCapital, adddescription: text})
            }
          />
          <TouchableOpacity style={styles.addnew} onPress={()=>summitdata()}>
                    <Text style={{fontWeight:"bold"}}>Kiểm Tra </Text>
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
    width: '100%',
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: '30%',
    backgroundColor: '#212330',

    paddingHorizontal: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  totallmoney: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#fff',
  },
  addnew: {
    backgroundColor: '#81ecec',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  inputsearch: {
    width: 150,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
  },
  search: {
    backgroundColor: '#48dbfb',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  descriptonstyle: {
    width: '100%',
    height: '30%',
    borderWidth: 0.8,
    borderColor: 'gray',
    padding: 4,
  },
  headermodal: {
    marginTop: 16,
    width: '100%',
    height: '15%',
    alignItems: 'center',
    borderBottomColor: '#d2dae2',
    borderBottomWidth: 1,
  },
  infomation: {
    width: '100%',
    height: '10%',
    borderBottomColor: '#d2dae2',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  totallmoney: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#fff',
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
