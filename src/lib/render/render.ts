import {
    Entity,
    EntityVisitor,
    FunctionEntity,
    GroupedEntity
} from './entities';

/**
 * Renderer the entities to the Canvas.
 */
export class EntityRendererVisitor extends EntityVisitor<EntityRendererVisitorContext, void> {
    /**
     * Renderer a Function to the Canvas.
     *
     * @param entity Function Entity.
     * @param context Renderer Context.
     */
    visitFunction(entity: FunctionEntity, context: EntityRendererVisitorContext): void {
        const {result} = context;
        const {x, y, width, height, label} = entity;
    }

    /**
     * Renderer a Group of Entities.
     *
     * @param entity Grouped Entity.
     * @param context Canvas Context.
     */
    visitGrouped(entity: GroupedEntity, context: EntityRendererVisitorContext): void {
        const {children} = entity;
    }
}
