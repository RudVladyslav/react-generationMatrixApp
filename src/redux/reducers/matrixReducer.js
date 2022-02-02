const SET_INPUT_DATA = 'SET_INPUT_DATA'
const SET_CHANGE_AMOUNT = 'SET_CHANGE_AMOUNT'
const SET_DELETE_LINE = 'SET_DELETE_LINE'
const SET_ADD_LINE = 'SET_ADD_LINE'

const initialState = {
    isData: false,
    columnAmount: 0,
    lineAmount: 0,
    nearestValue: 0,
    matrix: [],
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom() {
    return Math.random();
}

const generateMatrix = (columnAmount, lineAmount) => {
    const arr = [];
    for (let i = 0; i < lineAmount; i++) {
        arr[i] = [];
        for (let j = 0; j < columnAmount; j++) {
            let randNumber = getRandomInt(100, 1000)
            arr[i][j] = {id: `${getRandom()}`, randNumber, index: j};
        }
    }
    return arr
}

const generateLine = (columnAmount) => {
    const arrNewLine = [];
    for (let j = 0; j < columnAmount; j++) {
        let randNumber = getRandomInt(100, 1000)
        arrNewLine[j] = {id: `${getRandom()}`, randNumber, index: j};
    }
    return arrNewLine

}


const matrixReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_DATA: {
            return {
                ...state,
                isData: true,
                columnAmount: action.columnAmount,
                lineAmount: action.lineAmount,
                nearestValue: action.nearestValue,
                matrix: generateMatrix(action.columnAmount, action.lineAmount),
            }
        }
        case SET_CHANGE_AMOUNT: {
            return {
                ...state,
                matrix: state.matrix.map(arr => arr.map(el => {
                        if (el.id === action.id) {
                            el.randNumber++
                            return el
                        }
                        return el
                    })
                )
            }
        }
        case SET_DELETE_LINE: {
            return {
                ...state,
                lineAmount: --state.lineAmount,
                matrix: state.matrix.filter((_, index) => action.index !== index)
            }
        }
        case SET_ADD_LINE: {
            return {
                ...state,
                lineAmount: ++state.lineAmount,
                matrix: [...state.matrix, generateLine(state.columnAmount)]
            }

        }
        default:
            return state
    }
}

export default matrixReducer

// ACTION CREATOR
export const setDataForSpreadsheet = (columnAmount, lineAmount, nearestValue) => ({
    type: SET_INPUT_DATA,
    columnAmount,
    lineAmount,
    nearestValue
})

export const setChangeAmount = (id) => ({type: SET_CHANGE_AMOUNT, id})

export const setDeleteLine = (index) => ({type: SET_DELETE_LINE, index})

export const setAddLine = () => ({type: SET_ADD_LINE})


