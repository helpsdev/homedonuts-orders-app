import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AvailableDonutsContext from './AvailableDonutsContext';
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

const AvailableDonutsState = (props) => {
    const [selectedDonuts, setSelectedDonuts] = useState(defaultDonuts.map(addKey));
    const [quantity, setQuantity] = useState(0);


    return(
      <AvailableDonutsContext.Provider value={{
        selectedDonuts,
        setSelectedDonuts,
        styles,
        quantity,
        setQuantity,
      }}>
          {props.children}
      </AvailableDonutsContext.Provider>  
    );
}

export default AvailableDonutsState;