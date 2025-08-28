import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    devNeeds: [],
    devTypes: [],
    devs: [],
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
    setUser(user){
      this.user = user;
    },
    setLoggedIn(isLoggedIn){
      this.isLoggedIn = isLoggedIn;
    },
    setPage(page){
      this.page = page;
    },
    logout() {
      this.user = '';
      this.isLoggedIn = false;
    }
  },
  persist: true
})