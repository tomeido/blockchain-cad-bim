import { describe, it, expect, beforeEach } from 'bun:test';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { Box } from './Viewer';

describe('Box Component', () => {
    it('renders mesh with boxGeometry and meshStandardMaterial', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);

        const mesh = renderer.scene.children[0];
        expect(mesh.type).toBe('Mesh');

        const geometry = mesh.allChildren.find((c) => c.type === 'BoxGeometry');
        expect(geometry).toBeDefined();

        const material = mesh.allChildren.find((c) => c.type === 'MeshStandardMaterial');
        expect(material).toBeDefined();
    });

    it('updates material color and emissive properties on pointer over and out', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);
        const mesh = renderer.scene.children[0];

        // Initial state
        let material = mesh.allChildren.find((c) => c.type === 'MeshStandardMaterial');
        expect(material?.props.color).toBe('#ffffff');
        expect(material?.props.emissive).toBe('#000000');
        expect(material?.props.emissiveIntensity).toBe(0);

        // Hover over
        await renderer.fireEvent(mesh, 'onPointerOver');
        material = mesh.allChildren.find((c) => c.type === 'MeshStandardMaterial');
        expect(material?.props.color).toBe('#6366f1');
        expect(material?.props.emissive).toBe('#4338ca');
        expect(material?.props.emissiveIntensity).toBe(0.5);

        // Hover out
        await renderer.fireEvent(mesh, 'onPointerOut');
        material = mesh.allChildren.find((c) => c.type === 'MeshStandardMaterial');
        expect(material?.props.color).toBe('#ffffff');
        expect(material?.props.emissive).toBe('#000000');
        expect(material?.props.emissiveIntensity).toBe(0);
    });

    it('updates scale on click', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Box position={[0, 0, 0]} />);
        const mesh = renderer.scene.children[0];

        // Initial state
        expect(mesh.props.scale).toBe(1);

        // Click to enlarge
        await renderer.fireEvent(mesh, 'onClick');
        expect(mesh.props.scale).toBe(1.5);

        // Click again to return to normal
        await renderer.fireEvent(mesh, 'onClick');
        expect(mesh.props.scale).toBe(1);
    });
});
