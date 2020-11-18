import React, { useState } from 'react';

// Components
import Person from '../Person';

const Bids = () => {
	// It is used for our input which is amount
	const [bid, setBid] = useState('');

	// It is used to make update and retract button visible and invisible
	const [isBid, setIsBid] = useState(false);

	// Mockup data that I worked on
	const [bids, setBids] = useState({
		data: [
			{
				id: 263575,
				amount: 450,
				status: 'unavailable',
				created_at: '2020-09-07T12:19:53+00:00',
				driver: {
					id: 2425,
					display_name: 'VIP Pet Delivery',
					first_name: 'Rachel',
					full_name: 'Rachel Cottrell',
					profile_slug: 'vip-pet-delivery',
				},
			},
			{
				id: 263475,
				amount: 825,
				status: 'placed',
				created_at: '2020-09-07T11:36:35+00:00',
				driver: {
					id: 2925,
					display_name: 'Davidson Transport',
					first_name: 'Karen',
					full_name: 'Karen Poston',
					profile_slug: 'davidson-transport',
				},
			},
			{
				id: 263471,
				amount: 500,
				status: 'placed',
				created_at: '2020-09-07T11:33:07+00:00',
				driver: {
					id: 2162,
					display_name: 'Justin Loves Pets Transportation',
					first_name: 'Justin',
					full_name: 'Justin Parker',
					profile_slug: 'justin-loves-pets-transportation',
				},
			},
			{
				id: 263447,
				amount: 580,
				status: 'placed',
				created_at: '2020-09-07T11:18:13+00:00',
				driver: {
					id: 2349,
					display_name: 'Cjackdrives transport',
					first_name: 'Christopher',
					full_name: 'Christopher jackson',
					profile_slug: 'cjackdrives-transport',
				},
			},
			{
				id: 263392,
				amount: 300,
				status: 'unavailable',
				created_at: '2020-09-07T10:15:26+00:00',
				driver: {
					id: 2841,
					display_name: "Barry's Dogs",
					first_name: 'Barry',
					full_name: 'Barry Walinski',
					profile_slug: 'barrys-dogs',
				},
			},
			{
				id: 263391,
				amount: 583,
				status: 'placed',
				created_at: '2020-09-07T10:15:24+00:00',
				driver: {
					id: 2803,
					display_name: 'Go Fetch Pet Transport',
					first_name: 'Cristi',
					full_name: 'Cristi Ritchey',
					profile_slug: 'go-fetch-pet-transport',
				},
			},
		],
	});

	/* It handles place bid action. It, first, validates the input which is amount. After that, we
	 * convert it to Number(integer) since we are dealing with numbers. Then, we are creating our info
	 * to add the array. Then, we are also creating a temporary object by using Javascript's spread operator
	 * to make it without mutation. After that, we set the new object by using setBids (React Hooks)
	 */
	const handlePlaceBid = () => {
		if (validate(bid)) {
			const amount = Number(bid);
			const info = {
				id: 1001,
				amount,
				status: 'placed',
				created_at: Date.now(),
				driver: {
					id: 101,
					display_name: 'Topal Pet Transport',
					first_name: 'Seyithan',
					full_name: 'Seyithan Topal',
					profile_slug: 'topal-pet-transport',
				},
			};

			const temp = [...bids.data, info];
			setIsBid(true);
			setBids({ data: temp });
		}
	};

	/* It handles retract action. I used Javascript's filter function to remove the data from the array.
	 * Filter function returns an array with conditions. Our condition in this case is that driver who
	 * don't have an id of 101. So, it should return an array of driver whose ids are different from 101.
	 * After that, we set the new object by using setBids (React Hooks)
	 */
	const handleRetract = () => {
		const temp = bids.data.filter((bid) => bid.driver.id !== 101);
		setBids({ data: temp });
		setIsBid(false);
	};

	/* It handles update action. First, bid variable is validated. After that, with Javacript's map
	 * function the data is iterated through until it is equal to our data. If our data is found, then
	 * it returns a new object with the new update. Otherwise, it returns the same object. By doing so,
	 * we guaranteed that we updated our array of objects called bids without mutation. I used a fake
	 * driver id which is 101 to identify our data
	 */
	const handleUpdateBid = () => {
		if (validate(bid)) {
			const amount = Number(bid);
			const temp = bids.data.map((bid) => {
				if (bid.driver.id === 101) {
					return {
						...bid,
						amount,
					};
				}
				return bid;
			});
			setBids({ data: temp });
		}
	};

	// It validates if the input is empty or greater than zero
	const validate = (input) => {
		if (input === '') {
			console.log('Please type a number to bid');
			return false;
		}
		if (Number(input) <= 0) {
			console.log('Please type a number which is greater than 0 to bid');
			return false;
		}
		return true;
	};
	return (
		<>
			<div className="container">
				<div className="card">
					<span>Existing bids: </span>
					{bids.data.map((el) => (
						<Person
							key={el.id}
							name={el.driver.id === 101 ? 'You' : el.driver.first_name}
							bid={el.amount}
						/>
					))}
					<div className="bid-card">
						<span>Your Bid: </span>
						<div className="bid">
							<input
								value={bid}
								onChange={(e) => setBid(e.target.value)}
								className="bid-input"
								type="number"
							/>

							{isBid ? (
								<>
									<button onClick={handleUpdateBid} className="bid-button">
										Update Bid
									</button>
									<button onClick={handleRetract} className="bid-button">
										Retract
									</button>
								</>
							) : (
								<button
									onClick={handlePlaceBid}
									disabled={bid === '' ? true : false}
									className="bid-button"
								>
									Place Bid
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Bids;
