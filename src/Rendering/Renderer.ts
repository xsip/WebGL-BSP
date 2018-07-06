import {FragShader, VertShader} from "./Shaders/ShaderSource";
import { CreateShaderProgram } from "./Shaders/Shader";
import {Camera} from "./Camera/Camera";
import { RenderObject } from "./RenderObject";
import { projection } from "gl-matrix/src/gl-matrix/mat3";

export class GLRenderer {
	public gl: WebGL2RenderingContext;

	public cameras: Camera[];
	public activeCamera: Camera;

	public gridSize = 15;
	public drawGrid = true;

	private defaultShaderProgram: WebGLProgram | null;
	private defaultShaders = [FragShader, VertShader];

	private renderObjects: RenderObject[] = [];
	// private grid: RenderObject;
	
	private renderNextFrame = true;

	private uModelMatLocation!: WebGLUniformLocation | null;
	private uViewMatLocation!: WebGLUniformLocation | null;
	private uProjectionMatrixLocation!: WebGLUniformLocation | null;

	constructor(_gl: WebGL2RenderingContext) {
		// setup gl settings
		this.gl = _gl;
		this.gl.clearColor(0.0, 0, 0, 1.0);
		this.gl.clearDepth(1.0);
		this.gl.cullFace(this.gl.BACK);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);

		// setup default camera
		this.cameras = [new Camera(this.gl.canvas.height, this.gl.canvas.width)];
		this.activeCamera = this.cameras[0];
		
		// create default shader
		this.defaultShaderProgram = CreateShaderProgram(this.gl, this.defaultShaders);
		if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
			return;
		}

		this.uModelMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uModelMat");
		this.uViewMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uViewMat");
		this.uProjectionMatrixLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uProjectionMat");
	}

	public AddRenderObject(object: RenderObject) {
		this.renderObjects.push(object);
	}

	public StartRenderLoop() {
		while (this.renderNextFrame) {
			this.Render();
		}
	}

	public Render() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// use default shader
		this.gl.useProgram(this.defaultShaderProgram);

		// send uniforms to gpu
		this.gl.uniformMatrix4fv(this.uModelMatLocation,
			false,
			this.activeCamera.GetModelMatrix());

		this.gl.uniformMatrix4fv(this.uViewMatLocation,
			false,
			this.activeCamera.GetViewMatrix());		

		this.gl.uniformMatrix4fv(this.uProjectionMatrixLocation,
			false, 
			 this.activeCamera.GetProjectionMatrix());

		this.renderObjects.forEach((renderObject) => {
			renderObject.Render(this.gl, this.gl.TRIANGLES);
		});
	}
}