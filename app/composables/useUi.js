import { ref, computed } from "vue";
import { useUIStore } from "~/store/user";

const addDevDialogVisible = ref(false);
const editDevDialogVisible = ref(false);
const selectedDev = ref(null);

export function useUi() {
    const isMobileMenuOpen = ref(false);
    const uiStore = useUIStore();

    const toggleMenu = () => {
        if(uiStore.sideBarPointerEvents === 'auto'){
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        }
    };

    const openAddDevDialog = () => {
        uiStore.setSideBarPointerEvents('none')
        addDevDialogVisible.value = true;
    };

    const closeAddDevDialog = () => {
        uiStore.setSideBarPointerEvents('auto')
        addDevDialogVisible.value = false;
    };

    const openEditDevDialog = (dev) => {
        uiStore.setSideBarPointerEvents('none')
        selectedDev.value = dev;
        editDevDialogVisible.value = true;
    };

    const closeEditDevDialog = () => {
        uiStore.setSideBarPointerEvents('auto')
        editDevDialogVisible.value = false;
    };

    const menu = [
        { name: "Dashboard", icon: "mdi:home-outline", page: "dashboard" },
        {
            name: "Deviations", icon: "mage:robot-fill", submenu: [
                { name: "Deviation List", icon: "ic:round-library-books", page: "deviation-list" },
                { name: "Deviation Types", icon: "ic:round-category", page: "deviation-types" },
                { name: "Deviation Needs", icon: "ic:round-list-alt", page: "deviation-needs" },
            ]
        },
        {
            name: "Scenarios", icon: "mdi:world", submenu: [
                { name: "Scenario List", icon: "ic:round-list-alt", page: "scenario-list" },
                { name: "Visional Wheels", icon: "solar:moon-linear", page: "visional-wheels" },
            ]
        },
        { name: "Silos", icon: "material-symbols:door-open-outline-sharp", page: "silos" }

    ];

    return {
        //data
        menu,

        //state
        isMobileMenuOpen,
        addDevDialogVisible,
        editDevDialogVisible,
        selectedDev,

        //methods
        toggleMenu,
        openAddDevDialog,
        closeAddDevDialog,
        openEditDevDialog,
        closeEditDevDialog
    }
}