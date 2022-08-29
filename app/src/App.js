import './App.sass'
import {Modal} from "components/modal";
import {Leaders} from "components/leaders";
import {Board} from "components/board";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setDayTC} from "./redux/thunkCreators";

const App = () => {

    const state = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDayTC())
    }, [])

    if (state.days === null) {
        return null
    }

    return (
        <div className='app'>
            <Modal modal={state.modal}/>
            <Leaders leaders={state.leaders}/>
            <Board
                day={state.days[state.currentDayIndex]}
                currentDayIndex={state.currentDayIndex}
                daysCount={state.days.length}
                isLoaded={state.isLoaded}
            />
        </div>
    );
}

export default App;