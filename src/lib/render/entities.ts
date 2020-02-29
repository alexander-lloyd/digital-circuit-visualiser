import {LabelFunction} from './label';

/**
 * A rendered entity.
 */
export interface Entity {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;

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

    /**
     * Constructor.
     *
     * @param x Top Left x
     * @param y Top Left y
     * @param width Box width
     * @param height Box height
     * @param label Function to draw the label.
     */
    public constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        label: LabelFunction
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
    }

    /**
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     * @returns this.
     */
    public scale(scaleX: number, scaleY: number): this {
        console.debug('[Function Entity]', 'scale', scaleX, scaleY);
        this.width *= scaleX;
        this.height *= scaleY;

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
        console.debug('[Function Entity]', 'translate', translateX, translateY);
        this.x += translateX;
        this.y += translateY;

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
     * Scale the Function.
     *
     * @param scaleX X Scale.
     * @param scaleY Y Scale.
     * @returns this.
     */
    public scale(scaleX: number, scaleY: number): this {
        console.debug('[Grouped Entity]', 'scale', scaleX, scaleY);
        this.width *= scaleX;
        this.height *= scaleY;

        const [left, right] = this.children;
        left.scale(scaleX, scaleY);
        right.scale(scaleX, scaleY);

        this.children = [left, right];

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
        console.debug('[Grouped Entity]', 'translate', translateX, translateY);
        this.x += translateX;
        this.y += translateY;

        const [left, right] = this.children;
        left.translate(translateX, translateY);
        right.translate(translateX, translateY);

        this.children = [left, right];

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
