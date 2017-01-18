import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './List';
import './styles.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {

    render() {
        return (
            <div style={{backgroundColor: '#0DCAFF'}}>
                <MuiThemeProvider>
                    <Home/>
                </MuiThemeProvider>
            </div>

        );
    }
}

export default App;
