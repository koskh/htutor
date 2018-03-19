import {getBlocks, getBlock, getRandomBlockId} from '../../../../server/src/services/blocks';

export function blocks(blockId) {
    return blockId? getBlock(blockId): getBlocks();
}
