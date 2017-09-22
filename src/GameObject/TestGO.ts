import {iGameObject} from "../Interface/iGameObject";
import {TestService} from "../Service/TestService";

export class TestGO implements iGameObject {

    constructor(testService: TestService) {
        console.log("Create Test");
        testService.run();
    }

    public onStart(): void {
        console.log("Start test");
    }

    public onUpdate(): void {
        console.log("Update test");
    }

    public onFinish(): void {
        console.log("Finish test");
    }
}