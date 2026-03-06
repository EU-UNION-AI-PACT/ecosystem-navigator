import { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { clusters, hubInfo, type ClusterKey } from "@/data/ecosystemData";

const CLUSTER_HEX: Record<ClusterKey, string> = {
  infra: "#4a9eff",
  finance: "#e8b928",
  tech: "#2cc5c5",
  governance: "#3cb371",
  research: "#9370db",
  dev: "#e87040",
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  const lines = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    for (let lat = -60; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 5) {
        pts.push(latLngToVector3(lat, lng, 2));
      }
      result.push(pts);
    }
    for (let lng = -180; lng < 180; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        pts.push(latLngToVector3(lat, lng, 2));
      }
      result.push(pts);
    }
    return result;
  }, []);

  return (
    <group ref={ref}>
      <Sphere args={[1.98, 48, 48]}>
        <meshBasicMaterial color="#0a0f1c" transparent opacity={0.85} />
      </Sphere>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#1a2540" lineWidth={0.5} />
      ))}
    </group>
  );
}

function ConnectionArc({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(2.4);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [start, end]);

  return <Line points={points} color={color} lineWidth={0.8} transparent opacity={0.25} />;
}

function PartnerMarkers({ onHover }: { onHover: (info: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  const allPartners = useMemo(() => {
    return clusters.flatMap((c) =>
      c.partners
        .filter((p) => p.lat !== undefined && p.lng !== undefined)
        .map((p) => ({
          ...p,
          clusterKey: c.key,
          pos: latLngToVector3(p.lat!, p.lng!, 2.05),
        }))
    );
  }, []);

  const hubPos = useMemo(
    () => latLngToVector3(hubInfo.location.lat, hubInfo.location.lng, 2.05),
    []
  );

  const grouped = useMemo(() => {
    const groups: { partners: typeof allPartners; pos: THREE.Vector3 }[] = [];
    allPartners.forEach((p) => {
      const existing = groups.find((g) => g.pos.distanceTo(p.pos) < 0.08);
      if (existing) {
        existing.partners.push(p);
      } else {
        groups.push({ partners: [p], pos: p.pos.clone() });
      }
    });
    return groups;
  }, [allPartners]);

  return (
    <group ref={groupRef}>
      <mesh position={hubPos}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#e8b928" />
      </mesh>
      <mesh position={hubPos}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#e8b928" transparent opacity={0.2} />
      </mesh>
      <Html position={[hubPos.x * 1.1, hubPos.y * 1.1, hubPos.z * 1.1]} center distanceFactor={8}>
        <div className="bg-card/90 border border-primary rounded px-2 py-0.5 text-[9px] font-mono font-bold text-primary whitespace-nowrap pointer-events-none backdrop-blur-sm select-none">
          HNOSS HQ
        </div>
      </Html>

      {grouped.map((group, i) => {
        const color = CLUSTER_HEX[group.partners[0].clusterKey];
        const names = group.partners.map((p) => p.name).join(", ");
        const leader = group.partners[0].leader;
        const leaderTitle = group.partners[0].leaderTitle;
        const city = group.partners[0].city || "";
        const country = group.partners[0].country || "";
        const lat = group.partners[0].lat?.toFixed(2);
        const lng = group.partners[0].lng?.toFixed(2);
        const tooltipText = `${names} · ${city}, ${country} · ${lat}°, ${lng}°${leader ? ` · ${leaderTitle}: ${leader}` : ""}`;

        return (
          <group key={i}>
            <ConnectionArc start={hubPos} end={group.pos} color={color} />
            <mesh
              position={group.pos}
              onPointerEnter={() => onHover(tooltipText)}
              onPointerLeave={() => onHover(null)}
            >
              <sphereGeometry args={[group.partners.length > 1 ? 0.035 : 0.025, 12, 12]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <mesh position={group.pos}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color={color} transparent opacity={0.12} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ShootingStars() {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const starsData = useRef(
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ),
      vel: new THREE.Vector3(
        -(Math.random() * 0.03 + 0.02),
        -(Math.random() * 0.015 + 0.01),
        -(Math.random() * 0.005)
      ),
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 100,
      scale: 0.008 + Math.random() * 0.015,
    }))
  );

  useFrame(() => {
    if (!meshRef.current) return;
    starsData.current.forEach((star, i) => {
      star.life += 1;
      if (star.life > star.maxLife) {
        star.life = 0;
        star.pos.set(
          (Math.random() - 0.5) * 30 + 8,
          (Math.random() - 0.5) * 20 + 8,
          (Math.random() - 0.5) * 30
        );
      }
      star.pos.add(star.vel);
      const progress = star.life / star.maxLife;
      const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
      const s = star.scale * alpha;
      dummy.position.copy(star.pos);
      dummy.scale.set(s * 4, s * 0.5, s * 0.5);
      dummy.lookAt(star.pos.clone().add(star.vel));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 3, 2]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
    </instancedMesh>
  );
}

export default function Globe3D() {
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);

  return (
    <section className="relative z-10 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-2">
          3D Visualisierung
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Globale Partner-Kugel
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">
          Interaktive 3D-Weltkugel mit Sternschnuppen — drehen und zoomen
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {clusters.map((c) => (
          <div key={c.key} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: CLUSTER_HEX[c.key] }}
            />
            <span className="text-muted-foreground">{c.label}</span>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl border border-border bg-[#040810] overflow-hidden relative"
      >
        <div className="w-full h-[500px] md:h-[650px]">
          <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Stars radius={100} depth={80} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <ShootingStars />
            <GlobeWireframe />
            <PartnerMarkers onHover={setHoverInfo} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3}
              maxDistance={8}
              autoRotate={false}
            />
          </Canvas>
        </div>

        {hoverInfo && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-popover/95 border border-border rounded-lg px-4 py-2.5 text-xs font-mono text-foreground shadow-xl backdrop-blur-md max-w-md text-center">
            📍 {hoverInfo}
          </div>
        )}
      </motion.div>
    </section>
  );
}
