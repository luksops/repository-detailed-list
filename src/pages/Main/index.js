import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { ReactComponent as RemoveIcon } from '../../images/bin_icon.svg';

import api from '../../services/api';

class Main extends Component {
	state = {
		newRep: '',
		repositories: [],
		loading: false,
	};

	componentDidMount() {
		const repositories = localStorage.getItem('repositories');

		if (repositories) {
			this.setState({ repositories: JSON.parse(repositories) });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { repositories } = this.state;

		if (prevState.repositories !== repositories) {
			localStorage.setItem('repositories', JSON.stringify(repositories));
		}
	}

	handleImputChange(event) {
		this.setState({ newRep: event.target.value });
	}

	async handleSubmit(event) {
		const { newRep, repositories } = this.state;
		event.preventDefault();
		this.setState({ loading: true });

		try {
			const response = await api.get(`/repos/${newRep}`);

			const data = {
				name: response.data.full_name,
			};

			this.setState({
				loading: false,
				newRep: '',
				repositories: [...repositories, data],
			});
		} catch (error) {
			console.log(error.response);
			// axios found an error and got a response
			if (error.response) {
				Toastify({
					text: 'Error fetching the repository',
					backgroundColor: '#5F1100',

					duration: 3000,
				}).showToast();
				this.setState({ loading: false });
				return;
			}
		}
	}

	removeFromList(rep) {
		const { repositories } = this.state;
		const newStateList = repositories.filter((repo) => repo.name !== rep.name);
		this.setState({ ...this.state, repositories: newStateList });
	}

	render() {
		const { newRep, loading, repositories } = this.state;
		return (
			<Container>
				<h1>
					<FaGithubAlt />
					Repositories
				</h1>

				<Form onSubmit={this.handleSubmit.bind(this)}>
					<input
						type='text'
						placeholder='Add Repository'
						onChange={this.handleImputChange.bind(this)}
						value={newRep}
					/>

					<SubmitButton loading={loading ? 1 : 0}>
						{loading ? <FaSpinner /> : <FaPlus />}
					</SubmitButton>
				</Form>

				<List>
					{repositories.map((rep, index) => {
						return (
							<li key={index}>
								<Link to={`/repository/${encodeURIComponent(rep.name)}`}>
									<p>{rep.name}</p>
									<span>details</span>
								</Link>
								<RemoveIcon onClick={() => this.removeFromList(rep)} />
							</li>
						);
					})}
				</List>
			</Container>
		);
	}
}

export default Main;
