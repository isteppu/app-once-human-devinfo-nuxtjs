import { defineStore } from 'pinia';

/**
 * @typedef {Object} UserState
 * @property {string} user
 * @property {boolean} isLoggedIn
 * @property {string} page
 */



export const useDataStore = defineStore('data', {
  state: () => ({
    devNeeds: [],
    devTypes: [],
    devs: [],
    locations: [],
    scenarios: [],
    scenarioTypes: [],
    silos: [],
    silosTypes: [],
    selectedDevType: '',
    selectedDecNeed: '',
    selectedDev: '',
    selectedScenario: '',
    selectedScenarioType: '',
    selectedSilo: '',
    selectedSiloType: '',
  }),
  actions: {
    setDevNeeds(devNeeds) {
      this.devNeeds = devNeeds;
    },
    setDevTypes(devTypes) {
      this.devTypes = devTypes;
    },
    setDevs(devs) {
      this.devs = devs;
    },
    setLocations(loc) {
      this.locations = loc;
    },
    setScenarios(scenarios) {
      this.scenarios = scenarios;
    },
    setScenarioTypes(scenarioTypes) {
      this.scenarioTypes = scenarioTypes;
    },
    setSilos(silos) {
      this.silos = silos;
    },
    setSilosTypes(silosTypes) {
      this.silosTypes = silosTypes;
    },
    setSelectedDevNeed(devNeed) {
      this.selectedDevNeed = devNeed;
    },
    setSelectedDevType(devType) {
      this.selectedDevType = devType;
    },
    setSelectedDev(dev) {
      this.selectedDev = dev;
    },
    setSelectedScenario(scenario) {
      this.selectedScenario = scenario;
    },
    setSelectedScenarioType(scenarioType) {
      this.selectedScenarioType = scenarioType;
    },
    setSelectedSilo(silo) {
      this.selectedSilo = silo;
    },
    setSelectedSilosType(silosType) {
      this.selectedSilosType = silosType;
    },
    resetData() {
      this.devNeeds = [];
      this.devTypes = [];
      this.devs = [];
      this.locations = [];
      this.scenarios = [];
      this.scenarioTypes = [];
      this.silos = [];
      this.silosTypes = [];
      this.selectedDevType = '';
      this.selectedDecNeed = '';
      this.selectedDev = '';
      this.selectedScenario = '';
      this.selectedScenarioType = '';
      this.selectedSilo = '';
      this.selectedSiloType = '';
    }
  },
  persist: true,
});


export const useUserStore = defineStore('user', {
  state: () => ({
    user: '',
    isLoggedIn: false,
    page: 'dashboard',
  }),
  actions: {
    /** @param {boolean} isLoggedIn */
    setLoggedIn(isLoggedIn){
      this.isLoggedIn = isLoggedIn;
    },
    /** @param {string} user */
    setUser(user){
      this.user = user;
    },
     /** @param {string} page */
    setPage(page){
      this.page = page;
    },
    logout() {
      this.user = '';
      this.page = 'dashboard';
      this.isLoggedIn = false;
    }
  },
  persist: true
})

export const useUIStore = defineStore('ui', {
  state: () => ({
    sideBarPointerEvents: 'auto',
  }),
  actions: {
    setSideBarPointerEvents(pointerEvents){
      this.sideBarPointerEvents = pointerEvents;
    }
  },
  persist: false
})