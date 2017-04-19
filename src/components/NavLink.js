/**
 * Created by lay on 2017/3/22.
 */

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render() {
        return <Link {...this.props} activeClassName="active"/>
    }
})