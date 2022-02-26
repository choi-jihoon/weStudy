import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import DemoLogin from "../../auth/DemoLogin";
import { signUp } from "../../../store/session";


import "./SignUpForm2.css";

const SignUpForm2 = ({ goToLoginForm }) => {
	const [signUpErrors, setSignUpErrors] = useState({});
	const [newUsername, setNewUsername] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [image, setImage] = useState(null);

	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const errors={};
		if (!newUsername.length) errors['newUsername'] = 'This field is required.';
		if (!newEmail.length) errors['newEmail'] = 'This field is required.';
		if (!newPassword.length) errors['newPassword'] = 'This field is required.';
		if (!repeatPassword.length) errors['repeat_password'] = 'This field is required.';
		if (Object.values(errors).length) return setSignUpErrors(errors);

		const formData = new FormData();
		if (newPassword === repeatPassword) {
			formData.append("username", newUsername);
			formData.append("email", newEmail);
			formData.append("password", newPassword);
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

				// console.log(errors)
				setSignUpErrors(errors);
				return;
			}
		} else {
			const errors = {};
			errors["repeat_password"] = "Passwords do not match.";
			setSignUpErrors(errors);
			return;
		}
	};


	const updateNewUsername = (e) => {
		setNewUsername(e.target.value);
		setSignUpErrors({});
	};

	const updateNewEmail = (e) => {
		setNewEmail(e.target.value);
		setSignUpErrors({});
	};

	const updateNewPassword = (e) => {
		setNewPassword(e.target.value);
		setSignUpErrors({});
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
		setSignUpErrors({});
	};

	useEffect(() => {
		return () => {
			setSignUpErrors({});
			setNewUsername("");
			setNewEmail("");
			setNewPassword("");
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
								name="newUsername"
								onChange={updateNewUsername}
								placeholder="Username"
								value={newUsername}
								// required={true}

							></input>
							<div className="errors-container2">
								{signUpErrors.newUsername ? `${signUpErrors.newUsername}` : ""}
								{signUpErrors.username ? `${signUpErrors.username}` : ""}
							</div>
						</div>

						<div className="signup-element-container2">
							<input
								type="email"
								name="newEmail"
								placeholder="Email"
								onChange={updateNewEmail}
								value={newEmail}
								// required={true}

							></input>
							<div className="errors-container2">
								{signUpErrors.newEmail ? `${signUpErrors.newEmail}` : ""}
								{signUpErrors.email ? `${signUpErrors.email}` : ""}
							</div>
						</div>

						<div className="signup-element-container2">
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={updateNewPassword}
								value={newPassword}
								// required={true}

							></input>
							<div className="errors-container2">
								{signUpErrors.newPassword ? `${signUpErrors.newPassword}` : ""}
								{signUpErrors.password ? `${signUpErrors.password}` : ""}
							</div>
						</div>

						<div className="signup-element-container2">
							<input
								type="password"
								name="repeat_password"
								placeholder="Confirm Password"
								onChange={updateRepeatPassword}
								value={repeatPassword}
								// required={true}
							></input>
							<div className="errors-container2">
								{signUpErrors.repeat_password ? `${signUpErrors.repeat_password}` : ""}
							</div>
						</div>
					</div>
				</div>

				<div className="sf-btn-container2">
					<button id='create-account2' type="submit">Create Account</button>
					<p onClick={goToLoginForm}>Already have an account? <i className="far fa-arrow-alt-circle-right"></i> </p>
					<DemoLogin />
				</div>
			</div>
		</form>
	);
};

export default SignUpForm2;
