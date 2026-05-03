import type { Goal } from '../../../../../types';

export interface ReplySample {
  user: string;
  assistant: string;
}

interface GoalRuleObject {
  reply_samples?: ReplySample[];
  skills?: string[];
  [key: string]: unknown;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? '').trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|[,;]+/g)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const toReplySamples = (value: unknown): ReplySample[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (isRecord(item)) {
        const user =
          (typeof item.user === 'string' && item.user.trim()) ||
          (typeof item.customer === 'string' && item.customer.trim()) ||
          (typeof item.question === 'string' && item.question.trim()) ||
          '';
        const assistant =
          (typeof item.assistant === 'string' && item.assistant.trim()) ||
          (typeof item.answer === 'string' && item.answer.trim()) ||
          (typeof item.ai === 'string' && item.ai.trim()) ||
          '';
        if (user && assistant) return { user, assistant };
      }
      return null;
    })
    .filter((item): item is ReplySample => Boolean(item));
};

export const parseGoalRule = (goal: Goal): { samples: ReplySample[]; skills: string[]; raw: GoalRuleObject } => {
  const ruleText = goal.rule?.trim();
  if (!ruleText) return { samples: [], skills: [], raw: {} };

  try {
    const parsed = JSON.parse(ruleText) as unknown;
    if (!isRecord(parsed)) {
      return { samples: [], skills: [], raw: {} };
    }

    const sampleCandidates = [
      parsed.reply_samples,
      parsed.replySamples,
      parsed.samples,
      parsed.templates,
    ];
    const skillCandidates = [parsed.skills, parsed.skill_ids, parsed.skillIds];

    const samples = sampleCandidates.flatMap((candidate) => toReplySamples(candidate));
    const skills = [...new Set(skillCandidates.flatMap((candidate) => toStringArray(candidate)))];

    return {
      samples,
      skills,
      raw: { ...(parsed as GoalRuleObject) },
    };
  } catch {
    return {
      samples: [],
      skills: [],
      raw: {
        instruction: ruleText,
      },
    };
  }
};

export const buildGoalRule = (
  goal: Goal,
  updater: (current: { samples: ReplySample[]; skills: string[]; raw: GoalRuleObject }) => {
    samples?: ReplySample[];
    skills?: string[];
    raw?: GoalRuleObject;
  }
): string => {
  const current = parseGoalRule(goal);
  const updates = updater(current);

  const nextRaw: GoalRuleObject = {
    ...current.raw,
    ...(updates.raw ?? {}),
  };

  const nextSamples = updates.samples ?? current.samples;
  const nextSkills = updates.skills ?? current.skills;

  nextRaw.reply_samples = nextSamples;
  if (nextSkills.length > 0) {
    nextRaw.skills = nextSkills;
  } else {
    delete nextRaw.skills;
  }

  return JSON.stringify(nextRaw);
};

export const makeGoalNameFromScript = (script: string, fallbackIndex: number): string => {
  const cleaned = script
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+/g, '')
    .trim();

  if (!cleaned) return `Kịch bản ${fallbackIndex}`;

  const words = cleaned.split(' ').slice(0, 7);
  const candidate = words.join(' ');
  return candidate.length > 54 ? `${candidate.slice(0, 54).trim()}...` : candidate;
};

