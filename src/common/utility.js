import moment from "moment";
import truncate from "truncate-html";

const commonUtility = {
    methods: {
        formatBirthDate(date) {
            return moment(new Date(date)).format("MMMM DD, YYYY");
        },

        formatRelativeTime(date) {
            return moment(new Date(date)).fromNow();
        },

        formatMoney(type, amount) {
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: type,
                maximumSignificantDigits: 3,
            }).format(amount);
        },

        truncateHTML(html, count) {
            return truncate(html, count, { stripTags: true });
        },
    },
};

export default commonUtility;
