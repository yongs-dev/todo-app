import FirstComponent, {FifthComponent} from './FirstComponent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'
import FourthComponent from './FourthComponent'
import JavaScript from './JavaScript'

export default function ImportComponent() {
    return (
        <div className="App">
            <FirstComponent />
            <SecondComponent />
            <ThirdComponent />
            <FourthComponent />
            <FifthComponent />
            <JavaScript />
        </div>
    )
}