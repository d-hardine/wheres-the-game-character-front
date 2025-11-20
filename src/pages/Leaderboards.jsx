import { useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import '../index.css'

const Leaderboards = () => {
    const pageParams = useParams()

    return (
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
                    <tr>
                        <td>1</td>
                        <td>Bob</td>
                        <td>00:23</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jeff</td>
                        <td>00:44</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Matt</td>
                        <td>00:19</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Leaderboards