import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import { Loading, Owner, IssuesList } from './styles';

import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

class Repository extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				repository: PropTypes.string,
			}),
		}).isRequired,
	};

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
		const { loading, repository, issues } = this.state;

		if (loading) {
			return (
				<Loading loading={loading ? 1 : 0}>
					<span>Loading</span>
					<FaSpinner />
				</Loading>
			);
		}

		return (
			<Container>
				<Owner>
					{console.log(repository)}
					<Link to='/repository-detailed-list/'>Back to main page</Link>
					<img
						src={repository.owner.avatar_url}
						alt='Repository owner avatar'
					/>
					<h1>{repository.name}</h1>
					<p>{repository.description}</p>
				</Owner>

				<IssuesList>
					{issues.map((issue) => (
						<li key={String(issue.id)}>
							<img src={issue.user.avatar_url} alt={issue.user.login} />
							<div>
								<strong>
									<a href={issue.html_url}>{issue.title}</a>
									{issue.labels.map((label) => (
										<span key={String(label.id)}>{label.name}</span>
									))}
								</strong>
								<p>{issue.user.login}</p>
							</div>
						</li>
					))}
				</IssuesList>
			</Container>
		);
	}
}

export default Repository;
