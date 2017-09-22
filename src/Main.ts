import {GameObjectRegister} from "./GameObjectRegister";
import {GameFactory} from "./Factory/GameFactory";
import {iGameObject} from "./Interface/iGameObject";

class Main {
    private framesPerSecond = 30;
    private gamesObjects: iGameObject[] = [];
    private run: number;
    private run2: number;

    constructor() {}
    
    public onCreate(): void {
        console.log('Game init...');
        GameObjectRegister.getRegisters().forEach(register => {
            let go: iGameObject = GameFactory.get().build(register);
            // let teste = GameFactory.get().build('Test');
            this.gamesObjects.push(go);
        });
        this.onStart();
    }

    public onStart(): void{
        console.log("Start...");
        this.gamesObjects.forEach(gameObject => {
            gameObject.onStart();
        });

        this.run = setInterval(()=>this.onUpdate(), 1000 / this.framesPerSecond);
        this.run2 = setInterval(()=>this.onFinish(), 1000);
    }

    public onUpdate(): void{
        console.log("Update...");
        this.gamesObjects.forEach(gameObject => {
            gameObject.onUpdate();
        });
    }

    public onFinish() {
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

let MainGame =  new Main();
MainGame.onCreate();