import React from 'react';
import Pad from './Pad';

const Pads = (props) => (
	<div className="pads">
		{props.pads.map((row, rowIndex) => {
			return (
				<div className="row" key={rowIndex}>
					{row.map((pad, index) => {
						return <Pad 
								key={index} 
								rowIndex={rowIndex} 
								id={index} 
								state={pad}
								pos={props.pos}
								toggleActive={() => props.toggleActive(rowIndex, index)} />
					})}
				</div>
			)
		})}
	</div>
);

export default Pads;