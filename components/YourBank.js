import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default class YourBank extends React.Component {
  
  render() {
    return(
      <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 380}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', padding: 10,minWidth:150, backgroundColor: '#3E3974',marginVertical: 5, justifyContent: 'space-evenly',alignSelf: 'flex-start'}}>
              

              <TouchableOpacity onPress={()=>{this.props.press()}} style={{backgroundColor: '#E6BE4B',width: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="add-outline" size={30} color="#3E3974" />
              </TouchableOpacity>
              <Text style={{textAlign: 'center',textAlignVertical: 'center',color: "#FFFEFE", fontWeight: 'bold',fontSize: 16, marginLeft: 2}}>
                  ${(+this.props.balance).toFixed(2)}
              </Text>
          
          

          </View>
        </View>
        
        
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
          {(this.props.yourBet&&this.props.winnings===0) && (
            <Text style={{fontSize: 18, fontWeight: 'bold',color: "#FFFEFE"}}>
              {`Bet: $${this.props.yourBet}`}
            </Text>
          )}
          {(this.props.winnings>0) && (
            <Text style={{fontSize: 18, fontWeight: 'bold',color: "#5AA457"}}>
              {`Won: $${this.props.winnings.toFixed(2)}`}
            </Text>
          )}
       
         
        </View>
    </View>
    )
  
  }}