import './App.scss';
import Spreadsheet from "./components/Spreadsheet";
import InputsBox from "./components/Auth";
import {useSelector} from "react-redux";
import Header from "./components/Header";

function App() {

    const {isData, matrix} = useSelector(({matrixData}) => {
        return {
            isData: matrixData.isData,
            matrix: matrixData.matrix,
        }
    })

    return (
        <div className="App">
            <Header/>
            {matrix.length === 0 && <InputsBox/>}
            {isData && matrix.length > 0 && <Spreadsheet />}
        </div>
    );
}

export default App;
