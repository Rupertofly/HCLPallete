import React from 'react';
import Slider from './components/Slider';
interface Props {
    n?: string;
}
const App = (props: Props) => {
    return (
        <div>
            <Slider output={(v) => console.log(v)} />
        </div>
    );
};

export default App;
