import moment from "moment";
import truncate from "truncate-html";

const commonUtility = {
    methods: {
        formatBirthDate(date) {
            return moment(new Date(date)).format("MMMM DD, YYYY");
        },

        formatDateTime(date) {
            return moment(new Date(date)).format("MMMM DD, YYYY, h:mm a");
        },

        formatRelativeTime(date) {
            return moment(new Date(date)).fromNow();
        },

        formatMoney(type, amount) {
            return new Intl.NumberFormat("en-EN", {
                style: "currency",
                currency: type,
            }).format(amount);
        },

        truncateString(string, count) {
            return truncate(string, count);
        },

        truncateHTML(html, count) {
            return truncate(html, count, { stripTags: true });
        },

        formatDate(date) {
            return moment(new Date(date)).format("dddd, MMMM DD, YYYY");
        },
    },
};

export function debounce(fn, delay) {
    let timeoutID = null;
    return function () {
        clearTimeout(timeoutID);
        let args = arguments;
        let that = this;
        timeoutID = setTimeout(function () {
            fn.apply(that, args);
        }, delay);
    };
}

export default commonUtility;
