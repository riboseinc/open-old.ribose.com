/* Add Support for Segmented Control */

Vue.component('tabs', {
    template: `
        <div class="tabs-container">
            <div class="tabs">
                <a v-for="tab in tabs" class="tab" :class="{ 'active-tab': tab.isActive}" :href="tab.href" @click="selectTab(tab)">
                    <p class="tab-name">{{ tab.name }}</p>
                </a>
            </div>
            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,

    data() {
        return { tabs: [] };
    },

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.href == selectedTab.href);
            });
        }
    }
});


Vue.component('tab', {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,

    props: {
        name: { required: true },
        selected: { default: false }
    },

    data() {
        return {
            isActive: false
        };
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected;
    },
});

new Vue({
    el: '#projectTabs'
});
