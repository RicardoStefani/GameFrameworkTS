import {GameObjectRegister} from "./GameObjectRegister";
import {GameFactory} from "./Factory/GameFactory";
import {iGameObject} from "./Interface/iGameObject";

class Main {
    private framesPerSecond = 30;
    private gamesObjects: iGameObject[] = [];
    private run: number;
    private run2: number;

    private constructor() {}
    
    public static create(framesPerSecond: number): void {
        console.log('Game init...');
        let mainGame =  new Main();
        mainGame.framesPerSecond = framesPerSecond;
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

Main.create(30);