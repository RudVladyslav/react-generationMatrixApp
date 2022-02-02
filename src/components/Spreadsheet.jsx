import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAddLine, setChangeAmount, setDeleteLine} from "../redux/reducers/matrixReducer";
import CommonButton from "./Button/CommonButton";


const Spreadsheet = () => {
    const { matrix, lineAmount, columnAmount, nearestValue} = useSelector(({matrixData}) => {
        return {
            matrix: matrixData.matrix,
            lineAmount: matrixData.lineAmount,
            columnAmount: matrixData.columnAmount,
            nearestValue: matrixData.nearestValue
        }
    })


    const [numbers, setNumbers] = useState([])
    const [lineSum, setLineSum] = useState([])
    const [columnAverageAmount, setColumnAverageAmount] = useState([])
    const [currentActiveNumber, setCurrentActiveNumber] = useState([])

    const [onEnterSum, setOnEnterSum] = useState(null)
    const [percentArr, setPercentArr] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setNumbers(matrix.flat().sort((a, b) => a.randNumber - b.randNumber))
        setColumnAverageAmount(averageMethod(matrix))
        setLineSum(sumMethod(matrix))
    }, [matrix])

    const sumMethod = (matrix) => {
        const arr = []
        for (let i = 0; i < matrix.length; i++) {
            arr[i] = matrix[i].reduce(function (sum, current) {
                return sum + current.randNumber;
            }, 0)
        }
        return arr
    }

    const averageMethod = (matrix) => {
        const sortColumn = []
        for (let i = 0; i < columnAmount; i++) {
            sortColumn.push(matrix.flat().filter(el => el.index === i))
        }

        const returnArr = []
        sortColumn.forEach((arr, i) => {
            const el = arr.reduce((sum, current) => sum + current.randNumber, 0)
            returnArr[i] = Math.ceil((el / lineAmount))
        })
        return returnArr
    }

    const onMouseEnterAmountHandler = (id) => {
        const currentIndex = numbers.findIndex(el => el.id === id)

        let maxNearestAmount = Math.round(nearestValue / 2)
        let minNearestAmount = nearestValue - maxNearestAmount

        const nearestValueArr = []
        while (nearestValueArr.length < nearestValue) {
            for (let i = 1; i <= minNearestAmount; i++) {
                if (numbers[currentIndex - i]) {
                    nearestValueArr.push(numbers[currentIndex - i].id)
                } else {
                    ++maxNearestAmount
                }
            }
            for (let i = 1; i <= maxNearestAmount; i++) {
                if (numbers[currentIndex + i]) {
                    nearestValueArr.push(numbers[currentIndex + i].id)
                } else {
                    ++minNearestAmount
                }
            }
        }
        setCurrentActiveNumber(nearestValueArr)
    }

    const onMouseEnterSumHandler = (index) => {
        setOnEnterSum(index)
        const percentArr = []
        if (index !== null) {
            matrix[index].forEach(el => {
                const currentElPercent = Math.round((el.randNumber / lineSum[index]) * 100)
                percentArr.push(currentElPercent)
            })
        }
        setPercentArr(percentArr)
    }

    const onClickChangeAmount = (id) => {
        dispatch(setChangeAmount(id))
    }

    const onClickDeleteLine = (index) => {
        dispatch(setDeleteLine(index))
    }

    const onClickAddLine = () => {
        dispatch(setAddLine())
    }

    return (
        <>
            <CommonButton onClickMethod={onClickAddLine}>ДОБАВИТЬ СТРОКУ</CommonButton >

            <div className='spreadsheet'>
                <div className='spreadsheet__line-wrapper'
                     onMouseLeave={() => setCurrentActiveNumber([])}>

                    {matrix.map((el, index) =>
                        <div key={`${el}_${index}`}
                             className='spreadsheet__line'>

                            {onEnterSum !== index && el.map(el =>
                                <div
                                    key={el.id}
                                    className={`spreadsheet__amount spreadsheet__amount-clear ${currentActiveNumber.includes(el.id) ? 'active' : ''}`}
                                    onClick={() => onClickChangeAmount(el.id)}
                                    onMouseEnter={(e) => onMouseEnterAmountHandler(el.id, e)}
                                >{el.randNumber}</div>)
                            }

                            {onEnterSum === index && percentArr.map((el, index) =>
                                <div
                                    key={`${el}_${index}`}
                                    className={`spreadsheet__amount spreadsheet__amount-clear ${currentActiveNumber.includes(el.id) ? 'active' : ''}`}
                                    style={{background: `linear-gradient(to top, darkred ${el}%, transparent ${el}%`}}
                                    onClick={() => onClickChangeAmount(el.id)}
                                    onMouseEnter={() => onMouseEnterAmountHandler(el.id)}
                                    onMouseLeave={() => onMouseEnterAmountHandler(null)}
                                >{el}%</div>)
                            }
                        </div>
                    )}

                    <div className='spreadsheet__average'>
                        {columnAverageAmount.map((el, index) => <div
                            className='spreadsheet__amount spreadsheet__amount-average'
                            key={`${el}_${index}`}
                        >{el}</div>)}
                    </div>
                </div>

                <div className='spreadsheet__sum-column'>
                    {lineSum.map((el, index) => <div
                            key={`${index}_${el}`}
                            className={'spreadsheet__sum-column__wrapper'}>
                            <div onMouseEnter={() => onMouseEnterSumHandler(index)}
                                 onMouseLeave={() => onMouseEnterSumHandler(null)}
                                 className='spreadsheet__amount spreadsheet__sum-amount'
                            >{el}
                            </div>
                            <button onClick={() => onClickDeleteLine(index)}>УДАЛИТЬ</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Spreadsheet;