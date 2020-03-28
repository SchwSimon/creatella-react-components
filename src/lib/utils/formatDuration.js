import { fillZero } from './fillZero';

/**
 * Formats duration in seconds to days, hours, minutes, etc
 * @param  {Number} duration
 * @param  {Boolean} twoDigits
 * @param  {Array} only
 * @returns {Object}
 */
export function formatDuration(duration, twoDigits, only = []) {
    let seconds = duration;
    const out = {};

    if (!only.length || only.includes('days')) {
        out.days = {
            value: parseInt(seconds / (3600 * 24)),
            label: 'days'
        };
        seconds -= out.days.value * 3600 * 24;
    }

    if (!only.length || only.includes('hours')) {
        out.hours = {
            value: parseInt(seconds / (3600)),
            label: 'hours'
        };
        seconds -= out.hours.value * 3600;
    }

    if (!only.length || only.includes('minutes')) {
        out.minutes = {
            value: parseInt(seconds / (60)),
            label: 'minutes'
        };
        seconds -= out.minutes.value * 60;
    }

    if (!only.length || only.includes('seconds')) {
        out.seconds = {
            value: seconds,
            label: 'seconds'
        };
    }

    if (twoDigits) {
        for (const key in out) {
            out[key].value = fillZero(out[key].value);
        }
    }

    return out;
}
