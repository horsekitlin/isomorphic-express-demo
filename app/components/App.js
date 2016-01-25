import React from 'react';

class App extends React.Component{
    constructor(){
        super();
        this.static = {

        }
    }
    render(){
        return (
            <div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                    hello world
                </div>
                <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
