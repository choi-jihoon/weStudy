import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import DemoLogin from "../../auth/DemoLogin";
import { signUp } from "../../../store/session";


import "./SignUpForm2.css";

const SignUpForm2 = () => {
	const [errors, setErrors] = useState({});
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (password === repeatPassword) {
			formData.append("username", username);
			formData.append("email", email);
			formData.append("password", password);
			if (image) {
				formData.append("image", image);
			}
			const data = await dispatch(signUp(formData));
			if (data) {
				const errors = {};
				const dataArr = data.map((error) => error.split(":"));

				for (let i = 0; i < dataArr.length; i++) {
					errors[dataArr[i][0]] = dataArr[i][1];
				}

				setErrors(errors);
				return;
			}
		} else {
			const errors = {};
			errors["password"] = "Passwords do not match.";
			setErrors(errors);
			return;
		}
	};


	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	useEffect(() => {
		return () => {
			setErrors({});
			setUsername("");
			setEmail("");
			setPassword("");
			setRepeatPassword("");
			setImage(null);
		};
	}, []);


	return (
		<form onSubmit={onSignUp} className="signup-form2" autoComplete="off">
			<div className='form-content2'>
				<div className="modal-head sign-up-modal-head2">
					Get Started
				</div>
				<div className="signup-form-elements-container2">
					<div className="sf-form-inputs-container2">
						<div className="signup-element-container2">
							<input
								type="text"
								name="username"
								onChange={updateUsername}
								placeholder="Username"
								value={username}
								required={true}

							></input>
							<div className="errors-container">
								{errors.username ? `${errors.username}` : ""}
							</div>
						</div>

						<div className="signup-element-container2">
							<input
								type="email"
								name="email"
								placeholder="Email"
								onChange={updateEmail}
								value={email}
								required={true}

							></input>
							<div className="errors-container">
								{errors.email ? `${errors.email}` : ""}
							</div>
						</div>

						<div className="signup-element-container2">
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={updatePassword}
								value={password}
								required={true}

							></input>
						</div>

						<div className="signup-element-container2">
							<input
								type="password"
								name="repeat_password"
								placeholder="Confirm Password"
								onChange={updateRepeatPassword}
								value={repeatPassword}
								required={true}
							></input>
							<div className="errors-container">
								{errors.password ? `${errors.password}` : ""}
							</div>
						</div>
					</div>
				</div>

				<div className="sf-btn-container2">
					<button id='create-account2' type="submit">Create Account</button>
					<DemoLogin />
				</div>
			</div>
		</form>
	);
};

export default SignUpForm2;
