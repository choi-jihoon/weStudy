import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../../store/session";
import DemoLogin from "../DemoLogin";
import "./LoginForm.css";

const LoginForm = () => {
	const [errors, setErrors] = useState({});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));

		if (data) {
			const errors = {};
			const dataArr = data.map(error => error.split(":"));

			for (let i = 0; i < dataArr.length; i++) {
				errors[dataArr[i][0]] = dataArr[i][1]
			}

			setErrors(errors);
			return
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};


	useEffect(() => {
		setErrors(errors)
	}, [errors])


	return (
		<form onSubmit={onLogin} className="login-form" autoComplete="off">
			<div className='form-content'>
				<div className="modal-head login-modal-head">Welcome back!</div>
				<div className='login-form-elements-container'>
					<div className='login-element-container'>
						<input
							name="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
							required={true}
						/>
						<div className='errors-container'>
							{errors.email ? `${errors.email}` : ""}
						</div>
					</div>
					<div className='login-element-container'>
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
							required={true}
						/>
						<div className='errors-container'>
							{errors.password ? `${errors.password}` : ""}
						</div>
					</div>
					<div className="sf-btn-container">
						<button id='login-account' type="submit">Login</button>
						<DemoLogin />
					</div>
				</div>
			</div>

		</form>
	);
};

export default LoginForm;
