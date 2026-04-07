import { useState ,useEffect} from 'react'




function App() {
const [active,setActive]=useState(false)
const [got, setGot] = useState(true)

useEffect(()=>{
  setTimeout(()=>{
    if(got === true){
      setActive(true)
      alert("Please find the desiger data")
    }
    else{
      alert("Please enter the valid file")
    }
  },[3000])
},[])

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Sidebar */}
      <div className="w-[28%] p-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-lg font-semibold mb-4 text-white/90">History</h2>
        <p className="text-white/40 text-sm">No chats yet</p>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col w-full">
        
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-white/40">Start a conversation...</p>
        </div>

        {/* Input Area */}
        <div className="m-4 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3 shadow-lg">
          
          {/* Glass Attachment Button */}
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
            📎
          </button>

          <input
            type="text"
            placeholder="Ask something..."
            disabled={!active}
            className={`flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-white/40 
            ${ active ? "hover:opacity-90" : "opacity-50 cursor-not-allowed" }
            `}
            
          />


          <button 
          disabled={!active}
          className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 
          ${ active ? "hover:opacity-90" : "opacity-50 cursor-not-allowed" }`}>
            Send
          </button>

        </div>
      </div>
    </div>
  )
}

export default App