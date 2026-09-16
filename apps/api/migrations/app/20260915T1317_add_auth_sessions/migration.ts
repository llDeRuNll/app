#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5b9f04bdcc77cce306a1e15cdd0951586abcd15f0083686269739af44ca44180/contract';
import endContract from '../../snapshots/5b9f04bdcc77cce306a1e15cdd0951586abcd15f0083686269739af44ca44180/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/c67a383b4b2f30ca29ca9f5cc292b7b5c1f599723e84b190b47cfa5fc7c8b45d/contract';
import startContract from '../../snapshots/c67a383b4b2f30ca29ca9f5cc292b7b5c1f599723e84b190b47cfa5fc7c8b45d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'authSession',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'authSession',
        constraint: 'authSession_tokenHash_key',
        columns: ['tokenHash'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'authSession',
        index: 'authSession_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'authSession',
        index: 'authSession_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'authSession',
        foreignKey: {
          name: 'authSession_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
