const hunts = [
    {
        name: "First Hunt",
        isOpen: true,
        startTime: new Date(2019, 3, 7, 15),
        endTime: new Date(2019, 3, 7, 19),
        maxTeams: 3,
        numTeams: 1,
        items: Array(12),
        location: {
            name: "Huntsville, Al",
            coords: {
                latitude: 34.668644, 
                longitude: -86.441818,
            },
        },
    },
    {
        name: "Second Hunt",
        isOpen: false,
        startTime: new Date(2019, 3, 8, 10),
        endTime: new Date(2019, 3, 8, 15),
        maxTeams: 13,
        numTeams: 11,
        items: Array(8),
        location: {
            name: "Guntersille, Al",
            coords: {
                latitude: 32.688053,
                longitude: -86.810585,
            },
        },
    },
    {
        name: "Third Hunt",
        isOpen: false,
        startTime: new Date(2019, 3, 18, 10),
        endTime: new Date(2019, 3, 18, 17),
        maxTeams: 7,
        numTeams: 3,
        items: Array(20),
        location: {
            name: "Madison, Al",
            coords: {
                latitude: 34.773681,
                longitude: -86.567510,
            },
        },
    },
    {
        name: "Fourth Hunt",
        isOpen: true,
        startTime: new Date(2019, 3, 12, 19),
        endTime: new Date(2019, 3, 12, 20),
        maxTeams: 2,
        numTeams: 2,
        items: Array(17),
        location: {
            name: "Athens, Al",
            coords: {
                latitude: 34.779486,
                longitude: -86.91645,
            },
        },
    },
    {
        name: "West H-Town Hunt",
        isOpen: true,
        startTime: new Date(2019, 3, 26, 11),
        endTime: new Date(2019, 3, 26, 17),
        maxTeams: 14,
        numTeams: 13,
        items: Array(13),
        location: {
            name: "Huntsville, Al",
            coords: {
                latitude: 34.759773,
                longitude: -86.684272,
            },
        },
    },
    {
        name: "East-Town Hunt",
        isOpen: false,
        startTime: new Date(2019, 3, 29, 14),
        endTime: new Date(2019, 3, 29, 24),
        maxTeams: 3,
        numTeams: 3,
        items: Array(25),
        location: {
            name: "Huntsville, Al",
            coords: {
                latitude: 34.757974,
                longitude: -86.552074,
            },
        },
    },
    {
        name: "North H-Town Hunt",
        isOpen: true,
        startTime: new Date(2019, 4, 27, 10),
        endTime: new Date(2019, 4, 27, 12),
        maxTeams: 6,
        numTeams: 4,
        items: Array(3),
        location: {
            name: "Huntsville, Al",
            coords: {
                latitude: 34.777152,
                longitude: -86.590526,
            },
        },
    },
    {
        name: "South H-Town Hunt",
        isOpen: false,
        startTime: new Date(2019, 3, 27, 10),
        endTime: new Date(2019, 3, 27, 12),
        maxTeams: 4,
        numTeams: 3,
        items: Array(15),
        location: {
            name: "Huntsville, Al",
            coords: {
                latitude: 34.606181,
                longitude: -86.545601,
            },
        },
    },
];

export default hunts;