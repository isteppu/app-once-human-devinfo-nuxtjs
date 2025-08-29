import { ref, computed } from "vue";

export function useUi() {
    const isMobileMenuOpen = ref(false);
    const addDevDialogVisible = ref(false);

    const checked = ref(
        // scenarios.map(() => headers.map(() => false))
    );

    const toggleMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const openAddDevDialog = () => {
        addDevDialogVisible.value = true;
    };

    const location = computed(() =>
        checked.value.map((row, rowIndex) => {
            // const loc = row
            //     .map((isChecked, colIndex) => (isChecked ? colIndex : null))
            //     .filter((v) => v !== null);

            return {
                // id: rowIndex,
                // loc: loc.length > 0 ? loc : "none",
            };
        })
    );

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
        // headers,
        checked,

        //state
        isMobileMenuOpen,
        addDevDialogVisible,

        //methods
        toggleMenu,
        openAddDevDialog,
    }
}