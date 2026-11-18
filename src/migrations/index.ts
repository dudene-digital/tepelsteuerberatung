import * as migration_20261109_092813_initial from './20261109_092813_initial';
import * as migration_20261118_200325_bewertungen from './20261118_200325_bewertungen';

export const migrations = [
  {
    up: migration_20261109_092813_initial.up,
    down: migration_20261109_092813_initial.down,
    name: '20261109_092813_initial',
  },
  {
    up: migration_20261118_200325_bewertungen.up,
    down: migration_20261118_200325_bewertungen.down,
    name: '20261118_200325_bewertungen'
  },
];
