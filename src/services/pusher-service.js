import Pusher from "pusher-js";

const pusherService = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
});

export default pusherService;
