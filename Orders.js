import React, { useState, useContext } from 'react';
import { Text, View, Button, FlatList, TextInput, Modal, ScrollView } from 'react-native';
import { useHistory } from "react-router-native";
import AvailableDonutsContext from './AvailableDonutsContext';

const Orders = () => {
    const { selectedDonuts, setSelectedDonuts, styles } = useContext(AvailableDonutsContext);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [clientPayment, setClientPayment] = useState(0);
    const [isCloseOrderButtonEnabled, setIsCloseOrderButtonEnabled] = useState(false);
    const history = useHistory();
    
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
      donut.tempQuantity -= 1;
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
        donut.tempQuantity += 1;
      }
    }
  
    const commitDonutQuantity = () => {
      setSelectedDonuts(selectedDonuts.map((d) => {
        d.quantity = d.tempQuantity;
        return d;
      }));
    }

    const rollbackDonutQuantity = () => {
      setSelectedDonuts(selectedDonuts.map((d) => {
        d.tempQuantity = d.quantity;
        return d;
      }));
    }

    const cleanupOrder = () => {
      setTotal(0);
      setOrder({});
      rollbackDonutQuantity();
    }
    
    const handleCloseOrder = () => {
      commitDonutQuantity();
      cleanupOrder();
      setModalVisible(false);
      setClientPayment(0);
      setIsCloseOrderButtonEnabled(false);
    }
  
    const handlePayment = (payment) => {
      const paymentInt = +payment;
      
      setClientPayment(paymentInt);
      setIsCloseOrderButtonEnabled(paymentInt >= total);
    }
    
    const handleBack = () => {
      cleanupOrder();
      history.push('/');
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
                  <Text style={{ flex: 4, fontSize: 20, textAlign: "center"}}>{`${donut.name} (${donut.tempQuantity})`}</Text>
                  <View style={{ flex: 1 }}>
                    <Button title="+" onPress={() => donut.tempQuantity > 0 && handleAddToOrder(donut)} color={donut.tempQuantity <= 0 ? "gray" : ""}></Button>
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
        <Text style={{ fontSize: 20 }}>The total is: ${total}</Text>
        <Button title="Clear" onPress={() => cleanupOrder()}></Button>
        <View style={{height: '50%'}}>
          <Text style={{ fontSize: 20 }}>Quantity: { Object.values(order).reduce((dq, donut) => dq + donut.count, 0) }</Text>
          <FlatList data={Object.values(order)}
            renderItem={({item}) => <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{item.name} x{item.count}</Text>} 
            keyExtractor={(item, index) => index.toString()}/>
          <View style={{marginVertical: 10}}>
            <Button title="Close Order" onPress={() => setModalVisible(true)}></Button>
          </View>
          <View>
            <Button title="Back" onPress={() => handleBack()}></Button>
          </View>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "center"}}>
            <Text style={{fontSize: 50}}>Total: ${total}</Text>
            <TextInput keyboardType="number-pad" style={{fontSize: 50, borderWidth: 3}} placeholder="Payment" onChangeText={(text) => handlePayment(text)}></TextInput>
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