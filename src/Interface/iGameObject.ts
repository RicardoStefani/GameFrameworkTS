export interface iGameObject {
    onStart(): void;
    onUpdate(): void;
    onFinish(): void;
}