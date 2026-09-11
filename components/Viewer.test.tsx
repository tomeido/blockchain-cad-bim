/** @jest-environment node */
import ReactThreeTestRenderer from '@react-three/test-renderer';
import type { Mesh, MeshStandardMaterial } from 'three';
import { Box } from './Viewer';

type Renderer = Awaited<ReturnType<typeof ReactThreeTestRenderer.create>>;
let renderer: Renderer;

afterEach(async () => {
    await renderer?.unmount();
});

describe('Box Component', () => {
    it('renders a box with a standard material', async () => {
        renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);
        const mesh = renderer.scene.children[0].instance as Mesh;
        expect(mesh.type).toBe('Mesh');
        expect(mesh.geometry.type).toBe('BoxGeometry');
        expect((mesh.material as MeshStandardMaterial).type).toBe('MeshStandardMaterial');
    });

    it('updates material color and emissive properties on pointer over and out', async () => {
        renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);
        const mesh = renderer.scene.children[0];
        const material = (mesh.instance as Mesh).material as MeshStandardMaterial;
        expect(material.color.getHexString()).toBe('ffffff');
        expect(material.emissive.getHexString()).toBe('000000');
        expect(material.emissiveIntensity).toBe(0);

        await renderer.fireEvent(mesh, 'pointerOver');
        expect(material.color.getHexString()).toBe('6366f1');
        expect(material.emissive.getHexString()).toBe('4338ca');
        expect(material.emissiveIntensity).toBe(0.5);

        await renderer.fireEvent(mesh, 'pointerOut');
        expect(material.color.getHexString()).toBe('ffffff');
        expect(material.emissive.getHexString()).toBe('000000');
        expect(material.emissiveIntensity).toBe(0);
    });

    it('toggles scale when clicked', async () => {
        renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);
        const mesh = renderer.scene.children[0];
        expect((mesh.instance as Mesh).scale.toArray()).toEqual([1, 1, 1]);
        await renderer.fireEvent(mesh, 'click');
        expect((mesh.instance as Mesh).scale.toArray()).toEqual([1.5, 1.5, 1.5]);
        await renderer.fireEvent(mesh, 'click');
        expect((mesh.instance as Mesh).scale.toArray()).toEqual([1, 1, 1]);
    });
});
