import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="login"
				onClick={() => setShowModal(true)}
			>
				Login
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
