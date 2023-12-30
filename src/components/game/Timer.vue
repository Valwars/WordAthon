<template>
    <div class="timer-container">
        <vue-countdown 
        ref="countdown"

            :time="1 * 1 * 10 * 60 * 1000" 
            :interval="100" 
            @end="timerZero" 
            v-slot="{ minutes, seconds, milliseconds }"
        >
            <span :class="{ 'red-blink': lessThanOneMinute(minutes) }">
                {{ formatTime(minutes, seconds, milliseconds) }}
            </span>
        </vue-countdown>
    </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
    components: {
        VueCountdown,
    },
    data: function() {
        return {
            running: true,
            currentTime: { minutes: 0, seconds: 0, milliseconds: 0 },
        }
    },
    methods: {
        lessThanOneMinute(minutes) {
            return minutes < 1;
        },
        formatTime(minutes, seconds, milliseconds) {
            this.updateCurrentTime(minutes, seconds, milliseconds);
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}:${Math.floor(milliseconds / 100)}`;
        },
        updateCurrentTime(minutes, seconds, milliseconds) {
            this.currentTime = { minutes, seconds, milliseconds };
        },
        timerZero() {
            this.$emit('timerZero');
        },
        getTime() {
            return this.currentTime;
        },
        pauseTimer() {
            if (this.running) {
                this.$refs.countdown.abort();
                this.running = false;
                // Enregistrez le temps restant
                this.timeLeft = this.$refs.countdown.totalMilliseconds;
            }
        },
        resumeTimer() {
            if (!this.running) {
                this.$refs.countdown.start();
                this.running = true;
            }
        },
       
    },
};
</script>

<style>
/* Votre style CSS restant reste inchangé */
.timer-container {
    position: absolute;
    right: 30px;
    top: 30px;
}

.timer-container span {
    color: var(--txt-color) !important;
    font-size: 32px;
}

/* Animation de clignotement reste inchangée */
@keyframes blink {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.3;
    }
}

/* Appliquer l'animation uniquement lorsque le temps est inférieur à une minute reste inchangé */
.timer-container .red-blink {
    color: red !important;
    animation: blink 0.3s infinite alternate;
}
</style>
  