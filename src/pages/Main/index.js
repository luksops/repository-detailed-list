import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import Container from '../../components/Container'
import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';

class Main extends Component {
	state = {
		newRep: '',
		repositories: [],
		loading: false,
	};

	componentDidMount() {
		const repositories = localStorage.getItem('repositories');

		if(repositories){
			this.setState({repositories: JSON.parse(repositories)})
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

		const response = await api.get(`/repos/${newRep}`);
		const data = {
			name: response.data.full_name,
		};

		this.setState({
			loading: false,
			newRep: '',
			repositories: [...repositories, data],
		});
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
								<span>{rep.name}</span>
								<Link to={`/repository/${encodeURIComponent(rep.name)}`}>Details</Link>
							</li>
						);
					})}
				</List>
			</Container>
		);
	}
}

export default Main;