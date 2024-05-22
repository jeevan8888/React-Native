import React, { useMemo, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RadioButton } from 'react-native-paper';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import FancyTable from 'react-native-fancy-table';
// import { Table, Row, Rows, Cols } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';


const tableHead = ["Discounts", "$0-$5k", "$5-$10k", "$10k+"];
const widths = [3, 1, 1, 1]; // Width ratio for each section
// const tableData = [
//   {
//     Discounts: 'Volume',
//     prc1: '0%',
//     prc2: '5%',
//     prc3: '10%',
//     note: ''
//   },
//   {
//     Discounts: 'Discretionary',
//     prc1: '5%',
//     prc2: '5%',
//     prc3: '3%',
//     note: ''
//   },
//   {
//     Discounts: 'Totals',
//     prc1: '5%',
//     prc2: '10%',
//     prc3: '13%',
//     note: ''
//   },
// ];

const tableData = [
  ['Volume', '0%', '5%', '10%'],
  ['Discretionary', '5%', '5%', '3%'],
  ['Totals', '5%', '10%', '13%'],
]
// const volDiscountRate = ['0', '5', '10'];
// const discDiscountRate = ['5', '5', '3'];

export function CommissionCalculator(){

  const [salePrice, setSalePrice] = useState<string>('');
  const [volumeDiscountRate, setVolumeDiscountRate] = useState<string[]>(['0', '5', '10']);
  const [discretionaryDiscountRate, setDiscretionaryDiscountRate] = useState<string[]>(['5', '5', '3']);
  const [totalDiscountRate, setTotalDiscountRate] = useState<string>('');

  const [materialTotal, setMaterialTotal] = useState<string>('');
  const [laborTotal, setLaborTotal] = useState<string>('');
  const [halfLabor, setHalfLabor] = useState<string>('');

  const [parSale, setParSale] = useState<string>('');
  const [parSaleAfterVolAndDisc, setParSaleAfterVolAndDisc] = useState<string>('');
  const [parSaleVolDiscount, setParSaleVolDiscount] = useState<string[]>([]);
  const [parSaleDiscDiscount, setParSaleDiscDiscount] = useState<string[]>([]);
  const [saleLessDiscountVolOnly, setSaleLessDiscountVolOnly] = useState<string[]>([]);
  const [saleLessDiscountVolAndDisc, setSaleLessDiscountVolAndDisc] = useState<string[]>([]);
  const [actualSalePrice, setActualSalePrice] = useState<string>('');

  const [commissionRate, setCommissionRate] = useState<string>('');
  const [baseCommission, setBaseCommission] = useState<string>('20');
  const [addedCommission, setAddedCommission] = useState<string>('5');

  const [totalCommission, setTotalCommission] = useState<string>('');
  const [selectedCommission, setSelectedCommission] = useState<string>('9');

  const calculateCommission = () => {
    // Perform the commission calculation based on the input values
    // Adjust the calculation logic according to your requirements
    const calculatedTotalCommission =
      (parseFloat(baseCommission) + parseFloat(addedCommission));

      setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places
      
  };

  const calculateTotalDiscount = (sSalePrice: string) => {
    let calculatedVolumeDiscountRate = 0;
    let calculatedDicDiscountRate = 0;
    let calculatedTotalDiscountRate = 0;

    let calculatedParSaleVolDiscount = 0;
    let calculatedParSaleDiscDiscount = 0;

    let calculatedSaleLessDiscountVolOnly = 0;
    let calculatedSaleLessDiscountVolAndDisc = 0;
  
    if(parseFloat(sSalePrice) >= 0 && parseFloat(sSalePrice) < 5000) {
      calculatedVolumeDiscountRate = 0;
      calculatedDicDiscountRate = 5;
    }
    else if(parseFloat(sSalePrice) >= 5000 && parseFloat(sSalePrice) < 10000) {
      calculatedVolumeDiscountRate = 5;
      calculatedDicDiscountRate = 5;
    }
    else if(parseFloat(sSalePrice) > 10000) {
      calculatedVolumeDiscountRate = 10;
      calculatedDicDiscountRate = 3;
    }
    calculatedParSaleVolDiscount = calculatedVolumeDiscountRate * parseFloat(materialTotal)/100;
    calculatedParSaleDiscDiscount = calculatedDicDiscountRate * parseFloat(materialTotal)/100;
    calculatedSaleLessDiscountVolOnly = parseFloat(parSale) - calculatedParSaleVolDiscount;
    calculatedSaleLessDiscountVolAndDisc = parseFloat(parSale) - calculatedParSaleVolDiscount - calculatedParSaleDiscDiscount;

    

    calculatedTotalDiscountRate = calculatedVolumeDiscountRate + calculatedDicDiscountRate;
    

   // setVolumeDiscountRate(calculatedVolumeDiscountRate.toFixed(2));
   // setDiscretionaryDiscountRate(calculatedDicDiscountRate.toFixed(2));
    setTotalDiscountRate(calculatedTotalDiscountRate.toFixed(2));
    setSalePrice(sSalePrice);

    // setParSaleVolDiscount(calculatedParSaleVolDiscount.toFixed(2));
    // setParSaleDiscDiscount(calculatedParSaleDiscDiscount.toFixed(2));
    //setSaleLessDiscountVolOnly(calculatedSaleLessDiscountVolOnly.toFixed(2));
    //setSaleLessDiscountVolAndDisc(calculatedSaleLessDiscountVolAndDisc.toFixed(2));
    
  };

  const calculateHalfLabor = (sLaborTotal: string) => {
    let calculatedHalfLabor = 0;
    let calculatedParSale = 0;

    let calculatedParSaleVolDiscount = [0, 0, 0];
    let calculatedParSaleDiscDiscount = [0, 0, 0];

    let calculatedSaleLessDiscountVolOnly = [0, 0, 0];
    let calculatedSaleLessDiscountVolAndDisc = [0, 0, 0];

    let strParSaleVolDiscount = [];
    let strParSaleDiscDiscount = [];

    let strSaleLessDiscountVolOnly = [];
    let strSaleLessDiscountVolAndDisc = [];

    

    calculatedHalfLabor = parseFloat(sLaborTotal)/2;

    calculatedParSale = parseFloat(materialTotal) + parseFloat(sLaborTotal) - calculatedHalfLabor;
    
    setLaborTotal(sLaborTotal);
    setHalfLabor(calculatedHalfLabor.toFixed(2));
    setParSale(calculatedParSale.toFixed(2));
    //calculateTotalDiscount(calculatedParSale.toFixed(2));

    for(let i=0; i<3; i++){

      calculatedParSaleVolDiscount[i] = parseFloat(volumeDiscountRate[i]) * parseFloat(materialTotal)/100;
      calculatedParSaleDiscDiscount[i] = parseFloat(discretionaryDiscountRate[i]) * parseFloat(materialTotal)/100;
      calculatedSaleLessDiscountVolOnly[i] = calculatedParSale - calculatedParSaleVolDiscount[i];
      calculatedSaleLessDiscountVolAndDisc[i] = calculatedParSale - calculatedParSaleVolDiscount[i] - calculatedParSaleDiscDiscount[i];

      strParSaleVolDiscount[i] = calculatedParSaleVolDiscount[i].toFixed(2);
      strParSaleDiscDiscount[i] = calculatedParSaleDiscDiscount[i].toFixed(2);
      strSaleLessDiscountVolOnly[i] = calculatedSaleLessDiscountVolOnly[i].toFixed(2);
      strSaleLessDiscountVolAndDisc[i] = calculatedSaleLessDiscountVolAndDisc[i].toFixed(2);

    }

    setParSaleVolDiscount(strParSaleVolDiscount);
    setParSaleDiscDiscount(strParSaleDiscDiscount);
    setSaleLessDiscountVolOnly(strSaleLessDiscountVolOnly);
    setSaleLessDiscountVolAndDisc(strSaleLessDiscountVolAndDisc);


    let calculatedBaseCommission = 0;
    
    calculatedBaseCommission = calculatedParSale * parseFloat(commissionRate)/100;
    setBaseCommission(calculatedBaseCommission.toFixed(2));

    const calculatedTotalCommission = (calculatedBaseCommission + parseFloat(addedCommission));

    setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places
    
  };

  

  const calculateBaseCommission = (sCommission: string) => {
    let calculatedBaseCommission = 0;
    let sParSale = "";
    let sTmpCommission = "";
    if(parSale == "") {
      sParSale = "0";
    } else {
      sParSale = parSale;
    }

    if(sCommission == "") {
      sTmpCommission = "0";
    } else {
      sTmpCommission = sCommission;
    }
    
    calculatedBaseCommission = parseFloat(sParSale) * parseFloat(sTmpCommission)/100;
    setBaseCommission(calculatedBaseCommission.toFixed(2));

    //let calculatedAddedCommission = 0;

    //calculatedAddedCommission = (parseFloat(actualSalePrice)-parseFloat(parSaleAfterVolAndDisc))/2;
    //setAddedCommission(calculatedAddedCommission.toFixed(2));
    setCommissionRate(sCommission);

    const calculatedTotalCommission = (calculatedBaseCommission + parseFloat(addedCommission));
    setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places

    setSelectedCommission(sCommission);
  };

  const calculateAddedCommissionA = (sActualSalePrice: string) => {
    let calculatedAddedCommission = 0;
    let sParSaleAfterVolAndDisc = "";
    let sTmpActualSalePrice = "";
    if(sActualSalePrice == "") {
      sTmpActualSalePrice = "0";
    } else {
      sTmpActualSalePrice = sActualSalePrice;
    }
    if(parSaleAfterVolAndDisc =="") {
      sParSaleAfterVolAndDisc = "0";
    } else {0
      sParSaleAfterVolAndDisc = parSaleAfterVolAndDisc;
    }
    calculatedAddedCommission = (parseFloat(sTmpActualSalePrice)-parseFloat(sParSaleAfterVolAndDisc))/2;
    setAddedCommission(calculatedAddedCommission.toFixed(2));

    calculateTotalDiscount(sActualSalePrice);

    setActualSalePrice(sActualSalePrice);

    const calculatedTotalCommission = (parseFloat(baseCommission) + calculatedAddedCommission);

    setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places
  };

  const calculateAddedCommissionP = (sParSaleAfterVolAndDisc: string) => {
    let calculatedAddedCommission = 0;
    calculatedAddedCommission = (parseFloat(actualSalePrice)-parseFloat(sParSaleAfterVolAndDisc))/2;
    setAddedCommission(calculatedAddedCommission.toFixed(2));
    setParSaleAfterVolAndDisc(sParSaleAfterVolAndDisc);
    
    const calculatedTotalCommission = (parseFloat(baseCommission) + calculatedAddedCommission);

    setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places
  };

  const calculateMaterialTotal = (sMaterialTotal: string) => {
    let calculatedParSale = 0;

    let calculatedParSaleVolDiscount = [0, 0, 0];
    let calculatedParSaleDiscDiscount = [0, 0, 0];

    let calculatedSaleLessDiscountVolOnly = [0, 0, 0];
    let calculatedSaleLessDiscountVolAndDisc = [0, 0, 0];

    let strParSaleVolDiscount = [];
    let strParSaleDiscDiscount = [];

    let strSaleLessDiscountVolOnly = [];
    let strSaleLessDiscountVolAndDisc = [];

    calculatedParSale = parseFloat(sMaterialTotal) + parseFloat(laborTotal) - parseFloat(halfLabor);

    for(let i=0; i<3; i++){

      calculatedParSaleVolDiscount[i] = parseFloat(volumeDiscountRate[i]) * parseFloat(sMaterialTotal)/100;
      calculatedParSaleDiscDiscount[i] = parseFloat(discretionaryDiscountRate[i]) * parseFloat(sMaterialTotal)/100;
      calculatedSaleLessDiscountVolOnly[i] = calculatedParSale - calculatedParSaleVolDiscount[i];
      calculatedSaleLessDiscountVolAndDisc[i] = calculatedParSale - calculatedParSaleVolDiscount[i] - calculatedParSaleDiscDiscount[i];

      strParSaleVolDiscount[i] = calculatedParSaleVolDiscount[i].toFixed(2);
      strParSaleDiscDiscount[i] = calculatedParSaleDiscDiscount[i].toFixed(2);
      strSaleLessDiscountVolOnly[i] = calculatedSaleLessDiscountVolOnly[i].toFixed(2);
      strSaleLessDiscountVolAndDisc[i] = calculatedSaleLessDiscountVolAndDisc[i].toFixed(2);

    }

    setParSale(calculatedParSale.toFixed(2));
    setMaterialTotal(sMaterialTotal);

    setParSaleVolDiscount(strParSaleVolDiscount);
    setParSaleDiscDiscount(strParSaleDiscDiscount);
    setSaleLessDiscountVolOnly(strSaleLessDiscountVolOnly);
    setSaleLessDiscountVolAndDisc(strSaleLessDiscountVolAndDisc);

    let calculatedBaseCommission = 0;
    
    calculatedBaseCommission = calculatedParSale * parseFloat(commissionRate)/100;
    setBaseCommission(calculatedBaseCommission.toFixed(2));

    const calculatedTotalCommission = (calculatedBaseCommission + parseFloat(addedCommission));

    setTotalCommission(calculatedTotalCommission.toFixed(2)); // Round to 2 decimal places
    
  };
  const Drawer = createDrawerNavigator();
  return (
    
      
    <ThemedView style={styles.stepContainer}>
      <ThemedView style={styles.tablecontainer}>      
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.head}>
            <DataTable.Cell style={styles.headercell}>Discounts</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>$0-$5k</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>$5-$10k</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>$10k+</DataTable.Cell>
          </DataTable.Header>

          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent}>Volume</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>0%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>5%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>10%</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent}>Discretionary</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>5%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>5%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>3%</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent}>Total</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>10%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>10%</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>13%</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ThemedView>
      
      <ThemedView style={styles.container}>

        <ThemedText style={styles.label}>Material Total(&#36;)                   </ThemedText>

        <TextInput
          placeholder="Material Total"
          onChangeText={(text) => calculateMaterialTotal(text)}
          value={materialTotal}
          keyboardType="numeric"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Labor Total(&#36;)                       </ThemedText>
        <TextInput
          placeholder="Label Total"
          onChangeText={(text) => calculateHalfLabor(text)}
          value={laborTotal}
          keyboardType="numeric"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>50% off labor(&#36;)                    </ThemedText>
        <ThemedText style={styles.labelContent}>
          {halfLabor}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Par Sale(&#36;)                             </ThemedText>
        <ThemedText style={styles.labelContent}>
          {parSale}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Par Sale afterVol+Disc(&#36;)    </ThemedText>
        <TextInput
          placeholder="Par Sale after Vol+Disc"
          onChangeText={(text) => calculateAddedCommissionP(text)}
          value={parSaleAfterVolAndDisc}
          keyboardType="numeric"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Base Commission(&#36;)            </ThemedText>
        <ThemedText style={styles.labelContent}>
          {baseCommission}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Added Commission(&#36;)         </ThemedText>
        <ThemedText style={styles.labelContent}>
          {addedCommission}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.labelResult}>Total Commission(&#36;)            </ThemedText>
        <ThemedText style={styles.labelResultContent}>
          {totalCommission}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.labelResult}>Actual Sale Price(&#36;)             </ThemedText>
        <TextInput
          placeholder="Actual Sale Price"
          onChangeText={(text) => calculateAddedCommissionA(text)}
          value={actualSalePrice}
          keyboardType="numeric"
          style={styles.input}
        />
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Commission Rate(&#36;)            </ThemedText>
        <ThemedView style={styles.radioGroup}> 
          <ThemedView style={styles.radioButton}> 
              <RadioButton.Android 
                  value="9"
                  status={selectedCommission === '9' ?  
                          'checked' : 'unchecked'} 
                  onPress={() => calculateBaseCommission('9')} 
                  color="#007BFF"
              /> 
              <Text style={styles.radioLabel}> 
                  9% 
              </Text> 
          </ThemedView> 

          <ThemedView style={styles.radioButton}> 
              <RadioButton.Android 
                  value="10"
                  status={selectedCommission === '10' ?  
                            'checked' : 'unchecked'} 
                  onPress={() => calculateBaseCommission('10')} 
                  color="#007BFF"
              /> 
              <Text style={styles.radioLabel}> 
                  10% 
              </Text> 
          </ThemedView> 
        </ThemedView> 
      </ThemedView>

     
        
        

      <ThemedView style={styles.tablecontainer}>
        <DataTable style={styles.table1}>
          <DataTable.Header style={styles.head}>
            <DataTable.Cell style={styles.headercell01}>$0-$5k</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>$5-$10k</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>$10+</DataTable.Cell>
            <DataTable.Cell style={styles.headercell01}>Notes</DataTable.Cell>
          </DataTable.Header>

          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent01}>{parSaleVolDiscount[0]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{parSaleVolDiscount[1]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{parSaleVolDiscount[2]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}> </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent01}>{parSaleDiscDiscount[0]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{parSaleDiscDiscount[1]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{parSaleDiscDiscount[2]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}> </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row1}>
            <DataTable.Cell style={styles.headercontent04}>Select Discounted Sale Price</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolOnly[0]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolOnly[1]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolOnly[2]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>Volume</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolAndDisc[0]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolAndDisc[1]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>{saleLessDiscountVolAndDisc[2]}</DataTable.Cell>
            <DataTable.Cell style={styles.headercontent01}>Vol+Disc</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ThemedView>
    </ThemedView>
    
  );
};



const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  labelResult: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  labelContent: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  labelResultContent: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  input: {
    flex: 1,
    height: 30,
    padding: 0,
    margin: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center'
  },
  radioButtonContainer: {
    height: 40,
    width: 120,
    textAlign: 'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  head: { backgroundColor: '#99ccff', justifyContent: 'center', margin: 0, paddingLeft: 0, paddingRight: 0, color: '#FFFFFF', height: 40, fontSize:16},
  headercell: { flex:2, borderWidth: 1, borderColor:'black', justifyContent: 'center', paddingTop: 0, fontSize: 12},
  headercell01: {flex:1, borderWidth: 1, borderColor:'black', justifyContent: 'center', paddingTop: 0},
  headercontent: {flex:2, justifyContent: 'center', fontSize: 12, height: 20, padding: 0, margin: 0},
  headercontent01: {flex:1, justifyContent: 'center', fontSize: 12, height: 20, padding: 0, margin: 0},
  headercontent04: {flex:4, justifyContent: 'center', fontStyle: 'italic', fontWeight: 'bold',fontSize: 16, height: 40, paddingTop: 0, margin: 0, color: '#FFFFFF'},
  text: { textAlign: 'center' },
  row: { height: 20, minHeight:20 },
  row1: { height: 30, minHeight:30, backgroundColor: '#005580', paddingTop: 0},
  table: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 0,
    margin: 0,
    color: 'black',
    height: 120
  },
  table1: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 0,
    margin: 0,
    height: 180
  },
  tablecontainer: {
    flex: 1,
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  radioGroup: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 0, 
    borderRadius: 8, 
    backgroundColor: 'white',  
  }, 
  radioButton: { 
      flexDirection: 'row', 
      alignItems: 'center', 
  }, 
  radioLabel: { 
      marginLeft: 8, 
      fontSize: 14, 
      color: '#333', 
  }, 
});

const headercellStyle = StyleSheet.flatten([
  styles.headercell,
]);