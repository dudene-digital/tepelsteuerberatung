import * as migration_20261109_092813_initial from './20261109_092813_initial';
import * as migration_20261118_200325_bewertungen from './20261118_200325_bewertungen';
import * as migration_20261118_203037_bewertungen_anzahl from './20261118_203037_bewertungen_anzahl';

export const migrations = [
  {
    up: migration_20261109_092813_initial.up,
    down: migration_20261109_092813_initial.down,
    name: '20261109_092813_initial',
  },
  {
    up: migration_20261118_200325_bewertungen.up,
    down: migration_20261118_200325_bewertungen.down,
    name: '20261118_200325_bewertungen',
  },
  {
    up: migration_20261118_203037_bewertungen_anzahl.up,
    down: migration_20261118_203037_bewertungen_anzahl.down,
    name: '20261118_203037_bewertungen_anzahl'
  },
];
