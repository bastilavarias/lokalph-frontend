<template>
    <div>
        <!--                <v-text-field-->
        <!--                    type="text"-->
        <!--                    :outlined="outlined"-->
        <!--                    :label="label"-->
        <!--                    v-model="search"-->
        <!--                    append-icon="mdi-map-marker-outline"-->
        <!--                ></v-text-field>-->
        <!--                <ul>-->
        <!--                    <li v-for="(result, i) in searchResults" :key="i">-->
        <!--                        {{ result }}-->
        <!--                    </li>-->
        <!--                </ul>-->
        <v-autocomplete
            :search-input.sync="search"
            :items="searchResults"
            :outlined="outlined"
            :label="label"
            append-icon="mdi-map-marker-outline"
            item-text="description"
            autocomplete="new"
        ></v-autocomplete>
    </div>
</template>

<script>
export default {
    name: "custom-places-component",

    data() {
        return {
            search: null,
            searchResults: [],
            service: null,
        };
    },

    props: {
        outlined: {
            type: Boolean,
            required: false,
        },

        label: {
            type: String,
            required: false,
        },
    },

    metaInfo() {
        return {
            script: [
                {
                    src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_SECRET_KEY}&libraries=places`,
                    async: true,
                    defer: true,
                    callback: () => this.MapsInit(),
                },
            ],
        };
    },

    methods: {
        MapsInit() {
            this.service = new window.google.maps.places.AutocompleteService();
        },
        displaySuggestions(predictions, status) {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                this.searchResults = [];
                return;
            }
            console.log(predictions);
            this.searchResults = predictions;
        },
    },

    watch: {
        search(value) {
            if (!value) return (this.searchResults = []);
            if (value) {
                this.service.getPlacePredictions(
                    {
                        input: this.search,
                        componentRestrictions: { country: "ph" },
                        types: [],
                    },
                    this.displaySuggestions
                );
            }
        },
    },
};
</script>
