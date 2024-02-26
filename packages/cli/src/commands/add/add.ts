import { cancel, isCancel, log, select } from '@clack/prompts';
import { Command } from 'commander';

import { addEntity } from './entity/add-entity';
import { createNewPlugin } from './plugin/create-new-plugin';
import { addUiExtensions } from './ui-extensions/add-ui-extensions';

const cancelledMessage = 'Add feature cancelled.';

export function registerAddCommand(program: Command) {
    program
        .command('add')
        .description('Add a feature to your Vendure project')
        .action(async () => {
            const featureType = await select({
                message: 'Which feature would you like to add?',
                options: [
                    { value: 'plugin', label: '[Plugin] Add a new plugin' },
                    { value: 'entity', label: '[Plugin: Entity] Add a new entity to a plugin' },
                    { value: 'uiExtensions', label: '[Plugin: UI] Set up Admin UI extensions' },
                ],
            });
            if (isCancel(featureType)) {
                cancel(cancelledMessage);
                process.exit(0);
            }
            try {
                if (featureType === 'plugin') {
                    await createNewPlugin();
                }
                if (featureType === 'uiExtensions') {
                    await addUiExtensions();
                }
                if (featureType === 'entity') {
                    await addEntity();
                }
            } catch (e: any) {
                log.error(e.message as string);
            }
            process.exit(0);
        });
}
