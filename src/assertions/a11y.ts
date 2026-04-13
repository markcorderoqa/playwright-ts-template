import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

type A11ySeverity = 'minor' | 'moderate' | 'serious' | 'critical';

type A11yScanOptions = {
  include?: string[];
  impacts?: A11ySeverity[];
};

type A11yViolationSummary = {
  id: string;
  impact: string | null | undefined;
  nodes: number;
};

export async function runA11yScan(
  page: Page,
  options: A11yScanOptions = {},
): Promise<A11yViolationSummary[]> {
  const builder = new AxeBuilder({ page });
  if (options.include?.length) {
    for (const selector of options.include) {
      builder.include(selector);
    }
  }

  const results = await builder.analyze();
  const allowedImpacts = options.impacts ?? ['critical'];
  return results.violations
    .filter((violation) => allowedImpacts.includes((violation.impact ?? 'minor') as A11ySeverity))
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    }));
}

export async function expectNoCriticalA11yViolations(
  page: Page,
  options: A11yScanOptions = {},
): Promise<void> {
  const matched = await runA11yScan(page, {
    impacts: ['critical'],
    ...options,
  });
  expect(matched, 'Critical accessibility violations detected').toEqual([]);
}

export async function expectNoSeriousOrCriticalA11yViolations(
  page: Page,
  options: A11yScanOptions = {},
): Promise<void> {
  const matched = await runA11yScan(page, {
    impacts: ['serious', 'critical'],
    ...options,
  });
  expect(matched, 'Serious/Critical accessibility violations detected').toEqual([]);
}
