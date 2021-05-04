import styled, { keyframes } from 'styled-components';

export const Form = styled.form`
	margin-top: 30px;
	display: flex;
	flex-direction: row;

	input {
		flex: 1;
		border: 1px solid #eee;
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 16px;
	}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
	type: 'submit',
	disabled: props.loading,
}))`
	background: #7159c7;
	border: 0;
	padding: 0 15px;
	margin-left: 10px;
	border-radius: 4px;

	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		color: #fff;
		size: 14px;
	}

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;

		svg {
			animation: ${rotate} 2s linear infinite;
		}
	}
`;

export const List = styled.ul`
	list-style: none;
	padding-top: 30px;

	li {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 10px;
		transition: 0.45s ease-out;

		&:hover {
			background-color: #6662;
			transition: 0.15s ease-in;
		}

		svg {
			fill: #b77;
			cursor: pointer;
			height: 22px;
			width: 22px;
			margin-left: 10px;
		}

		& + li {
			border-top: 1px solid #eee;
		}

		a {
			text-decoration: none;
			color: #666;
			display: flex;
			width: 100%;
			padding: 15px 0;

			&:hover {
				cursor: pointer;
				color: #7159c7;
				transition: 0.3s;
			}

			p {
				flex-grow: 1;
				justify-content: space-between;
				font-weight: bold;
			}
		}
	}

	span {
		display: flex;
		align-items: center;
	}
`;
