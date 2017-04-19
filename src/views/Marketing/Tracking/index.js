/**
 * Created by lzf on 2017/4/14.
 */

import React from 'react';
import NavLink from './../../../components/NavLink';

class Tracking extends React.Component{
    render(){
        return (
            <div className="tracking">
                <div className="tracking-tabs">
                   <div className="tabs-list">
                       <ul>
                           <li><NavLink to="/marketing/tracking/_inside_Calculate">Calculate</NavLink></li>
                           <li><NavLink to="/marketing/tracking/_inside_DoubleClick">DoubleClick</NavLink></li>
                           <li><NavLink to="/marketing/tracking/_inside_Zoom">Zoom</NavLink></li>
                       </ul>
                   </div>
                    <div className="tabs-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Tracking;
