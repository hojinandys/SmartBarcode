const CATEGORIES = {
    GAME:      { name: '게임',      char: 'K', stimulation: 100, color: '#ff3b30', symbol: '🎮', desc: '게임패드' },
    SNS:       { name: 'SNS',       char: '§', stimulation: 90,  color: '#ff9500', symbol: '🤳', desc: '셀카봉' },
    VIDEO:     { name: '영상 매체',  char: 'P', stimulation: 80,  color: '#ffcc00', symbol: '📹', desc: '빔프로젝터' },
    SHOPPING:  { name: '쇼핑',      char: 'F', stimulation: 70,  color: '#4cd964', symbol: '🛍️', desc: '가방' },
    DELIVERY:  { name: '배달',      char: '2', stimulation: 65,  color: '#5ac8fa', symbol: '🪖', desc: '오토바이 헬멧' },
    MUSIC:     { name: '음악',      char: 'M', stimulation: 60,  color: '#007aff', symbol: '🎧', desc: '헤드셋' },
    COMMUNITY: { name: '커뮤니티',  char: 'H', stimulation: 55,  color: '#5856d6', symbol: '📢', desc: '확성기' },
    MESSENGER: { name: '메신저',    char: 'S', stimulation: 35,  color: '#00cbd5', symbol: '📻', desc: '무전기' },
    SEARCH:    { name: '검색 엔진',  char: 'G', stimulation: 20,  color: '#8e8e93', symbol: '🔍', desc: '돋보기' }
};

const DATES_CONFIG = [
    { label: '오늘 (2026-05-30)', localAngle: 0 },
    { label: '어제 (2026-05-29)', localAngle: Math.PI / 3 },
    { label: '그저께 (2026-05-28)', localAngle: Math.PI * 2 / 3 }
];

let currentStep = 0; 
let currentDateIdx = 0; 
let generatedData = []; 

// 애니메이션 변수들
let rotationAngle = Math.PI / 2;
let targetRotation = Math.PI / 2;
let currentScale = 0.95; 
let targetScale = 0.95;

let flattenProgress = 0; // 바코드 펼치기
let heightProgress = 0;  // 바코드 높낮이 애니메이션

let focusedCategory = null; // 특정 카테고리 강조 기능 변수

let isDragging = false;
let wasDragged = false;
let startX = 0;

const canvas = document.getElementById('barcode-canvas');
const ctx = canvas.getContext('2d');

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function generateBarcodeGroup() {
    const visualBars = [];
    const catKeys = Object.keys(CATEGORIES);
    let localOffset = -Math.PI / 7; 
    const maxOffset = Math.PI / 7;
    
    while (localOffset < maxOffset) {
        const isGap = Math.random() > 0.75;
        const thicknesses = [0.003, 0.005, 0.008, 0.012, 0.02];
        const stepAngle = thicknesses[Math.floor(Math.random() * thicknesses.length)];
        
        if (!isGap && localOffset + stepAngle <= maxOffset) {
            let cat = CATEGORIES[catKeys[Math.floor(Math.random() * catKeys.length)]];
            visualBars.push({
                offsetAngle: localOffset, 
                width: stepAngle, 
                category: cat,
                duration: Math.floor(Math.random() * 25) + 5, 
                stimulation: cat.stimulation
            });
        }
        localOffset += stepAngle + (Math.random() * 0.004 + 0.002); 
    }
    return visualBars;
}

// 00시부터 24시까지 타임라인 렌더링
function initTimeline() {
    const timeline = document.getElementById('timeline-labels');
    timeline.innerHTML = '';
    for(let i = 0; i <= 24; i++) {
        const span = document.createElement('span');
        span.innerText = i.toString().padStart(2, '0');
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

function drawSolidPuck() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    
    const isLight = (currentStep <= 1);
    
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
        ctx.moveTo(-radiusX, -puckHeight/2);
        ctx.ellipse(0, -puckHeight/2, radiusX, radiusY, 0, Math.PI, 0, true); 
        ctx.lineTo(radiusX, puckHeight/2);
        ctx.ellipse(0, puckHeight/2, radiusX, radiusY, 0, 0, Math.PI, false); 
        ctx.closePath();
        
        ctx.fillStyle = isLight ? '#f2f4f8' : '#1e2136';
        ctx.fill();
    }

    const drawQueue = [];
    generatedData.forEach(day => {
        const isFocusedDay = (day.dateIdx === currentDateIdx);
        const dayAlpha = isFocusedDay ? 1.0 : dialAlpha;
        
        if (dayAlpha <= 0) return;

        day.bars.forEach(bar => {
            let globalAngle = (day.localAngle + bar.offsetAngle + rotationAngle) % (Math.PI * 2);
            if (globalAngle < 0) globalAngle += Math.PI * 2;
            const sinA = Math.sin(globalAngle); 
            const cosA = Math.cos(globalAngle); 
            
            if (sinA > 0 || (isFocusedDay && flattenProgress > 0.5)) {
                drawQueue.push({ bar, sinA, cosA, isFocusedDay, dayAlpha });
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
        
        let xPosFlat = 0; let widthFlat = 0; let yOffsetFlat = 0; let alphaFlat = 0;
        if (isFocusedDay) {
            const spreadRatio = bar.offsetAngle / (Math.PI / 7); 
            xPosFlat = spreadRatio * (w * 0.42); 
            widthFlat = bar.width * w * 0.5;
            alphaFlat = 1.0;
        }

        const t = isFocusedDay ? flattenProgress : 0;
        const xPos = lerp(xPos3D, xPosFlat, t);
        const barWidth = lerp(width3D, widthFlat, t);
        const yCenterOffset = lerp(yOffset3D, yOffsetFlat, t);
        const finalAlpha = lerp(alpha3D, alphaFlat, t);

        if (finalAlpha <= 0.01) return;

        // 카테고리 집중(Focus) 기능 처리
        let barColor = isLight ? '#111111' : (isFocusedDay && currentStep >= 2 ? bar.category.color : '#050505');
        
        if (focusedCategory && isFocusedDay && currentStep >= 2) {
            if (bar.category.name !== focusedCategory) {
                // 선택되지 않은 카테고리는 흑백 처리
                barColor = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)';
            }
        }

        // 3단계 진입 시 천천히 높낮이 변환하는 애니메이션
        const baseH = puckHeight * 0.65;
        let targetH = baseH;
        if (isFocusedDay && currentStep >= 3) {
            const heightRatio = 0.6 + (bar.stimulation / 100) * 0.8; 
            targetH = baseH * heightRatio;
        }
        
        // heightProgress에 따라 자연스럽게 보간
        const barH = isFocusedDay ? lerp(baseH, targetH, heightProgress) : baseH;
        const yTop = yCenterOffset - barH/2;
        
        ctx.fillStyle = barColor;
        ctx.globalAlpha = finalAlpha;
        ctx.fillRect(xPos - barWidth/2, yTop, barWidth, barH);
    });

    if (drawDial) {
        ctx.globalAlpha = dialAlpha;

        ctx.beginPath();
        ctx.ellipse(0, -puckHeight/2, radiusX, radiusY, 0, 0, Math.PI * 2);
        
        const topGrad = ctx.createRadialGradient(0, -puckHeight/2, radiusX * 0.1, 0, -puckHeight/2, radiusX);
        if (isLight) {
            topGrad.addColorStop(0, '#ffffff'); 
            topGrad.addColorStop(1, '#e4e7f0'); 
        } else {
            topGrad.addColorStop(0, '#2c3045'); 
            topGrad.addColorStop(1, '#1a1c29'); 
        }
        ctx.fillStyle = topGrad;
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isLight ? 'rgba(200,200,200,0.5)' : 'rgba(255,255,255,0.1)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-radiusX, -puckHeight/2);
        ctx.ellipse(0, -puckHeight/2, radiusX, radiusY, 0, Math.PI, 0, true);
        ctx.lineTo(radiusX, puckHeight/2);
        ctx.ellipse(0, puckHeight/2, radiusX, radiusY, 0, 0, Math.PI, false);
        ctx.closePath();

        const frontGrad = ctx.createLinearGradient(-radiusX, 0, radiusX, 0);
        if (isLight) {
            frontGrad.addColorStop(0, 'rgba(0,0,0,0.1)');
            frontGrad.addColorStop(0.2, 'rgba(255,255,255,0.5)');
            frontGrad.addColorStop(0.5, 'transparent');
            frontGrad.addColorStop(0.85, 'rgba(0,0,0,0.05)');
            frontGrad.addColorStop(1, 'rgba(0,0,0,0.2)');
        } else {
            frontGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
            frontGrad.addColorStop(0.2, 'rgba(255,255,255,0.1)');
            frontGrad.addColorStop(0.5, 'transparent');
            frontGrad.addColorStop(0.85, 'rgba(0,0,0,0.4)');
            frontGrad.addColorStop(1, 'rgba(0,0,0,0.8)');
        }
        ctx.fillStyle = frontGrad;
        ctx.fill(); 
    }

    ctx.globalAlpha = 1.0;
    ctx.restore();
}

function calculateMetrics() {
    const bars = generatedData[currentDateIdx].bars;
    let totalMinutes = 0;
    const catAnalysis = {};
    Object.keys(CATEGORIES).forEach(k => { catAnalysis[CATEGORIES[k].name] = { minutes: 0, config: CATEGORIES[k] }; });
    
    bars.forEach(b => { totalMinutes += b.duration; catAnalysis[b.category.name].minutes += b.duration; });
    const totalCost = totalMinutes * 100;
    
    let maxCategoryName = ''; let maxMinutes = -1;
    Object.keys(catAnalysis).forEach(name => {
        if (catAnalysis[name].minutes > maxMinutes) { maxMinutes = catAnalysis[name].minutes; maxCategoryName = name; }
    });
    const mainCategory = catAnalysis[maxCategoryName]?.config || CATEGORIES.GAME;
    
    document.getElementById('receipt-date').innerText = DATES_CONFIG[currentDateIdx].label;
    document.getElementById('receipt-total-time').innerText = totalMinutes;
    document.getElementById('receipt-total-cost').innerText = `₩${totalCost.toLocaleString()}`;
    
    document.getElementById('receipt-symbol-icon').innerText = mainCategory.symbol;
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
            
            // 영수증 카테고리 클릭 시 하이라이트 이벤트
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
}

function updateStepUI() {
    document.body.className = `step-${currentStep}`;
    
    const stepTexts = [
        "다이얼을 돌려 날짜를 고르세요", 
        "1단계: 원본 바코드 확인", 
        "2단계: 카테고리 색상 해석", 
        "3단계: 디지털 자극도 결합", 
        "4단계: 디지털 소비 영수증 발급 완료"
    ];
    document.getElementById('step-indicator').innerText = stepTexts[currentStep];

    const guideText = document.getElementById('guide-text');
    if (currentStep === 0) guideText.innerText = "바코드를 클릭하면 해석이 시작됩니다.";
    else if (currentStep === 1) guideText.innerText = "한 번 더 클릭하면 카테고리 색상이 입혀집니다.";
    else if (currentStep === 2) guideText.innerText = "한 번 더 클릭하면 디지털 자극도가 높이로 반영됩니다.";
    else if (currentStep === 3) guideText.innerText = "한 번 더 클릭하면 최종 영수증이 발급됩니다.";
    else guideText.innerText = "영수증의 항목을 클릭하여 집중 분석해보세요.";

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
        focusedCategory = null; // 초기화
    }
}

function snapToCurrentDate() {
    targetRotation = Math.PI / 2 - generatedData[currentDateIdx].localAngle;
    
    // 네비게이션 및 플로팅 날짜 동기화
    const dateLabel = DATES_CONFIG[currentDateIdx].label;
    document.getElementById('date-indicator').innerText = dateLabel;
    document.getElementById('floating-date-display').innerText = dateLabel;
}

function changeDateView(direction) {
    if (direction === 'prev') currentDateIdx = (currentDateIdx + 1) % DATES_CONFIG.length;
    else currentDateIdx = (currentDateIdx - 1 + DATES_CONFIG.length) % DATES_CONFIG.length;
    snapToCurrentDate();
}

function resetToCarousel() {
    currentStep = 0;
    targetScale = 0.95; 
    flattenProgress = 0; 
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
        isDragging = true; wasDragged = false; startX = e.clientX; 
    });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        if (Math.abs(deltaX) > 3) wasDragged = true; 
        startX = e.clientX;
        targetRotation += (deltaX / canvas.width) * Math.PI * 2;
        rotationAngle = targetRotation;
    });
    window.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            let minDiff = Infinity; let closestIdx = 0;
            let normalizedRotation = rotationAngle % (Math.PI * 2);
            if (normalizedRotation < 0) normalizedRotation += Math.PI * 2;
            generatedData.forEach((day, idx) => {
                let requiredRotation = (Math.PI / 2 - day.localAngle) % (Math.PI * 2);
                if (requiredRotation < 0) requiredRotation += Math.PI * 2;
                let diff = Math.abs(normalizedRotation - requiredRotation);
                if (diff > Math.PI) diff = Math.PI * 2 - diff;
                if (diff < minDiff) { minDiff = diff; closestIdx = idx; }
            });
            currentDateIdx = closestIdx;
            snapToCurrentDate();
        }

        // 수동 클릭 진행 (자동 시퀀스 제거됨)
        if (!wasDragged && e.target.closest('#canvas-wrapper')) {
            if (currentStep < 4) {
                currentStep++;
                if (currentStep === 1) targetScale = 1.05; 
                snapToCurrentDate();
                updateStepUI();
            }
        }
    });

    wrapper.addEventListener('touchstart', (e) => { 
        if (currentStep >= 1) return; 
        isDragging = true; wasDragged = false; startX = e.touches[0].clientX; 
    });
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        if (Math.abs(deltaX) > 3) wasDragged = true; 
        startX = e.touches[0].clientX;
        targetRotation += (deltaX / canvas.width) * Math.PI * 2;
        rotationAngle = targetRotation;
    });
    window.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        let minDiff = Infinity; let closestIdx = 0;
        let normalizedRotation = rotationAngle % (Math.PI * 2);
        if (normalizedRotation < 0) normalizedRotation += Math.PI * 2;
        generatedData.forEach((day, idx) => {
            let requiredRotation = (Math.PI / 2 - day.localAngle) % (Math.PI * 2);
            if (requiredRotation < 0) requiredRotation += Math.PI * 2;
            let diff = Math.abs(normalizedRotation - requiredRotation);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;
            if (diff < minDiff) { minDiff = diff; closestIdx = idx; }
        });
        currentDateIdx = closestIdx;
        snapToCurrentDate();

        if (!wasDragged && e.target.closest('#canvas-wrapper')) {
            if (currentStep < 4) {
                currentStep++;
                if (currentStep === 1) targetScale = 1.05; 
                snapToCurrentDate();
                updateStepUI();
            }
        }
    });
    
    window.addEventListener('resize', initCanvas);
}

function animationLoop() {
    rotationAngle += (targetRotation - rotationAngle) * 0.15;
    currentScale += (targetScale - currentScale) * 0.15;
    
    // 바코드 전개(Unwrap) 애니메이션 연동
    const targetFlatten = currentStep >= 1 ? 1.0 : 0.0;
    flattenProgress += (targetFlatten - flattenProgress) * 0.08;

    // 3단계부터 적용되는 천천히 변하는 높이 애니메이션
    const targetHeightProgress = currentStep >= 3 ? 1.0 : 0.0;
    heightProgress += (targetHeightProgress - heightProgress) * 0.05;

    drawSolidPuck();
    requestAnimationFrame(animationLoop);
}

window.addEventListener('DOMContentLoaded', () => {
    initTimeline(); // 00~24 타임라인 세팅
    
    DATES_CONFIG.forEach((cfg, idx) => { 
        generatedData.push({
            dateIdx: idx, localAngle: cfg.localAngle, bars: generateBarcodeGroup()
        }); 
    });
    setTimeout(() => {
        initCanvas();
        updateStepUI();
        snapToCurrentDate();
        requestAnimationFrame(animationLoop);
    }, 50);
    setupEvents();
});