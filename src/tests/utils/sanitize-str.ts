export function sanitizeSrt(s: string): string {
    return !s || typeof s !== 'string' ? '' : s.trim().normalize();
}