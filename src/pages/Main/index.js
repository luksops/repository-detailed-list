import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton, List } from './styles';

import api from '../../services/api';

class Main extends Component {
	state = {
		newRep: '',
		repositories: [],
		loading: false,
	};

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

					<SubmitButton loading={loading}>
						{loading ? <FaSpinner /> : <FaPlus />}
					</SubmitButton>
				</Form>

				<List>{repositories.map((rep, index) => {
          return (
            <li key={index}>
              <span>{rep.name}</span>
              <a href=''>Detalhes</a>
            </li>
          )
        })}</List>
			</Container>
		);
	}
}

export default Main;
