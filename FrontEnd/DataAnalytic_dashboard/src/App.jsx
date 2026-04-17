import { useState ,useEffect} from 'react'




function App() {
const [active,setActive]=useState(false)
const [file, setFile] = useState(
  {
    file:null,
    input:""
  }
)


const handleAttachment =(e)=>{
  const files =e.target.files[0];
  if(files != null){
    setFile((prev)=>(
      {
      ...prev,
      file:files
    }
  ))
    setActive(true)
  }
}
const handleInput=(e)=>{
  
  const input= e.target.value;
  console.log(input === null)
  setFile((prev)=>({
    ...prev,
    input:input
  }))
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if(!(file.input.trim())){
    alert("Please Enter the input")
    return 
  }
  console.log("input clicked",file)

}

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
     
      <div className="w-[28%] p-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-lg font-semibold mb-4 text-white/90">History</h2>
        <p className="text-white/40 text-sm">No chats yet</p>
      </div>

    
      <div className="flex flex-col w-full">
        
      
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-white/40">Start a conversation...</p>
        </div>

       
       <div className="m-4 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3 shadow-lg">
  
  <form 
  typeof='submit'
  className="flex items-center gap-3 w-full" 
  >

    
    <label
      htmlFor="inputFile"
      className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-pointer text-sm text-white/80 whitespace-nowrap"
    >
      {file.file ? file.file.name : "📎 Attachment"}
    </label>

    <input 
      
      type="file"
      accept=".csv" 
      onChange={(e)=>{handleAttachment(e)}}
      className="hidden"
      id="inputFile" 
    /> 

    
    <input
      type="text"
      placeholder="Ask something..."
      disabled={!active}
      className={`flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-white/40 
      ${active ? "" : "opacity-50 cursor-not-allowed"}
      `}
      onChange={handleInput}
    />

    
    <button 
      type="button"
      onClick={handleSubmit}
      disabled={!active}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 
      ${active ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"}
      `}
    >
      Send
    </button>

  </form>
</div>
      </div>
    </div>
  )
}

export default App