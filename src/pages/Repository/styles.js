import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

export const Loading = styled.div.attrs((props) => ({
	loading: props.loading,
}))`
	color: #fff;
	font-size: 30px;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	span {
		margin-right: 10px;
	}

	&[loading] {
		svg {
			animation: ${rotate} 2s linear infinite;
		}
	}
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		color: #7159c1;
		font-size: 16px;
		text-decoration: none;
	}

	img {
		width: 120px;
		border-radius: 50%;
		margin-top: 20px;
	}

	h1 {
		font-size: 24px;
		margin-top: 10px;
	}

	p {
		margin-top: 5px;
		font-size: 14px;
		line-height: 1.4;
		color: #666;
		text-align: center;
		max-width: 400px;
	}
`;

export const IssuesList = styled.ul`
	padding-top: 30px;
	margin-top: 30px;
	border-top: 1px solid #eee;
	list-style: none;

	li {
		display: flex;
		padding: 15px 10px;
		border: 1px solid #eee;
		border-radius: 4px;

		& + li {
			margin-top: 10px;
		}

		img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border: 2px solid #eee;
		}

		div {
			flex: 1;
			margin-left: 15px;

			strong {
				font-size: 16px;

				a {
					text-decoration: none;
					color: #333;

					&:hover {
						color: #7159c1;
					}
				}

				span {
					background: #eee;
					color: #333;
					border-radius: 2px;
					font-size: 12px;
					font-weight: 600;
					height: 20px;
					padding: 3px 4px;
					margin-left: 10px;
				}
			}

			p {
				margin-top: 5px;
				font-size: 12px;
				color: #999;
			}
		}
	}
`;
