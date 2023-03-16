import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY="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"

function App() {
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I am ChatGPT',
      sender: 'ChatGPT',
    }
  ])

  const [typing, setTyping] = useState(false)

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing'
    }
  

    const newMessages = [...messages, newMessage]; // all the old messages + the new message

    // update our messages state
    setMessages(newMessages)

    // set typing indicator
    setTyping(true)

    // process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages)
  }

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = ""
      if(messageObject.sender === "ChatGPT") {
        role = "assistant"
      }
      else {
        role = "user"
      }
      return {role: role, content: messageObject.message }
    })

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 21 years old."
    }
    
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages]
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) =>{
      return data.json()
    }).then((data) => {
      setMessages(
        [...chatMessages,{
          message:data.choices[0].message.content,
          sender: "ChatGPT"
        }]
      )
      setTyping(false)
    }) 
  }

  


  return (
    <div className="App">
      <div style={{position: 'relative', height: '800px', width: '700px'}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
            scrollBehavior='smooth'
            typingIndicator={typing? <TypingIndicator content="ChatGPT is typing" />: null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App
