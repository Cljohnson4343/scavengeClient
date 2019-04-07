const hunts = [
    {
        name: "First Hunt",
        isOpen: true,
        startTime: new Date(2019, 3, 7, 15),
        endTime: new Date(2019, 3, 7, 19),
        maxTeams: 3,
        numTeams: 1,
        items: Array(12),
        location: "Huntsville, Al"
    },
    {
        name: "Second Hunt",
        isOpen: false,
        startTime: new Date(2019, 3, 8, 10),
        endTime: new Date(2019, 3, 8, 15),
        maxTeams: 13,
        numTeams: 11,
        items: Array(8),
        location: "Guntersville, Al"
    },
]

export default hunts;