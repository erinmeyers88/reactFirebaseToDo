import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from './List';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {

    render() {
        return (
            <div style={{width: '100%'}}>
                <MuiThemeProvider>
                    <List/>
                </MuiThemeProvider>
            </div>

        );
    }
}

export default App;
