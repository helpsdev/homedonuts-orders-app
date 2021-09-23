import React, { useState, useContext } from 'react';
import { Text, View, Button, FlatList, TextInput, Modal, ScrollView } from 'react-native';
import AvailableDonutsContext from './AvailableDonutsContext';

const Orders = ({ toggleView }) => {
    const { selectedDonuts, styles } = useContext(AvailableDonutsContext);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState({});
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
      donut.quantity -= 1;
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
        setTotal(total - donut.price);
        donut.quantity += 1;
      }
    }
  
    const handleClearOrder = () => {
      setTotal(0);
      setOrder({});
    }
    
    const handleCloseOrder = () => {
      handleClearOrder();
      setModalVisible(false);
      setClientPayment(0);
      setIsCloseOrderButtonEnabled(false);
    }
  
    const handlePayment = (payment) => {
      const paymentInt = +payment;
      
      setClientPayment(paymentInt);
      setIsCloseOrderButtonEnabled(paymentInt >= total);
    }
    
    return(
      <View style={styles.orderContainer}>
        <ScrollView style={{height: '50%'}}>
          {
            selectedDonuts.map((donut) => {
              return(
                <View key={donut.key} style={styles.quantityContainer}>
                  <View style={{ flex: 1 }}>
                    <Button title="-" onPress={() => handleRemoveFromOrder(donut) }></Button>
                  </View>
                  <Text style={{ flex: 4, fontSize: 20, textAlign: "center"}}>{`${donut.name} (${donut.quantity})`}</Text>
                  <View style={{ flex: 1 }}>
                    <Button title="+" onPress={() => donut.quantity > 0 && handleAddToOrder(donut)}></Button>
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
        <Text style={{ fontSize: 20 }}>The total is: ${total}</Text>
        <Button title="Clear" onPress={() => handleClearOrder()}></Button>
        <View style={{height: '50%'}}>
          <Text style={{ fontSize: 20 }}>Quantity: { Object.values(order).reduce((dq, donut) => dq + donut.count, 0) }</Text>
          <FlatList data={Object.values(order)}
            renderItem={({item}) => <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{item.name} x{item.count}</Text>} 
            keyExtractor={(item, index) => index.toString()}/>
          <View style={{marginVertical: 10}}>
            <Button title="Close Order" onPress={() => setModalVisible(true)}></Button>
          </View>
          <View>
            <Button title="Back" onPress={() => toggleView(true)}></Button>
          </View>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "center"}}>
            <Text style={{fontSize: 50}}>Total: ${total}</Text>
            <TextInput keyboardType="number-pad" style={{fontSize: 50}} placeholder="Payment" onChangeText={(text) => handlePayment(text)}></TextInput>
            <Text style={{fontSize: 50}}>Change: ${clientPayment - total}</Text>
            <View>
              <Button disabled={!isCloseOrderButtonEnabled} title="OK" onPress={() => handleCloseOrder()}></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  export default Orders;