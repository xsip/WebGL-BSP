import {FragShader, VertShader} from "./Shaders/ShaderSource";
import { CreateShaderProgram } from "./Shaders/Shader";
import { ICamera} from "./Camera/ICamera";
import { RenderObject } from "./RenderObjects/RenderObject";
import { KeyboardListener } from "../Utils/KeyboardListener";
import { MouseHandler } from "../Utils/MouseHandler";
import { IRenderable } from "./RenderObjects/IRenderable";
import { PerspectiveCamera } from "./Camera/PerspectiveCamera";
import { MeshFactory } from "../Utils/MeshFactory";
import { Texture } from "./Textures/Texture";
import { vec4 } from "gl-matrix";
import { UniformLocations } from "./UniformLocations";
import { TextureDictionary } from "./Textures/TextureDictionary";
import { GLContext } from "./GLSingleton";

export class GLRenderer {
	public gl: WebGL2RenderingContext;

	public cameras: ICamera[];
	public activeCamera: ICamera;

	// temporary. todo change to support multiple instances
	private static _renderer: GLRenderer;
	public static get renderer(): GLRenderer {
		return GLRenderer._renderer;
	}
	public static set renderer(value: GLRenderer) {
		GLRenderer._renderer = value;
	}

	public gridSize = 15;
	public drawGrid = true;

	private defaultShaderProgram: WebGLProgram | null;
	private defaultShaders = [FragShader, VertShader];

	private renderObjects: IRenderable[] = [];
	// private grid: RenderObject;

	public uniformLocations!: UniformLocations;

	private keyboardListener!: KeyboardListener;
	public mouseHandler!: MouseHandler;

	private previousTime = 0;
	public render = false;

	constructor(_gl: WebGL2RenderingContext) {
		console.log("--Initializing Renderer--");

		// setup gl settings
		this.gl = _gl;

		GLContext.getInstance();
		TextureDictionary.createNewInstance(this.gl);

		GLContext.updateGLContext(this.gl);
		
		this.gl.clearColor(0.0, 0, 0, 1.0);
		this.gl.clearDepth(1.0);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.cullFace(this.gl.FRONT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// setup default camera
		this.cameras = [new PerspectiveCamera(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)];
		this.activeCamera = this.cameras[0];
		
		// create default shader
		this.defaultShaderProgram = CreateShaderProgram(this.gl, this.defaultShaders);
		if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
			return;
		}

		this.uniformLocations = new UniformLocations(this.gl, this.defaultShaderProgram);

		// setup the texture array to use TEXTURE0
		this.gl.uniform1i(this.uniformLocations.uTextureArrayLocation, 0);
		
		// setup keyboard listener
		this.keyboardListener = new KeyboardListener(this);
		this.mouseHandler = new MouseHandler(this.activeCamera);

		GLRenderer.renderer = this;
	}

	public AddRenderableObject(object: IRenderable) {
		this.renderObjects.push(object);
	}

	public clearRenderObjects() {
		this.renderObjects = [];
	}

	public Render(currentTime = 0) {
		// resize every frame so when user resizes canvas it is smooth
		this.resize();
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

		// poll keyboard and move camera
		this.keyboardListener.pollKeyboard(this.activeCamera);

		// convert dTime to seconds
		this.mouseHandler.deltaTime = (currentTime - this.previousTime) / 1000;

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// use default shader
		this.gl.useProgram(this.defaultShaderProgram);

		// send uniforms to gpu
		this.gl.uniformMatrix4fv(this.uniformLocations.uModelMatLocation,
			false,
			this.activeCamera.getModelMatrix());

		this.gl.uniformMatrix4fv(this.uniformLocations.uViewMatLocation,
			false,
			this.activeCamera.getViewMatrix());

		this.gl.uniformMatrix4fv(this.uniformLocations.uProjectionMatrixLocation,
			false, 
			this.activeCamera.getProjectionMatrix());

		// render all objects
		this.renderObjects.forEach((renderObject) => {
			// renderObject.draw(this.gl, this.gl.POINTS);
			renderObject.draw(this.gl);
		});

		this.previousTime = currentTime;

		// request another frame
		if (this.render) {
			window.requestAnimationFrame(this.Render.bind(this));
		}
	}

	private resize() {
		const pixelRatio = window.devicePixelRatio || 1;

		const width = Math.floor(this.gl.canvas.clientWidth * pixelRatio);
		const height = Math.floor(this.gl.canvas.clientHeight * pixelRatio);

		if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
			this.gl.canvas.width = width;
			this.gl.canvas.height = height;

			this.activeCamera.updateAspectRatio(width, height); 
		}
	}
}