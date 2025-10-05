import { EngineObject, Color } from "littlejsengine";

export class Player extends EngineObject {
    constructor() {
        super();
        // Initialize player properties here
        this.color = new Color(0, 1, 0); // Green color
        this.size.set(1, 1); // Set player size
    }
}