import throttle from "lodash.throttle";
const STORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const onPlay = function (data) {
    console.log(data);
    onTimeupdate(data);
};
player.on("timeupdate", throttle(onPlay, 1000));
function onTimeupdate(evt) {
    const playTime = evt.seconds;
    localStorage.setItem(STORAGE_KEY, playTime);
}
function gettingTime() {
    const savedTime = +localStorage.getItem(STORAGE_KEY);
    if (savedTime) {
        console.log(savedTime);
        player
            .setCurrentTime(savedTime)
            .then(function (seconds) {
            })
            .catch(function (error) {
                switch (error.name) {
                    case "RangeError":
                        break;
                    default:
                        break;
                }
            });
    }
}
gettingTime();