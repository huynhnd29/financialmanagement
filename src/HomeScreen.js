import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-svg-charts'
function formatCurrency(value) {
   
  return value?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            articles:[],
            Totalloanamount:0,
            totalcontract:0,
            totalinterestrate:0,
            totalloan:0
        };
    }
     
    componentDidMount() {
        
        
        fetch('https://fake-rest-api-nodejsa.herokuapp.com/store')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json[0]} );
                // console.log(this.state.data);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
        fetch('https://fake-rest-api-nodejsa.herokuapp.com/user')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ articles: json });
                // console.log(this.state.data);
                let totallmoney=0;
                let contract=0;
                let  totall =0;
                for (var i=0;i<json.length;i++){
                    totallmoney +=  (json[i]["borrow"]-json[i]["borrow"]*json[i]["ratio"]/10)
                    totall +=  json[i]["borrow"]
                    contract++;
                }
                
                
                this.setState({ Totalloanamount: totallmoney });
                this.setState({ totalcontract: contract });
                this.setState({ totalloan : totall})
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
        fetch('https://fake-rest-api-nodejsa.herokuapp.com/Capitalcontribution')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ articles: json });
                // console.log(this.state.data);
                let totallmoney=0;
                for (var i=0;i<json.length;i++){
                    totallmoney +=  (json[i]["interestrate"])
               }
               this.setState({totalinterestrate: totallmoney})
                
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
            
        
    }
    render() {
        const { data } = this.state;
        const data1 = [
            {
                key: 1,
                amount: this.state.data["investmentmoney"],
                title: "Đang đầu tư",
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: this.state.totalloan ,
                title: "Đang cho vay",
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount:this.state.data["authorizedcapital"]-(this.state.data["investmentmoney"]+this.state.totalloan),
                title: "Tiền rảnh",
                svg: { fill: '#c61aff' }
            }
        ]
        const data2 = [
            {
                key: 1,
                amount: this.state.totalinterestrate,
                title: "Góp vốn",
                svg: { fill: '#c61aff' }
            },
            {
                key: 0,
                amount: 0,
                title: "Vay lãi",
                svg: { fill: '#d966ff' }
            },
            {
                key: 3,
                amount: this.state.Totalloanamount,
                title: "Bát họ",
                svg: { fill: '#ecb3ff' }
            }
        ]
        return (
            <ScrollView style={homestyle.body}>
                <View style={homestyle.acc}>
                    {/* <Image style={homestyle.avt} source={require("./img/avt.png")} /> */}
                    <View style={homestyle.info}>
                        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>{data.name}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E" }}>Đâu đó, Hà Nội</Text>
                    </View>
                </View>
                <Text style={homestyle.text2}>Overview</Text>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 4, marginTop: 12 }}>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{formatCurrency( data.authorizedcapital)}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>TỔNG QUỸ TIỀN MẶT</Text>
                    </View>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{this.state.totalcontract}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>SỐ HỢP ĐỒNG ĐANG VAY</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 4, marginTop: 12, marginBottom: 12 }}>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{formatCurrency(this.state.totalloan)}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>TIỀN ĐANG CHO VAY</Text>
                    </View>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{formatCurrency(this.state.Totalloanamount)}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>LÃI XUẤT CHO VAY</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 4, marginTop: 4, marginBottom: 12 }}>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{formatCurrency(this.state.data["loan"])}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>TIỀN ĐANG GÓP VỐN</Text>
                    </View>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>{formatCurrency(this.state.totalinterestrate)}</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>LÃI GÓP VỐN</Text>
                    </View>
                </View>
                <Text style={homestyle.text2}>Services</Text>
                <View style={homestyle.menu}>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem} >
                            <Icon name="motorcycle" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Cầm đồ</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem}>
                            <Icon name="money" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Vay lãi</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem} onPress={() =>
                                                                this.props.navigation.navigate('BorrowerScreen')
                                                            }>
                            <Icon name="bitbucket" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Bát họ</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem} onPress={() =>
                                                                this.props.navigation.navigate('Capitalcontribution')
                                                            }>
                            <Icon name="diamond" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Góp vốn</Text>
                    </View>
                </View>
                <Text style={[homestyle.text2, { marginBottom: 12 }]}>Tình trạng</Text>
                <View>
                    <PieChart
                        style={{ height: 160, marginLeft: -200, marginBottom: 16 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data1}
                        spacing={0}
                        outerRadius={'95%'}
                    />
                    <View style={{ width: 200, right: 8, height: 50, position: "absolute", marginTop: 12 }}>
                        {
                            data1.map((item) => (
                                <View style={{ flexDirection: "row", marginBottom: 8 }} key={item.key}>
                                    <Icon name="pie-chart" color={item.svg.fill} size={22} />
                                    <Text style={[homestyle.text3, { marginLeft: 4 }]}>{item.title}: </Text>
                                    <Text style={homestyle.text3}>{formatCurrency(item.amount) }</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <Text style={[homestyle.text2, { marginBottom: 12 }]}>Lợi nhuận</Text>
                <View>
                    <PieChart
                        style={{ height: 160, marginLeft: -200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data2}
                        spacing={0}
                        outerRadius={'95%'}
                    />
                    <View style={{ width: 190, right: 8, height: 50, position: "absolute", marginTop: 12 }}>
                        {
                            data2.map((item) => (
                                <View style={{ flexDirection: "row", marginBottom: 8 }} key={item.key}>
                                    <Icon name="pie-chart" color={item.svg.fill} size={22} />
                                    <Text style={[homestyle.text3, { marginLeft: 4 }]}>{item.title}: </Text>
                                    <Text style={homestyle.text3}>{formatCurrency(item.amount)}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const homestyle = StyleSheet.create({
    body: {
        backgroundColor: "#171822",
        flex: 1,
        // padding: 24,
    },
    text2: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "600",
        fontFamily: "Avenir Next",
        marginLeft: 24,
    },
    text3: {
        color: "#7B7F9E", fontSize: 16, textAlign: "center", alignSelf: "center"
    },
    menu: {
        margin: 18,
        // marginBottom: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    menuItem: {
        width: 64,
        height: 64,
        backgroundColor: "#212330",
        borderColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        borderStyle: "solid",
        borderWidth: 2,
        justifyContent: "center",
        alignContent: "center"
    },
    icon: {
        // marginLeft: 18,
        alignSelf: "center",
        fontSize: 24,
        color: "#7B7F9E"
    },
    acc: {
        width: 252,
        height: 108,
        backgroundColor: "#1B1D28",
        marginBottom: 12,
        borderBottomRightRadius: 50,
        padding: 22,
        flexDirection: "row"
    },
    avt: {
        width: 64,
        height: 64,
        // backgroundColor: "pink"
    },
    info: {
        width: "100%",
        height: 80,
        // backgroundColor: "pink",
        paddingLeft: 12,
        paddingTop: 4
    },
    moneybox: {
        //    margin: 12,
        //    height: 116,
        width: "48%",
        backgroundColor: "#212330",
        borderRadius: 12,
        padding: 16,
        paddingHorizontal: 24
    }
});