import Button from "./components/button/Button";
import {ReactComponent as Edit} from "images/edit.svg";

const App = () => {

    return (
        <>
            <Button className={'edit'}><Edit/></Button>
            <Button className={'orangeWhite'}>New day</Button>
            <Button className={'blueWhite'}>Add new user</Button>
            <Button className={'orangeBlack'}>Save</Button>
            <Button className={'navigate'}>{'<<'}</Button>
            <Button className={'navigate'}>{'>>'}</Button>
        </>
    );
}

export default App;