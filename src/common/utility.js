import moment from "moment";

const commonUtility = {
    methods: {
        formatBirthDate(date) {
            return moment(date).format("MMMM DD, YYYY");
        },
    },
};

export default commonUtility;
