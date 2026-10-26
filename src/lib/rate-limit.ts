/**
 * 同じ相手からの連続送信を制限する。
 *
 * DB を使わない構成なので、記録はサーバーのメモリに持つ。
 * Vercel ではサーバーが複数起動したり、しばらく使われないと止まったりして記録が消えるため、
 * 制限は「だいたい」効く程度。いたずらの連打を抑えるのが目的で、厳密な上限ではない。
 */
type Options = {
  /** 期間内に許す回数 */
  limit: number;
  /** 期間の長さ（ミリ秒） */
  windowMs: number;
};

export function createRateLimiter({ limit, windowMs }: Options) {
  // 相手ごとの送信時刻（古い順）
  const hits = new Map<string, number[]>();

  return function check(key: string, now = Date.now()) {
    const since = now - windowMs;

    // 記録が溜まりすぎないよう、期間を過ぎた相手を片付ける
    if (hits.size > 1000) {
      for (const [k, times] of hits) {
        if (times[times.length - 1] <= since) hits.delete(k);
      }
    }

    const recent = (hits.get(key) ?? []).filter((t) => t > since);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return { ok: false as const, retryAfterSec: Math.ceil((recent[0] + windowMs - now) / 1000) };
    }

    recent.push(now);
    hits.set(key, recent);
    return { ok: true as const };
  };
}

/**
 * リクエストの送り主の IP アドレス。
 * Vercel は x-forwarded-for を自分で付け直すので、ブラウザ側から偽装はできない。
 */
export function getClientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
