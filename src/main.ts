import { EngineCore } from "./Rendering/EngineCore";
import { MeshFactory } from "./Utils/MeshFactory";
import { RenderObject } from "./Rendering/RenderObjects/RenderObject";
import { Vertex } from "./Structs/Vertex";
import { vec4, vec3 } from "gl-matrix";
import { BSP } from "./BSP/BSP";
import { LumpType } from "./BSP/Lumps/LumpType";
import { BSPMesh } from "./Rendering/RenderObjects/BSP/BSPMesh";
import { DispInfoLump } from "./BSP/Lumps/DispInfoLump";
import { FaceLump } from "./BSP/Lumps/FaceLump";
import { DispVert } from "./BSP/Structs/DispVert";
import { DispVertLump } from "./BSP/Lumps/DispVertLump";
import { DispTrisLump } from "./BSP/Lumps/DispTrisLump";
import { LeafLump } from "./BSP/Lumps/LeafLump";
import {EntityLocationService} from "./Rendering/GameData/Entities/EntityLocationService";
import {LocalEntityView} from "./Rendering/GameData/Entities/LocalEntityView";

// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;
type FileReaderProgressEvent = any;
function initWebGL(): void {
    const bspRenderer = new BSPRenderer();
}
// CAMERA GAME & APP =>

    // Game X = App X, Game Y ^-1 = App Z, Game Z = APP X

// setpos 1114.591553 950.518738 128.093811;setang -0.770001 177.425369 0.000000
class BSPRenderer {
    public gl!: WebGL2RenderingContext | null;
    public renderer!: EngineCore;
    public entityLocationService!: EntityLocationService;
    public localEntityview!: LocalEntityView;
    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) {
            alert("Could not find canvas");
            return;
        }
    
        // get webgl2 context
        this.gl = canvas.getContext("webgl2");
    
        if (!this.gl) {
            alert("Unable to initialize WebGL2. Your browser may not support it.");
            return;
        }
    
        console.log("WebGL Version: " + this.gl.VERSION);
        console.log("WebGL Shader Language Version: " + this.gl.SHADING_LANGUAGE_VERSION);
    
        this.renderer = new EngineCore(this.gl);
        this.renderer.main();
    
        this.setupBtnListeners();
    }

    public setupBtnListeners() {
        // setup button listener for open file dialog
        const openBtn = document.getElementById("openBtn");
        if (openBtn == null) {
            console.log("Open button was null");
            return;
        }
        openBtn.addEventListener("click", this.openFileBtnCallback.bind(this), false);

        const fileDialog = document.getElementById("fileDialog") as HTMLInputElement;
        fileDialog.value = "";

        if (!fileDialog) {
            return;
        }

        if (fileDialog == null) {
            console.log("fileDialog was null");
            return;
        }
    
        // event that handles when file is selected
        fileDialog.addEventListener("change", () => {
            if (fileDialog.files == null) {
                console.log("selected files were null");
                return;
            }

            const file = fileDialog.files[0];
            if (file == null) {
                return;
            }

            // console.log(file);
            if (file.name.match(/.*\.(bsp)$/gm)) {
                const reader = new FileReader();

                reader.onload = this.readBSP.bind(this);
                reader.readAsArrayBuffer(file);
            } else {
                console.log("Only BSP files are supported");
            }
        }, false);        
    }
    
    public openFileBtnCallback() {
        const fileDialog = document.getElementById("fileDialog") as HTMLInputElement;

        if (fileDialog == null) {
            console.log("fileDialog was null");
            return;
        }
    
        fileDialog.click();
    }
    
    public readBSP(e: FileReaderProgressEvent) {
        if (e.target == null) {
            throw new Error("BSP Read Error");
        }
        const bsp = new BSP(e.target.result);

        if (this.gl == null) {
            return;
        }
        this.entityLocationService = new EntityLocationService(this.renderer, this.renderer.socketService, bsp);
        this.localEntityview = new LocalEntityView(this.renderer,this.renderer.socketService);
        // const lump = bsp.readLump(LumpType.Leafs) as LeafLump;
        // console.log(lump.toString());
        // bsp.printLumps();
        this.renderer.clearRenderObjects();
        this.renderer.addRenderableObject(new BSPMesh(this.gl, bsp));
        // start rendering frames
        this.renderer.renderFrame = true;
    }
}