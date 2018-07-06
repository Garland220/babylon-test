import * as babylon from 'babylonjs';


export class Client {
    protected camera: BABYLON.FreeCamera;
    protected engine: BABYLON.Engine;
    protected scene: BABYLON.Scene;

    protected location: BABYLON.Vector3 = BABYLON.Vector3.Zero();

    protected zoom: number = 10;

    constructor(private canvas: HTMLCanvasElement, private antialias: boolean = true, private adaptToDeviceRatio: boolean = true) {
        this.engine = new BABYLON.Engine(canvas, antialias, {}, adaptToDeviceRatio);
        this.engine.clear(BABYLON.Color3.Black().toColor4(), false, false);
        this.ChangeScene(this.DebugScene());
    }

    public FocusCamera(vector: BABYLON.Vector3) {
        this.camera.setTarget(vector);
    }

    public ZoomCamera(): void {
        this.camera.orthoTop = 1 * this.zoom;
        this.camera.orthoBottom = -1 * this.zoom;
        this.camera.orthoLeft = -1 * this.zoom;
        this.camera.orthoRight = 1 * this.zoom;
    }

    public CreateCamera(scene: BABYLON.Scene) {
        this.camera = new BABYLON.FreeCamera('Client Camera', new BABYLON.Vector3(5, 5, -5), scene);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this.FocusCamera(this.location);
        this.ZoomCamera();
    }

    public DebugScene(): BABYLON.Scene {
        let scene = new BABYLON.Scene(this.engine);
        scene.useRightHandedSystem = true;
        scene.ambientColor = new BABYLON.Color3(0, 1, 1);
        scene.clearColor = BABYLON.Color3.White().toColor4();

        this.camera = new BABYLON.FreeCamera('Client Camera', new BABYLON.Vector3(5, 5, -5), scene);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this.FocusCamera(this.location);
        this.ZoomCamera();

        // this.camera.attachControl(this.canvas, false);

        // this.camera.upVector = new Vector3(0, 0, 1);
        // this.camera.attachControl(this.canvas, true);

        let tiledGround = BABYLON.Mesh.CreateTiledGround(name, -3, -3, 3, 3, { w: 10, h: 10 }, { w: 2, h: 2 }, scene);
        // let box = BABYLON.Mesh.CreateBox('Box', 2.0, this.scene);
        // box.position.y = 1;


        var spriteManagerTiles = new BABYLON.SpriteManager('tilesManager', "", 2000, 20, scene);
        var grass = new BABYLON.Sprite("grass", spriteManagerTiles);
        grass.cellIndex = 4;
        grass.position.y = 1;

        //img/tiles.png

        var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
        // whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        // whiteMaterial.mesh = ;
        // whiteMaterial.diffuseTexture = new BABYLON.Texture('data:spriteManagerTiles', scene);

        var blueMaterial = new BABYLON.StandardMaterial("Blue", scene);
        blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);

        var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
        blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

        // box.material = blueMaterial;

        var multimat = new BABYLON.MultiMaterial("multi", scene);
        multimat.subMaterials.push(whiteMaterial);
        multimat.subMaterials.push(blackMaterial);

        tiledGround.material = multimat;

        var verticesCount = tiledGround.getTotalVertices();
        var tileIndicesLength = tiledGround.getIndices().length / (10 * 10);

        tiledGround.subMeshes = [];

        var base = 0;
        for (var row = 0; row < 10; row++) {
            for (var col = 0; col < 10; col++) {
                tiledGround.subMeshes.push(new BABYLON.SubMesh(row % 2 ^ col % 2, 0, verticesCount, base, tileIndicesLength, tiledGround));
                base += tileIndicesLength;
            }
        }

        // let light = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(0, 5, 0), scene);
        var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
        let spotlight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(0, 10, -10), new BABYLON.Vector3(0, 0, 0), Math.PI / 3, 2, scene);
        // let particleSystem = new BABYLON.ParticleSystem('particles', 2000, scene);
        // particleSystem.particleTexture = new BABYLON.Texture('img/flare.png', scene);
        // // particleSystem.textureMask = new Color4(0.1, 0.8, 0.8, 1.0);
        // particleSystem.minEmitBox = new BABYLON.Vector3(-1, 3.5, -1); // Starting all From
        // particleSystem.maxEmitBox = new BABYLON.Vector3(1, 3, 1); // To...
        // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        // particleSystem.emitRate = 1000;
        // particleSystem.emitter = box;
        // particleSystem.start();
        // light.parent = box;
        spotlight.specular = new BABYLON.Color3(0, 0, 1);
        // spotlight.diffuse = new Color3(0, 0, 1);

        light.intensity = 0.6 + Math.random() * 0.05;

        // scene.registerBeforeRender(function() {
        //     // light.intensity = 0.6 + Math.random() * 0.05;
        //     light.diffuse = new BABYLON.Color3(0.8 + Math.random() * 0.1, 0, 0);
        //     light.specular = new BABYLON.Color3(0.8 + Math.random() * 0.1, 0.8 + Math.random() * 0.1, 0);
        //     // light.position.x += Math.random() * 0.125 - 0.0625;
        //     // light.position.z += Math.random() * 0.125 - 0.0625;
        // });

        return scene;
    }

    public ChangeScene(scene: BABYLON.Scene) {
        this.engine.runRenderLoop(() => {
            scene.render();
        });
    }
}

function createClient(canvas: HTMLCanvasElement): Client {
    return new Client(canvas);
}

(<any>window).createClient = createClient;
