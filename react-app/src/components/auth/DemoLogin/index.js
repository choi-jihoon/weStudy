import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";

function DemoLogin() {
    const dispatch = useDispatch();

    const loginDemo = (e) => {
        e.preventDefault();
        const email = 'demo@aa.io';
        const password = 'password';
        return dispatch(sessionActions.login(email, password)).catch(
            async (res) => {
                await res.json();
            }
        )
    }

    return (
        <button className='demo-button' onClick={loginDemo}>
            Demo User
        </button>
    )
}

export default DemoLogin;
