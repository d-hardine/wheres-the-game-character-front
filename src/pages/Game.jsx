import axios from "axios";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";

function Game() {
  const [consoleImageUrl, setConsoleImageUrl] = useState('')
  const pageParams = useParams()

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

  return (
    <>      
      <div>Game Page for {pageParams.consoleName}</div>
      {consoleImageUrl && <Image style={{width: '100%'}} src={consoleImageUrl}/>}
    </>
  );
}

export default Game;