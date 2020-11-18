import React from 'react';

const Person = ({ name, bid }) => {
	return (
		<>
			<div>{`${name}: $${bid}`}</div>
		</>
	);
};

export default Person;
