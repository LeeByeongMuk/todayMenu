import React from 'react';

import MapSearch from '../components/map/MapSearch.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <MapSearch />
            </React.Fragment>
        )
    }
}

export default Home;
