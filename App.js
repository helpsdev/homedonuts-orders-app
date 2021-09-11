import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Modal } from 'react-native';

export default function App() {
  const [total, setTotal] = useState(0);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedDonuts, setSelectedDonuts] = useState([]);
  const [order, setOrder] = useState({});
  const [donutName, setDonutName] = useState(null);
  const [donutPrice, setDonutPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientPayment, setClientPayment] = useState(0);
  const [isCloseOrderButtonEnabled, setIsCloseOrderButtonEnabled] = useState(false);
  
  const handleAddToOrder = (donut) => {
    if (order[donut.key]) {
      order[donut.key].count += 1;
      setOrder({...order});
    }else{
      order[donut.key] = {
        name: donut.name,
        count: 1,
      }
      setOrder({...order});
    }

    setTotal(total + donut.price);
  }

  const handleRemoveFromOrder = (donut) => {
    if (order[donut.key]) {
      if (order[donut.key].count === 1) {
        delete order[donut.key];
      }else{
        order[donut.key].count -= 1;
      }
      setOrder({...order});
    }
    
    setTotal(total - donut.price);
  }

  const handleClearOrder = () => {
    setTotal(0);
    setOrder({});
  }

  const handleAddDonut = () => {
    if(selectedDonuts.some((d) => d.name === donutName)) return;

    const donut = {
      name: donutName,
      price: donutPrice,
      key: selectedDonuts.length,
    };

    setSelectedDonuts([...selectedDonuts, donut]);
    setDonutName('');
    setDonutPrice(0);
  }

  const handleRemoveDonut = (donut) => {
    setSelectedDonuts(selectedDonuts.filter((d => d.key !== donut.key)))
  }

  const handleCloseOrder = () => {
    handleClearOrder();
    setModalVisible(false);
  }

  const handlePayment = (payment) => {
    const paymentInt = +payment;
    
    setClientPayment(paymentInt);
    setIsCloseOrderButtonEnabled(paymentInt > total);
  }
  if (isHomePage) {
    return (
      <>
        <View style={styles.homePageContainer}>
          <TextInput style={styles.textInput} placeholder="Donut name" onChangeText={(name) => setDonutName(name)} value={donutName}/>
          <TextInput style={styles.textInput} placeholder="Donut price" onChangeText={(price) => setDonutPrice(+price)} keyboardType="number-pad" value={donutPrice === 0 ? '' : donutPrice.toString()} />
          <View style={{flex: 1}}>
            <Button title="Add Donut" onPress={() => handleAddDonut()}></Button>
            <Button title="Go To Orders" onPress={() => setIsHomePage(false)}></Button>
          </View>
        </View>
        <View style={{flex: 3, justifyContent: "space-between", marginTop: 20}}>
          <FlatList data={selectedDonuts}
              renderItem={({item}) => {
                return (
                  <View style={{marginHorizontal: 10}}>
                    <Button title={item.name} onPress={() => handleRemoveDonut(item)}></Button>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      </>
    );
  }else{
    return (
      <View style={styles.orderContainer}>
        {
          selectedDonuts.map((donut) => {
            return(
              <View key={donut.key} style={styles.quantityContainer}>
                <View style={{ flex: 1 }}>
                  <Button title="-" onPress={() => handleRemoveFromOrder(donut)}></Button>
                </View>
                <Text style={{ flex: 4, fontSize: 20, textAlign: "center"}}>{donut.name}</Text>
                <View style={{ flex: 1 }}>
                  <Button title="+" onPress={() => handleAddToOrder(donut)}></Button>
                </View>
              </View>
            );
          })
        }
        <Text style={{ fontSize: 20 }}>The total is: ${total}</Text>
        <Button title="Clear" onPress={() => handleClearOrder()}></Button>
        <Text style={{ fontSize: 20 }}>The order:</Text>
        <FlatList data={Object.values(order)}
          renderItem={({item}) => <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{item.name} x{item.count}</Text>} 
          keyExtractor={(item, index) => index.toString()}/>
        <View style={{marginVertical: 10}}>
          <Button title="Close Order" onPress={() => setModalVisible(true)}></Button>
        </View>
        <View>
          <Button title="Back" onPress={() => setIsHomePage(true)}></Button>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "center"}}>
            <Text style={{fontSize: 50}}>Total: ${total}</Text>
            <TextInput style={{fontSize: 50}} placeholder="Payment" onChangeText={(text) => handlePayment(text)}></TextInput>
            <Text style={{fontSize: 50}}>Change: ${clientPayment - total}</Text>
            <View>
              <Button disabled={!isCloseOrderButtonEnabled} title="OK" onPress={() => handleCloseOrder()}></Button>
            </View>
          </View>
        </Modal>
      </View>
    );  
  }
}


const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 10,
  },
  textInput:{
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 5,
  },
  orderContainer:{
    paddingTop: 25,
    flex: 1,
  },
  quantityContainer:{
    flex: 1,
    flexDirection: "row",
  },
});
