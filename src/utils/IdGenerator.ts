import { v4 } from "uuid";

export default class IdGenarator{
    generate = () => {
        return v4();
    }
}