/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {  SafeAreaView, View, TouchableOpacity, Text, ScrollView,Dimensions, Modal, StatusBar } from 'react-native';
import Canvas from 'react-native-canvas';
import BetAmount from './components/BetAmount';
import PastThings from './components/PastThings';
import YourBank from './components/YourBank';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RewardedAd, RewardedAdEventType,InterstitialAd, TestIds,AdEventType } from 'react-native-google-mobile-ads';


const {width,height} = Dimensions.get('window')




const rewarded = RewardedAd.createForAdRequest("ca-app-pub-4487344159300856/1657183050",{
  requestNonPersonalizedAdsOnly: false
});


const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-4487344159300856/4474918082',{
 requestNonPersonalizedAdsOnly: false
});



let currentMultiplier=0;

function App(){

  const ref = useRef(null);
  const ref2 = useRef(null);
  

  const [pastValues,setPastValues] = useState([1.23,4.5,1.02,2.35,12.45,1.78]);
  const [betAmount, setBetAmount] = useState(1.00);
  const [bank, setBank] = useState(100.00);
  const [inGame, setInGame] = useState(false)
  const [yourBet, setyourBet] = useState(null)
  const [winnings, setWinnings] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(false);


  useEffect(() => {

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded2(true);
    });

    const unsubscribe2 = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      prepGame()
    });


    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        setLoaded(false)
        setModalVisible(false)
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();
    interstitial.load();
    

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe;
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);
 

  useEffect(() => {

    const helper = async()=>{
      try {
        const value = await AsyncStorage.getItem('BANK_VALUE')
        if(value !== null) {
          setBank(parseFloat(value))
        }else{
          await AsyncStorage.setItem('BANK_VALUE', "100")
        }
      } catch(e) {
        // error reading value
      }
    }

    helper()

    if (ref.current) {
      ref.current.width = 300;
      ref.current.height = 500;
    }
    if(ref2.current){
      ref2.current.width = 40;
      ref2.current.height = 500;
    }
    prepGame(currentMultiplier)
  }, []);

  function gernerateCrash(){
    const E = parseFloat(100);
    const rnd = Math.floor(Math.random() * Math.floor(E)) + 1;
    const H = rnd;
    let crash =0.99*E/(E-H)
    if(crash>100){
      crash=100
    }
    return crash; 
  }

  

  function prepGame(){
    setInGame(false)
    ctx = ref.current.getContext('2d')
    ctx2 = ref2.current.getContext('2d')
    ctx2.clearRect(0,0,40,500)
    startTime = 7
    animate=setInterval(()=>{
      startTime -= 0.1
      ctx.clearRect(0,0,ref.current.width,ref.current.height)
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "#FFFEFE";
      ctx.fillText("Preparing Round", ref.current.width/2-100, ref.current.height/2);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#E6BE4B";
      ctx.fillText(`Starting in ${(startTime).toFixed(1)}`, ref.current.width/2-50, ref.current.height/2+30);
      if(startTime<=0){
        ctx.clearRect(0,0,ref.current.width,ref.current.height)
        clearInterval(animate)
        startGame()
      }
    },100)
  }


  function startGame(){
    setWinnings(0)
    setInGame(true)
    ctx = ref.current.getContext('2d')
    ctx2 = ref2.current.getContext('2d')

    crash = gernerateCrash();

    holdy=500
    increment=0.5
    ctx.lineWidth=3
    currentMultiplier = 0



    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#FFFEFE";
    
    ctx2.font = "bold 12px Arial";
    ctx2.fillStyle = "#5C5D58"
    ctx2.fillText("-50x", 2, 10);
    ctx2.fillText("-25x", 2, 125);
    ctx2.fillText("-5x", 2, 250);
    ctx2.fillText("-2.5x", 2, 400);
    ctx2.fillText("-1x", 2, 492);

    ctx.strokeStyle = "#5A6983";



    animation = setInterval(()=>{
      
      ctx.beginPath()
      ctx.moveTo(-10,498)

      if(crash<=(currentMultiplier+1))
      {
       
        
        //console.log("stopped " + crash + " because of" + (currentMultiplier+1))
        clearInterval(animation)

        ctx.fillStyle = "#D71A50"
        ctx.strokeStyle = "#D71A50";

        ctx2.clearRect(0,0,40,300)

        ctx2.fillStyle = "#D71A50"

        ctx2.fillText("-50x", 2, 10);
        ctx2.fillText("-25x", 2, 125);
        ctx2.fillText("-5x", 2, 250);
        ctx2.fillText("-2.5x", 2, 400);
        ctx2.fillText("-1x", 2, 492);

        ctx.clearRect(0,0,ref.current.width,ref.current.height)  
        ctx.fillText((currentMultiplier+1).toFixed(2)+"x", 10, 35);
        ctx.quadraticCurveTo(300,500,350,holdy)
        ctx.stroke()

        shallowCopy = pastValues
        shallowCopy.shift()
        shallowCopy.push((currentMultiplier+1))
        setPastValues([...shallowCopy])


        setyourBet(null)
        

        
        if(!interstitial.loaded){
          interstitial.load()
        }

        setTimeout(()=>{
          randomNumber = Math.round(Math.random()*6);
          if(randomNumber===2){
            if(interstitial.loaded){
              interstitial.show()
            }else{
              prepGame()
            }
          }else{
            prepGame()
          }
        },2000)
      }else{
        // console.log(crash+" vs "+(currentMultiplier+1))
        holdy-=increment
      if(holdy>=0){
        currentMultiplier = (((500-holdy)/500)*4)
        increment *= 1.002
      }else{
        currentMultiplier = 3.99 + ((holdy/-500)*45)
        increment *= 1.001
      }
      // currentMultiplier = (1+ 99*(1-((holdy)/500)))
      if(holdy > -500){
        ctx.clearRect(0,0,ref.current.width,ref.current.height)  

        
        
        ctx.fillText((currentMultiplier+1).toFixed(2)+"x", 10, 35);

        ctx.quadraticCurveTo(300,500,350,holdy)
        ctx.stroke()
      }else{
        ctx.clearRect(0,0,140,100)  
        
        
        ctx.fillText((currentMultiplier+1).toFixed(2)+"x", 10, 35);
        
      }
      }


      
      
    },50)
  
    
  }

  function addBet(){
    if(betAmount<=bank-1){
     
      newBetAmount = parseFloat(+betAmount +1).toFixed(2)
      setBetAmount(newBetAmount)
    }else{
      setBetAmount(bank)
    }
  }

  function removeBet(){
    if(betAmount-1>=0){
      newBetAmount = (+betAmount -1).toFixed(2)
      setBetAmount(newBetAmount)
    }else{
      setBetAmount(0)
    }
  }

  function halfBet(){
    newBetAmount = betAmount/2
    if(newBetAmount<0.01){
      setBetAmount(0)
    }else{
      setBetAmount(newBetAmount.toFixed(2))
    }
  }

  function doubleBet(){
    newBetAmount = betAmount*2
    if(newBetAmount>=bank){
      setBetAmount(bank)
    }else{
      setBetAmount(newBetAmount.toFixed(2))
    }

  }

  function setbet(){
    setWinnings(0)
    storeBank(bank-betAmount)
    setBank(bank-betAmount)
    setyourBet(betAmount)
  }

  function cashOut(x, your){
    win = (your*x + your)
    
    newBank = (bank+win).toFixed(2)  
    setWinnings(win)
    storeBank(newBank)
    setBank(newBank)
    setyourBet(null)
    
  }

  async function storeBank(newValue){
    await AsyncStorage.setItem('BANK_VALUE', newValue.toString())
  }

  return (
    
    <SafeAreaView style={{ flex: 1,backgroundColor: '#1F2026', alignItems: 'center' }}>
      <StatusBar
      backgroundColor={"#1F2026"}>

      </StatusBar>
        <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
        >
          <View style={{flex: 1, justifyContent: 'center',alignItems: 'center',backgroundColor: "#1A1B20"}}>
              <Text style={{marginVertical: 10,fontWeight: 'bold',fontSize:28, color:"#FFFEFE",textAlignVertical: 'center'}}>- CURRENT BALANCE -</Text>
              <Text style={{marginBottom:20,fontWeight: 'bold',fontSize:28, color:"#FFFEFE",textAlignVertical: 'center'}}>${(+bank).toFixed(2)}</Text>
              <Text style={{marginVertical: 20,fontWeight: 'bold',fontSize:20, color:"#E6BE4B",textAlignVertical: 'center'}}>Watch a AD for $100 game credit ?</Text>
              <View style={{flexDirection: 'row',alignContent: 'flex-start'}}>
                <TouchableOpacity onPress={()=>{
                    if(loaded){
                      rewarded.show()
                      setBank((+bank+100).toFixed(2))
                      storeBank((+bank+100).toFixed(2))
                    }
                    if(!loaded){
                      rewarded.load()
                    }
                   
                    }} style={{backgroundColor:"#E6BE4B",width: 80, height: 80,alignItems: 'center',justifyContent: 'center',marginRight: 50}}>
                  <Text style={{textAlign: 'center', color: "#1F2026", fontWeight: 'bold', fontSize: 20}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={{backgroundColor:"#E6BE4B",width: 80,height: 80,justifyContent: 'center',alignItems: 'center',marginLeft: 50}}>
                  <Text style={{textAlign: 'center', color: "#1F2026", fontWeight: 'bold', fontSize: 20}}>No</Text>
                </TouchableOpacity>
              </View>
          </View>
          
        </Modal>
          <ScrollView>
            <YourBank press={()=>{
              if(!rewarded.loaded){
                rewarded.load()
              }             
              setModalVisible(true)}
              } balance={bank} yourBet={yourBet} winnings={winnings}></YourBank>
            <PastThings pastValues={pastValues}></PastThings>
            <View style={{flexDirection: 'row'}}>
              <Canvas style={{justifyContent: 'center', backgroundColor: '#1A1B20' }} ref={ref} />
              <Canvas style={{justifyContent: 'center', backgroundColor: '#1A1B20' }} ref={ref2} />
            </View>
          </ScrollView>
            {/* <Button title='Clear panel' onPress={()=>prepGame()}></Button> {marginBottom:height>800?30:2} */}
            <View style={{marginBottom:height>800?20:2}}>
            <BetAmount betAmount={betAmount} addBet={addBet} removeBet={removeBet} doubleBet={doubleBet} halfBet={halfBet}></BetAmount>
            
              <TouchableOpacity onPress={()=>{
                if(!yourBet && !inGame && +betAmount>0 && +bank>=+betAmount){
                  setbet()
                }
                if(yourBet && inGame){
                  cashOut(currentMultiplier, +yourBet )
                  
                }
              }} style={[(inGame||yourBet)?(inGame&&yourBet)?{backgroundColor:"#E6BE4B"}:{backgroundColor:"#9e8029"}:{backgroundColor:"#E6BE4B"} ,{marginVertical: 8,width: 340,height:40, justifyContent: 'center'}]}>
              <Text style={{textAlign: 'center', color: "#1F2026", fontWeight: 'bold', fontSize: 20}}>{inGame?(yourBet?"CASH OUT":"BETS CLOSED"):"PLACE BET"}</Text>
              </TouchableOpacity>
              </View>
    
   </SafeAreaView>
  );
}


export default App;
