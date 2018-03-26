import React from 'react';

const Pad = (props) => (
    <div 
        className={"pad " + (props.state === 1 ? 'active' : '') + (props.pos === props.id ? ' playing' : '')}
        onClick={() => props.toggleActive(props.rowIndex, props.id)}>
    </div>
);

export default Pad;