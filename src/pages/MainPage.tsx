import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const MainPage: React.FC = () => {
	const navigate = useNavigate();

	const handleNavItemClick = (path: string): void => {
		navigate(path);
	};

	const Nav = styled.nav`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background-color: #f8f9fa;
		padding: 0.5rem 3rem;
	`;

	const NavBarContainer = styled.div`
		width: 100%;
		padding-right: calc(1.5rem * 0.5);
		padding-left: calc(0 * 0.5);
		margin-right: auto;
		margin-left: auto;
		display: flex;
		align-items: center;
	`;

	const NavBarBrand = styled.a`
		padding: 0.3125rem 0;
		margin-right: 1rem;
		font-size: 1.25rem;
		color: black;
		text-decoration: none;
		white-space: nowrap;
	`;

	const NavBarLink = styled.a`
		display: block;
		padding: 0 0.25rem;
		font-size: 1rem;
		color: #212529;
		text-decoration: none;
		background: 0 0;
		border: 0;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out;
	`;

	const NavBarLinkContainer = styled.div`
		margin-left: auto;
		display: flex;
	`;

	return (
		<div>
			<Nav>
				<NavBarContainer>
					<NavBarBrand onClick={() => handleNavItemClick("/movies")}>Film Finder</NavBarBrand>
					<NavBarLinkContainer>
						<NavBarLink onClick={() => handleNavItemClick("/movies")}>Home</NavBarLink>
						<NavBarLink onClick={() => handleNavItemClick("/liked")}>Liked</NavBarLink>
					</NavBarLinkContainer>
				</NavBarContainer>
			</Nav>
			<Outlet />
		</div>
	);
};

export default MainPage;
