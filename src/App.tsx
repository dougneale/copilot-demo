import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const splitCharsIntoArray = (str: string) => {
  return str.split('')
}

const TileWithRandomColorBlackText = ({ char }: any) => {
  const [color, setColor] = useState('#fff')
  const randomColor = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16)
    setColor('#' + random)
  }
  useEffect(() => {
    randomColor()
  }, [])
  return (
    <div
      className="pill"
      style={{ backgroundColor: color, color: '#000' }}
      onClick={randomColor} 
    >
      {char}
    </div>
  )
}

const dropdownItems = [
  'A',
  'B',
  'C',
  'D',

] 

const Dropdown = ({items} :any)=> {
  const [selected, setSelected] = useState(items[0])
  const handleChange = (e: any) => {
    setSelected(e.target.value)
  }
  return (
    <select onChange={handleChange}>
      {items.map((item: any) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}

const fetchDataFromSpotify = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
    }
  })
  const data = await response.json()
  return data
}     


// TitleWithTemperatureOfMelbourne
const TitleWithTemperatureOfMelbourne = ({ title }: any) => {
  const [temperature, setTemperature] = useState(0)
  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Melbourne&appid=b6907d289e10d714a6e88b30761fae22')
      const data = await response.json()
      setTemperature(data.main.temp)
    }
    fetchTemperature()
  }, [])
  return (
    <div>
      <h1>{title}</h1>
      <h2>{temperature}</h2>
    </div>
  )
}


const fetchListOfData = async () => {
  const response = await fetch('https://api.github.com/users/joshwcomeau/repos')
  const data = await response.json()
  return data
}

const RandomImage = () => {
  const [image, setImage] = useState('')
  useEffect(() => {
    const random = Math.floor(Math.random() * 10)
    setImage(`https://picsum.photos/200/300?random=${random}`)
  }, [])
  return (
    <img src={image} alt="random image" />
  )
}




const TextField = ({onChange, value}: any) => {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}

const Header = () => {
  return (
    <div>
      <h1>Header</h1>
    </div>
  )
}

// My IP address
const MyIPAddress = () => {
  const [ip, setIp] = useState('')
  useEffect(() => {
    const fetchMyIPAddress = async () => {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      setIp(data.ip)
    }
    fetchMyIPAddress()
  }, [])
  return (
    <div>
      <h1>My IP address is {ip}</h1>
    </div>
  )
}




const CurrentTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}

// CurrentTimeTitle
const CurrentTimeTitle = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}

// google servers status
const GoogleServersStatus = () => {
  const [status, setStatus] = useState('')
  useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetch('https://www.google.com/')
      const data = await response.text()
      setStatus(data)
    }
    fetchStatus()
  }, [])
  return (
    <div>
      <h1>{status}</h1>
    </div>
  )
}




function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('hi')
  const [data, setData] = useState([] as any[])


  useEffect(() => {
    fetchListOfData().then(data => setData(data))
  }, [])







  return (
    <div className="App">
      <header className="App-header">

        <Header />
        <CurrentTime />
        <RandomImage />
        <Dropdown items={dropdownItems} />
        <MyIPAddress />
        <TitleWithTemperatureOfMelbourne title="TitleWithTemperatureOfMelbourne" />
        <GoogleServersStatus />



        <TextField onChange={(e: any) => setInput(e.target.value)} value={input} />
        <div className='threecolumngrid'>
        {splitCharsIntoArray(input).map((char, index) => {
          return <TileWithRandomColorBlackText key={index} char={char} />
        }
        )}
        </div>
        <br />

        <div>
          {data.map((item: any, index) => {
            return <div key={index}>
              <h3>{item.name}</h3>

            </div>
          }
          )}
        </div>
      </header>
    </div>
  )
}

export default App
