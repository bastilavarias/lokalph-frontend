import moment from "moment";

const commonUtility = {
    methods: {
        formatBirthDate(date) {
            return moment(new Date(date)).format("MMMM DD, YYYY");
        },

        formatRelativeTime(date) {
            return moment(new Date(date)).fromNow();
        },
    },
};

export default commonUtility;
