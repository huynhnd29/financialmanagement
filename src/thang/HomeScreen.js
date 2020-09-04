import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-svg-charts'
export default class HomeScreen extends Component {
    render() {
        const data = [1, 20, 79]
 
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))
        return (
            <View style={homestyle.body}>
                <View style={homestyle.acc}>
                    <Image style={homestyle.avt} source={require("./img/avt.png")} />
                    <View style={homestyle.info}>
                        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Đức Huynh</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E" }}>Đâu đó, Hà Nội</Text>
                    </View>
                </View>
                <Text style={homestyle.text2}>Overview</Text>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 4, marginTop: 12 }}>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>258,850,000</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>TỔNG QUỸ TIỀN MẶT</Text>
                    </View>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>14</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>SỐ HỢP ĐỒNG ĐANG VAY</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", paddingHorizontal: 4, marginTop: 12, marginBottom: 12 }}>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>94,700,000</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>TIỀN ĐANG CHO VAY</Text>
                    </View>
                    <View style={homestyle.moneybox}>
                        <Text style={{ fontSize: 22, color: "#FFFFFF" }}>2,000,000</Text>
                        <Text style={{ fontSize: 14, color: "#7B7F9E", marginTop: 12 }}>LÃI ĐÃ THU TRONG THÁNG</Text>
                    </View>
                </View>
                <Text style={homestyle.text2}>Services</Text>
                <View style={homestyle.menu}>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem}>
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
                        <TouchableOpacity style={homestyle.menuItem}>
                            <Icon name="bitbucket" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Bát họ</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={homestyle.menuItem}>
                            <Icon name="diamond" style={homestyle.icon} />
                        </TouchableOpacity>
                        <Text style={homestyle.text3}>Góp vốn</Text>
                    </View>
                </View>
                <Text style={homestyle.text2}>Overview</Text>
                <View style={{marginTop: 14}}>
                    <PieChart style={{ height: 200, marginLeft: -200 }} data={pieData} />
                </View>
            </View>
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
        margin: 24,
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
        width: 190,
        backgroundColor: "#212330",
        borderRadius: 12,
        padding: 16,
        paddingHorizontal: 24
    }
});