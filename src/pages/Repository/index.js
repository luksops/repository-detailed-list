import React, { Component } from 'react';
import api from '../../services/api';

class Repository extends Component {
	state = {
		loading: true,
		repository: {},
		issues: [],
	};

	async componentDidMount() {
		const { match } = this.props;
		const repName = decodeURIComponent(match.params.repName);

		const [repository, issues] = await Promise.all([
			api.get(`repos/${repName}`),
			api.get(`repos/${repName}/issues`, {
				params: {
					state: 'open',
					per_page: 5,
				},
			}),
    ]);
    
		this.setState({
			loading: false,
			repository: repository.data,
			issues: issues.data,
		});
		console.log(repository, issues);
	}

	render() {
		return <div>Repository:</div>;
	}
}

export default Repository;
