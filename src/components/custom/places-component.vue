<template>
    <div>
        <v-autocomplete
            :search-input.sync="search"
            :items="searchResults"
            :outlined="outlined"
            :label="label"
            append-icon="mdi-map-marker-outline"
            item-text="description"
            item-value="place_id"
            autocomplete="new"
            clearable
            @click:clear="placeId = null"
            hint="We use Google's places autocomplete to find your address."
            persistent-hint
            v-model="placeId"
        ></v-autocomplete>
    </div>
</template>

<script>
export default {
    name: "custom-places-component",

    data() {
        return {
            placeId: null,
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

        async placeId(value) {
            // const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${value}&key=${process.env.VUE_APP_GOOGLE_SECRET_KEY}`;
            // const request = {
            //     placeId: value,
            // };
            // this.service.getDetails(request, function (place, status) {
            //     if (
            //         status !== window.google.maps.places.PlacesServiceStatus.OK
            //     ) {
            //         return;
            //     }
            //     console.log(place);
            // });
        },
    },
};
</script>
