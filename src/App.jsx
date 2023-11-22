import { useState } from 'react'
import './App.css'
import FileUploadPage from './FileUploadPage'
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import Cart from './Cart'

function App() {
  const [store, setStore] = useState()
  const handleData = (store) => {
    setStore(store)
    console.log("data", store)

  }

  const value = "test1"
  return (
    <>
      {/* <p>value: {store}</p> */}
      {/* <FileUploadPage  ondata={handleData} /> */}
      {/* <FileUploadPage /> */}
      <Router>

      <Routes>
      <Route path='/file' element={<FileUploadPage />} />
      <Route path='/cart' element={<Cart />} />
      </Routes>
      </Router>


    </>
  )
}


export default App
