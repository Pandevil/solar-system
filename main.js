import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const EARTH_RADIUS_KM = 6378.1;
const EARTH_ORBIT_SECONDS = 46;
const HOME_POS = new THREE.Vector3(-28, 86, 156);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);
const START_POS = new THREE.Vector3(-48, 150, 260);

const CATALOG = [
  {
    id: "sun",
    kind: "star",
    name: "太阳",
    en: "Sun",
    radiusKm: 696340,
    swatch: "#ffb15a",
    axialDeg: 7.25,
    spin: 0.08,
    temp: "5,772 K",
    note: "太阳系的中心天体，一颗 G2V 型黄矮星。它的质量约占全系的 99.86%，核心以氢聚变维持光与热。",
  },
  {
    id: "mercury",
    kind: "planet",
    name: "水星",
    en: "Mercury",
    radiusKm: 2439.7,
    au: 0.387,
    periodDays: 87.97,
    e: 0.206,
    inclDeg: 7.0,
    periDeg: 77,
    axialDeg: 0.03,
    spin: 0.05,
    roughness: 0.9,
    moonsText: "无",
    temp: "昼夜约 430 / −180 °C",
    swatch: "#9a9086",
    start: 0.5,
    note: "最靠近太阳，也是八大行星里最小的一颗。没有卫星，表面布满撞击坑，昼夜温差极大。",
  },
  {
    id: "venus",
    kind: "planet",
    name: "金星",
    en: "Venus",
    radiusKm: 6051.8,
    au: 0.723,
    periodDays: 224.7,
    e: 0.007,
    inclDeg: 3.39,
    periDeg: 131,
    axialDeg: 177.4,
    spin: -0.04,
    roughness: 0.96,
    moonsText: "无",
    temp: "约 464 °C",
    swatch: "#e6d2a2",
    start: 2.4,
    note: "自转方向与公转相反，一个金星日比金星年更长。厚重的二氧化碳大气造成强烈温室效应，表面炎热而昏暗。",
  },
  {
    id: "earth",
    kind: "planet",
    name: "地球",
    en: "Earth",
    radiusKm: 6378.1,
    au: 1,
    periodDays: 365.26,
    e: 0.017,
    inclDeg: 0,
    periDeg: 102,
    axialDeg: 23.44,
    spin: 0.55,
    roughness: 0.75,
    moonsText: "1（月球）",
    temp: "平均约 15 °C",
    swatch: "#3d7ec4",
    start: 4.3,
    note: "目前已知唯一拥有表面液态水与生命的行星。天然卫星月球稳定着地轴倾角，也因此有了温和的季节。",
  },
  {
    id: "moon",
    kind: "moon",
    name: "月球",
    en: "Moon",
    radiusKm: 1737.4,
    axialDeg: 6.7,
    spin: 0.12,
    roughness: 1,
    temp: "昼夜约 120 / −130 °C",
    swatch: "#c8c4bc",
    start: 0.8,
    note: "地球唯一的天然卫星，表面是古老的月海与撞击坑。由于潮汐锁定，它始终以同一面朝向地球。",
  },
  {
    id: "mars",
    kind: "planet",
    name: "火星",
    en: "Mars",
    radiusKm: 3396.2,
    au: 1.524,
    periodDays: 686.98,
    e: 0.093,
    inclDeg: 1.85,
    periDeg: 336,
    axialDeg: 25.19,
    spin: 0.5,
    roughness: 0.92,
    moonsText: "2",
    temp: "平均约 −60 °C",
    swatch: "#c4623a",
    start: 1.15,
    note: "红色来自地表的氧化铁。奥林匹斯山是太阳系最高的火山，两颗小卫星是火卫一与火卫二。",
  },
  {
    id: "jupiter",
    kind: "planet",
    name: "木星",
    en: "Jupiter",
    radiusKm: 71492,
    au: 5.203,
    periodDays: 4332.6,
    e: 0.049,
    inclDeg: 1.3,
    periDeg: 14,
    axialDeg: 3.13,
    spin: 1.05,
    roughness: 0.55,
    moonsText: "95 颗以上",
    temp: "云顶约 −145 °C",
    swatch: "#d7a06a",
    start: 5.4,
    note: "质量超过其余所有行星之和。大红斑是一场持续数百年的巨大风暴，四颗伽利略卫星最为著名。",
  },
  {
    id: "saturn",
    kind: "planet",
    name: "土星",
    en: "Saturn",
    radiusKm: 60268,
    au: 9.537,
    periodDays: 10759,
    e: 0.056,
    inclDeg: 2.49,
    periDeg: 93,
    axialDeg: 26.73,
    spin: 0.95,
    roughness: 0.52,
    moonsText: "140 颗以上",
    temp: "云顶约 −178 °C",
    swatch: "#e6d3a4",
    start: 2.9,
    ring: { inner: 1.28, outer: 2.25, textured: true },
    note: "密度小于水，是一颗戴着冰环的气体巨星。环主要由冰与岩石碎块组成，厚处也不过数百米。",
  },
  {
    id: "uranus",
    kind: "planet",
    name: "天王星",
    en: "Uranus",
    radiusKm: 25559,
    au: 19.191,
    periodDays: 30689,
    e: 0.046,
    inclDeg: 0.77,
    periDeg: 173,
    axialDeg: 97.77,
    spin: -0.55,
    roughness: 0.42,
    moonsText: "27 颗以上",
    temp: "约 −195 °C",
    swatch: "#8fe0d6",
    start: 0.35,
    ring: { inner: 1.65, outer: 1.95, color: 0xc9f4ef, opacity: 0.55 },
    note: "自转轴几乎倒在公转轨道上，像是横躺着滚过星空。大气中的甲烷让它呈现冷青绿色。",
  },
  {
    id: "neptune",
    kind: "planet",
    name: "海王星",
    en: "Neptune",
    radiusKm: 24764,
    au: 30.069,
    periodDays: 60182,
    e: 0.009,
    inclDeg: 1.77,
    periDeg: 48,
    axialDeg: 28.32,
    spin: 0.7,
    roughness: 0.48,
    moonsText: "16 颗以上",
    temp: "约 −200 °C",
    swatch: "#2f5ed0",
    start: 3.55,
    note: "八大行星中距离太阳最远的一颗，风是太阳系里最猛烈的。1846 年，它依照天体力学的预言被找到。",
  },
];

const nf = new Intl.NumberFormat("zh-CN");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;

function hash2(ix, iy) {
  const s = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function noise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x, y) {
  let value = 0;
  let amplitude = 0.5;
  for (let i = 0; i < 5; i += 1) {
    value += amplitude * noise(x, y);
    x *= 2.02;
    y *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

function rand(n) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function rgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a, b, t) {
  const k = t < 0 ? 0 : t > 1 ? 1 : t;
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k,
    255,
  ];
}

function wrapDelta(a, b) {
  let d = Math.abs(a - b);
  if (d > 0.5) d = 1 - d;
  return d;
}

function ellipse(u, v, cu, cv, ru, rv) {
  return Math.hypot(wrapDelta(u, cu) / ru, (v - cv) / rv);
}

function textureFromCanvas(canvas, srgb = true) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return tex;
}

function makeTexture(w, h, painter, srgb = true) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const image = ctx.createImageData(w, h);
  const data = image.data;
  for (let y = 0; y < h; y += 1) {
    const v = y / (h - 1);
    for (let x = 0; x < w; x += 1) {
      const u = x / (w - 1);
      const px = painter(u, v);
      const i = (y * w + x) * 4;
      data[i] = px[0];
      data[i + 1] = px[1];
      data[i + 2] = px[2];
      data[i + 3] = px[3] ?? 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return textureFromCanvas(canvas, srgb);
}

function stampCircle(ctx, x, y, r) {
  for (const dx of [0, -1024, 1024]) {
    ctx.beginPath();
    ctx.arc(x + dx, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCraters(base, dark, light, count, maria) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const g = canvas.getContext("2d");
  g.fillStyle = base;
  g.fillRect(0, 0, 1024, 512);
  if (maria) {
    g.save();
    g.fillStyle = "#5e5b56";
    g.globalAlpha = 0.72;
    g.beginPath();
    g.ellipse(280, 230, 130, 86, 0.3, 0, Math.PI * 2);
    g.ellipse(470, 250, 70, 58, -0.2, 0, Math.PI * 2);
    g.ellipse(210, 300, 46, 40, 0.5, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  for (let i = 0; i < 70; i += 1) {
    g.globalAlpha = 0.07;
    g.fillStyle = rand(i) > 0.5 ? dark : light;
    stampCircle(g, rand(i + 4) * 1024, rand(i + 8) * 512, 28 + rand(i + 12) * 110);
  }
  for (let i = 0; i < count; i += 1) {
    const x = rand(i * 1.7 + 30) * 1024;
    const y = rand(i * 2.3 + 50) * 512;
    const r = 1.2 + rand(i * 4.1 + 3) ** 2.2 * 18;
    g.globalAlpha = 0.4;
    g.fillStyle = light;
    stampCircle(g, x, y, r);
    g.globalAlpha = 0.5;
    g.fillStyle = dark;
    stampCircle(g, x + r * 0.16, y + r * 0.12, r * 0.7);
  }
  g.globalAlpha = 1;
  return canvas;
}

function earthKind(u, v) {
  const n = fbm(u * 5.5 + 2, v * 4.2);
  const shapes = [
    ellipse(u, v, 0.18, 0.38, 0.075, 0.16),
    ellipse(u, v, 0.2, 0.6, 0.048, 0.13),
    ellipse(u, v, 0.52, 0.36, 0.15, 0.14),
    ellipse(u, v, 0.48, 0.57, 0.055, 0.12),
    ellipse(u, v, 0.78, 0.7, 0.045, 0.038),
    ellipse(u, v, 0.32, 0.22, 0.028, 0.024),
  ];
  const d = Math.min(...shapes);
  if (d < 1.02 + (n - 0.48) * 0.55) {
    if ((v < 0.16 || v > 0.84) && n > 0.42) return "ice";
    if (n > 0.62 && v > 0.4 && v < 0.75) return "desert";
    return "land";
  }
  return "ocean";
}

function paintEarth(u, v) {
  const n = fbm(u * 6, v * 5);
  const n2 = fbm(u * 14 + 8, v * 10);
  const kind = earthKind(u, v);
  let col;
  if (kind === "ocean") col = mix(rgb("#0b3a6e"), rgb("#2f86d0"), n * 0.8 + n2 * 0.2);
  else if (kind === "land") col = mix(rgb("#2c6a34"), rgb("#8ea85a"), n2);
  else if (kind === "desert") col = mix(rgb("#c2a56a"), rgb("#e6d7a8"), n);
  else col = mix(rgb("#d5e4ef"), rgb("#ffffff"), 0.55 + n * 0.45);
  const pole = Math.max(0, 0.09 - v, v - 0.91);
  if (pole > 0) col = mix(col, rgb("#f5fbff"), Math.min(1, pole * 14));
  return col;
}

function paintEarthRough(u, v) {
  const kind = earthKind(u, v);
  const shade = kind === "ocean" ? 28 : kind === "ice" ? 70 : kind === "desert" ? 170 : 210;
  return [shade, shade, shade, 255];
}

function paintSun(u, v) {
  const n = fbm(u * 22, v * 12);
  const n2 = fbm(u * 7 + 4, v * 5);
  let col = mix(rgb("#ff9a32"), rgb("#fff1c2"), n);
  col = mix(col, rgb("#ffd27a"), n2 * 0.35);
  const pole = Math.abs(v - 0.5) * 2;
  return mix(col, rgb("#e85d04"), pole ** 1.5 * 0.55);
}

function paintVenus(u, v) {
  const n = fbm(u * 4, v * 8);
  const streaks = Math.sin((v * 16 + n * 2.5) * Math.PI * 2);
  let col = mix(rgb("#d7b56a"), rgb("#f3e2b0"), 0.45 + streaks * 0.2 + n * 0.25);
  return mix(col, rgb("#c4924e"), fbm(u * 10 + 2, v * 3) * 0.25);
}

function paintMars(u, v) {
  const n = fbm(u * 5, v * 4);
  const n2 = fbm(u * 12 + 3, v * 9);
  let col = mix(rgb("#c45b32"), rgb("#8d3418"), n);
  if (n2 > 0.62) col = mix(col, rgb("#d8b48a"), (n2 - 0.62) * 2.2);
  const pole = Math.max(0, 0.11 - v, v - 0.89);
  if (pole > 0) col = mix(col, rgb("#f4f1ea"), Math.min(1, pole * 11));
  return col;
}

function paintClouds(u, v) {
  const n = fbm(u * 7 + 4, v * 5);
  const n2 = fbm(u * 16 + 1, v * 12);
  const alpha = n > 0.6 ? Math.min(170, (n - 0.6) * 640 + n2 * 20) : 0;
  return [255, 255, 255, alpha];
}

const GAS = {
  jupiter: [
    ["#c9b59a", 0],
    ["#e8dcc8", 0.08],
    ["#c47848", 0.15],
    ["#f0e6d4", 0.24],
    ["#a85a38", 0.33],
    ["#e7d3b2", 0.42],
    ["#d8a06a", 0.5],
    ["#f4efe4", 0.58],
    ["#b86a42", 0.67],
    ["#ecdcc4", 0.76],
    ["#c98a58", 0.86],
    ["#e5d7c2", 1],
  ],
  saturn: [
    ["#f0e2c4", 0],
    ["#e7d3a4", 0.16],
    ["#f7edd8", 0.28],
    ["#d7b87a", 0.4],
    ["#f3e6c8", 0.55],
    ["#c9a56a", 0.68],
    ["#f8f1df", 0.8],
    ["#e6d2a8", 1],
  ],
  uranus: [
    ["#d7fff8", 0],
    ["#8fd9d0", 0.5],
    ["#e7fffb", 1],
  ],
  neptune: [
    ["#1d3f9a", 0],
    ["#2a62d6", 0.35],
    ["#16348a", 0.62],
    ["#3d78e0", 1],
  ],
};

function sampleBands(stops, v) {
  let i = 0;
  while (i < stops.length - 2 && v > stops[i + 1][1]) i += 1;
  const a = stops[i];
  const b = stops[i + 1];
  const span = b[1] - a[1] || 1;
  return mix(rgb(a[0]), rgb(b[0]), (v - a[1]) / span);
}

function paintGas(id, u, v) {
  const wobble = (fbm(u * 3.4, v * 2) - 0.5) * (id === "jupiter" || id === "saturn" ? 0.045 : 0.02);
  const vv = Math.min(0.999, Math.max(0, v + wobble));
  let col = sampleBands(GAS[id], vv);
  if (id === "jupiter") {
    const spot = ellipse(u, v, 0.64, 0.58, 0.09, 0.052);
    if (spot < 1) col = mix(col, rgb("#c6452c"), (1 - spot) * 0.92);
    const oval = ellipse(u, v, 0.3, 0.36, 0.035, 0.02);
    if (oval < 1) col = mix(col, rgb("#fff6ea"), (1 - oval) * 0.75);
  }
  if (id === "neptune") {
    const spot = ellipse(u, v, 0.4, 0.44, 0.055, 0.036);
    if (spot < 1) col = mix(col, rgb("#0c1c4a"), (1 - spot) * 0.88);
  }
  return col;
}

function paintRingCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 512;
  const g = canvas.getContext("2d");
  const bands = [
    [0, 0.05, 0],
    [0.05, 0.16, 0.28],
    [0.16, 0.42, 0.95],
    [0.42, 0.48, 0.35],
    [0.48, 0.55, 0],
    [0.55, 0.8, 0.78],
    [0.8, 0.86, 0.22],
    [0.86, 0.93, 0.62],
    [0.95, 0.98, 0.3],
    [0.98, 1, 0],
  ];
  for (const [a, b, alpha] of bands) {
    g.fillStyle = `rgba(232, 214, 176, ${alpha})`;
    g.fillRect(0, Math.floor(a * 512), 8, Math.max(1, Math.ceil((b - a) * 512)));
  }
  return canvas;
}

function orbitRadius(au) {
  return 8 + Math.log(1 + au) * 15;
}

function visualRadius(km, kind) {
  if (kind === "star") return 2.85;
  const re = km / EARTH_RADIUS_KM;
  return Math.max(0.2, re ** 0.4 * 0.52);
}

function placeOnOrbit(body, angle, target) {
  const a = body.orbit;
  const x = Math.cos(angle) * a;
  const z = Math.sin(angle) * a * Math.sqrt(1 - body.e * body.e);
  const peri = body.peri;
  const xr = x * Math.cos(peri) - z * Math.sin(peri);
  const zr = x * Math.sin(peri) + z * Math.cos(peri);
  const incl = body.incl;
  target.set(xr, zr * Math.sin(incl), zr * Math.cos(incl));
  return target;
}

function formatPeriod(days) {
  if (days >= 800) {
    const years = days / 365.256;
    return `${years.toFixed(years >= 20 ? 1 : 2)} 年`;
  }
  return `${days.toFixed(1)} 日`;
}

function ratioText(km) {
  const ratio = km / EARTH_RADIUS_KM;
  if (Math.abs(ratio - 1) < 0.02) return "以地球半径为 1。";
  const digits = ratio >= 20 ? 0 : 2;
  return `半径约为地球的 ${ratio.toFixed(digits)} 倍。`;
}

function formatAngle(rad) {
  const deg = ((rad * 180) / Math.PI) % 360;
  const wrapped = (deg + 360) % 360;
  return `${wrapped.toFixed(1)}°`;
}

function glowSprite(size, inner, outer) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const g = canvas.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 8, 128, 128, 128);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const material = new THREE.SpriteMaterial({
    map: textureFromCanvas(canvas),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.setScalar(size);
  sprite.userData.base = size;
  sprite.raycast = () => {};
  return sprite;
}

function bootFail(message) {
  const boot = document.getElementById("boot");
  const title = boot.querySelector("h2");
  title.textContent = message;
  boot.classList.remove("is-done");
}

requestAnimationFrame(() => {
  try {
    init();
  } catch (error) {
    console.error(error);
    bootFail("星图未能展开");
  }
});

function init() {
  const viewport = document.getElementById("viewport");
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.setClearColor(0x07080d, 1);
  renderer.domElement.setAttribute("aria-label", "太阳系三维星图，可拖拽旋转，点击行星查看记录");
  viewport.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.08, 3000);
  camera.position.copy(reduceMotion ? HOME_POS : START_POS);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(reduceMotion ? HOME_TARGET : new THREE.Vector3(0, 0, 0));
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.7;
  controls.panSpeed = 0.55;
  controls.minDistance = 1.4;
  controls.maxDistance = 460;
  controls.minPolarAngle = 0.06;
  controls.maxPolarAngle = Math.PI - 0.06;
  controls.update();

  scene.add(new THREE.AmbientLight(0x8ea0b4, 0.55));
  scene.add(new THREE.HemisphereLight(0x1a3044, 0x140e0a, 0.28));
  const sunLight = new THREE.PointLight(0xfff1d2, 6400, 0, 2);
  scene.add(sunLight);

  const stars = makeStars(2600);
  scene.add(stars);
  const belt = makeBelt();
  scene.add(belt);

  const pickables = [];
  const bodies = CATALOG.map((data) => createBody(data, scene, pickables));
  const byId = Object.fromEntries(bodies.map((body) => [body.id, body]));
  placeMoon(byId.moon, byId.earth);

  const ringPivot = new THREE.Group();
  const selectionRing = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.015, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0xe7c98a, transparent: true, opacity: 0.85 })
  );
  selectionRing.rotation.x = Math.PI / 2;
  ringPivot.add(selectionRing);
  ringPivot.visible = false;
  scene.add(ringPivot);

  const sunGlows = byId.sun.anchor.children.filter((child) => child.isSprite);

  const list = document.getElementById("planet-list");
  for (const [index, body] of bodies.entries()) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = body.kind === "moon" ? "is-moon" : "";
    button.style.animationDelay = `${index * 45}ms`;
    button.innerHTML = `<span class="swatch" style="--swatch:${body.swatch}"></span><span class="nm"><b>${body.name}</b><small>${body.en}</small></span><span class="au">${auLabel(body)}</span>`;
    button.addEventListener("click", () => select(body));
    li.appendChild(button);
    list.appendChild(li);
    body.button = button;
  }

  const dossier = document.getElementById("dossier");
  const floater = document.getElementById("floater");
  const epochEl = document.getElementById("epoch");
  const rateInput = document.getElementById("rate");
  const rateLabel = document.getElementById("rate-label");
  const pauseBtn = document.getElementById("pause");
  const resetBtn = document.getElementById("reset");

  let selected = null;
  let hovered = null;
  let following = false;
  let glide = !reduceMotion;
  let paused = false;
  let rate = 5;
  let simDays = 0;
  let dateAcc = 0;
  let dragged = false;
  let down = null;
  const followOffset = new THREE.Vector3();
  const world = new THREE.Vector3();
  const goal = new THREE.Vector3();
  const clock = new THREE.Clock();
  let primed = false;

  document.getElementById("close-dossier").addEventListener("click", deselect);
  pauseBtn.addEventListener("click", () => {
    paused = !(paused || rate === 0);
    if (!paused && rate === 0) {
      rate = 5;
      rateInput.value = "5";
    }
    syncPause();
  });
  rateInput.addEventListener("input", () => {
    rate = Number(rateInput.value);
    if (rate > 0) paused = false;
    syncPause();
  });
  resetBtn.addEventListener("click", () => {
    following = false;
    glide = true;
  });

  renderer.domElement.addEventListener("pointerdown", (event) => {
    down = { x: event.clientX, y: event.clientY };
    dragged = false;
  });
  window.addEventListener("pointermove", (event) => {
    if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 4) {
      dragged = true;
      document.documentElement.classList.add("is-dragging");
    }
    if (event.target === renderer.domElement) {
      const hit = pick(event);
      if (hit !== hovered) {
        hovered = hit;
        applyEmissive();
        document.documentElement.classList.toggle("is-hovering", Boolean(hovered));
      }
    }
  });
  window.addEventListener("pointerup", (event) => {
    if (!down) return;
    const wasDrag = dragged;
    down = null;
    dragged = false;
    document.documentElement.classList.remove("is-dragging");
    if (wasDrag) {
      following = false;
      glide = false;
      return;
    }
    if (event.target !== renderer.domElement) return;
    const hit = pick(event);
    if (hit) select(hit);
    else deselect();
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    hovered = null;
    applyEmissive();
    document.documentElement.classList.remove("is-hovering");
  });

  window.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (event.code === "Space") {
      event.preventDefault();
      pauseBtn.click();
    } else if (event.code === "Escape") {
      deselect();
    } else if (event.code === "ArrowRight" || event.code === "ArrowDown") {
      event.preventDefault();
      cycle(1);
    } else if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
      event.preventDefault();
      cycle(-1);
    } else if (event.code === "KeyR") {
      resetBtn.click();
    }
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  syncPause();
  animate();
  requestAnimationFrame(() => document.getElementById("boot").classList.add("is-done"));

  function effectiveRate() {
    return paused || rate === 0 ? 0 : rate;
  }

  function syncPause() {
    const held = paused || rate === 0;
    pauseBtn.textContent = held ? "继续" : "暂停";
    pauseBtn.setAttribute("aria-pressed", String(held));
    rateLabel.textContent = `${effectiveRate()}×`;
  }

  function auLabel(body) {
    if (body.kind === "star") return "恒星";
    if (body.kind === "moon") return "卫星";
    return body.au.toFixed(2);
  }

  function pick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    return hits.length ? hits[0].object.userData.body : null;
  }

  function select(body) {
    selected = body;
    following = true;
    glide = false;
    body.anchor.getWorldPosition(world);
    const want = body.kind === "star"
      ? body.radius * 4.6
      : body.kind === "moon"
        ? 2.7
        : Math.max(5.6, body.radius * (body.ring ? 12 : 8.4));
    if (body.kind === "star") {
      followOffset.set(want * 0.62, want * 0.38, want * 0.68);
    } else {
      goal.copy(world);
      if (goal.lengthSq() < 1) goal.set(1, 0, 0.2);
      goal.normalize();
      followOffset.set(-goal.z, 0, goal.x);
      followOffset.addScaledVector(goal, -0.38);
      followOffset.y = 0.48;
      followOffset.setLength(want);
    }
    camera.position.copy(world).add(followOffset);
    controls.target.copy(world);
    openDossier(body);
    markList();
    paintOrbits();
    applyEmissive();
  }

  function deselect() {
    following = false;
    selected = null;
    dossier.classList.remove("is-open");
    dossier.setAttribute("aria-hidden", "true");
    markList();
    paintOrbits();
    applyEmissive();
  }

  function cycle(direction) {
    const index = bodies.indexOf(selected);
    const next = index < 0
      ? (direction > 0 ? 0 : bodies.length - 1)
      : (index + direction + bodies.length) % bodies.length;
    select(bodies[next]);
  }

  function markList() {
    for (const body of bodies) {
      body.button.classList.toggle("is-active", body === selected);
      if (body === selected) body.button.setAttribute("aria-current", "true");
      else body.button.removeAttribute("aria-current");
    }
  }

  function paintOrbits() {
    for (const body of bodies) {
      if (!body.orbitLine) continue;
      const on = body === selected;
      body.orbitLine.material.color.set(on ? 0xe7c98a : body.id === "earth" ? 0x8c7b62 : 0x6d6252);
      body.orbitLine.material.opacity = on ? 0.95 : body.id === "earth" ? 0.46 : 0.3;
    }
  }

  function applyEmissive() {
    for (const body of bodies) {
      const hot = body === hovered || body === selected;
      const strong = body === selected;
      for (const material of body.mats) {
        if (!material.emissive) continue;
        material.emissive.set(hot ? 0xffd7a1 : 0x000000);
        material.emissiveIntensity = strong ? 0.38 : hot ? 0.2 : 0;
      }
    }
  }

  function factRows(body) {
    const rows = [["半径", `${nf.format(Math.round(body.radiusKm))} km`]];
    if (body.kind === "star") {
      rows.push(["类型", "G2V 黄矮星"], ["质量占比", "约 99.86%"], ["光球温度", body.temp], ["赤道自转", "约 25 日"]);
    } else if (body.kind === "moon") {
      rows.push(["地月距离", "约 38.4 万公里"], ["绕地周期", "27.3 日"], ["表面温度", body.temp], ["轨道角", ""]);
    } else {
      rows.push(
        ["日心距离", `${body.au.toFixed(3)} AU`],
        ["公转周期", formatPeriod(body.periodDays)],
        ["已知卫星", body.moonsText],
        ["表面温度", body.temp],
        ["日心经度", ""]
      );
    }
    return rows;
  }

  function openDossier(body) {
    dossier.classList.add("is-open");
    dossier.setAttribute("aria-hidden", "false");
    document.getElementById("d-name").textContent = body.name;
    document.getElementById("d-en").textContent = body.en;
    document.getElementById("d-note").textContent = body.note;
    document.getElementById("d-ratio").textContent = ratioText(body.radiusKm);
    const facts = document.getElementById("d-facts");
    facts.textContent = "";
    for (const [label, value] of factRows(body)) {
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      if (label === "日心经度" || label === "轨道角") {
        dd.id = "d-live";
        dd.textContent = formatAngle(body.angle || 0);
      } else {
        dd.textContent = value;
      }
      facts.append(dt, dd);
    }
  }

  function damp(current, target, lambda, dt) {
    current.lerp(target, 1 - Math.exp(-lambda * dt));
  }

  function updateFloater() {
    const body = hovered || selected;
    if (!body) {
      floater.classList.remove("is-on");
      return;
    }
    body.anchor.getWorldPosition(world);
    world.project(camera);
    if (world.z > 1) {
      floater.classList.remove("is-on");
      return;
    }
    floater.style.left = `${(world.x * 0.5 + 0.5) * window.innerWidth}px`;
    floater.style.top = `${(-world.y * 0.5 + 0.5) * window.innerHeight}px`;
    floater.textContent = body.name;
    floater.classList.add("is-on");
  }

  function animate() {
    requestAnimationFrame(animate);
    const raw = clock.getDelta();
    const dt = primed ? Math.min(raw, 0.05) : 0;
    primed = true;
    const speed = effectiveRate();

    for (const body of bodies) {
      body.mesh.rotation.y += body.spin * dt;
      if (body.clouds) body.clouds.rotation.y += dt * 0.045;
      if (body.kind === "planet") {
        body.angle += body.angular * dt * speed;
        placeOnOrbit(body, body.angle, body.anchor.position);
      }
    }
    placeMoon(byId.moon, byId.earth, dt, speed);
    belt.rotation.y += dt * 0.012 * (speed === 0 ? 0.25 : Math.min(speed, 8) * 0.2);

    const pulse = 1 + Math.sin(clock.elapsedTime * 1.25) * 0.035;
    const sunBoost = hovered === byId.sun || selected === byId.sun ? 1.07 : 1;
    for (const sprite of sunGlows) {
      sprite.scale.setScalar(sprite.userData.base * pulse * sunBoost);
    }

    if (selected) {
      ringPivot.visible = true;
      selected.anchor.getWorldPosition(ringPivot.position);
      ringPivot.quaternion.copy(selected.anchor.quaternion);
      ringPivot.scale.setScalar(selected.radius * 1.78);
      selectionRing.material.opacity = 0.62 + Math.sin(clock.elapsedTime * 3) * 0.22;
    } else {
      ringPivot.visible = false;
    }

    if (following && selected) {
      selected.anchor.getWorldPosition(world);
      camera.position.copy(world).add(followOffset);
      controls.target.copy(world);
    } else if (glide) {
      damp(camera.position, HOME_POS, 1.7, dt);
      damp(controls.target, HOME_TARGET, 1.7, dt);
      if (camera.position.distanceTo(HOME_POS) < 0.35) glide = false;
    }

    controls.update();

    simDays += dt * speed * (365.256 / EARTH_ORBIT_SECONDS);
    dateAcc += dt;
    if (dateAcc > 0.12) {
      dateAcc = 0;
      const date = new Date(Date.UTC(2026, 0, 1) + simDays * 86400000);
      if (!Number.isNaN(date.getTime())) {
        epochEl.textContent = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
      }
      const live = document.getElementById("d-live");
      if (live && selected && selected.angle != null) live.textContent = formatAngle(selected.angle);
    }

    updateFloater();
    renderer.render(scene, camera);
  }
}

function createBody(data, scene, pickables) {
  const radius = visualRadius(data.radiusKm, data.kind);
  const body = {
    ...data,
    radius,
    angle: data.start || 0,
    mats: [],
    anchor: new THREE.Group(),
  };
  body.anchor.name = data.id;

  const map = createMap(data.id);
  const material = data.kind === "star"
    ? new THREE.MeshBasicMaterial({ map, toneMapped: false })
    : new THREE.MeshStandardMaterial({
      map,
      roughness: data.roughness ?? 0.8,
      metalness: 0.02,
    });
  if (data.id === "earth") {
    material.roughnessMap = makeTexture(512, 256, paintEarthRough, false);
    material.roughness = 1;
  }
  body.mats.push(material);

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 48), material);
  mesh.name = data.id;
  mesh.userData.body = body;
  body.mesh = mesh;
  body.anchor.add(mesh);
  pickables.push(mesh);

  if (data.axialDeg) body.anchor.rotation.z = THREE.MathUtils.degToRad(data.axialDeg);
  scene.add(body.anchor);

  if (data.id === "earth") {
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.025, 64, 48),
      new THREE.MeshStandardMaterial({
        map: makeTexture(1024, 512, paintClouds),
        transparent: true,
        depthWrite: false,
        opacity: 0.62,
        roughness: 1,
      })
    );
    clouds.raycast = () => {};
    mesh.add(clouds);
    body.clouds = clouds;
    body.mats.push(clouds.material);
  }

  if (data.kind === "star") {
    body.anchor.add(glowSprite(6.4, "rgba(255,236,196,0.95)", "rgba(255,176,72,0.4)"));
    body.anchor.add(glowSprite(11, "rgba(255,170,70,0.32)", "rgba(255,120,40,0.08)"));
    body.anchor.add(glowSprite(17, "rgba(255,120,40,0.12)", "rgba(255,80,20,0)"));
  }

  if (data.kind === "planet") {
    body.orbit = orbitRadius(data.au);
    body.e = data.e;
    body.peri = THREE.MathUtils.degToRad(data.periDeg);
    body.incl = THREE.MathUtils.degToRad(data.inclDeg * 1.65);
    body.angular = ((Math.PI * 2) * (365.256 / data.periodDays)) / EARTH_ORBIT_SECONDS;
    placeOnOrbit(body, body.angle, body.anchor.position);
    body.orbitLine = buildOrbitLine(body, scene);
  }

  if (data.ring) addRing(body, data.ring, pickables);
  return body;
}

function createMap(id) {
  if (id === "mercury") return textureFromCanvas(drawCraters("#8c847b", "#4e4944", "#d4cdc3", 820, false));
  if (id === "moon") return textureFromCanvas(drawCraters("#c2beb6", "#6a6762", "#eeeae4", 640, true));
  if (id === "sun") return makeTexture(1024, 512, paintSun);
  if (id === "venus") return makeTexture(768, 384, paintVenus);
  if (id === "earth") return makeTexture(1024, 512, paintEarth);
  if (id === "mars") return makeTexture(768, 384, paintMars);
  return makeTexture(id === "jupiter" || id === "saturn" ? 1024 : 768, id === "jupiter" || id === "saturn" ? 512 : 384, (u, v) => paintGas(id, u, v));
}

function addRing(body, spec, pickables) {
  const geometry = new THREE.RingGeometry(body.radius * spec.inner, body.radius * spec.outer, 160);
  const material = spec.textured
    ? new THREE.MeshStandardMaterial({
      map: textureFromCanvas(paintRingCanvas()),
      roughness: 0.68,
      metalness: 0.04,
      side: THREE.DoubleSide,
      alphaTest: 0.22,
    })
    : new THREE.MeshBasicMaterial({
      color: spec.color,
      transparent: true,
      opacity: spec.opacity ?? 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  ring.userData.body = body;
  body.anchor.add(ring);
  pickables.push(ring);
  if (material.emissive) body.mats.push(material);
}

function buildOrbitLine(body, scene) {
  const positions = [];
  const point = new THREE.Vector3();
  const steps = 320;
  for (let i = 0; i <= steps; i += 1) {
    placeOnOrbit(body, (i / steps) * Math.PI * 2, point);
    positions.push(point.x, point.y, point.z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: body.id === "earth" ? 0x8c7b62 : 0x6d6252,
    transparent: true,
    opacity: body.id === "earth" ? 0.46 : 0.3,
  });
  const line = new THREE.Line(geometry, material);
  line.raycast = () => {};
  scene.add(line);
  return line;
}

function placeMoon(moon, earth, dt = 0, speed = 0) {
  const cap = Math.min(speed, 4);
  moon.angle += ((Math.PI * 2) / 18) * dt * cap;
  const dist = 2.55;
  const incl = 0.14;
  const ang = moon.angle;
  moon.anchor.position.set(
    earth.anchor.position.x + Math.cos(ang) * dist,
    earth.anchor.position.y + Math.sin(ang) * dist * Math.sin(incl),
    earth.anchor.position.z + Math.sin(ang) * dist * Math.cos(incl)
  );
}

function softDisc() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const g = canvas.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.65)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return textureFromCanvas(canvas);
}

function makeStars(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const band = rand(i + 3) < 0.14;
    const radius = 280 + rand(i + 11) ** 0.5 * 700;
    let x;
    let y;
    let z;
    if (band) {
      const a = rand(i + 19) * Math.PI * 2;
      const spread = (rand(i + 23) - 0.5) * 0.48;
      x = Math.cos(a) * radius;
      z = Math.sin(a) * radius;
      y = spread * radius;
      const tilt = 1.05;
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      y = y2;
      z = z2;
    } else {
      const theta = rand(i + 31) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i + 37) - 1);
      x = radius * Math.sin(phi) * Math.cos(theta);
      y = radius * Math.sin(phi) * Math.sin(theta);
      z = radius * Math.cos(phi);
    }
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    const warm = rand(i + 41) < 0.16;
    colors[i * 3] = warm ? 1 : 0.72 + rand(i + 43) * 0.28;
    colors[i * 3 + 1] = warm ? 0.84 : 0.78 + rand(i + 47) * 0.22;
    colors[i * 3 + 2] = warm ? 0.62 : 0.9 + rand(i + 53) * 0.1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: softDisc(),
      size: 1.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  points.raycast = () => {};
  return points;
}

function makeBelt() {
  const count = 520;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const au = 2.15 + rand(i + 17) * 1.15;
    const a = orbitRadius(au);
    const ang = rand(i + 29) * Math.PI * 2;
    positions[i * 3] = Math.cos(ang) * a;
    positions[i * 3 + 1] = (rand(i + 71) - 0.5) * 1.15;
    positions[i * 3 + 2] = Math.sin(ang) * a;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: softDisc(),
      color: 0xb7a88c,
      size: 0.72,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    })
  );
  points.raycast = () => {};
  return points;
}
