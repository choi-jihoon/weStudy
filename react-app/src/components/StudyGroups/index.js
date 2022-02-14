import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/groups";
import Group from "./Group";
import CreateGroupModal from "./CreateGroupModal";

import './StudyGroups.css';

const StudyGroups = () => {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groups)
    const groups = Object.values(groupsObj)

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])


    return (
        <>
            <h2>Your Study Groups</h2>
            <CreateGroupModal />
            <div className='study-groups-container'>
                <ul>
                    {groups && groups.map(group => {
                        return (
                            <li key={group.id}>
                                <Group group={group} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default StudyGroups;
