const activityTypes = [
    {
        key: "basketball_court",
        label: "Basketball Court",
        query: `
          node["sport"="basketball"][BOX];
        `
    },
    {
        key: "boxing_gym",
        label: "Boxing Gym",
        query: `
          node["sport"="boxing"][BOX];
        `
    },
    {
        key: "basketball_court",
        label: "Basketball Court",
        query: `
          node["sport"="basketball"][BOX];
        `
    },
    {
        key: "boxing_gym",
        label: "Boxing Gym",
        query: `
          node["sport"="boxing"][BOX];
        `
    },
    {
        key: "crossfit_box",
        label: "Crossfit Box",
        query: `
          node["sport"="crossfit"][BOX];
        `
    },
    {
        key: "cycling",
        label: "Cycling",
        query: `
          node["sport"="cycling"][BOX];
        `
    },
    {
        key: "dance_studio",
        label: "Dance Studio",
        query: `
          node["leisure"="dance"][BOX];
        `
    },
    {
        key: "golf_course",
        label: "Golf Course",
        query: `
          node["sport"="golf_course"][BOX];
        `
    },
    {
        key: "gym",
        label: "Gym",
        query: `
          node["leisure"="fitness_centre"][BOX];
        `
    },
    {
        key: "hikingg_trail",
        label: "Hiking Trail",
        query: `
        node["sport"="hiking"][BOX];
        `
    },
    {
        key: "ice_rink",
        label: "Ice Rink",
        query: `
        node["leisure"="ice_rink"][BOX];
        `
    },
    {
        key: "horse_riding",
        label: "Horse Riding",
        query: `
        node["leisure"="horse_riding"][BOX];
        `
    },
    {
        key: "leisure_centre",
        label: "Leisure Centre",
        query: `
        node["leisure"="sports_centre"][BOX];
        `
    },
    {
        key: "martial_arts",
        label: "Martial Arts",
        query: `
        node["sport"="martial_arts"][BOX];
        `
    },
    {
        key: "meditation_centre",
        label: "Meditation Centre",
        query: `
        node["amenity"="meditation_centre"][BOX];
        `
    },
    {
        key: "pilates_studio",
        label: "Pilates Studio",
        query: `
        node["sport"="pilates"][BOX];
        `
    },
    {
        key: "rock_climbing",
        label: "Rock Climbing",
        query: `
        node["sport"="climbing"][BOX];
        `
    },
    {
        key: "rowing_centre",
        label: "Rowing Centre",
        query: `
        node["sport"="rowing"][BOX];
        `
    },
    {
        key: "running_track",
        label: "Running Track",
        query: `
        node["leisure"="track"][BOX];
        `
    },
    {
        key: "skiing",
        label: "Skiing",
        query: `
        node["sport"="skiing"][BOX];
        `
    },
    {
        key: "sauna",
        label: "Sauna",
        query: `
        node["leisure"="sauna"][BOX];
        `
    },
    {
        key: "sports_centre",
        label: "Sports Centre",
        query: `
        node["leisure"="sports_centre"][BOX];
        `
    },
    {
        key: "swimming_pool",
        label: "Swimming Pool",
        query: `
        node["leisure"="swimming_pool"][BOX];
        `
    },
    {
        key: "tennis_court",
        label: "Tennis Court",
        query: `
        node["sport"="tennis"][BOX];
        `
    },
    {
        key: "yoga_studio",
        label: "Yoga Studio",
        query: `
        node["sport"="yoga"][BOX];
        `
    }
];

export default activityTypes;