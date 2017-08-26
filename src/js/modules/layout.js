import axios from 'axios';
import Loading from './loading';

class Layout {
	/**
	 * Fetch Github details and populate data.
	 */
	init() {
		Loading.append();
		axios.get('https://api.github.com/users/okeeffed/starred')
			.then(res => {
				Loading.removeFrom();

				const grid = document.querySelector('.grid');
				res.data.map((item, index) => {
					const el = this.render(item);
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

	render(item) {
		return `<div class="item -four e-raised">
			<div class="info">
				<img class="image" src="${item.owner.avatar_url}" />
				<div class="name">${item.name}</div>
				<div class="fullname">${item.full_name}</div>
			</div>
			<div class="details">
				<p class="description">${item.description}</p>
			</div>
			<div class="stats">
				<div class="stars icon-container">
					<img class="icon" src="/img/icon_star.png" href="Star count" />
					<p class="stat">${item.stargazers_count} stars</p>
				</div>
				<div class="forks icon-container">
					<img class="icon" src="/img/icon_fork.png" href="Fork count" />
					<p class="stat">${item.forks} forks</p>
				</div>
				<div class="issues icon-container">
					<img class="icon" src="/img/icon_issue.png" href="Issue count" />
					<p class="stat">${item.open_issues} open issues</p>
				</div>
			</div>
			<a target="_blank" href="${item.html_url }" class="button e-raised e-hover-floating">git more.</a>
		</div>`;
	}
}

export default Layout;
