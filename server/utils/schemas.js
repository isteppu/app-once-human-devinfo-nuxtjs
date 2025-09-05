// Define the schemas for each data model to ensure data integrity.
// 'instanceof Array' is used to check for arrays and 'typeof' for primitive types.
// A custom check is used for properties that can be an array OR a specific string like 'none'.
export const schemas = {
    Deviations: {
        id: (value) => typeof value === 'number',
        desc: (value) => typeof value === 'string',
        location: (value) => Array.isArray(value) || value === 'none',
        name: (value) => typeof value === 'string',
        needs: (value) => Array.isArray(value) || value === 'none',
        note: (value) => typeof value === 'string' || value === 'none',
        type: (value) => typeof value === 'number',
        variants: (value) => Array.isArray(value) || value === 'none',
    },
    DeviationNeeds: {
        id: (value) => typeof value === 'number',
        need: (value) => typeof value === 'string',
    },
    DeviationTypes: {
        id: (value) => typeof value === 'number',
        type: (value) => typeof value === 'string',
    },
    Locations: {
        id: (value) => typeof value === 'number',
        key: (value) => typeof value === 'string',
        name: (value) => typeof value === 'string',
    },
    Scenario: {
        id: (value) => typeof value === 'number',
        desc: (value) => typeof value === 'string',
        key: (value) => typeof value === 'string',
        name: (value) => typeof value === 'string',
    },
    ScenarioDropType: {
        id: (value) => typeof value === 'number',
        type: (value) => typeof value === 'string',
    },
    Silos: {
        id: (value) => typeof value === 'number',
        silo: (value) => typeof value === 'string',
    },
    SilosDropType: {
        id: (value) => typeof value === 'number',
        type: (value) => typeof value === 'string',
    },
    VisionalWheelSeasons: {
        name: (value) => typeof value === 'string',
        season: (value) => typeof value === 'number',
    },
};