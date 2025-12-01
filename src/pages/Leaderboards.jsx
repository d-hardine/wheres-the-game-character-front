import { useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import '../index.css'
import { useEffect, useState } from "react"
import axios from "axios"

const Leaderboards = () => {
    const [leaderboard, setLeaderBoard] = useState(null)

    const pageParams = useParams()

    //time formatting
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(totalSeconds/ 60)
        const seconds = totalSeconds % 60
        const centiseconds = Math.floor((milliseconds % 1000) / 10)

        return (
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}:` +
            `${centiseconds.toString().padStart(2, '0')}`
        )
    }

    useEffect(() => {
        const fetchLeaderBoards = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leaderboards/${pageParams.consoleName}`)
                setLeaderBoard(response.data)
            } catch (err) {
                console.error('Error fetching leaderboards:', err)
            }
        }

        fetchLeaderBoards()
    }, [])

    if(!leaderboard) return <div>LOADING</div>
    else return (
        <>
            <h1 className="text-uppercase text-center custom-text p-3">{pageParams.consoleName} LEADERBOARD</h1>
            <Table className="custom-text" striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{formatTime(item.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Leaderboards