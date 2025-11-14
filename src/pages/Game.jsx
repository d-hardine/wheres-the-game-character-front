import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";

function Game() {
  const [consoleImageUrl, setConsoleImageUrl] = useState('')
  const [foundCharacters, setFoundCharacters] = useState([])
  const [timer, setTimer] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const imageRef = useRef(null)
  const levelId = 'ps2'
  const pageParams = useParams()

  const [position, setPosition] = useState({x: 0, y: 0})
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}.jpeg`, {
          responseType: 'blob', //important to image
        })
        const imageBlob = URL.createObjectURL(response.data)
        setConsoleImageUrl(imageBlob)
      } catch(err) {
        console.error('Error fetching image:', err)
      }
    }

    fetchImage()
  }, [])

  const handleImageClick = async (e, selectedCharacter) => {
    e.preventDefault()
    if(isGameOver) return

    const image = imageRef.current
    const rect = image.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;
    console.log(rect.width, rect.height)

    console.log(selectedCharacter)
    try {
      const response = await axios.post('http://localhost:3000/api/verify', {
        levelId, characterName: selectedCharacter, x, y
      })
      console.log(response.data)
    } catch(err) {
      console.error(err)
    }
  }

  const handleToggle= (e) => {
    e.preventDefault()
    setPosition({x: e.pageX, y: e.pageY})
    setShow(!show)
  }

  return (
    <>      
      <div className="sticky-top" style={{backgroundColor: '#37353ecb'}}>Game Page for {pageParams.consoleName}</div>
      {consoleImageUrl && 
        <div className="image-container" onClick={handleToggle}>
          {show && (
          <Dropdown style={{position: 'absolute', top: position.y, left: position.x}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">What character is this?</Dropdown.Toggle>
            <Dropdown.Item style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, 'Yuna')}>Yuna</Dropdown.Item>
            <Dropdown.Item style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, 'James Sunderland')}>James Sunderland</Dropdown.Item>
            <Dropdown.Item style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, 'Jax and Daxter')}>Jax and Daxter</Dropdown.Item>
          </Dropdown>
          )}
          <Image ref={imageRef} style={{width: '100%'}} src={consoleImageUrl} alt={`${pageParams.consoleName}-image`} />
        </div>
      }
    </>
  );
}

export default Game;