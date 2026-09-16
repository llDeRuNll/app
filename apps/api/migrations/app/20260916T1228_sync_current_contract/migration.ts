#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/5b9f04bdcc77cce306a1e15cdd0951586abcd15f0083686269739af44ca44180/contract';
import startContract from '../../snapshots/5b9f04bdcc77cce306a1e15cdd0951586abcd15f0083686269739af44ca44180/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/be4daf92607e35c8474af41701347dafa83311e7d47e4d184a3c7e1b5d927e35/contract';
import endContract from '../../snapshots/be4daf92607e35c8474af41701347dafa83311e7d47e4d184a3c7e1b5d927e35/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
