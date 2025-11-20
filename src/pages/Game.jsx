import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import '../index.css'

function Game() {
  const [consoleImageUrl, setConsoleImageUrl] = useState('')
  const [foundCharacters, setFoundCharacters] = useState([])
  const [characterNames, setCharacterNames] = useState([])
  const [characterImages, setCharacterImages] = useState([])
  const [timer, setTimer] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const imageRef = useRef(null)
  const pageParams = useParams()

  //dynamic left click dropdown
  const [position, setPosition] = useState({x: 0, y: 0})
  const [showDropDown, setShow] = useState(false)

  //incorrect character/position modal
  const [showIncorrectModal, setShowIncorrectModal] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {//fetch the full 'console board' image
        const response = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}.jpeg`, {
          responseType: 'blob', //important to image
        })
        const imageBlob = URL.createObjectURL(response.data)
        setConsoleImageUrl(imageBlob)
      } catch(err) {
        console.error('Error fetching image: ', err)
      }
      try {//fetch the character's thumbnails
        const response1 = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}/character-1.jpeg`, {
          responseType: 'blob', //important to image
        })
        const response2 = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}/character-2.jpeg`, {
          responseType: 'blob', //important to image
        })
        const response3 = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}/character-3.jpeg`, {
          responseType: 'blob', //important to image
        })
        const response4 = await axios.get(`http://localhost:3000/images/${pageParams.consoleName}/character-4.jpeg`, {
          responseType: 'blob', //important to image
        })
        const imagesBlob = [
          URL.createObjectURL(response1.data),
          URL.createObjectURL(response2.data),
          URL.createObjectURL(response3.data),
          URL.createObjectURL(response4.data),
        ]
        setCharacterImages(imagesBlob) //coba nggawe map ae
      } catch(err) {
        console.error('Error fetch character thumbnail: ', err)
      }
    }

    const fetchCharacterNames = async () => {
      try {
        // fetch character names and found status
        const response = await axios.get(`http://localhost:3000/api/names/${pageParams.consoleName}`)
        setCharacterNames(response.data)
      } catch(err) {
        console.error('Error fetching character data:', err)
      }
    }

    fetchImages()
    fetchCharacterNames()
  }, [])

  //timer stuff
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        setTimer(t => t + 10);
      }, 10); //update every milliseconds
      return () => clearInterval(interval);
    }
  }, [isGameOver]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds/ 60)
    const seconds = totalSeconds % 60
    //const centiseconds = Math.floor((milliseconds % 1000) / 10)

    return (
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}` //+
      //`${centiseconds.toString().padStart(2, '0')}`
    )
  }

  const handleImageClick = async (e, selectedCharacter) => {
    e.preventDefault()
    if(isGameOver) return

    const image = imageRef.current
    const rect = image.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;

    console.log(`x: ${x}, y: ${y}`)

    try {
      const response = await axios.post('http://localhost:3000/api/verify', {
        consoleName: pageParams.consoleName, characterName: selectedCharacter, x, y
      })
      const data = response.data

      if (data.found && !foundCharacters.includes(data.characterName)) {
        setFoundCharacters([...foundCharacters, data.characterName]);
        //alert(`You found ${data.characterName}!`);

        const nextCharacterNames = characterNames.map(character => {
          if(character.name === data.characterName)
            return {...character, found: true}
          else return character
        })
        setCharacterNames(nextCharacterNames)

        if ([...foundCharacters, data.characterName].length === 4) { // Assuming 4 characters in each level
          setIsGameOver(true);
          alert(`You found all characters in ${formatTime(timer)}!`);
          // Prompt for username and submit high score
        }
      } else if (data.found) {
          alert(`You already found ${data.characterName}!`);
      } else {
          setShowIncorrectModal(true)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const handleDropDownToggle= (e) => {
    e.preventDefault()
    setPosition({x: e.pageX, y: e.pageY})
    setShow(!showDropDown)
  }

  return (
    <>      
      <Row className="justify-content-center sticky-top" style={{backgroundColor: '#37353ecb'}}>
        {characterNames && (
          characterNames.map((characterName, i) => (
            <Col key={characterName.id} className="m-auto p-3">
              <Image className={`d-block mx-auto ${characterName.found === true && 'grayscale-thumbnail'}`} src={characterImages[i]} roundedCircle fluid />
              <div className="text-center custom-text"><b>{characterName.name}</b></div>
            </Col>
          ))
        )}
        <h1 className="text-center custom-text">{formatTime(timer)}</h1>
      </Row>
      <Modal show={showIncorrectModal} onHide={() => setShowIncorrectModal(false)}>
        <Modal.Header closeButton>Wrong character/location. Try again!</Modal.Header>
      </Modal>
      {consoleImageUrl && 
        <div className="image-container" onClick={handleDropDownToggle}>
          {showDropDown && (
          <Dropdown style={{position: 'absolute', top: position.y, left: position.x}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">Who is this character?</Dropdown.Toggle>
            <Dropdown.Item className="p-2" style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, characterNames[0].name)}>{characterNames[0].name}</Dropdown.Item>
            <Dropdown.Item className="p-2" style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, characterNames[1].name)}>{characterNames[1].name}</Dropdown.Item>
            <Dropdown.Item className="p-2" style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, characterNames[2].name)}>{characterNames[2].name}</Dropdown.Item>
            <Dropdown.Item className="p-2" style={{backgroundColor: '#37353ecb'}} onClick={(e) => handleImageClick(e, characterNames[3].name)}>{characterNames[3].name}</Dropdown.Item>
          </Dropdown>
          )}
          <Image ref={imageRef} style={{width: '100%'}} src={consoleImageUrl} alt={`${pageParams.consoleName}-image`} />
        </div>
      }
    </>
  );
}

export default Game;