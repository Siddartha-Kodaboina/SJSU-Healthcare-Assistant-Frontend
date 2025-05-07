import React from 'react';
import { Link } from 'react-router-dom';

const FooterCol = (props) => {
	return (
		<div className="col-md-3 footer-col">
			<h6>{props.menuTitle ? props.menuTitle : ' '}</h6>
			<ul>
				{props.menuItems.map((item, index) => (
					<li key={index}>
						<Link to={item.link}>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
			{props.children && props.children}
		</div>
	);
};

export default FooterCol;
