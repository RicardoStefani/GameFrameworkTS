import {iGameObject} from "../Interface/iGameObject";
import {TestGO} from "../GameObject/TestGO";
import {TestService} from "../Service/TestService";

export class GameFactory {

    private classes: any[] = [];

    private constructor() {}

    public static get (): GameFactory {
        let gameFactory = new GameFactory();

        gameFactory.classes['TestGO'] = { 
            className: TestGO,
            dependecies: [
                'TestService'
            ]
        };
        gameFactory.classes['TestService'] = { 
            className: TestService,
            dependecies: []
        };

        return gameFactory;
    }

    public build(name: string): any {

        let dependeciesNames: string[] = this.classes[name].dependecies;

        let objDependencies: any[] = [];
        dependeciesNames.forEach(dName => {
            objDependencies.push(this.build(dName));
        });

        return Reflect.construct(this.classes[name].className, objDependencies);
    }
}