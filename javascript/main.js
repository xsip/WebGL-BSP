"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer_1 = require("./Rendering/Renderer");
var MeshFactory_1 = require("./Utils/MeshFactory");
var RenderObject_1 = require("./Rendering/RenderObject");
var BSP_1 = require("./BSP/BSP");
var LumpType_1 = require("./BSP/Lumps/LumpType");
// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;
function initWebGL() {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        alert("Could not find canvas");
        return;
    }
    // get webgl2 context
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("Unable to initialize WebGL2. Your browser may not support it.");
        return;
    }
    console.log("WebGL Version: " + gl.VERSION);
    console.log("WebGL Shader Language Version: " + gl.SHADING_LANGUAGE_VERSION);
    var renderer = new Renderer_1.GLRenderer(gl);
    setupBtnListeners();
    renderer.AddRenderObject(new RenderObject_1.RenderObject(gl, MeshFactory_1.MeshFactory.createSolidCube(5)));
    // renderer.AddRenderObject(new RenderObject(gl, [
    //     new Vertex(vec4.fromValues(-0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(-0.5, -0.5, -1.0, 1.0), vec4.create()),
    //     new Vertex(vec4.fromValues(0.5, -0.5, -1.0, 1.0), vec4.create())
    // ]));
    // start render loop
    renderer.Render();
}
function setupBtnListeners() {
    // setup button listener for open file dialog
    var openBtn = document.getElementById("openBtn");
    if (openBtn == null) {
        console.log("Open button was null");
        return;
    }
    openBtn.addEventListener("click", openFileBtnCallback);
}
function openFileBtnCallback() {
    var fileDialog = document.getElementById("fileDialog");
    if (fileDialog == null) {
        console.log("fileDialog was null");
        return;
    }
    // event that handles when 
    fileDialog.addEventListener("change", function () {
        if (fileDialog.files == null) {
            console.log("selected files were null");
            return;
        }
        var file = fileDialog.files[0];
        console.log(file);
        if (file.name.match(/.*\.(bsp)$/gm)) {
            var bsp = new BSP_1.BSP(file, readBSP);
        }
        else {
            console.log("Only BSP files are supported");
        }
    }, false);
    fileDialog.click();
}
function readBSP(bsp) {
    // console.log(bsp.getLump(LumpType.Vertexes).toString());
    console.log(bsp.getLump(LumpType_1.LumpType.SurfEdges).toString());
    // bsp.printLumps();
}
