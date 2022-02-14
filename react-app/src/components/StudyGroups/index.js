import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/groups";
import Group from "./Group";

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
            {groups && groups.map(group => {
                return <Group
                    key={group.id}
                    group={group} />
            })}
        </>
    )
}

export default StudyGroups;
