//script.js

const CATEGORIES = {
    GAME: {
        name: '게임',
        char: 'K',
        stimulation: 100,
        color: '#ff3b30',
        symbol: '🎮',
        desc: '게임패드',
        image: './assets/gamepad.png'
    },
    SNS: {
        name: 'SNS',
        char: '§',
        stimulation: 90,
        color: '#ff9500',
        symbol: '🤳',
        desc: '셀카봉',
        image: './assets/selfie-stick.png'
    },
    VIDEO: {
        name: '영상 매체',
        char: 'P',
        stimulation: 80,
        color: '#ffcc00',
        symbol: '📹',
        desc: '빔프로젝터',
        image: './assets/projector.png'
    },
    SHOPPING: {
        name: '쇼핑',
        char: 'F',
        stimulation: 70,
        color: '#4cd964',
        symbol: '🛍️',
        desc: '가방',
        image: './assets/backpack.png'
    },
    DELIVERY: {
        name: '배달',
        char: '2',
        stimulation: 65,
        color: '#5ac8fa',
        symbol: '🪖',
        desc: '오토바이 헬멧',
        image: './assets/helmet.png'
    },
    MUSIC: {
        name: '음악',
        char: 'M',
        stimulation: 60,
        color: '#007aff',
        symbol: '🎧',
        desc: '헤드셋',
        image: './assets/music.png'
    },
    COMMUNITY: {
        name: '커뮤니티',
        char: 'H',
        stimulation: 55,
        color: '#5856d6',
        symbol: '📢',
        desc: '확성기',
        image: './assets/megaphone.png'
    },
    MESSENGER: {
        name: '메신저',
        char: 'S',
        stimulation: 35,
        color: '#00cbd5',
        symbol: '📻',
        desc: '무전기',
        image: './assets/walkie-talkie.png'
    },
    SEARCH: {
        name: '검색 엔진',
        char: 'G',
        stimulation: 20,
        color: '#8e8e93',
        symbol: '🔍',
        desc: '돋보기',
        image: './assets/magnifying-glass.png'
    }
};

const REAL_SCREEN_TIME_DATA = [
    {
        label: '5/25 월',
        totalMinutes: 426,
        wakeups: 99,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 59 },
            { categoryKey: 'VIDEO', count: 38 },
            { categoryKey: 'MESSENGER', count: 1 },
            { categoryKey: 'SEARCH', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 183 },
            { categoryKey: 'SNS', minutes: 94 },
            { categoryKey: 'MESSENGER', minutes: 4 },
            { categoryKey: 'SEARCH', minutes: 8 }
        ],

        sessions: [
            { start: '00:55', end: '01:00', categoryKey: 'SNS' },
            { start: '06:50', end: '07:05', categoryKey: 'VIDEO' },
            { start: '13:37', end: '13:50', categoryKey: 'SNS' },
            { start: '14:30', end: '15:15', categoryKey: 'SNS' },
            { start: '15:40', end: '15:48', categoryKey: 'SEARCH' },
            { start: '15:50', end: '17:35', categoryKey: 'VIDEO' },
            { start: '18:12', end: '18:27', categoryKey: 'SNS' },
            { start: '23:00', end: '23:27', categoryKey: 'VIDEO' },
            { start: '23:27', end: '23:30', categoryKey: 'MESSENGER' },
            { start: '23:30', end: '24:00', categoryKey: 'VIDEO' }
        ]
    },

    {
        label: '5/26 화',
        totalMinutes: 329,
        wakeups: 114,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 66 },
            { categoryKey: 'VIDEO', count: 43 },
            { categoryKey: 'MESSENGER', count: 2 },
            { categoryKey: 'SEARCH', count: 1 },
            { categoryKey: 'GAME', count: 1 },
            { categoryKey: 'SHOPPING', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 149 },
            { categoryKey: 'SNS', minutes: 80 },
            { categoryKey: 'MESSENGER', minutes: 14 },
            { categoryKey: 'SEARCH', minutes: 12 },
            { categoryKey: 'GAME', minutes: 12 },
            { categoryKey: 'SHOPPING', minutes: 8 }
        ],

        sessions: [
            { start: '00:00', end: '00:11', categoryKey: 'SEARCH' },
            { start: '00:11', end: '00:16', categoryKey: 'SHOPPING' },
            { start: '00:45', end: '01:05', categoryKey: 'SNS' },
            { start: '01:05', end: '01:10', categoryKey: 'MESSENGER' },
            { start: '01:15', end: '02:30', categoryKey: 'VIDEO' },
            { start: '02:47', end: '02:52', categoryKey: 'SNS' },
            { start: '10:36', end: '10:47', categoryKey: 'SNS' },
            { start: '11:30', end: '11:40', categoryKey: 'SNS' },
            { start: '12:00', end: '12:30', categoryKey: 'VIDEO' },
            { start: '12:50', end: '13:05', categoryKey: 'SNS' },
            { start: '13:05', end: '13:10', categoryKey: 'VIDEO' },
            { start: '15:03', end: '15:05', categoryKey: 'SNS' },
            { start: '17:03', end: '17:04', categoryKey: 'SNS' },
            { start: '17:04', end: '17:16', categoryKey: 'GAME' },
            { start: '17:16', end: '17:20', categoryKey: 'MESSENGER' },
            { start: '22:00', end: '22:05', categoryKey: 'SNS' }
        ]
    },

    {
        label: '5/27 수',
        totalMinutes: 338,
        wakeups: 133,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 84 },
            { categoryKey: 'VIDEO', count: 46 },
            { categoryKey: 'MESSENGER', count: 1 },
            { categoryKey: 'GAME', count: 1 },
            { categoryKey: 'SEARCH', count: 1 }
        ],

        categories: [
            { categoryKey: 'SNS', minutes: 107 },
            { categoryKey: 'MESSENGER', minutes: 15 },
            { categoryKey: 'VIDEO', minutes: 104 },
            { categoryKey: 'GAME', minutes: 37 },
            { categoryKey: 'SEARCH', minutes: 11 }
        ],

        sessions: [
            { start: '00:35', end: '00:50', categoryKey: 'MESSENGER' },
            { start: '00:50', end: '01:05', categoryKey: 'SNS' },
            { start: '01:55', end: '02:00', categoryKey: 'VIDEO' },
            { start: '02:00', end: '02:05', categoryKey: 'SNS' },
            { start: '02:05', end: '02:45', categoryKey: 'VIDEO' },
            { start: '11:43', end: '12:30', categoryKey: 'SNS' },
            { start: '12:30', end: '13:07', categoryKey: 'GAME' },
            { start: '14:13', end: '14:14', categoryKey: 'SNS' },
            { start: '15:38', end: '15:40', categoryKey: 'SNS' },
            { start: '15:40', end: '15:51', categoryKey: 'SEARCH' },
            { start: '15:55', end: '16:33', categoryKey: 'VIDEO' },
            { start: '16:33', end: '16:43', categoryKey: 'SNS' },
            { start: '16:44', end: '17:05', categoryKey: 'VIDEO' },
            { start: '19:00', end: '19:17', categoryKey: 'SNS' }
        ]
    },

    {
        label: '5/28 목',
        totalMinutes: 313,
        wakeups: 115,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 62 },
            { categoryKey: 'VIDEO', count: 50 },
            { categoryKey: 'SEARCH', count: 2 },
            { categoryKey: 'MESSENGER', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 150 },
            { categoryKey: 'SNS', minutes: 69 },
            { categoryKey: 'MESSENGER', minutes: 3 },
            { categoryKey: 'SEARCH', minutes: 48 }
        ],

        sessions: [
            { start: '00:45', end: '01:19', categoryKey: 'SNS' },
            { start: '01:19', end: '02:50', categoryKey: 'VIDEO' },
            { start: '02:50', end: '03:05', categoryKey: 'SNS' },
            { start: '08:49', end: '08:57', categoryKey: 'SEARCH' },
            { start: '08:57', end: '09:00', categoryKey: 'MESSENGER' },
            { start: '23:20', end: '23:43', categoryKey: 'VIDEO' },
            { start: '23:43', end: '23:50', categoryKey: 'SNS' },
            { start: '23:50', end: '24:00', categoryKey: 'SEARCH' }
        ]
    },

    {
        label: '5/29 금',
        totalMinutes: 324,
        wakeups: 174,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 92 },
            { categoryKey: 'VIDEO', count: 77 },
            { categoryKey: 'MESSENGER', count: 3 },
            { categoryKey: 'SEARCH', count: 1 },
            { categoryKey: 'GAME', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 117 },
            { categoryKey: 'SNS', minutes: 80 },
            { categoryKey: 'MESSENGER', minutes: 14 },
            { categoryKey: 'SEARCH', minutes: 26 },
            { categoryKey: 'GAME', minutes: 12 }
        ],

        sessions: [
            { start: '00:00', end: '00:25', categoryKey: 'SNS' },
            { start: '00:25', end: '01:35', categoryKey: 'VIDEO' },
            { start: '01:35', end: '01:40', categoryKey: 'SNS' },
            { start: '10:45', end: '11:10', categoryKey: 'SNS' },
            { start: '11:10', end: '11:22', categoryKey: 'GAME' },
            { start: '13:44', end: '14:24', categoryKey: 'VIDEO' },
            { start: '14:30', end: '14:45', categoryKey: 'SNS' },
            { start: '14:50', end: '14:52', categoryKey: 'MESSENGER' },
            { start: '14:52', end: '15:18', categoryKey: 'SEARCH' },
            { start: '17:00', end: '17:02', categoryKey: 'MESSENGER' },
            { start: '18:00', end: '18:10', categoryKey: 'MESSENGER' }
        ]
    },

    {
        label: '5/30 토',
        totalMinutes: 345,
        wakeups: 147,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 96 },
            { categoryKey: 'VIDEO', count: 48 },
            { categoryKey: 'MESSENGER', count: 1 },
            { categoryKey: 'SEARCH', count: 1 },
            { categoryKey: 'GAME', count: 1 }
        ],

        categories: [
            { categoryKey: 'SNS', minutes: 130 },
            { categoryKey: 'MESSENGER', minutes: 12 },
            { categoryKey: 'VIDEO', minutes: 96 },
            { categoryKey: 'GAME', minutes: 23 },
            { categoryKey: 'SEARCH', minutes: 14 }
        ],

        sessions: [
            { start: '08:21', end: '08:26', categoryKey: 'SNS' },
            { start: '09:00', end: '09:10', categoryKey: 'SNS' },
            { start: '09:10', end: '09:22', categoryKey: 'MESSENGER' },
            { start: '11:37', end: '11:45', categoryKey: 'SNS' },
            { start: '12:02', end: '12:45', categoryKey: 'SNS' },
            { start: '13:10', end: '13:55', categoryKey: 'VIDEO' },
            { start: '14:00', end: '14:30', categoryKey: 'VIDEO' },
            { start: '15:30', end: '16:00', categoryKey: 'SNS' },
            { start: '18:00', end: '18:14', categoryKey: 'SNS' },
            { start: '18:14', end: '18:31', categoryKey: 'VIDEO' },
            { start: '18:35', end: '18:44', categoryKey: 'SEARCH' },
            { start: '21:37', end: '22:00', categoryKey: 'GAME' },
            { start: '23:40', end: '24:00', categoryKey: 'SNS' }
        ]
    },

    {
        label: '5/31 일',
        totalMinutes: 432,
        wakeups: 98,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 60 },
            { categoryKey: 'VIDEO', count: 34 },
            { categoryKey: 'MESSENGER', count: 2 },
            { categoryKey: 'SEARCH', count: 1 },
            { categoryKey: 'GAME', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 186 },
            { categoryKey: 'SNS', minutes: 75 },
            { categoryKey: 'MESSENGER', minutes: 7 },
            { categoryKey: 'SEARCH', minutes: 38 },
            { categoryKey: 'GAME', minutes: 14 }
        ],

        sessions: [
            { start: '00:00', end: '00:37', categoryKey: 'VIDEO' },
            { start: '00:37', end: '01:20', categoryKey: 'SNS' },
            { start: '10:13', end: '10:15', categoryKey: 'MESSENGER' },
            { start: '12:15', end: '12:37', categoryKey: 'SEARCH' },
            { start: '16:50', end: '17:50', categoryKey: 'VIDEO' },
            { start: '17:50', end: '18:10', categoryKey: 'SNS' },
            { start: '18:10', end: '18:24', categoryKey: 'GAME' },
            { start: '18:34', end: '18:39', categoryKey: 'MESSENGER' },
            { start: '21:43', end: '22:43', categoryKey: 'VIDEO' }
        ]
    },

    {
        label: '6/1 월',
        totalMinutes: 296,
        wakeups: 142,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 79 },
            { categoryKey: 'VIDEO', count: 59 },
            { categoryKey: 'MESSENGER', count: 2 },
            { categoryKey: 'COMMUNITY', count: 1 },
            { categoryKey: 'SEARCH', count: 1 }
        ],

        categories: [
            { categoryKey: 'VIDEO', minutes: 94 },
            { categoryKey: 'SNS', minutes: 68 },
            { categoryKey: 'MESSENGER', minutes: 16 },
            { categoryKey: 'SEARCH', minutes: 20 },
            { categoryKey: 'COMMUNITY', minutes: 5 }
        ],

        sessions: [
            { start: '00:37', end: '00:45', categoryKey: 'MESSENGER' },
            { start: '00:45', end: '01:35', categoryKey: 'VIDEO' },
            { start: '01:35', end: '02:10', categoryKey: 'SNS' },
            { start: '09:23', end: '09:30', categoryKey: 'SNS' },
            { start: '09:33', end: '09:41', categoryKey: 'MESSENGER' },
            { start: '09:45', end: '09:50', categoryKey: 'SNS' },
            { start: '10:12', end: '10:20', categoryKey: 'SNS' },
            { start: '11:10', end: '11:15', categoryKey: 'SNS' },
            { start: '12:32', end: '13:11', categoryKey: 'VIDEO' },
            { start: '13:30', end: '13:41', categoryKey: 'SEARCH' },
            { start: '19:36', end: '19:41', categoryKey: 'COMMUNITY' }
        ]
    },

    {
        label: '6/2 화',
        totalMinutes: 332,
        wakeups: 199,
        wakeupsDetail: [
            { categoryKey: 'SNS', count: 113 },
            { categoryKey: 'VIDEO', count: 81 },
            { categoryKey: 'GAME', count: 2 },
            { categoryKey: 'MESSENGER', count: 2 },
            { categoryKey: 'SEARCH', count: 1 }
        ],

        categories: [
            { categoryKey: 'SNS', minutes: 82 },
            { categoryKey: 'MESSENGER', minutes: 19 },
            { categoryKey: 'VIDEO', minutes: 59 },
            { categoryKey: 'GAME', minutes: 58 },
            { categoryKey: 'SEARCH', minutes: 14 }
        ],

        sessions: [
            { start: '00:24', end: '00:35', categoryKey: 'MESSENGER' },
            { start: '00:42', end: '01:00', categoryKey: 'GAME' },
            { start: '01:00', end: '01:45', categoryKey: 'SNS' },
            { start: '01:45', end: '02:30', categoryKey: 'VIDEO' },
            { start: '09:15', end: '09:30', categoryKey: 'SNS' },
            { start: '09:30', end: '10:10', categoryKey: 'GAME' },
            { start: '10:13', end: '10:20', categoryKey: 'SNS' },
            { start: '10:20', end: '10:28', categoryKey: 'MESSENGER' },
            { start: '15:41', end: '15:54', categoryKey: 'VIDEO' },
            { start: '21:43', end: '21:48', categoryKey: 'SEARCH' }
        ]
    }
];

const DATE_ANGLE_STEP = -Math.PI / 2;

const DATES_CONFIG = REAL_SCREEN_TIME_DATA.map((day, idx) => ({
    label: day.label,
    localAngle: idx * DATE_ANGLE_STEP
}));

let currentStep = 0;
let currentDateIdx = 0;
let generatedData = [];

let rotationAngle = Math.PI / 2;
let targetRotation = Math.PI / 2;
let currentScale = 1.0;
let targetScale = 1.0;

let flattenProgress = 0;
let heightProgress = 0;
let colorProgress = 0;

let focusedCategory = null;

let isDragging = false;
let wasDragged = false;
let startX = 0;

const canvas = document.getElementById('barcode-canvas');
const ctx = canvas.getContext('2d');

const FLAT_BARCODE_HALF_RATIO = 0.42;
const BARCODE_ANGLE_HALF_RANGE = Math.PI / 7;
const BARCODE_ANGLE_FULL_RANGE = BARCODE_ANGLE_HALF_RANGE * 2;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');

    return {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16)
    };
}

function blendHexColor(fromHex, toHex, t) {
    const from = hexToRgb(fromHex);
    const to = hexToRgb(toHex);

    const r = Math.round(lerp(from.r, to.r, t));
    const g = Math.round(lerp(from.g, to.g, t));
    const b = Math.round(lerp(from.b, to.b, t));

    return `rgb(${r}, ${g}, ${b})`;
}

function timeToMinutes(timeString) {
    const [hour, minute] = timeString.split(':').map(Number);

    if (hour === 24) {
        return 1440;
    }

    return hour * 60 + minute;
}

function getDurationMinutes(start, end) {
    const startMinutes = timeToMinutes(start);
    let endMinutes = timeToMinutes(end);

    if (endMinutes < startMinutes) {
        endMinutes += 1440;
    }

    return endMinutes - startMinutes;
}

function generateBarcodeGroupFromSessions(dayData) {
    const visualBars = [];

    const minAngle = -BARCODE_ANGLE_HALF_RANGE;
    const maxAngle = BARCODE_ANGLE_HALF_RANGE;
    const angleRange = maxAngle - minAngle;

    const gapAngle = 0.0012;

    dayData.sessions.forEach(session => {
        const category = CATEGORIES[session.categoryKey];

        if (!category) {
            console.warn(`Unknown category key: ${session.categoryKey}`);
            return;
        }

        const startMinutes = timeToMinutes(session.start);
        const duration = getDurationMinutes(session.start, session.end);
        const endMinutes = startMinutes + duration;

        const startRatio = startMinutes / 1440;
        const endRatio = endMinutes / 1440;
        const centerRatio = (startRatio + endRatio) / 2;

        const startAngle = minAngle + startRatio * angleRange;
        const endAngle = minAngle + endRatio * angleRange;
        const centerAngle = minAngle + centerRatio * angleRange;

        const rawWidth = endAngle - startAngle;
        const width = Math.max(0.0008, rawWidth - gapAngle);

        visualBars.push({
            offsetAngle: centerAngle,
            width,
            category,
            duration,
            start: session.start,
            end: session.end,
            categoryKey: session.categoryKey
        });
    });

    return visualBars;
}

function initTimeline() {
    const timeline = document.getElementById('timeline-labels');
    timeline.innerHTML = '';

    for (let i = 0; i <= 24; i++) {
        const span = document.createElement('span');
        span.innerText = i.toString().padStart(2, '0');

        const ratio = i / 24;

        span.style.position = 'absolute';
        span.style.left = `${ratio * 100}%`;
        span.style.transform = 'translateX(-50%)';

        if (i === 0) {
            span.style.transform = 'translateX(0)';
        }

        if (i === 24) {
            span.style.transform = 'translateX(-100%)';
        }

        timeline.appendChild(span);
    }
}

function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
}

function drawBarcodeSticker(day, isFocusedDay, dayAlpha, radiusX, radiusY, puckHeight, w) {
    if (currentStep >= 4) return;

    let stickerFadeAlpha = 1;

    if (currentStep >= 3) {
        stickerFadeAlpha = Math.max(0, 1 - heightProgress * 2.5);
    } else if (heightProgress > 0.001) {
        stickerFadeAlpha = Math.max(0, 1 - heightProgress * 4);
    }

    if (stickerFadeAlpha <= 0.01) return;

    if (dayAlpha <= 0) return;

    const stickerHeight = puckHeight * 0.82;
    const stickerYOffset = 0;

    const t = isFocusedDay ? flattenProgress : 0;

    const stickerRangeScale = lerp(1.2, 1.0, t);

    const minOffset = -BARCODE_ANGLE_HALF_RANGE * stickerRangeScale;
    const maxOffset = BARCODE_ANGLE_HALF_RANGE * stickerRangeScale;
    const segmentCount = 200;

    const segments = [];

    for (let i = 0; i < segmentCount; i++) {
        const ratio = i / (segmentCount - 1);
        const offset = minOffset + (maxOffset - minOffset) * ratio;

        let globalAngle = (day.localAngle - offset + rotationAngle) % (Math.PI * 2);

        if (globalAngle < 0) {
            globalAngle += Math.PI * 2;
        }

        const sinA = Math.sin(globalAngle);
        const cosA = Math.cos(globalAngle);

        const visible3D = sinA > 0;
        const shouldDraw = visible3D || (isFocusedDay && flattenProgress > 0.35);

        if (!shouldDraw) continue;

        const x3D = cosA * radiusX;
        const y3D = radiusY * sinA + stickerYOffset;

        const spreadRatio = offset / BARCODE_ANGLE_HALF_RANGE;
        const flatHalfWidth = (w * FLAT_BARCODE_HALF_RATIO) / currentScale;
        const xFlat = spreadRatio * flatHalfWidth;
        const yFlat = stickerYOffset;

        const x = lerp(x3D, xFlat, t);
        const y = lerp(y3D, yFlat, t);

        const width3D = Math.max(5, radiusX * 0.02 * Math.max(sinA, 0.2));
        const flatFullWidth = flatHalfWidth * 2;
        const widthFlat =
            ((maxOffset - minOffset) / segmentCount / BARCODE_ANGLE_FULL_RANGE)
            * flatFullWidth
            * 1.35;

        const segmentWidth = lerp(width3D, widthFlat, t);

        const alpha3D = Math.min(1, Math.max(0, sinA) * 2.2) * dayAlpha;
        const alphaFlat = isFocusedDay ? 1.0 : 0;
        const finalAlpha = lerp(alpha3D, alphaFlat, t);

        if (finalAlpha <= 0.01) continue;

        segments.push({
            x,
            y,
            width: segmentWidth,
            alpha: finalAlpha
        });
    }

    if (segments.length === 0) return;

    ctx.save();

    if (currentStep >= 1 && isFocusedDay) {
        let minX = Infinity;
        let maxX = -Infinity;
        let totalY = 0;

        segments.forEach(seg => {
            minX = Math.min(minX, seg.x - seg.width / 2);
            maxX = Math.max(maxX, seg.x + seg.width / 2);
            totalY += seg.y;
        });

        const rectPaddingX = 40;
        const rectX = minX - rectPaddingX;
        const rectWidth = (maxX - minX) + rectPaddingX * 2;
        const rectY = (totalY / segments.length) - stickerHeight / 2;

        let shadowReturnAlphaScale = 1;

        if (currentStep < 3 && heightProgress > 0.001) {
            shadowReturnAlphaScale = Math.max(
                0,
                Math.min(1, (stickerFadeAlpha - 0.85) / 0.15)
            );
        }

        const shadowAlpha = currentStep >= 3
            ? 0
            : 0.16 * stickerFadeAlpha * shadowReturnAlphaScale;

        const borderAlpha = currentStep >= 3
            ? 0
            : 0.08 * stickerFadeAlpha * shadowReturnAlphaScale;

        ctx.globalAlpha = shadowAlpha;
        ctx.fillStyle = '#000000';
        ctx.fillRect(
            rectX + 2,
            rectY + 3,
            rectWidth,
            stickerHeight
        );

        ctx.globalAlpha = 1.0 * stickerFadeAlpha;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
            rectX,
            rectY,
            rectWidth,
            stickerHeight
        );

        ctx.globalAlpha = borderAlpha;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            rectX,
            rectY,
            rectWidth,
            stickerHeight
        );
    }

    const oldStickerAlphaScale = currentStep >= 1
        ? Math.max(0, 1 - Math.max(0, (t - 0.82) / 0.18))
        : 1;

    if (oldStickerAlphaScale > 0) {
        segments.forEach(seg => {
            ctx.globalAlpha = seg.alpha * oldStickerAlphaScale * stickerFadeAlpha;
            ctx.fillStyle = '#ffffff';

            ctx.fillRect(
                seg.x - seg.width / 2,
                seg.y - stickerHeight / 2,
                seg.width,
                stickerHeight
            );
        });
    }

    ctx.restore();
}

function drawSolidPuck() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);

    const radiusX = w * 0.46;
    const radiusY = radiusX * 0.09;
    const puckHeight = h * 0.55;
    const centerX = w / 2;
    const centerY = h / 2;

    const dialAlpha = Math.max(0, 1 - flattenProgress * 1.5);
    const drawDial = dialAlpha > 0.01;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(currentScale, currentScale);

    if (drawDial) {
        ctx.globalAlpha = dialAlpha;
        ctx.beginPath();
        ctx.moveTo(-radiusX, -puckHeight / 2);
        ctx.ellipse(0, -puckHeight / 2, radiusX, radiusY, 0, Math.PI, 0, true);
        ctx.lineTo(radiusX, puckHeight / 2);
        ctx.ellipse(0, puckHeight / 2, radiusX, radiusY, 0, 0, Math.PI, false);
        ctx.closePath();

        ctx.fillStyle = '#f2f4f8';
        ctx.fill();
    }

    const drawQueue = [];

    generatedData.forEach(day => {
        if (currentStep === 0 && Math.abs(day.dateIdx - currentDateIdx) > 2) {
            return;
        }

        const isFocusedDay = day.dateIdx === currentDateIdx;
        const dayAlpha = isFocusedDay ? 1.0 : dialAlpha;

        if (dayAlpha <= 0) return;

        drawBarcodeSticker(
            day,
            isFocusedDay,
            dayAlpha,
            radiusX,
            radiusY,
            puckHeight,
            w
        );

        day.bars.forEach(bar => {
            let globalAngle = (day.localAngle - bar.offsetAngle + rotationAngle) % (Math.PI * 2);

            if (globalAngle < 0) {
                globalAngle += Math.PI * 2;
            }

            const sinA = Math.sin(globalAngle);
            const cosA = Math.cos(globalAngle);

            if (sinA > 0 || (isFocusedDay && flattenProgress > 0.5)) {
                drawQueue.push({
                    bar,
                    sinA,
                    cosA,
                    isFocusedDay,
                    dayAlpha
                });
            }
        });
    });

    drawQueue.sort((a, b) => a.sinA - b.sinA);

    drawQueue.forEach(item => {
        const { bar, sinA, cosA, isFocusedDay, dayAlpha } = item;

        const xPos3D = cosA * radiusX;
        const width3D = Math.max(1.5, bar.width * radiusX * sinA);
        const yOffset3D = radiusY * sinA;
        const alpha3D = Math.min(1, sinA * 1.5) * dayAlpha;

        let xPosFlat = 0;
        let widthFlat = 0;
        let yOffsetFlat = 0;
        let alphaFlat = 0;

        if (isFocusedDay) {
            const spreadRatio = bar.offsetAngle / BARCODE_ANGLE_HALF_RANGE;
            const flatHalfWidth = (w * FLAT_BARCODE_HALF_RATIO) / currentScale;
            const flatFullWidth = flatHalfWidth * 2;

            xPosFlat = spreadRatio * flatHalfWidth;
            widthFlat = (bar.width / BARCODE_ANGLE_FULL_RANGE) * flatFullWidth;

            alphaFlat = 1.0;
        }

        const t = isFocusedDay ? flattenProgress : 0;
        const xPos = lerp(xPos3D, xPosFlat, t);
        const barWidth = lerp(width3D, widthFlat, t);
        const yCenterOffset = lerp(yOffset3D, yOffsetFlat, t);
        const finalAlpha = lerp(alpha3D, alphaFlat, t);

        if (finalAlpha <= 0.01) return;

        let barColor = '#111111';

        if (isFocusedDay) {
            barColor = blendHexColor('#111111', bar.category.color, colorProgress);
        }

        if (focusedCategory && isFocusedDay && currentStep >= 2) {
            if (bar.category.name !== focusedCategory) {
                barColor = 'rgba(0,0,0,0.15)';
            }
        }

        const baseH = puckHeight * 0.65;
        let targetH = baseH;

        if (isFocusedDay && (currentStep >= 3 || heightProgress > 0.001)) {
            const currentDayData = generatedData[currentDateIdx].rawData;
            const heightRatio = getWakeupHeightRatio(currentDayData, bar.categoryKey);

            targetH = baseH * heightRatio;
        }

        const barH = isFocusedDay ? lerp(baseH, targetH, heightProgress) : baseH;
        const yTop = yCenterOffset - barH / 2;

        ctx.fillStyle = barColor;
        ctx.globalAlpha = finalAlpha;
        ctx.fillRect(xPos - barWidth / 2, yTop, barWidth, barH);
    });

    if (drawDial) {
        ctx.globalAlpha = dialAlpha;

        ctx.beginPath();
        ctx.ellipse(0, -puckHeight / 2, radiusX, radiusY, 0, 0, Math.PI * 2);

        const topGrad = ctx.createRadialGradient(
            0,
            -puckHeight / 2,
            radiusX * 0.1,
            0,
            -puckHeight / 2,
            radiusX
        );

        topGrad.addColorStop(0, '#ffffff');
        topGrad.addColorStop(1, '#e4e7f0');

        ctx.fillStyle = topGrad;
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(200,200,200,0.5)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-radiusX, -puckHeight / 2);
        ctx.ellipse(0, -puckHeight / 2, radiusX, radiusY, 0, Math.PI, 0, true);
        ctx.lineTo(radiusX, puckHeight / 2);
        ctx.ellipse(0, puckHeight / 2, radiusX, radiusY, 0, 0, Math.PI, false);
        ctx.closePath();

        const frontGrad = ctx.createLinearGradient(-radiusX, 0, radiusX, 0);

        frontGrad.addColorStop(0, 'rgba(0,0,0,0.08)');
        frontGrad.addColorStop(0.2, 'rgba(255,255,255,0.35)');
        frontGrad.addColorStop(0.5, 'transparent');
        frontGrad.addColorStop(0.85, 'rgba(0,0,0,0.035)');
        frontGrad.addColorStop(1, 'rgba(0,0,0,0.12)');

        if (currentStep !== 0) {
            ctx.fillStyle = frontGrad;
            ctx.fill();
        }
    }

    ctx.globalAlpha = 1.0;
    ctx.restore();
}

function calculateMetrics() {
    const dayData = generatedData[currentDateIdx].rawData;

    const totalMinutes = dayData.totalMinutes;
    const catAnalysis = {};

    Object.keys(CATEGORIES).forEach(key => {
        const category = CATEGORIES[key];
        catAnalysis[category.name] = {
            minutes: 0,
            config: category
        };
    });

    dayData.categories.forEach(item => {
        const category = CATEGORIES[item.categoryKey];

        if (!category) {
            console.warn(`Unknown category key: ${item.categoryKey}`);
            return;
        }

        catAnalysis[category.name].minutes += item.minutes;
    });

    const totalCost = totalMinutes * 100;

    let maxCategoryName = '';
    let maxMinutes = -1;

    Object.keys(catAnalysis).forEach(name => {
        if (catAnalysis[name].minutes > maxMinutes) {
            maxMinutes = catAnalysis[name].minutes;
            maxCategoryName = name;
        }
    });

    const mainCategory = catAnalysis[maxCategoryName]?.config || CATEGORIES.GAME;

    document.getElementById('receipt-date').innerText = dayData.label;
    document.getElementById('receipt-total-time').innerText = totalMinutes;
    document.getElementById('receipt-total-cost').innerText = `₩${totalCost.toLocaleString()}`;

    document.getElementById('receipt-product-image').src = mainCategory.image;
    document.getElementById('receipt-product-image').alt = mainCategory.desc;

    document.getElementById('receipt-interpretation').innerHTML =
        `오늘 구매한 디지털 상품: <strong>${mainCategory.desc}</strong><br><br>
        가장 많이 소비한 <strong>[${mainCategory.name}]</strong> 영역에<br>당신의 오늘 하루가 지불되었습니다.`;

    const listContainer = document.getElementById('receipt-items');
    listContainer.innerHTML = '';

    Object.keys(catAnalysis).forEach(name => {
        const item = catAnalysis[name];

        if (item.minutes > 0) {
            const individualCost = item.minutes * item.config.stimulation;

            const div = document.createElement('div');
            div.className = 'receipt-item';
            div.innerHTML = `
                <div class="item-name">
                    <span style="color:${item.config.color}">${item.config.symbol}</span>
                    <span>${name}</span>
                    <span class="item-time">(${item.minutes}m)</span>
                </div>
                <div>${item.config.char} ${individualCost.toLocaleString()}</div>
            `;

            div.onclick = (e) => {
                e.stopPropagation();

                if (focusedCategory === name) {
                    focusedCategory = null;
                    document.querySelectorAll('.receipt-item').forEach(el => el.classList.remove('active'));
                } else {
                    focusedCategory = name;
                    document.querySelectorAll('.receipt-item').forEach(el => el.classList.remove('active'));
                    div.classList.add('active');
                }
            };

            listContainer.appendChild(div);
        }
    });

    drawReceiptMiniBarcode();
}

function updateStepUI() {
    document.body.className = `step-${currentStep}`;

    const stepTexts = [
        "다이얼을 돌려 날짜를 고르세요",
        "1단계: 원본 바코드 확인",
        "2단계: 카테고리 색상 해석",
        "3단계: 화면 깨운 횟수 반영",
        "4단계: 디지털 소비 영수증 발급 완료"
    ];
    document.getElementById('step-indicator').innerText = stepTexts[currentStep];

    const guideText = document.getElementById('guide-text');

    if (currentStep <= 3) {
        guideText.innerText = "";
    } else {
        guideText.innerText = "영수증의 항목을 클릭하여 집중 분석해보세요.";
    }

    if (currentStep === 0) {
        document.getElementById('date-navigation').classList.remove('hidden');
        document.getElementById('back-to-spin-btn').classList.add('hidden');
    } else {
        document.getElementById('date-navigation').classList.add('hidden');
        document.getElementById('back-to-spin-btn').classList.remove('hidden');
    }

    const dashboard = document.getElementById('result-dashboard');
    if (currentStep === 4) {
        dashboard.classList.remove('hidden');
        setTimeout(() => dashboard.classList.add('visible'), 50);
        calculateMetrics();
    } else {
        dashboard.classList.remove('visible');
        dashboard.classList.add('hidden');
        focusedCategory = null;
    }
}

function snapToCurrentDate() {
    targetRotation = Math.PI / 2 - generatedData[currentDateIdx].localAngle;

    const dateLabel = DATES_CONFIG[currentDateIdx].label;
    document.getElementById('date-indicator').innerText = dateLabel;
}

function snapIndexFromRotation() {
    const rawIndex = Math.round((Math.PI / 2 - rotationAngle) / DATE_ANGLE_STEP);

    if (rawIndex < 0) {
        currentDateIdx = 0;
    } else if (rawIndex >= DATES_CONFIG.length) {
        currentDateIdx = DATES_CONFIG.length - 1;
    } else {
        currentDateIdx = rawIndex;
    }

    snapToCurrentDate();
    updateCategoryLegend();
}

function changeDateView(direction) {
    if (direction === 'next') {
        if (currentDateIdx >= DATES_CONFIG.length - 1) return;
        currentDateIdx++;
    } else if (direction === 'prev') {
        if (currentDateIdx <= 0) return;
        currentDateIdx--;
    }

    snapToCurrentDate();
    updateCategoryLegend();
}

function resetToCarousel() {
    currentStep = 0;
    targetScale = 1.0;
    flattenProgress = 0;
    colorProgress = 0;
    heightProgress = 0;
    focusedCategory = null;
    updateStepUI();
}

function setupEvents() {
    document.getElementById('prev-date-btn').addEventListener('click', () => changeDateView('prev'));
    document.getElementById('next-date-btn').addEventListener('click', () => changeDateView('next'));
    document.getElementById('back-to-spin-btn').addEventListener('click', resetToCarousel);

    const wrapper = document.getElementById('canvas-wrapper');

    wrapper.addEventListener('mousedown', (e) => {
        if (currentStep >= 1) return;

        isDragging = true;
        wasDragged = false;
        startX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;

        if (Math.abs(deltaX) > 3) {
            wasDragged = true;
        }

        startX = e.clientX;

        targetRotation += (deltaX / canvas.width) * Math.PI * 2;
        rotationAngle = targetRotation;
    });

    window.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;

            snapIndexFromRotation();
        }

        if (!wasDragged && e.target.closest('#canvas-wrapper')) {
            if (currentStep < 4) {
                currentStep++;

                if (currentStep === 1) {
                    targetScale = 1.00;
                }

                snapToCurrentDate();
                updateStepUI();
            }
        }
    });

    wrapper.addEventListener('touchstart', (e) => {
        if (currentStep >= 1) return;

        isDragging = true;
        wasDragged = false;
        startX = e.touches[0].clientX;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - startX;

        if (Math.abs(deltaX) > 3) {
            wasDragged = true;
        }

        startX = e.touches[0].clientX;

        targetRotation += (deltaX / canvas.width) * Math.PI * 2;
        rotationAngle = targetRotation;
    });

    window.addEventListener('touchend', (e) => {
        if (!isDragging) return;

        isDragging = false;

        snapIndexFromRotation();

        if (!wasDragged) {
            if (currentStep < 4) {
                currentStep++;

                if (currentStep === 1) {
                    targetScale = 1.00;
                }

                snapToCurrentDate();
                updateStepUI();
            }
        }
    });

    window.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement?.tagName?.toLowerCase();

        if (activeTag === 'input' || activeTag === 'textarea') {
            return;
        }

        if (currentStep === 0) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                changeDateView('prev');
                return;
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                changeDateView('next');
                return;
            }
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();

            if (currentStep < 4) {
                currentStep++;

                if (currentStep === 1) {
                    targetScale = 1.00;
                }

                snapToCurrentDate();
                updateStepUI();
            }

            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();

            if (currentStep > 0) {
                currentStep--;

                if (currentStep === 0) {
                    targetScale = 1.0;
                    focusedCategory = null;
                }

                snapToCurrentDate();
                updateStepUI();
            }

            return;
        }
    });

    window.addEventListener('resize', initCanvas);
}

function animationLoop() {
    rotationAngle += (targetRotation - rotationAngle) * 0.15;
    currentScale += (targetScale - currentScale) * 0.15;

    const targetFlatten = currentStep >= 1 ? 1.0 : 0.0;
    flattenProgress += (targetFlatten - flattenProgress) * 0.08;

    const targetColorProgress = currentStep >= 2 ? 1.0 : 0.0;
    colorProgress += (targetColorProgress - colorProgress) * 0.1;

    const targetHeightProgress = currentStep >= 3 ? 1.0 : 0.0;
    heightProgress += (targetHeightProgress - heightProgress) * 0.05;

    drawSolidPuck();
    requestAnimationFrame(animationLoop);
}

window.addEventListener('DOMContentLoaded', () => {
    initTimeline();

    DATES_CONFIG.forEach((cfg, idx) => {
        generatedData.push({
            dateIdx: idx,
            localAngle: cfg.localAngle,
            bars: generateBarcodeGroupFromSessions(REAL_SCREEN_TIME_DATA[idx]),
            rawData: REAL_SCREEN_TIME_DATA[idx]
        });
    });

    updateCategoryLegend();

    setTimeout(() => {
        initCanvas();
        updateStepUI();
        snapToCurrentDate();
        requestAnimationFrame(animationLoop);
    }, 50);

    setupEvents();
});

function updateCategoryLegend() {
    const legend = document.getElementById('category-legend');
    if (!legend) return;

    legend.innerHTML = '';

    const currentDay = generatedData[currentDateIdx];
    if (!currentDay || !currentDay.bars || !currentDay.rawData) return;

    const usedCategoryMap = new Map();

    currentDay.bars.forEach(bar => {
        if (!bar.category || !bar.categoryKey) return;

        usedCategoryMap.set(bar.categoryKey, {
            key: bar.categoryKey,
            category: bar.category
        });
    });

    usedCategoryMap.forEach(({ key, category }) => {
        const wakeupCount = getWakeupCountForCategory(currentDay.rawData, key);

        const item = document.createElement('div');
        item.className = 'legend-item';

        item.innerHTML = `
            <span class="legend-color" style="background:${category.color}"></span>
            <span>${category.name}</span>
            <span class="legend-wakeup">· 깨움 ${wakeupCount}회</span>
        `;

        legend.appendChild(item);
    });
}

function getWakeupCountForCategory(dayData, categoryKey) {
    if (!dayData || !dayData.wakeupsDetail) return 0;

    const found = dayData.wakeupsDetail.find(item => item.categoryKey === categoryKey);

    return found ? found.count : 0;
}

function getMaxWakeupCount(dayData) {
    if (!dayData.wakeupsDetail || dayData.wakeupsDetail.length === 0) {
        return 0;
    }

    return Math.max(...dayData.wakeupsDetail.map(item => item.count));
}

function getWakeupHeightRatio(dayData, categoryKey) {
    const maxWakeupCount = getMaxWakeupCount(dayData);

    if (maxWakeupCount <= 0) {
        return 1.0;
    }

    const wakeupCount = getWakeupCountForCategory(dayData, categoryKey);

    if (wakeupCount <= 0) {
        return 0.35;
    }

    const wakeupRatio = wakeupCount / maxWakeupCount;

    return 0.35 + wakeupRatio * 1.25;
}

function drawReceiptMiniBarcode() {
    const miniCanvas = document.getElementById('receipt-barcode-canvas');
    if (!miniCanvas) return;

    const currentDay = generatedData[currentDateIdx];
    if (!currentDay || !currentDay.bars) return;

    const dpr = window.devicePixelRatio || 1;

    const cssWidth = miniCanvas.clientWidth || 300;
    const cssHeight = miniCanvas.clientHeight || 70;

    miniCanvas.width = cssWidth * dpr;
    miniCanvas.height = cssHeight * dpr;

    const miniCtx = miniCanvas.getContext('2d');
    miniCtx.resetTransform();
    miniCtx.scale(dpr, dpr);

    miniCtx.clearRect(0, 0, cssWidth, cssHeight);

    const paddingX = 14;
    const paddingY = 8;

    const barcodeWidth = cssWidth - paddingX * 2;
    const barcodeHeight = cssHeight - paddingY * 2;

    miniCtx.fillStyle = '#111111';

    currentDay.bars.forEach(bar => {
        const ratio = (bar.offsetAngle + BARCODE_ANGLE_HALF_RANGE) / BARCODE_ANGLE_FULL_RANGE;

        const x = paddingX + ratio * barcodeWidth;
        const barWidth = Math.max(
            1,
            (bar.width / BARCODE_ANGLE_FULL_RANGE) * barcodeWidth
        );

        miniCtx.fillRect(
            x - barWidth / 2,
            paddingY,
            barWidth,
            barcodeHeight
        );
    });
}