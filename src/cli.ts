#!/usr/bin/env node
/* eslint no-console:off */
import { exec as callbackExec } from 'child_process';
import { promisify } from 'util';
import cliSelect from 'cli-select';

const exec = promisify(callbackExec);

const main = async () => {
  const configsRaw = await exec(
    'gcloud config configurations list --format=json',
  );
  const configs = JSON.parse(configsRaw.stdout);
  const options = configs.map((config: any) => config.name);
  const selected = await cliSelect({
    values: options,
    // defaultValue: configs.find((c: any) => c.is_active).name,
  });
  if (selected) {
    await exec(`gcloud config configurations activate ${selected.value}`);
  }
};

main();
