import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setDataForSpreadsheet} from "../redux/reducers/matrixReducer";
import CommonButton from "./Button/CommonButton";
import Input from "./Input/Input";

const InputsBox = () => {

    const [lineAmount, setLineAmount] = useState(null)
    const [columnAmount, setColumnAmount] = useState(null)
    const [nearestValue, setNearestValue] = useState(null)

    const dispatchInputData = useDispatch()

    const onClickMatrixGeneration = () => {
        lineAmount && columnAmount && nearestValue ?
            dispatchInputData(setDataForSpreadsheet(columnAmount, lineAmount, nearestValue)) :
            alert('Введите данные')
    }

    return (
        <div className='inputBoxWrapper'>
            <Input setDataMethod={setLineAmount}>Введите количество строк</Input>
            <Input setDataMethod={setColumnAmount}>Введите количество столбцов</Input>
            <Input setDataMethod={setNearestValue}>Введите количество чисел, ближайших по значению</Input>
            <CommonButton onClickMethod={onClickMatrixGeneration}>Сгенерировать матрицу</CommonButton >
        </div>
    );
};

export default InputsBox;