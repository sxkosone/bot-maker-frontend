// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import Navbar from './Containers/Navbar'

describe('App', () => {
	let wrapper
	beforeEach(() => {
		wrapper = shallow(<App />)
	})
	it('renders successfully', () => {
		expect(wrapper.find('.App').length).toEqual(1)
	})
	it('renders the <Navbar />', () => {
		expect(wrapper.containsMatchingElement(<Navbar />)).toEqual(true)
	})
})