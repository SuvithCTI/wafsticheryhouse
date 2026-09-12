import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Palette } from 'lucide-react';

interface FabricTheme {
  name: string;
  color: number;
  roughness: number;
  metalness: number;
  sheenColor: number;
  label: string;
  accent: string;
}

const FABRIC_THEMES: FabricTheme[] = [
  { name: 'crimson', color: 0x9b1127, roughness: 0.52, metalness: 0.12, sheenColor: 0xffd700, label: 'Bridal Crimson Raw Silk', accent: '#9b1127' },
  { name: 'emerald', color: 0x0c5028, roughness: 0.50, metalness: 0.14, sheenColor: 0x98ff98, label: 'Peacock Emerald Velvet', accent: '#0c5028' },
  { name: 'gold_zari', color: 0xc49429, roughness: 0.38, metalness: 0.55, sheenColor: 0xfff4c2, label: 'Kanchipuram Gold Brocade', accent: '#c49429' },
  { name: 'midnight', color: 0x141b44, roughness: 0.55, metalness: 0.15, sheenColor: 0x9cb6ff, label: 'Midnight Sapphire Silk', accent: '#141b44' },
  { name: 'rani_pink', color: 0xb51a54, roughness: 0.48, metalness: 0.12, sheenColor: 0xffa3c8, label: 'Rani Bridal Pink Organza', accent: '#b51a54' }
];

// High-Resolution Procedural Bridal Brocade & Zardozi Embroidery Texture Generator
function createBridalFabricTextures(colorHex: number): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  // 1. Base Silk Color & Bump Gray Baseline
  const hexStr = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = hexStr;
  ctx.fillRect(0, 0, size, size);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  // 2. Microscopic Silk Twill Weave (Diagonal Thread Grain)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  bCtx.fillStyle = '#8c8c8c';
  for (let y = 0; y < size; y += 4) {
    for (let x = 0; x < size; x += 4) {
      if ((x + y) % 8 === 0) {
        ctx.fillRect(x, y, 2, 2);
        bCtx.fillRect(x, y, 2, 2);
      }
    }
  }

  // 3. Raw Silk Slub Texture (Organic Horizontal Weft Threads)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  bCtx.fillStyle = '#737373';
  for (let i = 0; i < 900; i++) {
    const rx = Math.random() * size;
    const ry = Math.random() * size;
    const rw = Math.random() * 32 + 8;
    ctx.fillRect(rx, ry, rw, 1.2);
    bCtx.fillRect(rx, ry, rw, 1.2);
  }

  // 4. Intricate Golden Brocade Bootis (Floral Paisley / Kasu Motifs)
  const drawBrocadeBooti = (cx: number, cy: number, scale: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    bCtx.save();
    bCtx.translate(cx, cy);

    const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, 18 * scale);
    grad.addColorStop(0, '#fff4c2');
    grad.addColorStop(0.4, '#d4af37');
    grad.addColorStop(0.85, '#996515');
    grad.addColorStop(1, 'rgba(153, 101, 21, 0)');

    // Flower rosette with 8 petals
    for (let p = 0; p < 8; p++) {
      const pAngle = (p * Math.PI * 2) / 8;
      const px = Math.cos(pAngle) * 9 * scale;
      const py = Math.sin(pAngle) * 9 * scale;

      ctx.beginPath();
      ctx.arc(px, py, 4.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      bCtx.beginPath();
      bCtx.arc(px, py, 4.5 * scale, 0, Math.PI * 2);
      bCtx.fillStyle = '#e8e8e8'; // Raised 3D relief
      bCtx.fill();
    }

    // Center Gold Kundan Stone
    ctx.beginPath();
    ctx.arc(0, 0, 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#fffaed';
    ctx.fill();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    bCtx.beginPath();
    bCtx.arc(0, 0, 5 * scale, 0, Math.PI * 2);
    bCtx.fillStyle = '#ffffff'; // High specular bump
    bCtx.fill();

    ctx.restore();
    bCtx.restore();
  };

  // Staggered diamond grid of gold bootis
  const step = 96;
  for (let y = 48; y < size; y += step) {
    const isRowEven = Math.floor(y / step) % 2 === 0;
    const xStart = isRowEven ? 48 : 96;
    for (let x = xStart; x < size; x += step) {
      drawBrocadeBooti(x, y, 0.95);
    }
  }

  // 5. Grand Zardozi Scalloped Border (Along Bottom 20% of Texture)
  const borderY = size - 160;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.22)';
  ctx.fillRect(0, borderY, size, 160);

  // Heavy Gold Zari Chevron / Lattice
  ctx.strokeStyle = '#e6ca65';
  ctx.lineWidth = 2.5;
  bCtx.strokeStyle = '#f0f0f0';
  bCtx.lineWidth = 2.5;

  for (let x = 0; x < size; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, borderY);
    ctx.lineTo(x + 32, borderY + 64);
    ctx.lineTo(x + 64, borderY);
    ctx.stroke();

    bCtx.beginPath();
    bCtx.moveTo(x, borderY);
    bCtx.lineTo(x + 32, borderY + 64);
    bCtx.lineTo(x + 64, borderY);
    bCtx.stroke();
  }

  // Double Solid Gold Zari Hem Ribbon
  const ribbonGrad = ctx.createLinearGradient(0, size - 40, 0, size);
  ribbonGrad.addColorStop(0, '#f5d77f');
  ribbonGrad.addColorStop(0.5, '#d4af37');
  ribbonGrad.addColorStop(1, '#996515');

  ctx.fillStyle = ribbonGrad;
  ctx.fillRect(0, size - 44, size, 36);

  bCtx.fillStyle = '#ffffff';
  bCtx.fillRect(0, size - 44, size, 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(4, 4);

  return { map: texture, bumpMap };
}

// Procedural Measuring Tape Texture (Yellow Atelier Tape with Millimeter Marks)
function createMeasuringTapeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Vintage tailoring mustard yellow tape
  ctx.fillStyle = '#edd153';
  ctx.fillRect(0, 0, 1024, 64);

  // Borders
  ctx.fillStyle = '#b89418';
  ctx.fillRect(0, 0, 1024, 3);
  ctx.fillRect(0, 61, 1024, 3);

  // Metric tick lines
  ctx.fillStyle = '#2b2108';
  for (let x = 0; x < 1024; x += 8) {
    let tickHeight = 10;
    if (x % 64 === 0) {
      tickHeight = 28;
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`${x / 16}`, x + 2, 48);
    } else if (x % 32 === 0) {
      tickHeight = 20;
    }
    ctx.fillRect(x, 4, 1.8, tickHeight);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(6, 1);
  return texture;
}

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<FabricTheme>(FABRIC_THEMES[0]);
  const [lightingPreset, setLightingPreset] = useState<'runway' | 'golden' | 'midnight'>('runway');

  // Meshes & Lights refs for dynamic updates
  const garmentMeshesRef = useRef<THREE.Mesh[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.05, 4.25));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, -0.05, 0));

  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const runwaySpotRef = useRef<THREE.SpotLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.copy(targetCamPosRef.current);
    camera.lookAt(targetLookAtRef.current);
    cameraRef.current = camera;

    // 3. Renderer with High-DPI, Tone Mapping & Soft Highlights
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls with Damping and Angle Limits
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.8;
    controls.maxDistance = 5.6;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.58; // Prevents clipping under floor
    controls.target.copy(targetLookAtRef.current);
    controlsRef.current = controls;

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.0);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.PointLight(0xd4af37, 3.5, 16);
    fillLight.position.set(-3.5, 2.2, 2.5);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xffdf88, 3.2);
    rimLight.position.set(0, 3.8, -3.8);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const runwaySpot = new THREE.SpotLight(0xfffaed, 4.0, 14, Math.PI / 4.8, 0.45);
    runwaySpot.position.set(2.4, 3.8, 2.8);
    scene.add(runwaySpot);
    runwaySpotRef.current = runwaySpot;

    // 6. Master Ensemble Group
    const ensemble = new THREE.Group();
    scene.add(ensemble);

    // High-Resolution Fabric Textures
    const initialTextures = createBridalFabricTextures(activeTheme.color);

    // MeshPhysicalMaterial with Sheen & Brocade Bump
    const bridalSilkMat = new THREE.MeshPhysicalMaterial({
      color: activeTheme.color,
      roughness: activeTheme.roughness,
      metalness: activeTheme.metalness,
      sheen: 1.0,
      sheenColor: activeTheme.sheenColor,
      sheenRoughness: 0.35,
      clearcoat: 0.12,
      clearcoatRoughness: 0.25,
      map: initialTextures.map,
      bumpMap: initialTextures.bumpMap,
      bumpScale: 0.024,
      side: THREE.DoubleSide
    });

    // Metallic Gilded Zari Materials
    const goldPolishedMat = new THREE.MeshStandardMaterial({
      color: 0xe6bf43,
      metalness: 0.94,
      roughness: 0.14,
      emissive: 0x664906,
      emissiveIntensity: 0.2
    });

    const antiqueBrassMat = new THREE.MeshStandardMaterial({
      color: 0xc49d3b,
      metalness: 0.88,
      roughness: 0.28
    });

    const zardoziEmbroideredMat = new THREE.MeshStandardMaterial({
      color: 0xffe28a,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x996515,
      emissiveIntensity: 0.38
    });

    // 7. Ground Dais with Ambient Occlusion Contact Shadow
    const shadowGeo = new THREE.CircleGeometry(1.65, 48);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050204,
      transparent: true,
      opacity: 0.78
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -1.41;
    ensemble.add(shadowMesh);

    // Polished Atelier Stage Pedestal
    const stageGeo = new THREE.CylinderGeometry(1.58, 1.68, 0.08, 48);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x220c1d,
      roughness: 0.32,
      metalness: 0.45
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -1.38;
    ensemble.add(stageMesh);

    // Gilded Pedestal Beveled Rim
    const stageRimGeo = new THREE.TorusGeometry(1.66, 0.02, 16, 48);
    stageRimGeo.rotateX(Math.PI / 2);
    const stageRim = new THREE.Mesh(stageRimGeo, goldPolishedMat);
    stageRim.position.y = -1.35;
    ensemble.add(stageRim);

    // Concentric Pulsing Embroidery Guide Ring
    const floorRingGeo = new THREE.RingGeometry(1.1, 1.18, 48);
    floorRingGeo.rotateX(-Math.PI / 2);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0xf5d77f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.position.y = -1.33;
    ensemble.add(floorRing);

    // 8. Authentic French Dressmaker Dummy Stand (Antique Cast Brass)
    const tripodCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, 0.14, 20), antiqueBrassMat);
    tripodCenter.position.y = -1.24;
    ensemble.add(tripodCenter);

    // 3 Curved Scrolled Tripod Legs
    for (let i = 0; i < 3; i++) {
      const legAngle = (i * Math.PI * 2) / 3;
      const legPoints = [
        new THREE.Vector3(0, -1.24, 0),
        new THREE.Vector3(Math.cos(legAngle) * 0.22, -1.28, Math.sin(legAngle) * 0.22),
        new THREE.Vector3(Math.cos(legAngle) * 0.45, -1.36, Math.sin(legAngle) * 0.45)
      ];
      const legCurve = new THREE.CatmullRomCurve3(legPoints);
      const legMesh = new THREE.Mesh(new THREE.TubeGeometry(legCurve, 20, 0.02, 12, false), antiqueBrassMat);
      ensemble.add(legMesh);

      // Turned brass ball feet
      const footMesh = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), antiqueBrassMat);
      footMesh.position.set(Math.cos(legAngle) * 0.45, -1.36, Math.sin(legAngle) * 0.45);
      ensemble.add(footMesh);
    }

    // Turned Central Brass Column
    const columnGeo = new THREE.CylinderGeometry(0.024, 0.024, 2.5, 20);
    const columnMesh = new THREE.Mesh(columnGeo, antiqueBrassMat);
    columnMesh.position.y = -0.05;
    ensemble.add(columnMesh);

    // Vintage Turned Acorn Finial Crown (Stockman Paris Style)
    const finialGroup = new THREE.Group();
    const finialCrown = new THREE.Mesh(new THREE.SphereGeometry(0.068, 24, 24), goldPolishedMat);
    finialCrown.position.y = 1.34;
    finialGroup.add(finialCrown);

    const finialSpire = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.09, 16), goldPolishedMat);
    finialSpire.position.y = 1.43;
    finialGroup.add(finialSpire);

    const finialNeckCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.06, 24), goldPolishedMat);
    finialNeckCollar.position.y = 1.26;
    finialGroup.add(finialNeckCollar);
    ensemble.add(finialGroup);

    // Authentic Ecru Tailor's Dummy Neck
    const neckDummy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.068, 0.082, 0.16, 24),
      new THREE.MeshStandardMaterial({
        color: 0xe3d8c5,
        roughness: 0.85,
        metalness: 0.04
      })
    );
    neckDummy.position.y = 1.15;
    ensemble.add(neckDummy);

    // 9. Sculpted Haute Couture Bridal Blouse (Sweetheart Bustier & Princess Seams)
    const bodiceGeo = new THREE.CylinderGeometry(0.33, 0.22, 0.74, 40, 36);
    const bPos = bodiceGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const y = bPos.getY(i);
      const x = bPos.getX(i);
      const z = bPos.getZ(i);
      const angle = Math.atan2(z, x);

      let r = 1.0;
      if (y > 0.22) {
        const shoulderW = Math.abs(Math.cos(angle));
        r = 1.0 + shoulderW * 0.36;
      }
      if (y > -0.06 && y < 0.24 && z > 0) {
        const bustPeak = Math.sin(((y - -0.06) / 0.30) * Math.PI);
        const bustSplit = 1.0 - Math.abs(x) * 0.35;
        bPos.setZ(i, z + bustPeak * 0.105 * bustSplit);
      }
      if (y <= -0.16) {
        r = 0.84;
      }
      bPos.setX(i, bPos.getX(i) * r);
    }
    bodiceGeo.computeVertexNormals();

    const bodiceMesh = new THREE.Mesh(bodiceGeo, bridalSilkMat);
    bodiceMesh.position.y = 0.68;
    ensemble.add(bodiceMesh);
    garmentMeshesRef.current.push(bodiceMesh);

    // Sweetheart Neckline Aari Zardozi Beaded Piping Trim
    const necklineCurvePoints = [
      new THREE.Vector3(-0.17, 0.99, 0.13),
      new THREE.Vector3(-0.09, 0.87, 0.23),
      new THREE.Vector3(0.0, 0.82, 0.25),
      new THREE.Vector3(0.09, 0.87, 0.23),
      new THREE.Vector3(0.17, 0.99, 0.13)
    ];
    const necklineTrim = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(necklineCurvePoints), 36, 0.016, 12, false),
      zardoziEmbroideredMat
    );
    ensemble.add(necklineTrim);

    // Back Pot-Neck / Keyhole Cutout Piping
    const backNeckPoints = [
      new THREE.Vector3(-0.15, 0.99, -0.12),
      new THREE.Vector3(-0.09, 0.78, -0.22),
      new THREE.Vector3(0.0, 0.74, -0.23),
      new THREE.Vector3(0.09, 0.78, -0.22),
      new THREE.Vector3(0.15, 0.99, -0.12)
    ];
    const backNeckTrim = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(backNeckPoints), 32, 0.014, 12, false),
      zardoziEmbroideredMat
    );
    ensemble.add(backNeckTrim);

    // Back Dori Ties & Handcrafted Latkan Tassels with Hanging Pearls
    const doriPoints = [
      new THREE.Vector3(-0.07, 0.92, -0.16),
      new THREE.Vector3(0, 0.84, -0.19),
      new THREE.Vector3(0.07, 0.92, -0.16)
    ];
    const doriMesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(doriPoints), 16, 0.008, 8, false),
      zardoziEmbroideredMat
    );
    ensemble.add(doriMesh);

    [-0.03, 0.03].forEach((ox) => {
      const tasselCord = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.004, 0.26, 8),
        zardoziEmbroideredMat
      );
      tasselCord.position.set(ox, 0.71, -0.19);
      ensemble.add(tasselCord);

      const latkanBell = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.045, 16), zardoziEmbroideredMat);
      latkanBell.rotation.x = Math.PI;
      latkanBell.position.set(ox, 0.57, -0.19);
      ensemble.add(latkanBell);

      const latkanPearl = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.18, metalness: 0.28 })
      );
      latkanPearl.position.set(ox, 0.53, -0.19);
      ensemble.add(latkanPearl);
    });

    // 10. Tailored Elbow-Length Sleeves with Heavy Maggam Cuffs
    const sleeveGeo = new THREE.CylinderGeometry(0.092, 0.076, 0.46, 28);
    const leftSleeve = new THREE.Mesh(sleeveGeo, bridalSilkMat);
    leftSleeve.position.set(-0.36, 0.72, 0.0);
    leftSleeve.rotation.z = Math.PI / 11;
    ensemble.add(leftSleeve);
    garmentMeshesRef.current.push(leftSleeve);

    const leftCuff = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.022, 16, 36), zardoziEmbroideredMat);
    leftCuff.position.set(-0.39, 0.51, 0.0);
    leftCuff.rotation.x = Math.PI / 2;
    leftCuff.rotation.y = -Math.PI / 11;
    ensemble.add(leftCuff);

    const rightSleeve = new THREE.Mesh(sleeveGeo, bridalSilkMat);
    rightSleeve.position.set(0.36, 0.72, 0.0);
    rightSleeve.rotation.z = -Math.PI / 11;
    ensemble.add(rightSleeve);
    garmentMeshesRef.current.push(rightSleeve);

    const rightCuff = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.022, 16, 36), zardoziEmbroideredMat);
    rightCuff.position.set(0.39, 0.51, 0.0);
    rightCuff.rotation.x = Math.PI / 2;
    rightCuff.rotation.y = Math.PI / 11;
    ensemble.add(rightCuff);

    // 11. Authentic Atelier Yellow Measuring Tape (Draped over Neck & Shoulder)
    const tapePoints = [
      new THREE.Vector3(-0.09, 1.12, 0.08),
      new THREE.Vector3(-0.16, 1.04, 0.14),
      new THREE.Vector3(-0.24, 0.88, 0.16),
      new THREE.Vector3(-0.27, 0.62, 0.18),
      new THREE.Vector3(-0.25, 0.35, 0.22)
    ];
    const tapeCurve = new THREE.CatmullRomCurve3(tapePoints);
    const tapeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(tapeCurve, 48, 0.016, 8, false),
      new THREE.MeshStandardMaterial({
        map: createMeasuringTapeTexture(),
        roughness: 0.65,
        metalness: 0.08
      })
    );
    ensemble.add(tapeMesh);

    // 12. South Indian Bridal Odiyanam / Kamarbandh (Temple Gold Waist Belt)
    const beltGeo = new THREE.TorusGeometry(0.245, 0.026, 16, 40);
    beltGeo.rotateX(Math.PI / 2);
    const beltMesh = new THREE.Mesh(beltGeo, goldPolishedMat);
    beltMesh.position.y = 0.31;
    beltMesh.scale.set(1.0, 0.85, 1.0);
    ensemble.add(beltMesh);

    const broochMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.06),
      new THREE.MeshStandardMaterial({ color: 0x076131, roughness: 0.08, metalness: 0.9 })
    );
    broochMesh.position.set(0, 0.31, 0.26);
    ensemble.add(broochMesh);

    // 13. Realistic 24-Kali Flared Lehenga Skirt (Deep Organic Pleats)
    const skirtGeo = new THREE.CylinderGeometry(0.23, 0.96, 1.34, 72, 40, true);
    const skirtPos = skirtGeo.attributes.position;
    for (let i = 0; i < skirtPos.count; i++) {
      const x = skirtPos.getX(i);
      const y = skirtPos.getY(i);
      const z = skirtPos.getZ(i);
      const angle = Math.atan2(z, x);
      const rCurrent = Math.sqrt(x * x + z * z);

      const t = (0.67 - y) / 1.34;
      const kaliWave = Math.sin(angle * 24) * (0.058 * t * t);
      const organicFold = Math.cos(angle * 12) * (0.028 * t);
      const newRadius = rCurrent + kaliWave + organicFold;

      skirtPos.setX(i, Math.cos(angle) * newRadius);
      skirtPos.setZ(i, Math.sin(angle) * newRadius * 0.88);
    }
    skirtGeo.computeVertexNormals();

    const initialSkirtPos = skirtPos.array.slice();
    const skirtMesh = new THREE.Mesh(skirtGeo, bridalSilkMat);
    skirtMesh.position.y = -0.36;
    ensemble.add(skirtMesh);
    garmentMeshesRef.current.push(skirtMesh);

    // Scalloped Heavy Gold Zari Hem Border Band
    const hemBorder = new THREE.Mesh(
      new THREE.TorusGeometry(0.94, 0.026, 16, 64),
      zardoziEmbroideredMat
    );
    hemBorder.rotateX(Math.PI / 2);
    hemBorder.position.y = -1.02;
    ensemble.add(hemBorder);

    // 36 Lustrous Teardrop Pearl Drops along the Hemline
    const pearlGroup = new THREE.Group();
    const pearlCount = 36;
    const pearlGeo = new THREE.SphereGeometry(0.018, 14, 14);
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xfffef8,
      roughness: 0.16,
      metalness: 0.32
    });

    for (let i = 0; i < pearlCount; i++) {
      const pAngle = (i * Math.PI * 2) / pearlCount;
      const px = Math.cos(pAngle) * 0.94;
      const pz = Math.sin(pAngle) * 0.94 * 0.88;
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(px, -1.06, pz);
      pearlGroup.add(pearl);
    }
    ensemble.add(pearlGroup);

    // 14. Cascading Sheer Organza Dupatta / Pallu Drape
    const sashCurvePoints = [
      new THREE.Vector3(-0.29, 0.98, 0.14),
      new THREE.Vector3(-0.15, 0.60, 0.28),
      new THREE.Vector3(0.16, 0.34, 0.27),
      new THREE.Vector3(0.32, -0.04, 0.25),
      new THREE.Vector3(0.40, -0.46, 0.36)
    ];
    const sashMesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sashCurvePoints), 48, 0.044, 14, false),
      bridalSilkMat
    );
    ensemble.add(sashMesh);
    garmentMeshesRef.current.push(sashMesh);

    const shoulderBrooch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.015, 16),
      goldPolishedMat
    );
    shoulderBrooch.position.set(-0.29, 0.98, 0.15);
    shoulderBrooch.rotation.x = Math.PI / 4;
    ensemble.add(shoulderBrooch);

    // 15. Real-Time Golden Aari Needle & Stitching Animation
    const needleGroup = new THREE.Group();
    const needleShaftGeo = new THREE.CylinderGeometry(0.007, 0.002, 0.28, 12);
    needleShaftGeo.rotateZ(Math.PI / 2);
    const needleMat = new THREE.MeshStandardMaterial({
      color: 0xfff2b8,
      metalness: 0.98,
      roughness: 0.08,
      emissive: 0xd4af37,
      emissiveIntensity: 0.75
    });
    const needleMesh = new THREE.Mesh(needleShaftGeo, needleMat);
    needleGroup.add(needleMesh);

    const needleLight = new THREE.PointLight(0xffe680, 3.0, 2.5);
    needleGroup.add(needleLight);

    const needleTipSpark = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    needleTipSpark.position.x = 0.14;
    needleGroup.add(needleTipSpark);
    ensemble.add(needleGroup);

    // Spiraling Metallic Zardozi Thread
    const threadPoints: THREE.Vector3[] = [];
    const threadTurns = 3.2;
    const totalPoints = 140;
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * threadTurns;
      const radius = 0.45 + Math.sin(t * Math.PI) * 0.35;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.88;
      const y = -0.92 + t * 2.2;
      threadPoints.push(new THREE.Vector3(x, y, z));
    }
    const threadMesh = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(threadPoints), 100, 0.008, 8, false),
      zardoziEmbroideredMat
    );
    ensemble.add(threadMesh);

    // 16. Ambient Gold Sparkle Dust Particles
    const pCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 3.4;
      pPositions[i + 1] = (Math.random() - 0.5) * 3.2;
      pPositions[i + 2] = (Math.random() - 0.5) * 3.4;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const sparkles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xfce592, size: 0.028, transparent: true, opacity: 0.85 })
    );
    scene.add(sparkles);

    // 17. Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Transition to Active View Target
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.05);
        controlsRef.current.target.lerp(targetLookAtRef.current, 0.05);
        controlsRef.current.update();
      }

      // Gentle auto-rotation of ensemble
      ensemble.rotation.y += 0.0045;

      // Breathing elevation
      ensemble.position.y = Math.sin(elapsedTime * 1.5) * 0.02;

      // Realistic 24-kali cloth wave flutter on the flared skirt
      const pArr = skirtPos.array as Float32Array;
      const initArr = initialSkirtPos as Float32Array;
      for (let i = 0; i < pArr.length; i += 3) {
        const y = initArr[i + 1];
        const angle = Math.atan2(initArr[i + 2], initArr[i]);
        const factor = Math.max(0, -y);
        const wave = Math.sin(angle * 6 + elapsedTime * 2.2) * 0.022 * factor;
        const breeze = Math.cos(elapsedTime * 1.6 + y * 2) * 0.014 * factor;
        pArr[i] = initArr[i] + Math.cos(angle) * (wave + breeze);
        pArr[i + 2] = initArr[i + 2] + Math.sin(angle) * (wave + breeze);
      }
      skirtPos.needsUpdate = true;

      // Golden Aari Needle Orbiting & Real-Time Stitching Motion
      const needleAngle = elapsedTime * 1.6;
      const needleRadius = 0.50 + Math.sin(elapsedTime * 2.2) * 0.12;
      needleGroup.position.x = Math.cos(needleAngle) * needleRadius;
      needleGroup.position.z = Math.sin(needleAngle) * needleRadius * 0.88;
      needleGroup.position.y = 0.60 + Math.sin(elapsedTime * 2.8) * 0.28;
      needleGroup.rotation.y = -needleAngle + Math.PI / 2;
      needleGroup.rotation.z = Math.sin(elapsedTime * 3.5) * 0.22;

      // Pulsing floor guide ring
      floorRingMat.opacity = 0.45 + Math.sin(elapsedTime * 2.2) * 0.22;

      // Moving sweeping runway spotlight
      if (runwaySpotRef.current) {
        runwaySpotRef.current.position.x = Math.cos(elapsedTime * 0.7) * 3.4;
        runwaySpotRef.current.position.z = Math.sin(elapsedTime * 0.7) * 3.4;
      }

      // Sparkle drift & thread rotation
      sparkles.rotation.y = elapsedTime * 0.035;
      threadMesh.rotation.y = -elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 18. Dynamic Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Fabric Theme across all garment meshes dynamically
  useEffect(() => {
    const textures = createBridalFabricTextures(activeTheme.color);
    garmentMeshesRef.current.forEach((mesh) => {
      if (mesh && mesh.material instanceof THREE.MeshPhysicalMaterial) {
        mesh.material.color.setHex(activeTheme.color);
        mesh.material.roughness = activeTheme.roughness;
        mesh.material.metalness = activeTheme.metalness;
        mesh.material.sheenColor.setHex(activeTheme.sheenColor);
        mesh.material.map = textures.map;
        mesh.material.bumpMap = textures.bumpMap;
        mesh.material.needsUpdate = true;
      }
    });
  }, [activeTheme]);


  // Update Lighting Presets
  useEffect(() => {
    if (!keyLightRef.current || !fillLightRef.current || !runwaySpotRef.current) return;
    if (lightingPreset === 'runway') {
      keyLightRef.current.color.setHex(0xfffaed);
      keyLightRef.current.intensity = 3.0;
      fillLightRef.current.color.setHex(0xd4af37);
      fillLightRef.current.intensity = 3.5;
      runwaySpotRef.current.color.setHex(0xfffaed);
      runwaySpotRef.current.intensity = 4.0;
    } else if (lightingPreset === 'golden') {
      keyLightRef.current.color.setHex(0xffb84d);
      keyLightRef.current.intensity = 3.6;
      fillLightRef.current.color.setHex(0xff8c1a);
      fillLightRef.current.intensity = 3.2;
      runwaySpotRef.current.color.setHex(0xffd700);
      runwaySpotRef.current.intensity = 4.2;
    } else if (lightingPreset === 'midnight') {
      keyLightRef.current.color.setHex(0x7090ff);
      keyLightRef.current.intensity = 2.6;
      fillLightRef.current.color.setHex(0xd4af37);
      fillLightRef.current.intensity = 2.4;
      runwaySpotRef.current.color.setHex(0x99b3ff);
      runwaySpotRef.current.intensity = 3.0;
    }
  }, [lightingPreset]);

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col select-none rounded-3xl bg-gradient-to-b from-[#3a162f] via-[#240e1f] to-[#1a0816] border border-gold-400/40 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)] overflow-hidden group">
      {/* 3D Runway Stage Container with Warm Golden Radial Aura */}
      <div className="relative w-full h-[410px] sm:h-[450px] lg:h-[480px] overflow-hidden flex items-center justify-center">
        {/* Luminous Warm Runway Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(212,175,55,0.28),rgba(184,88,116,0.15)_45%,transparent_75%)] pointer-events-none" />

        {/* 3D WebGL Canvas */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
      </div>

      {/* Integrated Atelier Studio Toolbar (Docked at Bottom, Warm Royal Styling) */}
      <div className="w-full bg-[#200b1a]/95 backdrop-blur-md px-4 py-3 border-t border-gold-400/30 flex flex-wrap items-center justify-between gap-2.5 z-20">
        {/* Fabric Swatches */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1 text-xs text-zinc-300 font-medium">
            <Palette className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] text-gold-300 font-serif italic truncate max-w-[130px]">
              {activeTheme.label}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {FABRIC_THEMES.map((theme) => {
              const isSelected = activeTheme.name === theme.name;
              return (
                <button
                  key={theme.name}
                  onClick={() => setActiveTheme(theme)}
                  title={theme.label}
                  style={{ backgroundColor: theme.accent }}
                  className={`w-5 h-5 rounded-full transition-all duration-300 transform relative ${
                    isSelected
                      ? 'ring-2 ring-gold-400 scale-125 shadow-md shadow-gold-400/60'
                      : 'opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lighting Mode Selector */}
        <div className="flex items-center space-x-1 bg-black/60 p-0.5 rounded-lg border border-gold-400/30 text-[10px]">
          {(['runway', 'golden', 'midnight'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setLightingPreset(mode)}
              className={`px-2 py-0.5 rounded capitalize transition ${
                lightingPreset === mode
                  ? 'bg-gold-500/40 text-gold-200 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
