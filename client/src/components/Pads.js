import React from 'react';
import Pad from './Pad';
import SampleSelector from './SampleSelector';
import DeleteBtn from './DeleteBtn'

const Pads = (props) => (
	<div className="pads">
		{props.pads.map((row, rowIndex) => {
			return (
				<div className="row" key={rowIndex}>
					<SampleSelector key={rowIndex} selectedDrum={props.selectedDrum[rowIndex]} createdDrums={props.createdDrums} onSelectDrum = {(e)=> props.onSelectDrum(e,rowIndex)} />
					<div className="sample_volume">
						<input
							type="range"
							id="volume"
							min={0.0}
							max={1.0}
							step={0.1}
							defaultValue={props.sampleVolume[rowIndex]}
							onChange={(e)=> props.changeVolume(e,rowIndex)} />
						{/* <output className="sample_output">
							{props.sampleVolume[rowIndex]}
						</output> */}
					</div>
					{row.map((pad, index) => {
						return <Pad
							key={index}
							rowIndex={rowIndex}
							id={index}
							state={pad}
							pos={props.pos}
							toggleActive={() => props.toggleActive(rowIndex, index)} 
							padNumber={index}/>
					})}
					<DeleteBtn rowIndex={rowIndex} deleteRow={() => props.deleteRow(rowIndex)} clearRow={() => props.clearRow(rowIndex)} />
				</div>
			)
		})}
	</div>
);

export default Pads;