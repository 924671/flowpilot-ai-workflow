# FlowPilot Project Instructions

## Product Positioning
FlowPilot is a C-end PC Web tool for AI-newbie office workers. It uses high-frequency workplace task entries, context building, structured prompts, output checks, version refinement, and Skill records to help users turn one-off AI usage into reusable working methods.

## Goal
Build a high-fidelity interactive prototype for portfolio presentation.

## Core Concept
The workbench uses six floating balloons as six task entries. Each balloon is tied to the central chat entry with a string. When the user hovers over a balloon or string, the cursor becomes scissors. When clicked, the string is cut, the balloon flies upward, and the corresponding workflow starts.

## Target Screen
Desktop web prototype, fixed canvas size: 1440 x 1024.

## Navigation
Use these pages:
1. Workbench
2. Task Library
3. My Workflows
4. Results Library
5. Skill Records
6. Membership

## Skill system
Keep Skill as a non-gamified method record system.

Skill can be used as:
- Task method tags
- Contextual tips during workflow execution
- Post-task usage records
- Skill Records page for method review

Do not use levels, XP, points, badges, rankings, or game-like progression.

## Skill Records

Purpose:
Record the AI work methods the user has used in real tasks.

This is not a level page and not a gamified growth page.

Contains:
- Common Skills
- Recent usage
- Common issues
- Reusable suggestions

Examples:
- Context Expression: used in project reviews, weekly reports, operation plans.
- Output Check: often detects missing data, vague conclusions, weak next steps.
- Version Optimization: converts one output into leader report version, team sync version, PPT outline version.

Do not show:
- levels
- XP
- points
- badges
- rankings

## Visual Style
- Clean AI workbench
- Left sidebar navigation
- Large whitespace
- Soft balloon animation
- Professional but not cold
- No childish UI
- No excessive gradients

## Do not use
- Do not add level systems, XP, ranking, badges, or game-like growth.
- Do not turn Skill into a course, training camp, or gamified learning system.
- Do not turn this into a course app.
- Do not make it a generic chatbot.
- Do not remove the left sidebar.
- Do not replace balloons with ordinary cards.

## Interaction Rules
- Hover balloon or string: show scissors cursor.
- Click balloon or string: cut the string, balloon flies upward, chat entry highlights, workflow modal appears.
- Provide reset interaction for prototype testing.

## Writing Rules
- After task completion, use text records instead of numeric reward feedback.
- Example feedback:
  - Used context expression: added goal, audience, and constraints.
  - Used output check: found the result lacked data support.
  - Used version refinement: generated a manager summary version and a team sync version.

## Tech Preference
Use Vite + React + CSS.
Keep components small and readable.
Use local data files for tasks and workflows.
No backend is required.

## Code Quality
- Keep data-driven task definitions in src/data/tasks.js.
- Do not hardcode the same task content repeatedly.
- Components should be reusable.
- Use semantic class names.
