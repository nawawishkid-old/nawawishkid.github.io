import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rush extends Component {
	constructor(props) {
		//console.log('Rush.constructor()');
		super(props);
		this.temp = {};
	}

	/**
	 * Generic Methods
	 */
	_setState(nextProps = null) {
		console.log('Rush._setState()');
		const p = nextProps || this.props;
		let target = this._makeTargetsArray(p),
			step = p.step > target.length - 1 ? p.step % (target.length - 1) : p.step;

		console.log(p.step, step);

		this.setState({
			step: step,
			target: target,
			sequentialTarget: p.sequentialTarget,
			rush: true,
			//currentPosition: p.step == 0 ? target[0] : target[p.step]
		}, () => console.log('state: ', this.state));
	}

	_setStyle() {
		console.log('Rush._setStyle()');
		const currentTarget = this._getCurrentTarget();
		console.log(currentTarget);
		this.style = {
			transition: `transform ${this.props.duration}s ${this.props.timeFunc} ${this.props.delay}s`,
			transform: `translate(${currentTarget[0]},${currentTarget[1]})`
		}

		console.log(this.style);
	}

	_getNodeRect() {
		//console.log('Rush._getNodeRect()');
		return this.node.getBoundingClientRect();
	}

	_rush() {
		//console.log('Rush._rush()');
		// Is rushable? no? return!
		//if (!this.state.rush) return;

		let target = this.state.sequentialTarget
					 ? this._makeTargetSequential(this._getCurrentTarget())
					 : this._getCurrentTarget();

		console.log(target);
		//console.log(this.node.style.transform);

		this.node.style.transform = `translate(${target[0]}, ${target[1]})`;
		//console.log(getComputedStyle(this.node).transform);
	}

	_getCurrentTarget() {
		//console.log('Rush._getCurrentTarget()');
		console.log(this.state.target, this.state.step);
		return this.state.target[this.state.step];
	}

	_makeTargetsArray(nextProps = null) {
		let p = nextProps || this.props,
			target = typeof p.target === 'string' ? [p.target] : p.target;

		//if ()

		target.unshift(p.initialTarget);

		return target.map(item => {
			return item.split(',');
		});
	}

	_setCurrentTranslatePosition() {
		//console.log('Rush._setCurrentTranslatePosition()');
		const currentTarget = this._getCurrentTarget();

		this.style.transform = `translate(${currentTarget[0]}, ${currentTarget[1]})`;
	}

	_makeTargetSequential(target) {
		//console.log('Rush._makeTargetSequential()');
		if (this.state.step == 0) return target;

		if (typeof this.lastPosition === 'undefined') {
			let firstTarget = this.state.target[0];
			this.lastPosition = [parseInt(firstTarget[0]), parseInt(firstTarget[1])];
		}

		let lastTarget = this.state.target[this.state.step - 1],
			unit, position;

		return target.map((item, index) => {
			/**
			 * Sequential target from different unit is unavailable now
			 */
			unit = item.replace(/[^a-zA-Z]/g, '');
			unit = unit ? unit : 'px';
			position = parseInt(item) + this.lastPosition[index];

			this.lastPosition[index] = position;

			return position + unit;
		});
	}

	_checkPropsMismatch(nextProps = null) {
		const p = nextProps || this.props;

		if (p.step > this.state.target.length - 1)
			console.error('Warning: props.step is not match any index of props.target. Function may not works properly.');
	}

	/**
	 * For creating sequential target with different unit
	 * Will be available in the future
	 *
	 * _convertTranslateUnitToPx() {}
	 */

	/**
	 * Life cycle events
	 */
	componentWillMount() {
		//console.log('Rush.componentWillMount()');
		this._setState();
	}

	componentDidMount() {
		//console.log('Rush.componentDidMount()');
		this.node = document.getElementById(`rushjs-${this.props.id}`);

		this._rush();
	}

	componentWillReceiveProps(nextProps) {
		console.log('Rush.componentWillReceiveProps()');
		//
		if (this.props.step === nextProps.step) {
			this.setState({rush: false}, () => console.log('rush: ', this.state.rush));
			return;
		}
		console.log(nextProps);

		this._setState(nextProps);
		//this._setCurrentTranslatePosition();
	}

	componentDidUpdate() {
		//console.log('Rush.componentDidUpdate()');

		this._rush();
	}

	render() {
		console.log('Rush.render()');

		const p = this.props;

		this._setStyle();
		this._checkPropsMismatch();

		return  (
			<div style={{
					...this.style,
					...p.containerStyle
				 }}
				 className={p.containerClass}
				 id={`rushjs-${p.id}`}
			>
				{p.children}
			</div>
		);
	}
}

Rush.propTypes = {
	// Functionality
	step: PropTypes.number,
	target: PropTypes.oneOfType([
		//PropTypes.oneOf(['offscreen']),
		PropTypes.string, // e.g. target="100,100", target="100%,100px"
		PropTypes.arrayOf(PropTypes.string) // e.g. target={['100%,20px', '100,100']}
	]).isRequired,
	initialTarget: PropTypes.string,
	sequentialTarget: PropTypes.bool,

	// Transition
	duration: PropTypes.number,
	timeFunc: PropTypes.string,
	delay: PropTypes.number,

	// Container
	containerStyle: PropTypes.object,
	containerClass: PropTypes.string,
	id: PropTypes.string.isRequired,

	// Events
	beforeRushStart: PropTypes.func,
	afterRushStart: PropTypes.func,
	beforeRushEnd: PropTypes.func,
	afterRushEnd: PropTypes.func,
}

Rush.defaultProps = {
	initialTarget: '0,0',
	sequentialTarget: true,

	// Transition
	duration: 1,
	timeFunc: 'linear',
	delay: 0,

	// Container
	containerStyle: {},
	containerClass: '',
}