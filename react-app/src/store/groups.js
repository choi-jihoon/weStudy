const LOAD_GROUPS = 'groups/LOAD_GROUPS'

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
});

export const getGroups = () => async (dispatch) => {
    const res = await fetch(`/api/groups/`);
    if (res.ok) {
        const data = await res.json();
        console.log("HIIIIIIIIII", data)
        if (data.errors) {
            return;
        }
        dispatch(loadGroups(data.groups));
    }
};


const initialState = {}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS: {
            const loadGroups = {};
            action.groups.forEach(group => {
                loadGroups[group.id] = group;
            });
            return {
                ...loadGroups
            }
        }
        default:
            return state
    }
}

export default groups;
