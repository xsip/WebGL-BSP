// import { Vertex } from "../Structs/Vertex";
// import { vec3, vec4 } from "gl-matrix";
export class MeshFactory {
	
}
// export class MeshFactory {
// 	public static createSolidCube(SideLength: number = 10, color: vec4 = vec4.fromValues(1, 0, 0, 1)): Vertex[] {
// 		const halfSideLength = SideLength / 2; // half side length, otherwise creates cube with 2x length requested

// 		return [
// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, -halfSideLength),   color),
// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, halfSideLength),     color),

// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, -halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, -halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, halfSideLength),      color),

// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, -halfSideLength),   color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, halfSideLength),     color),

// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, -halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, -halfSideLength),     color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, halfSideLength),      color),

// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, -halfSideLength),   color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, -halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, -halfSideLength),     color),

// 			new Vertex(vec3.fromValues(-halfSideLength, -halfSideLength, halfSideLength),    color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(-halfSideLength, halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, -halfSideLength, halfSideLength),     color),
// 			new Vertex(vec3.fromValues(halfSideLength, halfSideLength, halfSideLength),      color)
// 		];
// 	}
// }