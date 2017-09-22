export class GameObjectRegister {

    private constructor() {}

    public static getRegisters(): string[] {
        let game_objects: string[] = [
            'TestGO'
        ];

        return game_objects;
    }

}