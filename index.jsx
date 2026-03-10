import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'
import 'web-streams-polyfill/dist/polyfill.js'
import * as CryptoJS from 'crypto-js'
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions, TextInput, Image} from 'react-native'
import React, { useEffect,useState } from 'react'
import * as Crypto from 'expo-crypto';
import AWS from 'aws-sdk'
import * as Speech from 'expo-speech'
import spagent from '../assets/spagent.png'


import sound from '../assets/sound.png'
import soundsstop from '../assets/stopstop-sound.png'
import {
    BedrockRuntimeClient,
    ConversationRole,
    ConverseCommand,
  } from "@aws-sdk/client-bedrock-runtime";

  var clresponse = new BedrockRuntimeClient();
  var request 
  var request1
 var reg = "us-east-1"
var op1 = 0
var op2 = 1
var spopa = 0
var spopa1 = 1
var opsnd = 1
var butit = "Press me"
var sptext1 = "Hello and welcome to Space chunks. I am a space agent, and I say a space related fact or answer your question. I also give you a space related math problem when you press the button without asking a question. When ready press the button."
var d =  new Date()
var inputText = ""
var textkey = ""
var textkey1 = ""
var ln = "____________________________________"

var spimgpt = ["https://apod.nasa.gov/apod/image/2602/greencompany_rive_960.jpg", "https://apod.nasa.gov/apod/image/2602/Miranda_Voyager2Zelario12_960.jpg","https://apod.nasa.gov/apod/image/2602/Sunspot4366_Korona_960.jpg","https://apod.nasa.gov/apod/image/2602/PIA20522enceladusC.jpg",

  "https://apod.nasa.gov/apod/image/2602/CasA_nircam_1024.jpg","https://apod.nasa.gov/apod/image/2602/ngc-1275-perseus-cluster1024.jpg","https://apod.nasa.gov/apod/image/2602/NGC1512_stern_960.jpg",
  	"https://apod.nasa.gov/apod/image/2602/RedSpider_Webb_960.jpg",	"https://apod.nasa.gov/apod/image/2602/RunningMan_Lyons_960.jpg","https://apod.nasa.gov/apod/image/2602/MarsHappyFace_mgs_960.jpg",
    	"https://apod.nasa.gov/apod/image/2601/art001e000672-orig1024c.jpg",	"https://apod.nasa.gov/apod/image/2601/NGC1333_Robert_Eder1024.jpg","https://apod.nasa.gov/apod/image/2601/NGC-2442-rev-1-crop-18-Jan-2026_1024.jpg",
      	"https://apod.nasa.gov/apod/image/2601/M78Red_McCauley_1080.jpg",	"https://apod.nasa.gov/apod/image/2601/OrionTatras_Bubak_960.jpg"
]
const rint = Math.floor(Math.random() * 15);
var enurl = spimgpt[rint];
const index =  () => {
  
  var [spimt, funcspimt] = useState("")
  // var [spimg,funcspimg] = useState(require('../assets/spagent.png'))
  var [spimg,funcspimg] = useState(spimgpt[0])
  var sd = [sound,soundsstop]
  var [sptect,usesptect] = useState("")
  var [sptext,funcsptext] = useState(sptext1)
  var [img,funcimg] = useState(sd[1])
   var [usrinp,spusrinp] = useState("")
const modelId= "amazon.nova-lite-v1:0"
   if ((usrinp) == "")
   {
   inputText = "You are a space assistant that provides space facts from the past two years. You are warm, professional, and helpful who can converse in fluid and conversational English and sound human. "  +
    "Give a Space fact with date from NASA APOD in two to three sentences from the last two years from Today's date. Set Today's date as " + d.toString() + " with no pleasentries and minimal special characters. Include a heading 'Space Fact' and in the next line provide the fact. " + 
    "Provide the fact, description, and  the problem in an engaging manner. " +
    "Get any valid image url from the source " + spimgpt + " by reading the url meta data and store the image url in the variable" + enurl + ". The contents in the image url must match or closely resemble the fact. " +
   // "Include the image url starting with '[Image URL] - ('  and then specify the image url and end with ')'" +
    "Show todays date with just the month, day, and year at the top, and then show the fact in the next line with no special characters. From todays date use the data from the last 700 days to get a fact. Avoid formatted list or numbering and keep your output as a spoken transcript. " +
    "In the next line state a high school math problem based on the Space fact with no special characters. Include a heading 'Math Problem' and in the next line provide the problem. " +
   "Provide a detailed explanation of the problem in the next line with no special characters. Include a heading 'Solution' and in the next line provide the solution. " + "Only the image url can include special characters."
}
else{
  inputText = "You are a space assistant that provides space facts from the past two years. You are warm, professional, and helpful who can converse in fluid and conversational English and sound human. "  +
  "Answer user related question " +  usrinp + " and provide a relavent answer. If the question is about Space, then get the relevant answer from NASA's APOD in two to three sentences. Get the space related answers from the last two years from Today's date. " +  
  "Set Today's date as " + d.toString() + " with no pleasentries and minimal special characters. Include a related heading  and in the next line provide the answer." + 
  "Provide the answer in an engaging manner. " +
  "If the user's query is not related to space, math, or science homework or concept, politely decline and say 'You can only engage in Space and/or related topics to science and math'. Do not include any headings or subheadings. " +
   + "If the user asks for a space related joke then tell the joke without any headings or subheadings. " +
  "Get any valid image url from the source " + spimgpt + " by reading the url meta data and store the image url in the variable" + enurl + ". The contents in the image url must match the fact or topic. " +
 // "Include the image url starting with '[Image URL] - ('  and then specify the image url and end with ')'" +
  "Show todays date with just the month, day, and year at the top, and then show your response in the next line with no special characters. " +
  "For simple and related questions give the answer directly. For subjective matters and comparisons explain your thought process step-by-step ." +
  "When faced with complex questions or problem, explain your reasoning by thinking through the steps systematically before providing an answer. , and summarize your decissionat the end by providing a detailed but short explanation to the user's problem in the next line with no special characters. Include a heading 'Solution' and in the next line provide the solution. "
   
  
 }
 const reasoningConfig = {
  type: "enabled",
  maxReasoningEffort: "medium"
}
  const tool_config = {
  "tools": [{
    "systemTool": {
      "name":"nova_code_interpreter"
    }
  }]
  }
var message = {
  content: [{ text: inputText }],
  role: ConversationRole.USER,

};
  // const setdate = () => {
   
 // }
  const spaceintro = () => {
    Speech.speak(sptext)
  }

  const spinit = async () => {
     /********************Date */
     Speech.stop()
     console.log("Today's date is ",d.toString())
     const dd = d.getDate()
     const mm = d.getMonth()
     const yy = d.getFullYear()
     const ndate = mm + "-" + dd + "-" + yy
     console.
     log("Today's date is ",ndate)
  }
  
    const executeAgent = async () => {
     
     
      if (butit == "Press me") {
        Speech.stop()
        spopa = 1
        spopa1 = 0
      op1 = 1
      opsnd = 1
      funcimg(sd[1])
    butit = "Stop"
    /********************************** */
      //*****Lambda Function to get the URL ******* */
      await fetch('https://1bt5fijq3b.execute-api.us-east-1.amazonaws.com/default/text-bedrock').then((response) => response.json())
      .then (async (data) =>  {
    const decrypt1 = data[0]
    const decrypt2 = data[1]
     const decrypted = CryptoJS.AES.decrypt(decrypt1,"",{});
     const decrypted1 = CryptoJS.AES.decrypt(decrypt2,"",{});
 
           textkey =  decrypted.toString(CryptoJS.enc.Utf8)
           textkey1 =  decrypted1.toString(CryptoJS.enc.Utf8)

     });
   
     if (textkey == null)
     {
         Console.log("text key error")
     }
    
    clresponse = new BedrockRuntimeClient({
       region:reg,
       read_timeout:3600,
       credentials: new AWS.Credentials({
        accessKeyId: textkey,
        secretAccessKey: textkey1
     })
      
     }
   )

   
   spusrinp("")
  //******************************* */ 
  
  try {
   request = {
    modelId,
    reasoningConfig,
    messages: [
      message],
    image: {
      format:"png"
    },
    inferenceConfig: {
      maxTokens: 2000, // The maximum response length
      temperature: 0.5, // Using temperature for randomness control
      //topP: 0.9,        // Alternative: use topP instead of temperature
    },
    
  };
  const response =  await clresponse.send(

  new ConverseCommand(request  , {
   tool_config
  
  }
),
 spusrinp(usrinp="")
 )
 //console.log("response..................",response.output.message)
 try {
  
    console.log("inside..................",inputText)
   
   // console.log("inside...image...............",response.output.message.content[1])
  // usesptect(response.output.message.content[0].text)
 
   funcsptext(sptext =  response.output.message.content[0].text   + ". Press 'Next fact and Question' or enter your question to continue"  )
   

  // console.log("spimg...............",spimg)
  Speech.speak(sptext)

  funcsptext(sptext = sptext + '\n' + ln)

  } catch (error) {
    console.error("The error in response ================= ",error);
 // throw error;
  }
} catch (error)
{
  console.log("Error in request ========================",error)
}

//const betext = sptext.indexOf("[Image URL]:(https://")
//const entext = sptext.indexOf("')")
//const enurl1 = sptext.substring(betext,entext)
//console.log("inside...url...............",enurl1)
//const betext1 = enurl1.indexOf("https://")
//const enurl = enurl1.substring(betext1,entext)
//console.log("inside...url...............",betext)
   
  
   console.log("inside...image...............",enurl)
  funcspimg(spimg = enurl)
  console.log("the image spimg",spimg)
      } // if buttit

      else
      {
        funcsptext(sptext = "Good Bye")
        Speech.stop()
        op1 = 0
       // op2 = 0
       funcsptext(sptext= "To start again, press the button below.")
       usesptect(sptect="")
       butit = "Press me"
        spopa = 0
        spopa1 = 1
        opsnd = 0
      }
    
} 

const keyboardtap = async () => {
 Speech.stop()
 spopa = 1
 spopa1 = 0
  op1 = 1
  message = {
    content: [{ text: inputText }],
    role: ConversationRole.USER,
  
  };
 console.log("The message is ................",message)

 try {
  request1 = {
   modelId,
   reasoningConfig,
   messages: [
    message],
   image: {
     format:"png"
   },
   inferenceConfig: {
     maxTokens: 500, // The maximum response length
     temperature: 0.5, // Using temperature for randomness control
     //topP: 0.9,        // Alternative: use topP instead of temperature
   },
   

 };
 
  const response1 =  await clresponse.send(
   
    new ConverseCommand(request1, {
      tool_config,
      messages: {
             content: message,
         }
        }
    ),
  
   )
   console.log("response1..................",response1)
   try {
      console.log("inside1..................",response1.output.message.content[0].text)
     funcspimt(spimt = response1.output.message.content[0].text )
     if (img == sd[1])
     {
      Speech.speak(spimt +  " Press 'Next fact and Question' to continue")
     }
     // const betext = spimt.indexOf("https://")
   // const entext = spimt.indexOf("')")
   // const enurl = spimt.substring(betext,entext)
   console.log("inside...image...............",enurl)
   funcspimg(spimg = enurl)
     usesptect(sptect = sptect + response1.output.message.content[0].text  + ". Press 'Next fact and Question' or enter your question to continue" + '\n' + ln + '\n')
   // funcsptext(sptext =  response.output.message.content[0].text + "Press any key to continue")
   
   spusrinp("")
   console.log("spimg...............",spimg)
   
    } catch (error) {
      console.error("The error in response1 ================= ",error);
   // throw error;
    }
 
  } catch (error)
  {
    console.log("Error in request1 ========================",error)
  }
  }


const soundstop = () => {
  if (img == sd[1])
  {
  Speech.stop()
 funcimg(sd[0])

}
else if (sptext == sptext1)
{
Speech.speak("Press the button")
funcimg(sd[1])
}
else
{
  console.log(spimt)
  Speech.speak(spimt)
  funcimg(sd[1])
}


}
  return (
    <>
   <Image style={{position:'absolute',width:Dimensions.get('window').width,height:Dimensions.get('window').height,objectFit:'fill',opacity:0.4}} source={{uri:spimg}} />
    <View style={{flexDirection:'row', justifyContent:'space-evenly',alignItems:'center',marginTop:'25',width:Dimensions.get('window').width - 10}} onLayout={spinit}>
    <TouchableOpacity onPress={soundstop}>
     <Image style={{width:75,height:75,opacity:opsnd}} source={img} />
    
     </TouchableOpacity>
      <Text style={[styles.sptexttit,{padding:10}]} onLayout={spaceintro}>Space Chunks</Text>
    
     <Image style={{width:50,height:50,opacity:spopa}} source={spagent} />
     </View>
     <View style={{flex:1,paddingBottom:50}}>
    
     <ScrollView >
     
      <View style={{alignItems:'center',justifyContent:'space-around', width: Dimensions.get('window').width - 20,padding:10}}>
     
      <Text style={[styles.sptext,{padding:10}]}>{sptext}</Text>
      <Image style={[styles.imgtransf,{width:70,height:70,opacity:spopa1,objectFit:'fill'}]} source={spagent} />
     
       </View>  
      
     <View style={{alignItems:'center', width: Dimensions.get('window').width - 20, justifyContent:'space-around',padding:10, paddingBottom:25}}>
     <Text style={[styles.sptext,{padding:10}]}>{sptect}
     </Text>
     <Text style={[styles.sptext,{opacity:op1}]}>Enter Text</Text>
      <TextInput  style={[styles.sptextin,{marginLeft:20, backgroundColor:'#76D6FF', opacity:op1}]}  onChangeText={spusrinp} autoCorrect={false} onSubmitEditing={keyboardtap} numberOfLines={undefined}/>
      <Text style={[styles.sptext,{padding:10, opacity:op1}]} onPress={keyboardtap} >Next fact and Question</Text>
      <Button style={{padding:10, opacity:op2}} title={butit} onPress={executeAgent}/>
      
      </View>
      </ScrollView>
      </View>
     
     
      </> 
  
  )
}

export default index

const styles = StyleSheet.create({
  imgtransf: {
   transforms: {
    transform: [{ translateX: 50 }, { rotate: '45deg' }],
  },
  },
  sptexttit: {
    fontFamily:'Space Mono',
    fontSize :23,
    fontWeight:'bold',
    color:'blue'
    
  },
  sptext: {
    fontFamily:'Space Mono',
    fontSize :20,
    fontWeight:'bold'
   
  },
  sptextin: {
    fontFamily:'Space Mono',
    fontSize :18,
    fontWeight:'bold',
    color:'black',
    width:Dimensions.get('window').width,
    height:50,
    padding:10
   
  }
})