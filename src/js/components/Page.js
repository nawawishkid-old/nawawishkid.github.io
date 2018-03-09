import React, { Component } from 'react';

const Page = (props) => {
	//if (props.currentPage === null) history.back();

	return location.pathname === props.url ? <div>{props.children}</div> : '';
}

export default Page;