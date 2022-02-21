import './Dropdown.css';

const DropdownMenu = ({ title, items }) => {
    return (
        <ul className="menu">
            <li className="dropdown dropdown-6">
                { title }
                <ul className="dropdown_menu dropdown_menu--animated">
                    {items.map((item, idx) => {
                        return (
                            <li key={idx}>{item}</li>
                        )
                    })}
                </ul>
            </li>
        </ul>
    )
}

export default DropdownMenu;
