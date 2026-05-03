import type { Intent } from '../types';

export interface IntentUiMeta {
  displayName: string;
  examples: string[];
  goalIds: string[];
  skills: string[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toUniqueStrings = (values: unknown[]): string[] =>
  [...new Set(values.map((item) => String(item ?? '').trim()).filter(Boolean))];

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return toUniqueStrings(value);
  }

  if (typeof value === 'string') {
    return toUniqueStrings(
      value
        .split(/\r?\n|[,;]+/g)
        .map((item) => item.trim())
        .filter(Boolean)
    );
  }

  return [];
};

export const toDisplayNameFromMachine = (machineName: string): string =>
  machineName
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .map((part) =>
      part
        ? `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`
        : ''
    )
    .join(' ')
    .trim();

export const parseIntentMeta = (intent: Intent): IntentUiMeta => {
  const fallbackDisplay = toDisplayNameFromMachine(intent.name || '');
  const source = intent.example;

  if (Array.isArray(source)) {
    return {
      displayName: fallbackDisplay,
      examples: toStringArray(source),
      goalIds: intent.target_goal ? [intent.target_goal] : [],
      skills: [],
    };
  }

  if (typeof source === 'string') {
    return {
      displayName: fallbackDisplay,
      examples: toStringArray(source),
      goalIds: intent.target_goal ? [intent.target_goal] : [],
      skills: [],
    };
  }

  if (isRecord(source)) {
    const displayNameCandidates = [
      source.display_name,
      source.displayName,
      source.label,
      source.title,
      source.name,
    ];

    const extractedDisplayName =
      displayNameCandidates.find((item) => typeof item === 'string' && item.trim()) ?? '';

    const examplesCandidates = [
      source.training_examples,
      source.trainingExamples,
      source.examples,
      source.example,
      source.items,
      source.example_lines,
      source.sample_utterances,
    ];

    const goalsCandidates = [
      source.goal_ids,
      source.goalIds,
      source.goals,
      source.target_goals,
      source.target_goal,
    ];

    const skillsCandidates = [source.skills, source.skill_ids, source.skillIds];

    const examples = toUniqueStrings(
      examplesCandidates.flatMap((item) => toStringArray(item))
    );
    const goalIds = toUniqueStrings(
      goalsCandidates.flatMap((item) => toStringArray(item))
    );
    const skills = toUniqueStrings(
      skillsCandidates.flatMap((item) => toStringArray(item))
    );

    if (intent.target_goal && !goalIds.includes(intent.target_goal)) {
      goalIds.unshift(intent.target_goal);
    }

    return {
      displayName:
        typeof extractedDisplayName === 'string' && extractedDisplayName.trim()
          ? extractedDisplayName.trim()
          : fallbackDisplay,
      examples,
      goalIds,
      skills,
    };
  }

  return {
    displayName: fallbackDisplay,
    examples: [],
    goalIds: intent.target_goal ? [intent.target_goal] : [],
    skills: [],
  };
};

export const buildIntentExamplePayload = (
  baseExample: unknown,
  displayName: string,
  examples: string[],
  goalIds: string[],
  skills: string[] = []
): unknown => {
  if (!displayName.trim() && examples.length === 0 && goalIds.length === 0 && skills.length === 0) {
    return null;
  }

  const payload: Record<string, unknown> = isRecord(baseExample) ? { ...baseExample } : {};

  payload.display_name = displayName.trim();
  payload.training_examples = toUniqueStrings(examples);
  payload.goal_ids = toUniqueStrings(goalIds);

  if (skills.length > 0) {
    payload.skills = toUniqueStrings(skills);
  }

  return payload;
};
