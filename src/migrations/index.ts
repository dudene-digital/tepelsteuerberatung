import * as migration_20261109_092813_initial from './20261109_092813_initial';

export const migrations = [
  {
    up: migration_20261109_092813_initial.up,
    down: migration_20261109_092813_initial.down,
    name: '20261109_092813_initial'
  },
];
