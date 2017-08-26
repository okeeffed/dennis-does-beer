import axios from 'axios';
import Loading from './loading';

const query = `query{
	beers {
	  beer
	  brewery
	  style
	  abv
	  ibu
	  my_rating
	  global_rating
	  first_checkin
	  last_checkin
    image
	}
}`;

class Layout {
	/**
	 * Fetch Github details and populate data.
	 */
	init() {
		Loading.append();
		axios.post('http://localhost:3090/graphql',
			{
				headers: {
					'Content-Type': 'application/graphql',
				},
				query: query
			})
			.then(res => {
				const beers = res.data.data.beers;
				Loading.removeFrom();

				const grid = document.querySelector('.grid');
				beers.map((beer, index) => {
					const el = this.render(beer);
					let parent = document.createElement('div');
					parent.innerHTML = el;

					/**
					 * Continue to append to mobile grid
					 */
					grid.appendChild(parent.firstChild);
				});
			})
			.catch(err => {
				Loading.removeFrom();
				console.log(err.message);
			});
	}

	/**
	 * Render the req data as a grid item.
	 * @param  {[Object object]} item Beer data item.
	 */
	render(item) {
		return `<div class="item -four e-raised e-hover-floating a-animate">
			<div class="info">
				<img class="image" src="${item.image}" alt="${item.beer}">
				<h3 class="name">${item.beer}</h3>
				<h3 class="company">${item.brewery}</h3>
			</div>
			<div class="details">
				<p class="abv">${item.abv}</p>
				<p class="ibu m-bottom-10">${item.ibu}</p>
				<p class="rating-title">My rating</p>
				<p class="rating">${this.rate(item.my_rating)}</p>
				<p class="rating-title">Global rating</p>
				<p class="rating">${this.rate(item.global_rating)}</p>
			</div>
			<p class="type">${item.style}</p>
		</div>`;
	}

	rate(beer) {
		if (null) return 'Not rated';

		const splitFirst = beer.split('(');
		const splitSecond = splitFirst[splitFirst.length - 1].split(')');
		const rating = parseFloat(splitSecond[0]);

		if (rating < 1) return `New Year's 2011`;
		if (rating < 2) return `Squashed Macca's cheese burger`;
		if (rating < 3) return `The best of Nicolas Cage`;
		if (rating < 3.5) return `Batman vs Superman: Dawn of Justice`;
		if (rating < 4) return `Little bit hey how ya garn`;
		if (rating < 4.5) return `Hey how ya garn`;
		if (rating < 5) return `Milton mangoes`;

		return 'Rated';
	}
}

export default Layout;
