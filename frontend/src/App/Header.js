import React from 'react';
import logoYellow from '../imgs/logo-yellow.png'
import logoWhite from '../imgs/logo-white.png'
import { Link } from 'react-router-dom'

const Header = (props) => {
	let logoColor = logoWhite
	if(props.color==='yellow')
		logoColor = logoYellow

	return	<div className="brand row">
				<Link to="/"><img src={logoColor} className="logo" alt="FlyBondi.com" /></Link>
			</div>
}

export default Header;