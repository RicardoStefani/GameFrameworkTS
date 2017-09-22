import {iGameObject} from "../Interface/iGameObject";
import {TestGO} from "../GameObject/TestGO";
import {TestService} from "../Service/TestService";

export class GameFactory {

    private static GAME_OBJETCS: iGameObject[] = [];

    private constructor() {}

    public static BUILD(name: string): iGameObject {
        GameFactory.GAME_OBJETCS['TestGO'] = TestGO;
        
        return Reflect.construct(
            GameFactory.GAME_OBJETCS[name],
            GameFactory.BUILD_DEPEDENCIES([TestService])
        );
    }

    private static BUILD_DEPEDENCIES(dependencies: any[]): any[]
    {
        let obj: any[] = [];
        dependencies.forEach(dependecy => {
            obj.push(Reflect.construct(dependecy,[]));
        });
        return obj;
    }
}