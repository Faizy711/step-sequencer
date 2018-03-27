import React from 'react';
import Pad from './Pad';
import SampleSelector from './SampleSelector';
import DeleteBtn from './DeleteBtn'

const Pads = (props) => (
	<div className="pads">
		{props.pads.map((row, rowIndex) => {
			return (
				<div className="row" key={rowIndex}>
					<SampleSelector key={rowIndex} selectedDrums={props.selectedDrums} onSelectDrum={props.onSelectDrum} samples={() => props.createSelectItems()}/>
					{row.map((pad, index) => {
						return <Pad 
								key={index} 
								rowIndex={rowIndex} 
								id={index} 
								state={pad}
								pos={props.pos}
								toggleActive={() => props.toggleActive(rowIndex, index)} />
					})}
					<DeleteBtn rowIndex={rowIndex} clearRow={()=> props.clearRow(rowIndex)}/>
				</div>
			)
		})}
	</div>
);

export default Pads;