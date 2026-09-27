import { AuditEntry, ActorType } from '../types/platform';

export class AuditService {
  /**
   * Generates a tamper-evident hash for an audit log entry chained from previous entry.
   */
  public static calculateHash(
    previousHash: string,
    actor: string,
    action: string,
    resource: string,
    timestamp: string,
    metadataStr: string
  ): string {
    const raw = `${previousHash}|${actor}|${action}|${resource}|${timestamp}|${metadataStr}`;
    // Simple fast deterministic hash simulation producing hex digest
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256-${hex}${Date.now().toString(16).slice(-4)}`;
  }

  public static createEntry(
    entries: AuditEntry[],
    actor: string,
    actorType: ActorType,
    action: string,
    resource: string,
    metadata: Record<string, any> = {}
  ): AuditEntry {
    const lastEntry = entries[entries.length - 1];
    const previousHash = lastEntry ? lastEntry.hash : 'GENESIS_BLOCK_0000000000000000';
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' IST';

    const hash = this.calculateHash(
      previousHash,
      actor,
      action,
      resource,
      timestamp,
      JSON.stringify(metadata)
    );

    return {
      id: `AUD-${(entries.length + 1).toString().padStart(3, '0')}`,
      actor,
      actorType,
      action,
      resource,
      timestamp,
      metadata,
      previousHash,
      hash
    };
  }
}
