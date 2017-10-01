import {GameObjectRegister} from "./GameObjectRegister";
import {GameFactory} from "./Factory/GameFactory";
import {iGameObject} from "./Interface/iGameObject";

class Main {
    private canvas: HTMLCanvasElement;
    private gamesObjects: iGameObject[] = [];
    private framesPerSecond: number = 30;
    private run: number;
    private run2: number;

    private constructor(canvas: HTMLCanvasElement, framesPerSecond: number) {
        this.canvas = canvas;
        this.framesPerSecond = framesPerSecond;
    }
    
    public static create(canvas: HTMLCanvasElement, width: number, height: number, framesPerSecond: number): void {
        console.log('Game init...');
        canvas.width = width;
		canvas.height = height;
        let mainGame =  new Main(canvas, framesPerSecond);
        GameObjectRegister.getRegisters().forEach(register => {
            let go: iGameObject = GameFactory.get().build(register);
            mainGame.gamesObjects.push(go);
        });
        mainGame.start();
    }

    public start(): void{
        console.log("Start...");
        this.gamesObjects.forEach(gameObject => {
            gameObject.onStart();
        });

        this.run = setInterval(()=>this.update(), 1000 / this.framesPerSecond);
        this.run2 = setInterval(()=>this.finish(), 1000);
    }

    public update(): void{
        console.log("Update...");
        this.gamesObjects.forEach(gameObject => {
            gameObject.onUpdate();
        });
    }

    public finish() {
        console.log("finish...");
        if(this.run){
            clearInterval(this.run);
            clearInterval(this.run2);
        }
        this.run = 0;
        this.gamesObjects.forEach(gameObject => {
            gameObject.onFinish();
        });
    }
}

let canvas = document.querySelector( 'canvas' ) ;
Main.create(canvas, 800, 600, 30);