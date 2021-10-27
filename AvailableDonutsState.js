import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AvailableDonutsContext from './AvailableDonutsContext';
import DataHandler from './DataHandler';
import defaultDonuts from './defaultDonuts.json';
import { v4 as uuidv4 } from 'uuid';


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
  

const addKey = (donut) => ({...donut, key: uuidv4()});
const ITEMS = 'ITEMS';

const AvailableDonutsState = (props) => {
  const [selectedDonuts, setSelectedDonuts] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const setSelectedItems = async (items) => {
    await DataHandler.setData(ITEMS, items);
    setSelectedDonuts(items);
  }

  const getSelectedItems = async () => {
    const storedItems = await DataHandler.getData(ITEMS);
    
    setSelectedDonuts(storedItems);
  }

  const getDefaultItems = () => {
    setSelectedItems(defaultDonuts.map(addKey));
  }
  
  useEffect(() => {
    getSelectedItems();
  }, []);

  return(
    <AvailableDonutsContext.Provider value={{
      selectedDonuts,
      setSelectedItems,
      getDefaultItems,
      styles,
      quantity,
      setQuantity,
    }}>
        {props.children}
    </AvailableDonutsContext.Provider>  
  );
}

export default AvailableDonutsState;