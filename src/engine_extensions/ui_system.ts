import { UIText, Vector2, uiSystem, UIObject } from 'littlejsengine';

export class UITextWithId extends UIText {
    readonly id: string;

    constructor(position: Vector2, size: Vector2, text: string,) {
        super(position, size, text);
        this.id = crypto.randomUUID();
    }

    destroy(): void {
        uiSystem.uiObjects = uiSystem.uiObjects.filter(obj => obj?.id !== this.id);
    }
}


export class UIObjectWithId extends UIObject {
    readonly id: string;

    constructor(position: Vector2, size: Vector2) {
        super(position, size);
        this.id = crypto.randomUUID();
    }

    destroy(): void {
        for (const child of this.children) {
            if (child instanceof UIObjectWithId || child instanceof UITextWithId) {
                child.destroy();
            }
        }
        uiSystem.uiObjects = uiSystem.uiObjects.filter(obj => obj?.id !== this.id);
    }
}