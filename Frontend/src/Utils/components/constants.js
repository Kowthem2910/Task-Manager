const ADMIN_SIDE_BAR = [
    {
        "id": 1,
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "LayoutDashboard",
    },
    {
        "id": 2,
        "title": "My Tasks",
        "path": "/my-tasks",
        "icon": "ListChecks",
    },
    {
        "id": 3,
        "title": "Boards",
        "path": "/boards",
        "icon": "Kanban",
    },
    {
        "id": 4,
        "title": "Settings",
        "path": "/settings",
        "icon": "Settings",
    },
]
const USER_SIDE_BAR = [
    {
        "id": 1,
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "LayoutDashboard",
    },
    {
        "id": 2,
        "title": "My Tasks",
        "path": "/my-tasks",
        "icon": "ListChecks",
    },
    {
        "id": 3,
        "title": "Settings",
        "path": "/settings",
        "icon": "Settings",
    },
]

const taskStatusOptions = [
    {
        id:1,
        value:'Assigned'
    },
    {
        id:2,
        value:'In Progress'
    },{
        id:3,
        value:'Completed'
    },{
        id:4,
        value:'backlog'
    },

]


const getSidebarData = (isAdmin) => {
    if(isAdmin){
        return ADMIN_SIDE_BAR;
    }else{
        return USER_SIDE_BAR;
    }
}

export { taskStatusOptions, getSidebarData};