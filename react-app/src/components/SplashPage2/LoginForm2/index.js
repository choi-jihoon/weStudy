import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../../store/session";
import DemoLogin from "../../auth/DemoLogin";
import "./LoginForm2.css";

const LoginForm2 = ({ handleBackToSignup }) => {
	const [errors, setErrors] = useState({});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const errors = {};
		if (!email.length) errors['email'] = 'This field is required.';
		if (!password.length) errors['password'] = 'This field is required.';
		if (Object.values(errors).length) return setErrors(errors);

		const data = await dispatch(login(email, password));
		if (data) {
			const errors = {};
			// const dataArr = data.map(error => error.split(":"));

			// for (let i = 0; i < dataArr.length; i++) {
			// 	errors[dataArr[i][0]] = dataArr[i][1]
			// }
			errors['email'] = 'Invalid email and/or password.';
			// errors['password'] = 'Invalid credentials.';
			setErrors(errors);
			return;
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
        setErrors({});
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
        setErrors({});
	};

	useEffect(() => {
		setErrors(errors)
	}, [errors]);


	return (
		<form onSubmit={onLogin} className="login-form2" autoComplete="off">
			<div className='form-content2'>
				<div className="modal-head login-modal-head2">Welcome back!</div>
				<div className='login-form-elements-container2'>
					<div className='login-element-container2'>
						<input
							name="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
							// required={true}
						/>
						<div className='errors-container2'>
							{errors.email ? `${errors.email}` : ""}
						</div>
					</div>
					<div className='login-element-container2'>
						<input
							name="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={updatePassword}
							// required={true}
						/>
						<div className='errors-container2'>
							{errors.password ? `${errors.password}` : ""}
						</div>
					</div>
					<div className="sf-btn-container2">
						<button id='login-account2' type="submit">Login</button>
                        <p onClick={handleBackToSignup}>No account? Sign up for free!</p>
						<DemoLogin />
					</div>
				</div>
			</div>

		</form>
	);
};

export default LoginForm2;
