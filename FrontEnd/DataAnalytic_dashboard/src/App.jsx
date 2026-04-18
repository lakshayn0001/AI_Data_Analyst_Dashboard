import { useState, useEffect, useRef } from 'react'
import ChartView from './Components/Chartview.jsx'
import axios from 'axios'

function App() {


  const [sessionID, setSessionID] = useState(() => {
    return localStorage.getItem("sessionID") || null
  })

  const [active, setActive] = useState(false)
  const [file, setFile] = useState({
    file: null,
    input: ""
  })
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  const handleAttachment = (e) => {
    const files = e.target.files[0];
    if (files != null) {
      setFile((prev) => ({
        ...prev,
        file: files
      }))
      setActive(true)
    }
  }

  const handleInput = (e) => {
    const input = e.target.value;
    setFile((prev) => ({
      ...prev,
      input: input
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(file.input.trim())) {
      alert("Please Enter the input")
      return
    }

    setMessage((prev) => [
      ...prev,
      {
        name: "user",
        message: file.input
      }
    ])

    const formData = new FormData()
    formData.append("file", file.file)
    formData.append("question", file.input)

    try {
      setLoading(true)

      let currentSessionId = sessionID

      if (!currentSessionId) {
        const res = await axios.post(
          'http://localhost:8000/api/file/fileUpload',
          formData
        )

        currentSessionId = res.data.sessionId

     
        localStorage.setItem("sessionID", currentSessionId)

        setSessionID(currentSessionId)
      }

      const queryRes = await axios.post(
        'http://localhost:8000/api/file/query',
        {
          sessionId: currentSessionId,
          question: file.input
        }
      )

      setMessage((prev) => [
        ...prev,
        {
          name: "AI",
          message: queryRes.data.result.data
        }
      ])

      setFile((prev) => ({
        ...prev,
        input: ""
      }))

    } catch (error) {
      console.log(error)
      alert("Fail to send Data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getHistory = async () => {
      if (!sessionID) return

      try {
        const historyresp = await axios.get(
          `http://localhost:8000/api/file/history/${sessionID}`
        )

        const message = historyresp.data.flatMap((item) => [
          { name: "user", message: item.question },
          {
            name: "AI",
            message: item.result.data
          }
        ])

        setMessage(message)
      } catch (error) {
        console.log(error)
      }
    }

    getHistory()
  }, [sessionID])


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])


  const clearSession = () => {
    localStorage.removeItem("sessionID")
    setSessionID(null)
    setMessage([])
    setFile({ file: null, input: "" })
    setActive(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      <div className="w-[28%] p-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-lg font-semibold mb-4 text-white/90">History</h2>


        <button
          onClick={clearSession}
          className="px-3 py-2 bg-red-500 rounded text-sm"
        >
          New Session
        </button>
      </div>


      <div className="flex flex-col w-full">


        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col gap-3">

            {message.length === 0 ? (
              <p className="text-white/40">Start a conversation...</p>
            ) : (
              message.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[60%] ${
                    msg.name === "user"
                      ? "bg-cyan-500 self-end"
                      : "bg-white/10 self-start"
                  }`}
                >

                  {msg.name === "AI" ? (
                    Array.isArray(msg.message) ? (
                      <>
               
                        <table className="text-sm border border-white/20 rounded-lg overflow-hidden">
                          <thead className="bg-white/10">
                            <tr>
                              {Object.keys(msg.message[0]).map((key) => (
                                <th key={key} className="px-3 py-2 border border-white/10">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {msg.message.map((row, i) => (
                              <tr key={i} className="hover:bg-white/5">
                                {Object.values(row).map((val, j) => (
                                  <td key={j} className="px-3 py-2 border border-white/10">
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>

              
                        <ChartView data={msg.message} />
                      </>
                    ) : (
                      <p>{msg.message}</p>
                    )
                  ) : (
                    msg.message
                  )}

                </div>
              ))
            )}

            {loading && <p className="text-white/40">Analyzing...</p>}

            <div ref={bottomRef}></div>

          </div>
        </div>

        <div className="m-4 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3 shadow-lg">

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 w-full"
          >

            <label
              htmlFor="inputFile"
              className="p-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 cursor-pointer text-sm text-white/80"
            >
              {file.file ? file.file.name : "📎 Attachment"}
            </label>

            <input
              type="file"
              accept=".csv"
              onChange={handleAttachment}
              className="hidden"
              id="inputFile"
            />

            <input
              type="text"
              value={file.input}
              placeholder="Ask something..."
              disabled={!active}
              className={`flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-white/40 ${
                active ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onChange={handleInput}
            />

            <button
              type="submit"
              disabled={!active}
              className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 ${
                active ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
              }`}
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