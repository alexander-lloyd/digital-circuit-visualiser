import {LabelFunction, Point} from './types';

export type Wire = [Point, Point];

/**
 * Flat Map implementation.
 *
 * @param array Array.
 * @param callbackfn Map function.
 * @returns Flattened mapped array.
 */
function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
    return Array.prototype.concat(...array.map(callbackfn));
}

/**
 * Scale a Wire.
 *
 * @param wire Wire.
 * @param scaleX X scaling factor.
 * @param scaleY Y scaling factor.
 * @returns Scaled wire.
 */
function scaleWire([[x1, y1], [x2, y2]]: Wire, scaleX: number, scaleY: number): Wire {
    return [[x1 * scaleX, y1 * scaleY], [x2 * scaleX, y2 * scaleY]];
}

/**
 * Scale a Wire.
 *
 * @param wire Wire.
 * @param translateX X translating factor.
 * @param translateY Y translating factor.
 * @returns Scaled wire.
 */
function translateWire([[x1, y1], [x2, y2]]: Wire, translateX: number, translateY: number): Wire {
    return [[x1 + translateX, y1 + translateY], [x2 + translateX, y2 + translateY]];
}

/**
 * A rendered entity.
 */
export interface Entity {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    inputs: number[];
    outputs: number[];

    /**
     * Scale an entity.
     * A value of 1 wont change coordinates.
     * 2 will double the size.
     *
     * @param scaleX X scaling value.
     * @param scaleY Y scaling value.
     */
    scale(scaleX: number, scaleY: number): this;

    /**
     * Translate the position of the entity.
     *
     * @param translateX X translation. Positive will move to the right.
     * @param translateY Y translation. Positive will move downwards.
     */
    translate(translateX: number, translateY: number): this;

    /**
     * Visit the right method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     */
    visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R;
}

/**
 * Represents an object drawn on the canvas.
 *
 * Allows the object points to be manipulated before
 * drawing.
 */
export class FunctionEntity implements Entity {
    public readonly type = 'functionEntity';
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public label: LabelFunction;
    public wires: Wire[];
    public inputs: number[];
    public outputs: number[];

    /**
     * Constructor.
     *
     * @param x Top Left x
     * @param y Top Left y
     * @param width Box width
     * @param height Box height
     * @param label Function to draw the label.
     * @param wires Additional Wires required.
     * @param inputs Inputs into this Entity.
     * @param outputs Outputs to the next entity.
     */
    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        label: LabelFunction,
        wires: Wire[],
        inputs: number[],
        outputs: number[]
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.wires = wires;
        this.inputs = inputs;
        this.outputs = outputs;
    }

    /**
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     * @returns this.
     */
    public scale(scaleX: number, scaleY: number): this {
        this.width *= scaleX;
        this.height *= scaleY;
        this.wires = this.wires.map((wire) => scaleWire(wire, scaleX, scaleY));
        // Inputs and outputs are in unit space so don't scale them.
        return this;
    }

    /**
     * Translate the Function.
     *
     * @param translateX X Translation.
     * @param translateY Y Translation.
     * @returns this.
     */
    public translate(translateX: number, translateY: number): this {
        this.x += translateX;
        this.y += translateY;
        this.wires = this.wires.map((wire) => translateWire(wire, translateX, translateY));
        this.inputs = this.inputs.map((i: number) => i + translateY);
        this.outputs = this.outputs.map((o: number) => o + translateY);

        return this;
    }

    /**
     * Visit the FunctionEntity method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     * @param context EntityVisitor context.
     * @returns Return value of visitFunction.
     */
    public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
        return visitor.visitFunction(this, context);
    }
}

/**
 * Represents grouped objects rendered together.
 * For example, a binary operation,
 */
export class GroupedEntity implements Entity {
    public readonly type = 'groupedEntity';
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public children: [Entity, Entity];

    /**
     * Constructor.
     *
     * @param x Top Left x
     * @param y Top Left y
     * @param width Box width
     * @param height Box height
     * @param children Children Entities.
     */
    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        children: [Entity, Entity]
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.children = children;
    }

    /**
     * Get all the nested inputs.
     *
     * @returns All the inputs.
     */
    public get inputs(): number[] {
        return flatMap(this.children, (e: Entity) => e.inputs);
    }

    /**
     * Get all the nested outputs
     *
     * @returns All the outputs.
     */
    public get outputs(): number[] {
        return flatMap(this.children, (e: Entity) => e.outputs);
    }

    /**
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     * @returns this.
     */
    public scale(scaleX: number, scaleY: number): this {
        this.width *= scaleX;
        this.height *= scaleY;

        this.children.forEach((e: Entity) => e.scale(scaleX, scaleY));

        return this;
    }

    /**
     * Translate the Function.
     *
     * @param translateX X Translation.
     * @param translateY Y Translation.
     * @returns this.
     */
    translate(translateX: number, translateY: number): this {
        this.x += translateX;
        this.y += translateY;

        this.children.forEach((e: Entity) => e.translate(translateX, translateY));

        return this;
    }

    /**
     * Visit the GroupedEntity method in the EntityVisitor.
     *
     * @param visitor EntityVisitor.
     * @param context EntityVisitor context.
     * @returns Return value of visitGroup.
     */
    public visit<T, R>(visitor: EntityVisitor<T, R>, context: T): R {
        return visitor.visitGrouped(this, context);
    }
}

/**
 * EntityVisitor.
 */
export abstract class EntityVisitor<T, R> {
    /**
     * Visit the entity tree.
     *
     * @param entity Entity.
     * @param context Context required while visiting.
     * @returns What ever the EntityVisitor implementation returns.
     */
    public visit(entity: Entity, context: T): R {
        return entity.visit<T, R>(this, context);
    }

    abstract visitFunction(entity: FunctionEntity, context: T): R;
    abstract visitGrouped(entity: GroupedEntity, context: T): R;
}

/**
 * Is the Entity a function entity?
 *
 * @param entity Entity
 * @returns true if entity is a function entity. Returns false otherwise.
 */
export function isFunctionEntity(entity: Entity): entity is FunctionEntity {
    return entity.type === 'functionEntity';
}

/**
 * Is the Entity a grouped entity?
 *
 * @param entity Entity
 * @returns true if entity is a grouped entity. Returns false otherwise.
 */
export function isGroupedEntity(entity: Entity): entity is GroupedEntity {
    return entity.type === 'groupedEntity';
}
