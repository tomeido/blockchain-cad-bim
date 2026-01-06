'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import { useState } from 'react';

function Box(props: any) {
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <mesh
            {...props}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={hovered ? '#6366f1' : '#ffffff'}
                emissive={hovered ? '#4338ca' : '#000000'}
                emissiveIntensity={hovered ? 0.5 : 0}
                roughness={0.1}
                metalness={0.8}
            />
        </mesh>
    );
}

export default function Viewer() {
    return (
        <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black relative">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Interactive Mode
                </div>
            </div>

            <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 4, 10], fov: 45 }}>
                <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', opacity: 0.4, blur: 2.5 }}>
                    <Box position={[-1.5, 0.5, 0]} />
                    <Box position={[1.5, 0.5, 0]} />
                </Stage>

                <Grid
                    renderOrder={-1}
                    position={[0, -0.01, 0]}
                    infiniteGrid
                    cellSize={1}
                    sectionSize={3}
                    fadeDistance={25}
                    sectionColor="#4f46e5"
                    cellColor="#312e81"
                    sectionThickness={1}
                    cellThickness={0.5}
                />

                <OrbitControls makeDefault autoRotate autoRotateSpeed={0.8} dampingFactor={0.05} />
            </Canvas>
        </div>
    );
}
